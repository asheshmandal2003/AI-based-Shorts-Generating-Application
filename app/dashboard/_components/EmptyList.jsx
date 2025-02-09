import { Button } from "@/components/ui/button";
import { Clapperboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function EmptyList() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <Image src="/emptylist.svg" alt="Empty" width={350} height={350} />
      <p className="font-bold text-xl">
        No shorts available. Let AI create stunning videos for you!
      </p>
      <Link href="/dashboard/create">
        <Button variant="secondary">
          <Clapperboard />
          Generate with AI
        </Button>
      </Link>
    </div>
  );
}

export default EmptyList;
