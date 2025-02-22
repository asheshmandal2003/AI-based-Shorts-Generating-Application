import { CreditsContext } from "@/app/_context/CreditsContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import { Loader, PanelsLeftBottom, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

function Header() {
  const { user, isLoaded } = useUser();
  const { credits, setCredits } = useContext(CreditsContext);
  const { toast } = useToast();
  const [loading, setLoading] = useState(() => true);

  async function fetchCredits() {
    if (!isLoaded || !user) return;

    await axios
      .get("/api/get-credits", {
        params: {
          id: user.id,
        },
      })
      .then((res) => {
        setCredits(res.data.result);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.response.data.error,
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    const abortController = new AbortController();
    fetchCredits();
    return () => {
      abortController.abort();
    };
  }, [isLoaded, user]);

  return (
    <div className="px-6 py-4 flex justify-between items-center bg-white shadow-md">
      <div className="flex justify-center items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={35} height={35} />
        <h1 className="font-bold text-xl">ShortsBot</h1>
      </div>
      <div className="flex justify-center items-center gap-4 ">
        <div className="flex justify-center items-center gap-2 border border-gray-300 rounded-sm px-3 py-1">
          <Star className="text-yellow-400" />
          {loading ? (
            <Loader className="text-gray-400 animate-spin" />
          ) : (
            <p className="font-bold text-yellow-500">{credits}</p>
          )}
        </div>
        <Link href="/dashboard">
          <Button>
            <PanelsLeftBottom /> Dashboard
          </Button>
        </Link>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
