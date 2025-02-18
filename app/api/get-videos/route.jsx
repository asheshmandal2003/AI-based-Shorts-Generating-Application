import { db } from "@/config/db";
import { Video } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
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

    return NextResponse.json({ result: videos }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
