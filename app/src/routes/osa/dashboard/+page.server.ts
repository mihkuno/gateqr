import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import type { RowDataPacket } from 'mysql2';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user || locals.user.role !== 'osa') {
        throw redirect(303, '/login');
    }

    try {
        const [logRows] = await db.query<RowDataPacket[]>(`
            SELECT e.in, e.out, r.vehicle_plate as plate
            FROM entrylog e
            JOIN registration r ON e.registration_id = r.auto_id
            WHERE DATE(e.in) = CURDATE()
            ORDER BY e.in DESC
            LIMIT 50
        `);

        const logs = logRows.flatMap(row => {
            const inDate = new Date(row.in);
            const items = [];
            items.push({
                date: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(inDate),
                time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }).format(inDate),
                plate: row.plate,
                bound: 'In',
                timestamp: inDate.getTime()
            });
            
            if (row.out) {
                const outDate = new Date(row.out);
                items.push({
                    date: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(outDate),
                    time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }).format(outDate),
                    plate: row.plate,
                    bound: 'Out',
                    timestamp: outDate.getTime()
                });
            }
            return items;
        }).sort((a, b) => b.timestamp - a.timestamp);

        const [inRows] = await db.query<RowDataPacket[]>(`SELECT COUNT(*) as count FROM entrylog WHERE \`out\` IS NULL`);
        const currentlyIn = inRows[0].count;

        const visitsToday = logRows.length;
        const totalSlots = 50; 
        const availableSlots = Math.max(0, totalSlots - currentlyIn);

        return {
            stats: {
                currentlyIn,
                availableSlots,
                visitsToday
            },
            logs
        };
    } catch (e) {
        console.error('Failed to load dashboard data:', e);
        return {
            stats: { currentlyIn: 0, availableSlots: 50, visitsToday: 0 },
            logs: []
        };
    }
};
