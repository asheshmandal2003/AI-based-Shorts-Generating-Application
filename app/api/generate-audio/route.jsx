const { NextResponse } = require("next/server");
import { client } from "../../../config/audioConfig";
const fs = require("fs");
const util = require("util");

export async function POST(req) {
  try {
    const { id, text } = await req.json();

    if (!text)
      return NextResponse.json({ error: "No text provided!" }, { status: 400 });

    const request = {
      input: { text: text },
      // Select the language and SSML voice gender (optional)
      voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
      // select the type of audio encoding
      audioConfig: { audioEncoding: "MP3" },
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile("output.mp3", response.audioContent, "binary");
    console.log("Audio content written to file: output.mp3");

    return NextResponse.json(
      { message: "Audio file generated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
