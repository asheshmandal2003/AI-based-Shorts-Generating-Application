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
    keywords: [],
  },
  {
    id: 2,
    name: "Aesthetic",
    keywords: ["visual", "artistic", "beautiful", "design", "style"],
  },
  {
    id: 3,
    name: "Motivational",
    keywords: [
      "inspirational",
      "encouraging",
      "uplifting",
      "positive",
      "success",
    ],
  },
  {
    id: 4,
    name: "Nature",
    keywords: ["outdoors", "landscape", "wildlife", "environment", "natural"],
  },
  {
    id: 5,
    name: "Funny",
    keywords: ["humorous", "comedic", "hilarious", "amusing", "joke"],
  },
  {
    id: 6,
    name: "Happy",
    keywords: ["joyful", "cheerful", "positive", "content", "upbeat"],
  },
  {
    id: 7,
    name: "Love",
    keywords: [
      "romantic",
      "affectionate",
      "passionate",
      "caring",
      "relationship",
    ],
  },
  {
    id: 8,
    name: "Sad",
    keywords: ["unhappy", "melancholy", "depressed", "sorrowful", "grief"],
  },
  {
    id: 9,
    name: "Scary",
    keywords: ["frightening", "spooky", "terrifying", "horror", "chilling"],
  },
  {
    id: 10,
    name: "Travel",
    keywords: ["tourism", "vacation", "journey", "adventure", "explore"],
  },
  {
    id: 11,
    name: "Educational",
    keywords: [
      "informative",
      "learning",
      "knowledge",
      "instructional",
      "academic",
    ],
  },
  {
    id: 12,
    name: "Product Review",
    keywords: [
      "assessment",
      "evaluation",
      "critique",
      "feedback",
      "recommendation",
    ],
  },
  {
    id: 13,
    name: "News",
    keywords: [
      "current events",
      "headlines",
      "updates",
      "information",
      "reporting",
    ],
  },
  {
    id: 14,
    name: "Recipe",
    keywords: ["cooking", "food", "cuisine", "dish", "culinary"],
  },
  {
    id: 15,
    name: "Do It Yourself",
    keywords: ["crafts", "projects", "handmade", "tutorials", "instructions"],
  },
];

function SelectContentType({ handleValueChange }) {
  const [selectedContentType, setSelectedContentType] = useState(() => null);

  return (
    <div>
      <Select
        onValueChange={(value) => {
          setSelectedContentType(value);
          handleValueChange("topic", value);
          handleValueChange(
            "keywords",
            contentTypes.find((c) => c.name === value).keywords.join(", ")
          );
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="<---- Select a content type ---->" />
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
          placeholder="Type your custom content here (Please provide at least 4 keywords)"
          className="mt-4"
          onChange={(e) => {
            handleValueChange("topic", e.target.value);
          }}
        />
      )}
    </div>
  );
}

export default SelectContentType;
