import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(303, '/login');
    }

    if (locals.user.role === 'osa') {
        throw redirect(303, '/osa');
    } else if (locals.user.role === 'dean') {
        throw redirect(303, '/dean');
    }

    // Pass the user's email to display in the greeting
    const userEmail = locals.user.email;

    try {
        // Fetch departments for the select dropdown
        const [rows] = await db.query<RowDataPacket[]>('SELECT name FROM department ORDER BY name ASC');
        return {
            userEmail,
            departments: rows.map(r => r.name)
        };
    } catch (e) {
        return { userEmail, departments: [] };
    }
};
