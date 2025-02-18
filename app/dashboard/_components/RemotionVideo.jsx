import { useEffect, useMemo } from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  useVideoConfig,
  Audio,
  useCurrentFrame,
} from "remotion";

function RemotionVideo({
  videoScript,
  audioURL,
  captions,
  images,
  setDuration,
}) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const duration = useMemo(() => {
    return Number(
      ((captions[captions.length - 1]?.end / 1000) * fps).toFixed(0)
    );
  }, [captions, fps]);

  useEffect(() => {
    setDuration(duration);
  }, [duration, setDuration]);

  const currentCaption = useMemo(() => {
    const currentTime = (frame / fps) * 1000;
    const visibleCaptions = captions.filter((caption) => {
      return caption.start <= currentTime && caption.end >= currentTime - 2000;
    });
    return visibleCaptions.map((caption) => caption.text).join(" ");
  }, [frame, fps, captions]);

  return (
    <AbsoluteFill className="bg-black rounded-md">
      {images?.map((img, idx) => (
        <Sequence
          key={idx}
          from={(idx * duration) / images.length}
          durationInFrames={duration}
        >
          <Img
            src={img}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <AbsoluteFill className="flex flex-col justify-end">
            <p className="max-w-fit bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded-md mb-3 mx-2 transition-all duration-500">
              {currentCaption}
            </p>
          </AbsoluteFill>
        </Sequence>
      ))}
      <Audio src={audioURL} />
    </AbsoluteFill>
  );
}

export default RemotionVideo;
