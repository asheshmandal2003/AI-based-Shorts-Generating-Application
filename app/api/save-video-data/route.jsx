import { db } from "@/config/db";
import { redis } from "@/config/redis";
import { Video } from "@/config/schema";
import { NextResponse } from "next/server";

async function saveVideoToDB(videoData) {
  const validVideoData = {
    audioURL: videoData.audioURL,
    captions: videoData.captions,
    images: videoData.images,
    author: videoData.author,
  };
  await db.insert(Video).values(validVideoData);
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

    await saveVideoToDB(videoData);

    await updateRedisCache(videoData.author, videoData);

    return NextResponse.json({ message: "Video Data Saved" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
