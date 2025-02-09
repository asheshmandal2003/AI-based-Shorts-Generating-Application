"use client";
import SelectContentType from "./_components/SelectContentType";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

function Create() {
  function handleValueChange(fieldName, fieldValue) {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: fieldValue,
    }));
  }
  return (
    <div>
      <h1 className="font-bold text-2xl mb-8">Create a New Short Video</h1>
      <div className="flex flex-col gap-10 p-6 border border-gray-200 rounded-lg mb-10">
        <div>
          <h2 className="font-semibold text-xl mb-1">
            Content
            <span className="text-red-500">*</span>
          </h2>
          <p className="text-sm text-gray-500 italic mb-4">
            Please select the type of content you need.
          </p>
          <SelectContentType handleValueChange={handleValueChange} />
        </div>

        <div>
          <h2 className="font-semibold text-xl mb-1">
            Style
            <span className="text-red-500">*</span>
          </h2>
          <p className="text-sm text-gray-500 italic mb-4">
            Please select a style for your content.
          </p>
          <SelectStyle handleValueChange={handleValueChange} />
        </div>

        <div>
          <h2 className="font-semibold text-xl mb-1">
            Duration
            <span className="text-red-500">*</span>
          </h2>
          <p className="text-sm text-gray-500 italic mb-4">
            Please select the duration of your content.
          </p>
          <SelectDuration handleValueChange={handleValueChange} />
        </div>

        <Button size="lg">
          <PlusCircle /> Generate Video
        </Button>
      </div>
    </div>
  );
}

export default Create;
