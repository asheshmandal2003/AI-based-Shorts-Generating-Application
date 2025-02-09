import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="hidden md:block relative">
        <Image
          src="/login_thumb.jpg"
          alt="Register Image"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 text-white p-8">
          <h1 className="text-5xl text-pretty font-extrabold mb-4 drop-shadow-lg">
            ShortsBot
          </h1>
          <p className="text-center text-pretty font-bold drop-shadow-sm">
            Your AI-powered video generation assistant.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center p-4">
        <SignUp />
      </div>
    </div>
  );
}
