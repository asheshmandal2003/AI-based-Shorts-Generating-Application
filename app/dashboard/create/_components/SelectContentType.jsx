"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const contentTypes = [
  {
    id: 1,
    name: "Custom",
  },
  {
    id: 2,
    name: "Aesthetic",
  },
  {
    id: 3,
    name: "Motivational",
  },
  {
    id: 4,
    name: "Nature",
  },
  {
    id: 5,
    name: "Funny",
  },
  {
    id: 6,
    name: "Happy",
  },
  {
    id: 7,
    name: "Love",
  },
  {
    id: 8,
    name: "Sad",
  },
  {
    id: 9,
    name: "Scary",
  },
  {
    id: 10,
    name: "Travel",
  },
];

function SelectContentType({ handleValueChange }) {
  const [selectedContentType, setSelectedContentType] = useState(() => null);

  return (
    <div>
      <Select
        onValueChange={(value) => {
          setSelectedContentType(value);
          selectedContentType !== "Custom" && handleValueChange("topic", value);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="<--- Select a content type --->" />
        </SelectTrigger>
        <SelectContent>
          {contentTypes.map((contentType) => (
            <SelectItem key={contentType.id} value={contentType.name}>
              {contentType.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedContentType === "Custom" && (
        <Textarea
          placeholder="Type your custom content here"
          className="mt-4"
          onChange={(e) => handleValueChange("topic", e.target.value)}
        />
      )}
    </div>
  );
}

export default SelectContentType;
