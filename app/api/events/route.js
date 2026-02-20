import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, action, emoji, meta } = body;

        if (!email || !action) {
            return NextResponse.json({ error: "Missing required event fields" }, { status: 400 });
        }

        // 1. Build the Event Object
        const eventObj = {
            email,
            action,
            emoji: emoji || "📌",
            meta: meta || null,
            timestamp: Date.now()
        };

        const eventString = JSON.stringify(eventObj);

        // 2. Push to the overarching Global Live Feed (trim to last 150 events to save memory)
        const pipeline = redis.pipeline();
        pipeline.lpush("events:live", eventString);
        pipeline.ltrim("events:live", 0, 149);

        // 3. (Optional) Also push to a user-specific timeline if we ever build individual profiles later
        pipeline.lpush(`events:${email}`, eventString);
        pipeline.ltrim(`events:${email}`, 0, 49);

        await pipeline.exec();

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Live Event Error:", error);
        // Return 200 anyway so we don't break the frontend UI flow if Vercel tracking fails
        return NextResponse.json({ success: false, error: "Failed to log event" }, { status: 200 });
    }
}
