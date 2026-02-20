import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, offers } = body;

        if (!email || !offers || !offers.length) {
            return NextResponse.json({ error: "Missing tracking data" }, { status: 400 });
        }

        // Retrieve the user's profile
        const profileData = await redis.get(`profile:${email}`);
        if (!profileData) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        let profile = typeof profileData === "string" ? JSON.parse(profileData) : profileData;

        // Attach the displayed offers to their profile so the admin dashboard can see which ones they attempted
        profile.displayedOffers = offers.map(o => ({
            id: o.id || o.offerid,
            name: o.name || o.anchor,
            payout: o.payout || o.epc,
            timestamp: Date.now()
        }));

        await redis.set(`profile:${email}`, JSON.stringify(profile), { ex: 604800 });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Offer Tracking Error:", error);
        return NextResponse.json({ error: "Failed to track offers" }, { status: 500 });
    }
}
