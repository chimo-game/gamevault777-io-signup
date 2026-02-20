import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// Initialize Redis client using the default keys Vercel automatically injects when you attach an Upstash DB
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Missing email parameter" },
      { status: 400 },
    );
  }

  // Check the Redis database for this user's locker status
  const isCompleted = (await redis.get(`verified:${email}`)) === true;

  return NextResponse.json({
    completed: isCompleted,
    message: isCompleted ? "Offer completed!" : "Waiting for completion...",
  });
}
