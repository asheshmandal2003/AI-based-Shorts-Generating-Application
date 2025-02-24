import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { CirclePlay } from "lucide-react";
import { useState } from "react";
import PlayerDialog from "./PlayerDialog";

function VideoList({ videos }) {
  const [playingVideoId, setPlayingVideoId] = useState(null);

  function handlePlay(id) {
    setPlayingVideoId(id);
  }

  function handleClose() {
    setPlayingVideoId(null);
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 justify-items-center">
      {videos.map((video, idx) => (
        <div key={idx} className="relative rounded-lg overflow-hidden">
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={250}
            compositionHeight={400}
            frameToDisplay={30}
            durationInFrames={1}
            fps={15}
            inputProps={{
              ...video,
              setDuration: () => null,
            }}
            className="rounded-lg cursor-pointer w-full h-auto"
            onClick={() => handlePlay(video.id)}
          />
          <div
            onClick={() => handlePlay(video.id)}
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 cursor-pointer hover:opacity-100 transition-opacity duration-500 rounded-lg"
          >
            <CirclePlay className="text-white w-12 h-12" />
          </div>
          {playingVideoId === video.id && (
            <PlayerDialog play={true} onClose={handleClose} videoData={video} />
          )}
        </div>
      ))}
    </div>
  );
}

export default VideoList;
