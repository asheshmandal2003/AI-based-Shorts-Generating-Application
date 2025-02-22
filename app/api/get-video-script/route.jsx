import { db } from "@/config/db";
import { chatSession } from "@/config/model";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Invalid id." }, { status: 400 });
    }

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing prompt." },
        { status: 400 }
      );
    }

    const data = await db
      .select({ credits: Users.credits })
      .from(Users)
      .where(eq(Users.id, id));

    if (data.length === 0 || data[0].credits <= 0) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 400 }
      );
    }

    const result = await chatSession.sendMessage(prompt);

    return NextResponse.json(
      { response: JSON.parse(result.response.text()) },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
