import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// Initialize Redis client
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

export async function POST(request) {
    try {
        const body = await request.json();
        const { fname, lname, email, country, timestamp } = body;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // 1. Create a full user profile object to power dashboard metrics
        const userProfile = {
            fname: fname || "Anonymous",
            lname: lname || "User",
            email: email.toLowerCase(),
            country: country || "Unknown",
            verified: false,
            timestamp: timestamp || Date.now(),
        };

        // 2. Save the user document directly (expires in 7 days to keep database clean)
        // Key format: profile:user@email.com
        await redis.set(`profile:${userProfile.email}`, JSON.stringify(userProfile), { ex: 604800 });

        // 3. Add the email to a sorted set index, scored by timestamp
        // This allows the dashboard to instantly fetch the most recent signups
        // Key format: users:index
        await redis.zadd("users:index", { score: userProfile.timestamp, member: userProfile.email });

        return NextResponse.json({ success: true, profile: userProfile }, { status: 200 });
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
    }
}
