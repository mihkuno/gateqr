import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

export const GET: RequestHandler = async ({ locals }) => {
    // Only OSA can manage departments (or maybe Dean to view their own, but let's restrict to OSA for listing all)
    if (!locals.user || locals.user.role !== 'osa') {
        return json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        const [rows] = await db.query('SELECT * FROM department ORDER BY created_at DESC');
        return json({ departments: rows });
    } catch (error) {
        console.error('Failed to fetch departments:', error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.user || locals.user.role !== 'osa') {
        return json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        const { email, name } = await request.json();

        if (!email || !name) {
            return json({ error: 'Email and Name are required' }, { status: 400 });
        }

        const [result] = await db.query(
            'INSERT INTO department (email, name) VALUES (?, ?)',
            [email, name]
        );

        return json({ message: 'Department created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Failed to create department:', error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
};

export const PUT: RequestHandler = async ({ request, locals }) => {
    if (!locals.user || locals.user.role !== 'osa') {
        return json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        const { auto_id, email, name } = await request.json();

        if (!auto_id || !email || !name) {
            return json({ error: 'ID, Email and Name are required' }, { status: 400 });
        }

        await db.query(
            'UPDATE department SET email = ?, name = ? WHERE auto_id = ?',
            [email, name, auto_id]
        );

        return json({ message: 'Department updated successfully' });
    } catch (error) {
        console.error('Failed to update department:', error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
    if (!locals.user || locals.user.role !== 'osa') {
        return json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        const { auto_id } = await request.json();

        if (!auto_id) {
            return json({ error: 'Department ID is required' }, { status: 400 });
        }

        // The instruction says: "osa handles the creation, modification and deletion of departments and their email"
        // Also: "Deleting a department with signed applications immediately terminates their access."
        // We will just let the foreign key ON DELETE SET NULL handle the applications (as defined in our schema change)
        
        await db.query('DELETE FROM department WHERE auto_id = ?', [auto_id]);

        return json({ message: 'Department deleted successfully' });
    } catch (error) {
        console.error('Failed to delete department:', error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
