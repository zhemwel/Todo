"use client";
import React from "react";
import { PersonIcon, CrumpledPaperIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    {
      href: "/dashboard/members",
      text: "Members",
      Icon: PersonIcon,
    },
    {
      href: "/dashboard/todo",
      text: "Todo",
      Icon: CrumpledPaperIcon,
    },
  ];

  return (
    <div className="space-y-5">
      {links.map((link, index) => {
        const Icon = link.Icon;
        return (
          <Link
            onClick={() => document.getElementById("sidebar-close")?.click()}
            href={link.href}
            key={index}
            className={cn("flex items-center gap-2 rounded-sm p-2", {
              // Adding padding-right when active, with default padding for the rest of the component
              "bg-green-500 dark:bg-green-700 text-white mr-10":
                pathname === link.href,
              "hover:bg-green-700 mr-10": pathname !== link.href, // For hover effect on inactive links
            })}
            style={{
              paddingRight: pathname === link.href ? "10px" : "0px",
            }} // Ensure padding is applied dynamically
          >
            <Icon />
            {link.text}
          </Link>
        );
      })}
    </div>
  );
}
