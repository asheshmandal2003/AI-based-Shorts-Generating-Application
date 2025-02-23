import Image from "next/image";
import Link from "next/link";

function Logo({ className }) {
  return (
    <Link
      href="/"
      className={`flex justify-center items-center gap-2 hover:opacity-80 transition duration-300 ${className}`}
    >
      <Image src="/logo.svg" alt="ShortsBot Logo" width={30} height={30} />
      <h1 className="text-center font-bold text-xl dark:text-white">
        ShortsBot
      </h1>
    </Link>
  );
}

export default Logo;
