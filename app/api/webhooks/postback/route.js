import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// Initialize Redis client using the default keys Vercel automatically injects when you attach an Upstash DB
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

// Example Postback URL:
// https://yourdomain.com/api/webhooks/postback?s1={user_email}&status=1&payout=2.50
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // 's1' is commonly used by CPA networks (CPABuild, OGAds) as the sub ID passing the user identifier
  const userEmail = searchParams.get("s1");
  const status = searchParams.get("status"); // Optional: check if network explicitly sent success status
  const payoutStr = searchParams.get("payout");
  const payout = payoutStr ? parseFloat(payoutStr) : 0;
  const offerName = searchParams.get("offer_name") || searchParams.get("offer_id") || "Offer";

  if (!userEmail) {
    return NextResponse.json(
      { error: "No s1 (email) parameter provided" },
      { status: 400 },
    );
  }

  // Mark the user as successfully verified in Redis with a 24-hour expiration
  await redis.set(`verified:${userEmail}`, true, { ex: 86400 });

  // Sync with Admin Dashboard profile object
  let profile = await redis.get(`profile:${userEmail}`);
  if (profile) {
    if (typeof profile === "string") profile = JSON.parse(profile);
    profile.verified = true;
    profile.verifiedAt = Date.now();
    profile.payout = payout;
    profile.completedOffer = offerName;
    await redis.set(`profile:${userEmail}`, JSON.stringify(profile), { ex: 604800 });
  }

  // Track global revenue
  if (payout > 0) {
    await redis.incrbyfloat("revenue:total", payout);
  }

  console.log("✅ Postback received! Unlocked user: " + userEmail);

  // CPA networks require a 200 OK text response to know it was received successfully
  return new NextResponse("OK", { status: 200 });
}

export async function POST(request) {
  // some networks use POST
  try {
    const body = await request.json();
    const userEmail = body.s1 || body.sub_id;
    const payoutStr = body.payout;
    const payout = payoutStr ? parseFloat(payoutStr) : 0;
    const offerName = body.offer_name || body.offer_id || "Offer";

    if (!userEmail) {
      return NextResponse.json(
        { error: "No user ID provided" },
        { status: 400 },
      );
    }

    await redis.set(`verified:${userEmail}`, true, { ex: 86400 });

    let profile = await redis.get(`profile:${userEmail}`);
    if (profile) {
      if (typeof profile === "string") profile = JSON.parse(profile);
      profile.verified = true;
      profile.verifiedAt = Date.now();
      profile.payout = payout;
      profile.completedOffer = offerName;
      await redis.set(`profile:${userEmail}`, JSON.stringify(profile), { ex: 604800 });
    }

    if (payout > 0) {
      await redis.incrbyfloat("revenue:total", payout);
    }

    console.log("✅ Postback received! Unlocked user: " + userEmail);

    return new NextResponse("OK", { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
