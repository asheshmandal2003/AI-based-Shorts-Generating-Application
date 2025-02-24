import { db } from "@/config/db";
import { redis } from "@/config/redis";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const cachedCredits = await redis.get(`credits:${id}`);

    if (cachedCredits) {
      const creditsInJSON = await JSON.parse(cachedCredits);
      return NextResponse.json({ result: creditsInJSON }, { status: 200 });
    }

    const data = await db
      .select({
        credits: Users.credits,
      })
      .from(Users)
      .where(eq(Users.id, id))
      .limit(1);

    const credits = data[0].credits;

    await redis.set(`credits:${id}`, JSON.stringify(credits), "EX", 3600);

    return NextResponse.json({ result: credits }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
