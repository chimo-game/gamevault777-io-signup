import { NextResponse } from 'next/server';
import { fakeDatabase } from '../../../lib/db';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: 'Missing email parameter' }, { status: 400 });
    }

    // Check the fake in-memory database
    // In a real app, query your database/Redis for this user's locker status
    const isCompleted = fakeDatabase.get(email) === true;

    return NextResponse.json({
        completed: isCompleted,
        message: isCompleted ? 'Offer completed!' : 'Waiting for completion...'
    });
}
