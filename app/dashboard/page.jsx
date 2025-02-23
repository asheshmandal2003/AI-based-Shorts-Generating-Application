"use client";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import EmptyList from "./_components/EmptyList";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import VideoList from "./_components/VideoList";

function Dashboard() {
  const [videos, setVideos] = useState(() => []);
  const { user } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/get-videos", {
          params: {
            email: user.emailAddresses[0].emailAddress,
          },
        });
        setVideos(response.data.result);
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while fetching videos",
          variant: "destructive",
        });
      }
    };

    fetchVideos();

    return () => {
      abortController.abort();
    };
  }, [user]);

  return (
    <div>
      <div className="flex justify-between items-center mb-5 mt-5">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <Link href="/dashboard/create">
          <Button variant="secondary">
            <CirclePlus />
            Create
          </Button>
        </Link>
      </div>
      {videos.length === 0 ? <EmptyList /> : <VideoList videos={videos} />}
    </div>
  );
}

export default Dashboard;
