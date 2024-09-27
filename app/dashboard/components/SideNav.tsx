import React from "react";
import NavLinks from "./NavLinks";
import { cn } from "@/lib/utils";
import ModeToggle from "../todo/components/ToggleDarkMode";
import SignOut from "./SignOut";

export default function SideNav() {
  return <SideBar className=" hidden lg:block dark:bg-graident-dark flex-1" />;
}

export const SideBar = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div
        className={cn(
          "h-full w-full lg:w-96 lg:p-10 space-y-5 lg:border-r flex flex-col fixed top-0 bg-white dark:bg-gray-900" // Pastikan background color diatur
        )}
      >
        <div className="flex-1 space-y-5">
          <div className="flex items-center gap-2 flex-1">
            <h1 className="text-3xl font-bold">Daily Todo</h1>

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
          "h-full w-full lg:w-96 lg:p-10 space-y-5 lg:border-r flex flex-col" // Pastikan background color diatur
        )}
      ></div>
    </div>
  );
};