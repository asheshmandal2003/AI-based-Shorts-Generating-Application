import { Button } from "@/components/ui/button";
import { MicVocal, MoveRight, ScrollText, Video } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black opacity-100">
        <div className="absolute inset-0 bg-[url('/dashed-lines.svg')] opacity-20"></div>
      </div>

      {/* Hero Section */}
      <section className="relative text-center max-w-4xl py-32 z-10">
        <h1 className="text-5xl font-bold mb-10 bg-gradient-to-br from-gray-400 to-gray-100 bg-clip-text text-transparent">
          Create AI-Generated Shorts in Seconds
        </h1>
        <p className="text-lg text-gray-600 mb-10 px-0 md:px-36">
          Boost your social media presence with AI-generated shorts that
          captivate viewers. Turn your ideas into viral content effortlessly.
        </p>
        <Link href="/dashboard">
          <Button
            size="lg"
            className="bg-transparent border border-gray-200 hover:bg-gray-200 hover:text-black transition ease-in-out duration-300"
            aria-label="Try ShortsBot"
          >
            Try ShortsBot
            <MoveRight className="ml-2" />
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl text-center relative z-10">
        <div className="p-6 bg-gray-900 rounded-xl hover:bg-gray-800 transition duration-300 border border-gray-800">
          <div className="flex justify-center gap-2 mb-2">
            <ScrollText />
            <h3 className="text-xl font-semibold">AI-Powered Scripting</h3>
          </div>
          <p className="text-gray-400">
            Generate engaging video scripts instantly.
          </p>
        </div>
        <div className="p-6 bg-gray-900 rounded-xl hover:bg-gray-800 transition duration-300 border border-gray-800">
          <div className="flex justify-center gap-2 mb-2">
            <MicVocal />
            <h3 className="text-xl font-semibold">Auto Voiceover</h3>
          </div>
          <p className="text-gray-400">
            Convert text into realistic AI voiceovers.
          </p>
        </div>
        <div className="p-6 bg-gray-900 rounded-xl hover:bg-gray-800 transition duration-300 border border-gray-800">
          <div className="flex justify-center gap-2 mb-2">
            <Video />
            <h3 className="text-xl font-semibold">Dynamic Video Creation</h3>
          </div>
          <p className="text-gray-400">
            Merge visuals and audio to generate stunning videos.
          </p>
        </div>
      </section>

      {/* Demo Section */}
      <section className="mt-16 text-center max-w-3xl relative z-10">
        <h2 className="text-3xl font-bold mb-4">See ShortsBot in Action</h2>
        <p className="text-gray-300 mb-6">
          Experience how AI automates video generation.
        </p>
        <div className="w-full max-w-xl h-72 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
          <span className="text-gray-400">Demo Video Placeholder</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 mb-8 text-gray-500 text-sm text-center relative z-10">
        <p className="mb-2">&copy; 2025 ShortsBot. All rights reserved.</p>
        <p>
          Built with ❤️ by{" "}
          <a
            href="https://www.linkedin.com/in/ashesh-mandal/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200"
          >
            Ashesh
          </a>
        </p>
      </footer>
    </main>
  );
}
