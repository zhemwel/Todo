"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export default function SearchMembers({
  onSearch,
}: {
  onSearch: (value: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Input
      placeholder="Search"
      value={searchQuery}
      onChange={handleSearchChange}
      className="ring-zinc-300 bg-white dark:bg-inherit focus:dark:ring-zinc-700  focus:ring-zinc-300"
    />
  );
}
