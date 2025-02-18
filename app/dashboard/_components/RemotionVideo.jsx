import { useEffect, useMemo } from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  useVideoConfig,
  Audio,
  useCurrentFrame,
  interpolate,
} from "remotion";

function RemotionVideo({ audioURL, captions, images, setDuration }) {
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
      {images?.map((img, idx) => {
        const start = (idx * duration) / images.length;
        const scale = (idx) =>
          interpolate(
            frame,
            [start, (start + duration) / 2, start + duration],
            idx % 2 == 0 ? [1, 1.3, 1] : [1.3, 1, 1.3],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

        return (
          <Sequence key={idx} from={start} durationInFrames={duration}>
            <Img
              src={img}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${scale(idx)})`,
              }}
            />
            <AbsoluteFill className="flex flex-col justify-end">
              <p className="max-w-fit bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded-md mb-3 mx-2 transition-all duration-500">
                {currentCaption}
              </p>
            </AbsoluteFill>
          </Sequence>
        );
      })}
      <Audio src={audioURL} />
    </AbsoluteFill>
  );
}

export default RemotionVideo;
