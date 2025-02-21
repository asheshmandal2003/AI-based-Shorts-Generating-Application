"use client";
import { PanelsLeftBottom, SquarePlus, Star, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideNav() {
  const options = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: <PanelsLeftBottom />,
    },
    {
      id: 2,
      name: "Create New",
      path: "/dashboard/create",
      icon: <SquarePlus />,
    },
    {
      id: 3,
      name: "Upgrade",
      path: "/dashboard/upgrade",
      icon: <Star />,
    },
    {
      id: 4,
      name: "Account",
      path: "/dashboard/account",
      icon: <User />,
    },
  ];

  const path = usePathname();
  return (
    <div className="pt-8">
      {options.map((option) => (
        <Link
          key={option.id}
          href={option.path}
          className={`flex items-center p-4 hover:bg-gray-200 ${
            path === option.path ? "bg-gray-200" : ""
          }`}
        >
          {option.icon}
          <span className="ml-2">{option.name}</span>
        </Link>
      ))}
    </div>
  );
}

export default SideNav;
