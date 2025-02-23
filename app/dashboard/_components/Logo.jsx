import Image from "next/image";

function Logo() {
  return (
    <div className="flex justify-center items-center gap-2">
      <Image src="/logo.svg" alt="Logo" width={35} height={35} />
      <h1 className="text-center font-bold text-xl">ShortsBot</h1>
    </div>
  );
}

export default Logo;
