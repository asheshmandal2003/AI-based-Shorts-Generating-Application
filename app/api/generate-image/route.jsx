import Replicate from "replicate";
import { NextResponse } from "next/server";
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require("../../../config/firebase/firebaseConfig");

const replicate = new Replicate({
  authToken: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const input = {
      prompt,
      height: 1280,
      width: 1024,
      num_outputs: 1,
    };

    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      { input }
    );

    if (!output || !output[0]) {
      throw new Error("No output generated from the model");
    }

    // Handle the ReadableStream
    const stream = output[0];
    const reader = stream.getReader();
    const chunks = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    // Convert the chunks to a Uint8Array
    const imageBuffer = new Uint8Array(
      chunks.reduce((acc, chunk) => [...acc, ...chunk], [])
    );

    const blob = new Blob([imageBuffer], { type: "image/png" });

    const storageRef = ref(storage, `short-videos/${Date.now()}.png`);
    await uploadBytes(storageRef, blob);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);

    return NextResponse.json({ result: downloadURL }, { status: 200 });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
