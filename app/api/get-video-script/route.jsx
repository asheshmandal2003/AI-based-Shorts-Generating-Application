import { chatSession } from "@/config/model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing prompt." },
        { status: 400 }
      );
    }

    const result = await chatSession.sendMessage(prompt);

    return NextResponse.json(
      { response: JSON.parse(result.response.text()) },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
