"use client";
import React, { useEffect, useState } from "react";
import MemberTable from "./components/MemberTable";
import SearchMembers from "./components/SearchMembers";
import CreateMember from "./components/create/CreateMember";

export default function Members({
  permissions,
  isAdmin,
}: {
  permissions: any[];
  isAdmin: boolean;
}) {
  const [filteredPermissions, setFilteredPermissions] = useState(permissions);
  const [query, setQuery] = useState("");
  const [change, setChange] = useState(false);

  // Function to handle search logic
  const handleSearch = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    if (query.length >= 4) {
      const searchResults = permissions.filter(
        (permission) =>
          permission.member.name.toLowerCase().includes(query.toLowerCase()) ||
          permission.role.toLowerCase().includes(query.toLowerCase()) ||
          permission.status.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPermissions(searchResults);
      setChange(true);
    } else {
      setFilteredPermissions(permissions); // Reset to original todos if query is less than 4 characters
      setChange(false);
    }
  }, [query, permissions]);

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Members</h1>
      <div className="flex gap-2 mb-5">
        {isAdmin && (
          <>
            <SearchMembers onSearch={handleSearch} />
            <CreateMember />
          </>
        )}
      </div>
      <MemberTable
        permissions={filteredPermissions}
        isAdmin={isAdmin}
        query={change}
      />
    </div>
  );
}
