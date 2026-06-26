import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';
import QRCode from 'qrcode';
import { join } from 'path';

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.user || locals.user.role !== 'osa') {
        return json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        const [rows] = await db.query(`
            SELECT r.*, d.name as department_name, d.email as department_email, u.email as user_email 
            FROM registration r
            LEFT JOIN department d ON r.department_id = d.auto_id
            LEFT JOIN user u ON r.user_id = u.auto_id
            ORDER BY r.created_at DESC
        `);
        return json({ applications: rows });
    } catch (error) {
        console.error('Failed to fetch osa applications:', error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.user || locals.user.role !== 'osa') {
        return json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        const { registration_id, action, reason, schedule } = await request.json();

        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM registration WHERE auto_id = ?', [registration_id]);
        if (rows.length === 0) {
            return json({ error: 'Application not found' }, { status: 404 });
        }

        const reg = rows[0];

        if (action === 'accept' && reg.status === 'osa_val') {
            if (!schedule) {
                return json({ error: 'Schedule is required to accept application' }, { status: 400 });
            }
            // Generate QR code (Data URI)
            // Using ID number if available, otherwise just reg ID
            const qrData = reg.id ? reg.id : `REG-${registration_id}`;
            const filename = `qr-${registration_id}-${Date.now()}.png`;
            const filepath = join(process.cwd(), 'static', 'uploads', filename);

            await QRCode.toFile(filepath, qrData);
            const qrUrl = `/uploads/${filename}`;
            
            const expiryMonths = parseInt(process.env.QR_EXPIRY_MONTHS || '6', 10);

            await db.query(`
                UPDATE registration 
                SET status = 'osa_dist', 
                    osa_val_at = NOW(), 
                    doc_qr = ?,
                    dist_sched = ?,
                    expires_at = DATE_ADD(created_at, INTERVAL ? MONTH)
                WHERE auto_id = ?
            `, [qrUrl, new Date(schedule), expiryMonths, registration_id]);
        } 
        else if (action === 'reject' && reg.status === 'osa_val') {
            if (!reason) return json({ error: 'Reason required' }, { status: 400 });
            await db.query(`UPDATE registration SET status = 'rejected', rejected_at = NOW(), invalid_reason = ? WHERE auto_id = ?`, [reason, registration_id]);
        }
        else if (action === 'deliver' && reg.status === 'osa_dist') {
            await db.query(`UPDATE registration SET osa_dist_at = NOW() WHERE auto_id = ?`, [registration_id]);
        }
        else if (action === 'revoke' && reg.status === 'osa_dist') {
            if (!reason) return json({ error: 'Reason required' }, { status: 400 });
            await db.query(`UPDATE registration SET status = 'revoked', revoked_at = NOW(), invalid_reason = ? WHERE auto_id = ?`, [reason, registration_id]);
        }
        else if (action === 'retract') {
            await db.query(`UPDATE registration SET status = 'osa_val', osa_val_at = NULL, osa_dist_at = NULL, revoked_at = NULL, rejected_at = NULL, invalid_reason = NULL, doc_qr = NULL WHERE auto_id = ?`, [registration_id]);
        }
        else {
            return json({ error: 'Invalid action for current status' }, { status: 400 });
        }

        return json({ message: 'Application updated' });
    } catch (error) {
        console.error('Failed to update osa application:', error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
