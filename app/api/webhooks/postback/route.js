import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

// Example Postback URL:
// https://yourdomain.com/api/webhooks/postback?s1={user_email}&status=1&payout=2.50
export async function GET(request) {
    const { searchParams } = new URL(request.url);

    // 's1' is commonly used by CPA networks (CPABuild, OGAds) as the sub ID passing the user identifier
    const userEmail = searchParams.get('s1');
    const status = searchParams.get('status'); // Optional: check if network explicitly sent success status

    if (!userEmail) {
        return NextResponse.json({ error: 'No s1 (email) parameter provided' }, { status: 400 });
    }

    // Mark the user as successfully verified in Redis with a 24-hour expiration
    await redis.set(`verified:${userEmail}`, true, { ex: 86400 });

    console.log('✅ Postback received! Unlocked user: ' + userEmail);

    // CPA networks require a 200 OK text response to know it was received successfully
    return new NextResponse('OK', { status: 200 });
}

export async function POST(request) {
    // some networks use POST
    try {
        const body = await request.json();
        const userEmail = body.s1 || body.sub_id;

        if (!userEmail) {
            return NextResponse.json({ error: 'No user ID provided' }, { status: 400 });
        }

        await redis.set(`verified:${userEmail}`, true, { ex: 86400 });
        console.log('✅ Postback received! Unlocked user: ' + userEmail);

        return new NextResponse('OK', { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
}
