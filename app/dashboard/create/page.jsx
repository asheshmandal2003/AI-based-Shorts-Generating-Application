"use client";
import SelectContentType from "./_components/SelectContentType";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

function Create() {
  const [values, setValues] = useState({
    topic: "",
    style: "",
    duration: "",
  });
  const [loading, setLoading] = useState(() => false);

  function handleValueChange(fieldName, fieldValue) {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: fieldValue,
    }));
  }

  const getVideoScript = async () => {
    setLoading(true);
    const prompt = `Write a script to generate a ${values.duration}-second video on the topic:  ${values.topic} along with AI image prompt in ${values.style} format for each scene and give the result in JSON format with image_prompt, content_text, and timestamp  as fields",`;

    await axios
      .post("/api/get-video-script", {
        prompt,
      })
      .then(async (res) => {
        await generateAudio(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const generateAudio = async (videoScript) => {
    let audioScript = "";

    videoScript.forEach((scene) => {
      audioScript += scene.content_text + " ";
    });

    await axios
      .post("/api/generate-audio", {
        id: uuid(),
        text: audioScript,
      })
      .then(async (res) => {
        await generateAudioCaption(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const generateAudioCaption = async (audioURL) => {
    await axios
      .post("/api/generate-caption", {
        url: audioURL,
      })
      .then((res) => {
        console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className="font-bold text-2xl mb-8">Create a New Short Video</h1>
      <div className="flex flex-col gap-10 p-6 border border-gray-200 rounded-lg mb-10">
        <div>
          <h2 className="font-semibold text-xl mb-1">
            Content
            <span className="text-red-500">*</span>
          </h2>
          <p className="text-sm text-gray-500 italic mb-4">
            Please select the type of content you need.
          </p>
          <SelectContentType handleValueChange={handleValueChange} />
        </div>

        <div>
          <h2 className="font-semibold text-xl mb-1">
            Style
            <span className="text-red-500">*</span>
          </h2>
          <p className="text-sm text-gray-500 italic mb-4">
            Please select a style for your content.
          </p>
          <SelectStyle handleValueChange={handleValueChange} />
        </div>

        <div>
          <h2 className="font-semibold text-xl mb-1">
            Duration
            <span className="text-red-500">*</span>
          </h2>
          <p className="text-sm text-gray-500 italic mb-4">
            Please select the duration of your content.
          </p>
          <SelectDuration handleValueChange={handleValueChange} />
        </div>

        <Button size="lg" onClick={() => getVideoScript()} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Generating Video
            </>
          ) : (
            <>
              <PlusCircle /> Generate Video
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default Create;
