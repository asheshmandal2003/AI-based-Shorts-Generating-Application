"use client";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import EmptyList from "./_components/EmptyList";
import Link from "next/link";

function Dashboard() {
  const [videos, setVideos] = useState(() => []);
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <Link href="/dashboard/create">
          <Button variant="secondary">
            <CirclePlus />
            Create
          </Button>
        </Link>
      </div>
      {videos.length === 0 && <EmptyList />}
    </div>
  );
}

export default Dashboard;
