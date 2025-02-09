"use client";
import Image from "next/image";
import { useState } from "react";

const styleOptions = [
  {
    id: 1,
    name: "Realistic",
    image: "/real.jpeg",
  },
  {
    id: 2,
    name: "Cartoon",
    image: "/cartoon.jpeg",
  },
  {
    id: 3,
    name: "Anime",
    image: "/anime.jpeg",
  },
  {
    id: 4,
    name: "Pixel Art",
    image: "/pixel.jpeg",
  },
  {
    id: 5,
    name: "Abstract",
    image: "/abstract.jpeg",
  },
  {
    id: 6,
    name: "Surreal",
    image: "/surreal.jpeg",
  },
  {
    id: 7,
    name: "Minimalist",
    image: "/minimalist.jpeg",
  },
  {
    id: 8,
    name: "3D",
    image: "/3d.jpeg",
  },
  {
    id: 9,
    name: "2D",
    image: "/2d.jpeg",
  },
  {
    id: 10,
    name: "Line Art",
    image: "/lineart.jpeg",
  },
];

function SelectStyle({ handleValueChange }) {
  const [selectedStyle, setSelectedStyle] = useState(() => null);
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {styleOptions.map((style) => (
          <div
            key={style.id}
            className="flex flex-col items-center"
            onClick={() => {
              setSelectedStyle(style);
              handleValueChange("style", style.name);
            }}
          >
            <div
              className={`relative w-full h-48 overflow-hidden rounded-lg flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all ${
                selectedStyle?.id === style.id ? "border border-gray-300" : ""
              }`}
            >
              <Image
                src={style.image}
                alt={style.name}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm mt-2">{style.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectStyle;
