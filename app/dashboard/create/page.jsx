"use client";
import SelectContentType from "./_components/SelectContentType";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import PlayerDialog from "../_components/PlayerDialog";
import { CreditsContext } from "@/app/_context/CreditsContext";

function Create() {
  const [values, setValues] = useState({
    topic: "",
    keywords: "",
    style: "",
    duration: 30,
  });

  const [errors, setErrors] = useState({
    topic: "",
    style: "",
  });

  const [loading, setLoading] = useState(() => false);
  const { videoData, setVideoData } = useContext(VideoDataContext);
  const [videoDataStore, setVideoDataStore] = useState(() => {});
  const { toast } = useToast();
  const { user } = useUser();
  const [play, setPlay] = useState(() => false);
  const { setCredits } = useContext(CreditsContext);

  function handleValueChange(fieldName, fieldValue) {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: fieldValue,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  }

  function handleSetVideoData(fieldName, fieldValue) {
    setVideoData((prevData) => {
      const updatedData = {
        ...prevData,
        [fieldName]: fieldValue,
      };
      return updatedData;
    });
  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (values.topic == "Custom") {
      newErrors.topic = "Tell the AI what you want by entering a prompt.";
      isValid = false;
    }

    if (!values.topic.trim() || values.topic.length < 4) {
      newErrors.topic = "Topic is required!";
      isValid = false;
    }

    if (!values.style) {
      newErrors.style = "Style is required!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  function resetForm() {
    setValues({
      topic: "",
      keywords: "",
      style: "",
      duration: 30,
    });
    setErrors({
      topic: "",
      style: "",
    });
  }

  const getVideoScript = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const prompt = `Write a script to generate a ${
      values.duration
    }-second video on the topic: ${values.topic}, focusing on ${
      values.keywords === "" ? "user experience" : values.keywords
    }. The video should have an ${
      values.style
    } style. For each scene, provide an AI image prompt and content text. Return the result in JSON format with the following fields: image_prompt, content_text and timestamp`;

    const { id } = user;

    await axios
      .post(
        "/api/get-video-script",
        {
          prompt,
        },
        {
          params: {
            id,
          },
        }
      )
      .then(async (res) => {
        const script = res.data.response;
        await generateAudio(script);
        await generateImage(script);
      })
      .catch((err) => {
        toast({
          title: "Error Generating Video Script",
          description: err.response.data.error,
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
        resetForm();
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
        handleSetVideoData("audioURL", res.data.message);
        await generateAudioCaption(res.data.message);
      })
      .catch((err) => {
        toast({
          title: "Error Generating Audio",
          description: err.response.data.error,
          variant: "destructive",
        });
        resetForm();
      });
  };

  const generateAudioCaption = async (audioURL) => {
    await axios
      .post("/api/generate-caption", {
        url: audioURL,
      })
      .then((res) => {
        handleSetVideoData("captions", res.data.result);
      })
      .catch((err) => {
        toast({
          title: "Error Generating Audio Caption",
          description: err.response.data.error,
          variant: "destructive",
        });
        resetForm();
      });
  };

  const generateImage = async (script) => {
    const imagePromises = script.map(async (scene) => {
      try {
        const res = await axios.post("/api/generate-image", {
          prompt: scene?.image_prompt,
        });
        return res.data.result;
      } catch (err) {
        toast({
          title: "Error Generating Image",
          description: err.response.data.error,
          variant: "destructive",
        });
        resetForm();
        return null;
      }
    });

    const images = await Promise.all(imagePromises);

    handleSetVideoData("images", images);
    handleSetVideoData("author", user.emailAddresses[0].emailAddress);
  };

  const saveVideoData = async () => {
    setLoading(true);
    try {
      await axios.post("/api/save-video-data", {
        videoData,
      });
      toast({
        title: "Video Data Saved",
        description: "The video data has been saved successfully.",
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "Error Saving Video Data",
        description: "There was an error saving the video data.",
        variant: "destructive",
      });
    }
    setPlay(true);
    setLoading(false);
    setCredits((prevCredits) => prevCredits - 10);
    resetForm();
    setVideoDataStore(videoData);
    setVideoData({});
  };

  useEffect(() => {
    if (videoData && Object.keys(videoData).length === 4) {
      saveVideoData();
    }
  }, [videoData]);

  return (
    <>
      <div>
        <h1 className="font-bold text-2xl mt-5 mb-8">
          Create a New Short Video
        </h1>
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
            {errors.topic && (
              <p className="text-red-500 text-sm mt-2">{errors.topic}</p>
            )}
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
            {errors.style && (
              <p className="text-red-500 text-sm mt-2">{errors.style}</p>
            )}
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
      <PlayerDialog play={play} videoData={videoDataStore} />
    </>
  );
}

export default Create;
