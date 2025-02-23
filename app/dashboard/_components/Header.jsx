import { CreditsContext } from "@/app/_context/CreditsContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import { Menu, PanelsLeftBottom } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import Logo from "./Logo";
import Credits from "./Credits";

function Header() {
  const { user, isLoaded } = useUser();
  const { credits, setCredits } = useContext(CreditsContext);
  const { toast } = useToast();
  const [loading, setLoading] = useState(() => true);
  const [open, setOpen] = useState(() => false);

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
    <>
      <div className="px-6 py-4 flex justify-between items-center bg-white shadow-md sticky top-0 z-50">
        <Logo />
        <div className="hidden md:flex justify-center items-center gap-4 ">
          <Credits credits={credits} loading={loading} />
          <Link href="/dashboard">
            <Button>
              <PanelsLeftBottom /> Dashboard
            </Button>
          </Link>
          <UserButton />
        </div>
        <div className="md:hidden">
          <Menu
            className="cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
      </div>
      <SideMenu
        open={open}
        setOpen={setOpen}
        credits={credits}
        loading={loading}
      />
    </>
  );
}

export default Header;
