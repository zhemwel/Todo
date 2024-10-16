import React from "react";
import NavLinks from "./NavLinks";
import { cn } from "@/lib/utils";

import SignOut from "./SignOut";
import ModeToggle from "../todo/components/ToggleDarkMode";

export default function SideNav() {
  return <SideBar className="hidden lg:block dark:bg-gradient-dark flex-1 " />;
}

export const SideBar = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div
        className={cn(
          "h-full w-full lg:w-64 min-[1400px]:w-96 lg:p-2 space-y-5 lg:border-r flex flex-col fixed top-0 bg-white dark:bg-gray-900 "
        )}
      >
        {/* Adding padding to avoid the content from being too close to the top */}
        <div className="flex-1 space-y-5 pt-10 pl-10 lg:pt-0">
          <div className="flex items-center gap-2 flex-1 mt-10">
            <a href="/dashboard" className="cursor-pointer">
              <h1 className="text-3xl font-bold">Zhemwel Todo</h1>
            </a>

            <ModeToggle />
          </div>
          <NavLinks />
        </div>
        <div className="">
          <SignOut />
        </div>
      </div>
      <div
        className={cn(
          "h-full w-full lg:w-64 min-[1400px]:w-96 lg:p-2 space-y-5 lg:border-r flex flex-col" // Pastikan background color diatur
        )}
      ></div>
    </div>
  );
};
