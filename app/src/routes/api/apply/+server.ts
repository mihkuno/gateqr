import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';
import { writeFileSync } from 'fs';
import { join } from 'path';

export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        
        const role = formData.get('role') as string;
        const department_name = formData.get('department_name') as string;
        const id_no = formData.get('id_no') as string;
        const first_name = formData.get('first_name') as string;
        const last_name = formData.get('last_name') as string;
        const vehicle_make = formData.get('vehicle_make') as string;
        const vehicle_plate = formData.get('vehicle_plate') as string;
        const is_owner = formData.get('is_owner') as string;

        const saveFile = async (fileKey: string) => {
            const file = formData.get(fileKey) as File | null;
            if (!file || file.size === 0) return null;
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
            const filepath = join(process.cwd(), 'static', 'uploads', filename);
            writeFileSync(filepath, buffer);
            return `/uploads/${filename}`;
        };

        const doc_or = await saveFile('doc_or');
        const doc_cr = await saveFile('doc_cr');
        const doc_license = await saveFile('doc_license');
        const doc_id = await saveFile('doc_id');
        const doc_load = await saveFile('doc_load');
        const doc_letter = await saveFile('doc_letter');
        const doc_qr = null; // Optional docs or future addition

        // 1. Ensure user exists in user table
        let [users] = await db.query<RowDataPacket[]>('SELECT auto_id FROM user WHERE email = ?', [locals.user.email]);
        let user_id = users[0]?.auto_id;

        if (!user_id) {
            const [result] = await db.query<ResultSetHeader>('INSERT INTO user (email) VALUES (?)', [locals.user.email]);
            user_id = result.insertId;
        }

        // 2. Resolve department_id
        let department_id = null;
        if (role !== 'visitor' && department_name) {
            const [depts] = await db.query<RowDataPacket[]>('SELECT auto_id FROM department WHERE name = ?', [department_name]);
            if (depts.length > 0) {
                department_id = depts[0].auto_id;
            } else {
                return json({ error: 'Invalid department' }, { status: 400 });
            }
        }

        // 3. Determine Initial Status based on Workflow
        // Student/Employee: dept_val
        // Visitor: osa_val
        const status = role === 'visitor' ? 'osa_val' : 'dept_val';

        // 4. Insert registration
        await db.query(`
            INSERT INTO registration (
                user_id, department_id, id, role, 
                first_name, last_name, vehicle_make, vehicle_plate, is_owner, status,
                doc_id, doc_load, doc_qr, doc_or, doc_cr, doc_license, doc_letter
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            user_id,
            department_id,
            id_no || null,
            role,
            first_name,
            last_name,
            vehicle_make,
            vehicle_plate,
            is_owner === 'yes' ? 1 : 0,
            status,
            doc_id || null,
            doc_load || null,
            doc_qr || null,
            doc_or || '',
            doc_cr || '',
            doc_license || '',
            doc_letter || null
        ]);

        return json({ message: 'Application submitted successfully', status });
    } catch (error) {
        console.error('Failed to submit application:', error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
