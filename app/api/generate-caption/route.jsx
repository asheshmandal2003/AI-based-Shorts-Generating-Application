// Start by making sure the `assemblyai` package is installed.
// If not, you can install it by running the following command:
// npm install assemblyai

import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY,
});

export async function POST(req) {
  try {
    const { url } = await req.json();

    const FILE_URL = url;

    // You can also transcribe a local file by passing in a file path
    // const FILE_URL = './path/to/file.mp3';

    // Request parameters
    const data = {
      audio: FILE_URL,
    };

    const transcript = await client.transcripts.transcribe(data);
    return NextResponse.json({ result: transcript.words }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
