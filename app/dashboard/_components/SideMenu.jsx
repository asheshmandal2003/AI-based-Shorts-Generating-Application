import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Logo from "./Logo";
import { options } from "./SideNav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Credits from "./Credits";

function SideMenu({ open, setOpen, credits, loading }) {
  const path = usePathname();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SheetClose />
        </SheetHeader>
        <SheetDescription>
          {options.map((option) => (
            <Link
              key={option.id}
              href={option.path}
              onClick={() => setOpen((prev) => !prev)}
              className={`flex items-center p-4 hover:bg-gray-200 ${
                path === option.path ? "bg-gray-200" : ""
              } rounded-xl`}
            >
              {option.icon}
              <span className="ml-2">{option.name}</span>
            </Link>
          ))}
        </SheetDescription>
        <SheetFooter className="flex flex-row justify-between items-center mt-auto p-4">
          <UserButton />
          <Credits credits={credits} loading={loading} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default SideMenu;
