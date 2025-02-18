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

const script = {
  videoScript: [
    {
      timestamp: "0:00-0:05",
      image_prompt:
        "Cartoon illustration of a clumsy-looking cat wearing oversized glasses trying to read a ridiculously large book titled 'Advanced Napping Techniques'. The cat is sitting in a wobbly stack of pillows that's about to topple over. Bright colors, exaggerated features.",
      content_text:
        "Meet Mittens, our resident expert in… well, almost nothing, except possibly napping.",
    },
    {
      timestamp: "0:05-0:10",
      image_prompt:
        "Cartoon image of Mittens attempting to bake a cake. The kitchen is a disaster: flour everywhere, eggs splattered on the walls, and the cake itself is lopsided and smoking. Mittens looks completely bewildered, holding a whisk covered in batter. Exaggerated expressions, vibrant colors.",
      content_text:
        "Today, Mittens is attempting to bake a cake. Keyword: attempting.",
    },
    {
      timestamp: "0:10-0:15",
      image_prompt:
        "Cartoon scene of Mittens trying to exercise. He's tangled in an exercise band, surrounded by dumbbells he can barely lift, and looking utterly exhausted. A motivational poster on the wall reads 'Go Get 'Em!' but Mittens clearly isn't. Bright colors, humorous poses.",
      content_text: "Next up, exercise! It's going… swimmingly?",
    },
    {
      timestamp: "0:15-0:20",
      image_prompt:
        "Cartoon shot of Mittens trying to assemble a complex piece of furniture (like an IKEA shelf) following confusing instructions. There are extra screws everywhere, the shelf is upside down, and Mittens is scratching his head in frustration. Speech bubble: 'Where does *this* go?'",
      content_text:
        "And now, furniture assembly! Let's just say the instructions are open to interpretation.",
    },
    {
      timestamp: "0:20-0:25",
      image_prompt:
        "Cartoon depiction of Mittens attempting to play a musical instrument, like a violin. He's holding it backwards, making a terrible screeching sound. Birds are flying away in terror. Exaggerated sound effect: 'SCREECH!'",
      content_text:
        "Mittens also fancies himself a musician. The neighbors might disagree.",
    },
    {
      timestamp: "0:25-0:30",
      image_prompt:
        "Cartoon animation of Mittens trying to use a smartphone. He's pressing all the wrong buttons, accidentally taking selfies with his nose, and calling random people. The phone is displaying a series of error messages and confused emojis. Colorful and chaotic.",
      content_text:
        "Technology is also not Mittens' forte. Prepare for accidental butt-dials.",
    },
    {
      timestamp: "0:30-0:35",
      image_prompt:
        "Cartoon image showing Mittens trying to give himself a haircut. Half of his fur is shaved off unevenly, and he's holding the scissors with a look of panic. A mirror shows his ridiculous reflection. Exaggerated expressions, bright lighting.",
      content_text:
        "Desperate times call for desperate measures, like home haircuts... badly.",
    },
    {
      timestamp: "0:35-0:40",
      image_prompt:
        "Cartoon scene of Mittens attempting to paint a portrait of himself. The painting looks nothing like him; it's abstract and bizarre, with splatters of paint everywhere. Mittens proudly presents his 'masterpiece' with a goofy grin. ",
      content_text:
        "And finally, Mittens the artist! Or... something like that.",
    },
    {
      timestamp: "0:40-0:45",
      image_prompt:
        "Cartoon closing shot of Mittens collapsing onto the wobbly stack of pillows from the first scene, finally achieving his true calling: napping. The pillows topple slightly, but he's already snoring contentedly. Text on screen: 'Mittens: Professional Napper'.",
      content_text:
        "But hey, at least he's good at napping! Some cats just have it easy!",
    },
  ],
  audioURL:
    "https://firebasestorage.googleapis.com/v0/b/ashesh-s-projects.firebasestorage.app/o/short-videos%2F91aee3a2-5a68-401a-92d2-d6456287eb4e.mp3?alt=media&token=e9035c6e-3190-4c27-8b5f-3ff2f1d624f8",
  captions: [
    {
      text: "Meet",
      start: 160,
      end: 320,
      confidence: 0.99903,
      speaker: null,
    },
    {
      text: "Mittens,",
      start: 320,
      end: 840,
      confidence: 0.90237,
      speaker: null,
    },
    {
      text: "our",
      start: 920,
      end: 1160,
      confidence: 0.99679,
      speaker: null,
    },
    {
      text: "resident",
      start: 1200,
      end: 1592,
      confidence: 0.99992,
      speaker: null,
    },
    {
      text: "expert",
      start: 1656,
      end: 2024,
      confidence: 0.96406,
      speaker: null,
    },
    {
      text: "in,",
      start: 2072,
      end: 2376,
      confidence: 0.99841,
      speaker: null,
    },
    {
      text: "well,",
      start: 2448,
      end: 2824,
      confidence: 0.99061,
      speaker: null,
    },
    {
      text: "almost",
      start: 2912,
      end: 3304,
      confidence: 0.99925,
      speaker: null,
    },
    {
      text: "nothing.",
      start: 3392,
      end: 3848,
      confidence: 0.89321,
      speaker: null,
    },
    {
      text: "Except",
      start: 3944,
      end: 4344,
      confidence: 0.9227,
      speaker: null,
    },
    {
      text: "possibly",
      start: 4392,
      end: 4824,
      confidence: 0.99956,
      speaker: null,
    },
    {
      text: "napping.",
      start: 4872,
      end: 5736,
      confidence: 0.99979,
      speaker: null,
    },
    {
      text: "Today,",
      start: 5928,
      end: 6424,
      confidence: 0.99902,
      speaker: null,
    },
    {
      text: "Mittens",
      start: 6512,
      end: 7064,
      confidence: 0.52921,
      speaker: null,
    },
    {
      text: "is",
      start: 7112,
      end: 7272,
      confidence: 0.99921,
      speaker: null,
    },
    {
      text: "attempting",
      start: 7296,
      end: 7576,
      confidence: 0.99988,
      speaker: null,
    },
    {
      text: "to",
      start: 7608,
      end: 7704,
      confidence: 0.99988,
      speaker: null,
    },
    {
      text: "bake",
      start: 7712,
      end: 7992,
      confidence: 0.99937,
      speaker: null,
    },
    {
      text: "a",
      start: 8056,
      end: 8232,
      confidence: 0.99941,
      speaker: null,
    },
    {
      text: "cake.",
      start: 8256,
      end: 8860,
      confidence: 0.99731,
      speaker: null,
    },
    {
      text: "Attempting.",
      start: 9600,
      end: 10536,
      confidence: 0.9946,
      speaker: null,
    },
    {
      text: "Next",
      start: 10648,
      end: 10968,
      confidence: 0.81697,
      speaker: null,
    },
    {
      text: "up,",
      start: 11024,
      end: 11336,
      confidence: 0.93941,
      speaker: null,
    },
    {
      text: "exercise.",
      start: 11408,
      end: 12168,
      confidence: 0.99319,
      speaker: null,
    },
    {
      text: "It's",
      start: 12264,
      end: 12616,
      confidence: 0.97955,
      speaker: null,
    },
    {
      text: "going",
      start: 12648,
      end: 12936,
      confidence: 0.98453,
      speaker: null,
    },
    {
      text: "swimmingly.",
      start: 13008,
      end: 13688,
      confidence: 0.4099,
      speaker: null,
    },
    {
      text: "And",
      start: 13784,
      end: 14088,
      confidence: 0.96248,
      speaker: null,
    },
    {
      text: "now,",
      start: 14144,
      end: 14456,
      confidence: 0.98379,
      speaker: null,
    },
    {
      text: "furniture",
      start: 14528,
      end: 14984,
      confidence: 0.82748,
      speaker: null,
    },
    {
      text: "assembly.",
      start: 15032,
      end: 15800,
      confidence: 0.87986,
      speaker: null,
    },
    {
      text: "Let's",
      start: 15960,
      end: 16248,
      confidence: 0.99176,
      speaker: null,
    },
    {
      text: "just",
      start: 16264,
      end: 16392,
      confidence: 0.9995,
      speaker: null,
    },
    {
      text: "say",
      start: 16416,
      end: 16552,
      confidence: 0.99975,
      speaker: null,
    },
    {
      text: "the",
      start: 16576,
      end: 16760,
      confidence: 0.9996,
      speaker: null,
    },
    {
      text: "instructions",
      start: 16800,
      end: 17304,
      confidence: 0.56195,
      speaker: null,
    },
    {
      text: "are",
      start: 17352,
      end: 17512,
      confidence: 0.99986,
      speaker: null,
    },
    {
      text: "open",
      start: 17536,
      end: 17768,
      confidence: 0.99996,
      speaker: null,
    },
    {
      text: "to",
      start: 17824,
      end: 18040,
      confidence: 0.99973,
      speaker: null,
    },
    {
      text: "interpretation.",
      start: 18080,
      end: 19032,
      confidence: 0.99312,
      speaker: null,
    },
    {
      text: "Mittens",
      start: 19176,
      end: 19800,
      confidence: 0.99374,
      speaker: null,
    },
    {
      text: "also",
      start: 19880,
      end: 20120,
      confidence: 0.99947,
      speaker: null,
    },
    {
      text: "fancies",
      start: 20160,
      end: 20584,
      confidence: 0.99912,
      speaker: null,
    },
    {
      text: "himself",
      start: 20632,
      end: 20984,
      confidence: 0.99984,
      speaker: null,
    },
    {
      text: "a",
      start: 21032,
      end: 21192,
      confidence: 0.99974,
      speaker: null,
    },
    {
      text: "musician.",
      start: 21216,
      end: 21928,
      confidence: 0.999,
      speaker: null,
    },
    {
      text: "The",
      start: 22024,
      end: 22232,
      confidence: 0.9966,
      speaker: null,
    },
    {
      text: "neighbors",
      start: 22256,
      end: 22776,
      confidence: 0.479,
      speaker: null,
    },
    {
      text: "might",
      start: 22808,
      end: 23000,
      confidence: 0.99927,
      speaker: null,
    },
    {
      text: "disagree.",
      start: 23040,
      end: 23752,
      confidence: 0.95479,
      speaker: null,
    },
    {
      text: "Technology",
      start: 23896,
      end: 24392,
      confidence: 0.99994,
      speaker: null,
    },
    {
      text: "is",
      start: 24496,
      end: 24712,
      confidence: 0.99839,
      speaker: null,
    },
    {
      text: "also",
      start: 24736,
      end: 24968,
      confidence: 0.99951,
      speaker: null,
    },
    {
      text: "not",
      start: 25024,
      end: 25240,
      confidence: 0.99983,
      speaker: null,
    },
    {
      text: "Mittens",
      start: 25280,
      end: 25752,
      confidence: 0.94833,
      speaker: null,
    },
    {
      text: "forte.",
      start: 25816,
      end: 26484,
      confidence: 0.99416,
      speaker: null,
    },
    {
      text: "Prepare",
      start: 26632,
      end: 27036,
      confidence: 0.99892,
      speaker: null,
    },
    {
      text: "for",
      start: 27068,
      end: 27260,
      confidence: 0.99989,
      speaker: null,
    },
    {
      text: "accidental",
      start: 27300,
      end: 27836,
      confidence: 0.99987,
      speaker: null,
    },
    {
      text: "butt",
      start: 27868,
      end: 28172,
      confidence: 0.72761,
      speaker: null,
    },
    {
      text: "dials.",
      start: 28236,
      end: 28908,
      confidence: 0.99475,
      speaker: null,
    },
    {
      text: "Desperate",
      start: 29004,
      end: 29564,
      confidence: 0.88708,
      speaker: null,
    },
    {
      text: "times",
      start: 29612,
      end: 29868,
      confidence: 0.99999,
      speaker: null,
    },
    {
      text: "call",
      start: 29924,
      end: 30140,
      confidence: 0.9999,
      speaker: null,
    },
    {
      text: "for",
      start: 30180,
      end: 30380,
      confidence: 0.70582,
      speaker: null,
    },
    {
      text: "desperate",
      start: 30420,
      end: 30844,
      confidence: 0.86669,
      speaker: null,
    },
    {
      text: "measures,",
      start: 30892,
      end: 31340,
      confidence: 0.9998,
      speaker: null,
    },
    {
      text: "like",
      start: 31420,
      end: 31660,
      confidence: 0.99112,
      speaker: null,
    },
    {
      text: "home",
      start: 31700,
      end: 31948,
      confidence: 0.99985,
      speaker: null,
    },
    {
      text: "haircuts.",
      start: 32004,
      end: 32748,
      confidence: 0.99776,
      speaker: null,
    },
    {
      text: "Badly.",
      start: 32844,
      end: 33628,
      confidence: 0.84951,
      speaker: null,
    },
    {
      text: "And",
      start: 33804,
      end: 34188,
      confidence: 0.59248,
      speaker: null,
    },
    {
      text: "finally,",
      start: 34244,
      end: 34700,
      confidence: 0.90128,
      speaker: null,
    },
    {
      text: "Mittens",
      start: 34780,
      end: 35292,
      confidence: 0.96642,
      speaker: null,
    },
    {
      text: "the",
      start: 35356,
      end: 35532,
      confidence: 0.99814,
      speaker: null,
    },
    {
      text: "artist.",
      start: 35556,
      end: 36124,
      confidence: 0.99871,
      speaker: null,
    },
    {
      text: "Or",
      start: 36252,
      end: 36828,
      confidence: 0.99789,
      speaker: null,
    },
    {
      text: "something",
      start: 36964,
      end: 37308,
      confidence: 0.99919,
      speaker: null,
    },
    {
      text: "like",
      start: 37364,
      end: 37580,
      confidence: 0.99958,
      speaker: null,
    },
    {
      text: "that.",
      start: 37620,
      end: 38060,
      confidence: 0.99903,
      speaker: null,
    },
    {
      text: "But",
      start: 38180,
      end: 38460,
      confidence: 0.9993,
      speaker: null,
    },
    {
      text: "hey,",
      start: 38500,
      end: 38860,
      confidence: 0.91088,
      speaker: null,
    },
    {
      text: "at",
      start: 38940,
      end: 39132,
      confidence: 0.99987,
      speaker: null,
    },
    {
      text: "least",
      start: 39156,
      end: 39340,
      confidence: 0.9998,
      speaker: null,
    },
    {
      text: "he's",
      start: 39380,
      end: 39596,
      confidence: 0.53096,
      speaker: null,
    },
    {
      text: "good",
      start: 39628,
      end: 39772,
      confidence: 0.99993,
      speaker: null,
    },
    {
      text: "at",
      start: 39796,
      end: 39932,
      confidence: 0.99989,
      speaker: null,
    },
    {
      text: "napping.",
      start: 39956,
      end: 40604,
      confidence: 0.99923,
      speaker: null,
    },
    {
      text: "Some",
      start: 40732,
      end: 41020,
      confidence: 0.99997,
      speaker: null,
    },
    {
      text: "cats",
      start: 41060,
      end: 41420,
      confidence: 0.90952,
      speaker: null,
    },
    {
      text: "just",
      start: 41500,
      end: 41692,
      confidence: 0.99972,
      speaker: null,
    },
    {
      text: "have",
      start: 41716,
      end: 41852,
      confidence: 0.99992,
      speaker: null,
    },
    {
      text: "it",
      start: 41876,
      end: 42012,
      confidence: 0.99993,
      speaker: null,
    },
    {
      text: "easy.",
      start: 42036,
      end: 42220,
      confidence: 0.99953,
      speaker: null,
    },
  ],
  images: [
    "https://firebasestorage.googleapis.com/v0/b/ashesh-s-projects.firebasestorage.app/o/short-videos%2F1739862334334.png?alt=media&token=39aad138-ed6b-4410-b420-eb38ab520cf4",
    "https://firebasestorage.googleapis.com/v0/b/ashesh-s-projects.firebasestorage.app/o/short-videos%2F1739862335442.png?alt=media&token=36557175-bb85-4a8b-a80c-f79a55d658e6",
    "https://firebasestorage.googleapis.com/v0/b/ashesh-s-projects.firebasestorage.app/o/short-videos%2F1739862335864.png?alt=media&token=296484b8-2ee0-4acf-84e0-97c70de6a289",
    "https://firebasestorage.googleapis.com/v0/b/ashesh-s-projects.firebasestorage.app/o/short-videos%2F1739862335378.png?alt=media&token=076e2e2e-7fc5-4566-8f47-5ffb5fedcb8e",
    "https://firebasestorage.googleapis.com/v0/b/ashesh-s-projects.firebasestorage.app/o/short-videos%2F1739862336328.png?alt=media&token=cbe0ff6e-e5e1-454b-afb9-656e7123eb62",
    "https://firebasestorage.googleapis.com/v0/b/ashesh-s-projects.firebasestorage.app/o/short-videos%2F1739862337497.png?alt=media&token=1a967fa2-4654-446c-b8ba-dd4c0ae4ce0b",
    "https://firebasestorage.googleapis.com/v0/b/ashesh-s-projects.firebasestorage.app/o/short-videos%2F1739862342003.png?alt=media&token=5bbb84b1-d545-460c-8e54-2b0c1295fb69",
    "https://firebasestorage.googleapis.com/v0/b/ashesh-s-projects.firebasestorage.app/o/short-videos%2F1739862342223.png?alt=media&token=4983b8a5-a462-4929-93db-2c554e6425ee",
    "https://firebasestorage.googleapis.com/v0/b/ashesh-s-projects.firebasestorage.app/o/short-videos%2F1739862342890.png?alt=media&token=4deb9887-979b-4050-955d-66db9fbd11c5",
  ],
};

function PlayerDialog({ play }) {
  const [open, setOpen] = useState(() => false);
  const [duration, setDuration] = useState(() => 100);
  const { videoData } = useContext(VideoDataContext);

  useEffect(() => {
    setOpen(play);
  }, [play]);

  function handleClose() {
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
              ...script,
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
