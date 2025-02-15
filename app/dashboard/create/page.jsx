"use client";
import SelectContentType from "./_components/SelectContentType";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { useContext, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";

function Create() {
  const [values, setValues] = useState({
    topic: "",
    style: "",
    duration: "",
  });
  const [loading, setLoading] = useState(() => false);
  const { videoData, setVideoData } = useContext(VideoDataContext);

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
        const script = res.data.response;
        setVideoData((prevData) => ({ ...prevData, videoScript: script }));
        await generateAudio(script);
        await generateImage(script);
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
        setVideoData((prevData) => ({
          ...prevData,
          audio: res.data.message,
        }));
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
        setVideoData((prevData) => ({
          ...prevData,
          captions: res.data.result,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const generateImage = async (script) => {
    let images = [];
    script.forEach(async (scene) => {
      await axios
        .post("/api/generate-image", {
          prompt: scene?.image_prompt,
        })
        .then((res) => {
          images.push(res.data.result);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setVideoData((prevData) => ({
            ...prevData,
            images: images,
          }));
        });
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
