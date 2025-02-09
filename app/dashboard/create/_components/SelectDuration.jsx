import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const durationOptions = [
  {
    id: 1,
    name: "30 sec",
    value: 30,
  },
  {
    id: 2,
    name: "45 sec",
    value: 45,
  },
  {
    id: 3,
    name: "60 sec",
    value: 60,
  },
];

function SelectDuration({ handleValueChange }) {
  const [duration, setDuration] = useState(() => 30);
  return (
    <div className="flex items-center space-x-4 text-sm">
      {durationOptions.map((option) => (
        <div
          key={option.id}
          className={`border border-gray-300 px-4 py-2 rounded-md cursor-pointer transition-all hover:bg-black hover:text-white ${
            duration === option.value ? "bg-black text-white" : ""
          }`}
          onClick={() => {
            setDuration(option.value);
            handleValueChange("duration", option.value);
          }}
        >
          {option.name}
        </div>
      ))}
    </div>
  );
}

export default SelectDuration;
