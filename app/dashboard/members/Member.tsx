"use client";
import { useState } from "react";
import MemberTable from "./components/MemberTable";
import SearchMembers from "./components/SearchMembers";
import CreateMember from "./components/create/CreateMember";

export default function Members({ isAdmin }: { isAdmin: boolean }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Members</h1>
      {isAdmin && (
        <div className="flex gap-2">
          <SearchMembers onSearch={setSearchQuery} />
          <CreateMember />
        </div>
      )}

      <MemberTable searchQuery={searchQuery} isAdmin={isAdmin} />
    </div>
  );
}
