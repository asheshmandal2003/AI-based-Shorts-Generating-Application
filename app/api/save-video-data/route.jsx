import { db } from "@/config/db";
import { redis } from "@/config/redis";
import { Users, Video } from "@/config/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

async function saveVideoToDB(videoData) {
  const validVideoData = {
    audioURL: videoData.audioURL,
    captions: videoData.captions,
    images: videoData.images,
    author: videoData.author,
  };
  const video = await db
    .insert(Video)
    .values(validVideoData)
    .returning({ id: Video.id });
  return video[0].id;
}

async function updateRedisCache(author, videoData) {
  let videos = await redis.get(author);
  if (videos) {
    videos = await JSON.parse(videos);
    videos.push(videoData);
    await redis.set(author, JSON.stringify(videos), "EX", 3600);
  } else {
    await redis.set(author, JSON.stringify([videoData]), "EX", 3600);
  }
}

export async function POST(req) {
  try {
    const { videoData } = await req.json();

    if (
      !videoData ||
      !videoData?.audioURL ||
      !videoData?.captions ||
      !videoData?.images ||
      !videoData?.author
    ) {
      return NextResponse.json(
        { error: "Video Data is required" },
        { status: 400 }
      );
    }

    const id = await saveVideoToDB(videoData);

    await db
      .update(Users)
      .set({
        credits: sql`${Users.credits} - 10`,
      })
      .where(eq(Users.email, videoData.author));

    await updateRedisCache(videoData.author, {
      id,
      audioURL: videoData.audioURL,
      captions: videoData.captions,
      images: videoData.images,
    });

    return NextResponse.json({ message: "Video Data Saved" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
