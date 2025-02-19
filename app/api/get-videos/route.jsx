import { db } from "@/config/db";
import { Video } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { redis } from "@/config/redis";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function GET(req) {
  try {
    const email = req.nextUrl.searchParams.get("email");

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const cachedVideos = await redis.get(email);

    if (cachedVideos) {
      const videosInJSON = await JSON.parse(cachedVideos);
      return NextResponse.json({ result: videosInJSON }, { status: 200 });
    }

    const videos = await db
      .select({
        id: Video.id,
        audioURL: Video.audioURL,
        captions: Video.captions,
        images: Video.images,
      })
      .from(Video)
      .where(eq(Video.author, email));

    await redis.set(email, JSON.stringify(videos), "EX", 3600);

    return NextResponse.json({ result: videos }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
