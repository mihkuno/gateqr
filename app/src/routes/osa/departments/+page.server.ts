import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ locals }) => {
    // RBAC: Only OSA
    if (!locals.user || locals.user.role !== 'osa') {
        throw redirect(303, '/login');
    }

    try {
        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM department ORDER BY created_at DESC');
        return {
            departments: rows.map(row => ({
                auto_id: row.auto_id,
                email: row.email,
                name: row.name,
                created_at: row.created_at
            }))
        };
    } catch (error) {
        console.error('Error loading departments:', error);
        return {
            departments: []
        };
    }
};
