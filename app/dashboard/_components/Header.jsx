import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { PanelsLeftBottom } from "lucide-react";
import Image from "next/image";

function Header() {
  return (
    <div className="px-6 py-4 flex justify-between items-center bg-white shadow-md">
      <div className="flex justify-center items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={35} height={35} />
        <h1 className="font-bold text-xl">ShortsBot</h1>
      </div>
      <div className="flex justify-center items-center gap-4">
        <Button>
          <PanelsLeftBottom /> Dashboard
        </Button>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
