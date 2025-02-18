import RemotionVideo from "@/app/dashboard/_components/RemotionVideo";
import { Composition } from "remotion";

function Root() {
  return (
    <Composition
      id="Empty"
      component={RemotionVideo}
      durationInFrames={60}
      fps={30}
      width={1280}
      height={720}
    />
  );
}

export default Root;
