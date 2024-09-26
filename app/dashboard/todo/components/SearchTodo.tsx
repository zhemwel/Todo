"use client"
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";

export default function SearchTodo({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length >= 4) {
      onSearch(query);
    } else if (query.length < 4) {
      onSearch(""); // Reset search when the query is cleared
    }
  }, [query, onSearch]);

  return (
    <Input
      placeholder="Search"
      className="border-zinc-600 focus:border-zinc-600"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
