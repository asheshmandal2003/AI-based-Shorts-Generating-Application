import Replicate from "replicate";
import { NextResponse } from "next/server";
import { redis } from "@/config/redis";
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

    const cachedImage = await redis.get(prompt);
    if (cachedImage) {
      return NextResponse.json({ result: cachedImage }, { status: 200 });
    }

    const input = {
      prompt,
      height: 1024,
      width: 768,
      num_outputs: 1,
    };

    // Generate the image using Replicate
    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      { input }
    );

    if (!output || !output[0]) {
      throw new Error("No output generated from the model");
    }

    // Fetch the image from the URL provided by Replicate
    const imageUrl = output[0];
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    // Convert the image to a buffer
    const imageBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(imageBuffer);

    // Upload the image to Firebase Storage
    const storageRef = ref(storage, `short-videos/${Date.now()}.png`);
    await uploadBytes(storageRef, uint8Array, { contentType: "image/png" });

    // Get the download URL from Firebase
    const downloadURL = await getDownloadURL(storageRef);

    await redis.set(prompt, downloadURL, "EX", 86400);

    return NextResponse.json({ result: downloadURL }, { status: 201 });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
