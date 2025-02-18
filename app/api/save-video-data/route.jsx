import { db } from "@/config/db";
import { Video } from "@/config/schema";
import { NextResponse } from "next/server";

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

    await db.insert(Video).values(videoData);

    return NextResponse.json({ message: "Video Data Saved" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
