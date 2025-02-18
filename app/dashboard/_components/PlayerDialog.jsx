import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { VideoDataContext } from "@/app/_context/VideoDataContext";

function PlayerDialog({ play, videoData }) {
  const [open, setOpen] = useState(() => false);
  const [duration, setDuration] = useState(() => 100);
  const { setVideoData } = useContext(VideoDataContext);

  useEffect(() => {
    setOpen(play);
  }, [play]);

  function handleClose() {
    setVideoData({});
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Your short video is live 🚀
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-sm italic">
            Your video is ready to share. Click export to download it to your
            device.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <Player
            component={RemotionVideo}
            durationInFrames={duration}
            compositionWidth={300}
            compositionHeight={450}
            fps={30}
            controls={true}
            inputProps={{
              ...videoData,
              setDuration: setDuration,
            }}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            <X /> Close
          </Button>
          <Button>
            <Download /> Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;
