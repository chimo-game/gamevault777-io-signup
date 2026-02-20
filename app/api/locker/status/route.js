import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Initialize Redis client. It automatically picks up UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN from environment variables.
const redis = Redis.fromEnv();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: 'Missing email parameter' }, { status: 400 });
    }

    // Check the Redis database for this user's locker status
    const isCompleted = await redis.get(`verified:${email}`) === true;

    return NextResponse.json({
        completed: isCompleted,
        message: isCompleted ? 'Offer completed!' : 'Waiting for completion...'
    });
}
