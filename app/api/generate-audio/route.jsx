const { NextResponse } = require("next/server");
import { client } from "../../../config/audioConfig";
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require("../../../config/firebase/firebaseConfig");

export async function POST(req) {
  try {
    const { id, text } = await req.json();

    if (!id)
      return NextResponse.json({ error: "No id provided!" }, { status: 400 });

    if (!text)
      return NextResponse.json({ error: "No text provided!" }, { status: 400 });

    const storageRef = ref(storage, `short-videos/${id}.mp3`);

    const request = {
      input: { text: text },
      // Select the language and SSML voice gender (optional)
      voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
      // select the type of audio encoding
      audioConfig: { audioEncoding: "MP3" },
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);

    const audioBuffer = Buffer.from(response.audioContent, "binary");
    await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });
    const downloadURL = await getDownloadURL(storageRef);

    console.log(downloadURL);

    return NextResponse.json({ message: downloadURL }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
