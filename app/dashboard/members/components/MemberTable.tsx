import { Button } from "@/components/ui/button";
import React from "react";
import ListOfMembers from "./ListOfMembers";
import Table from "@/components/ui/Table";

export default function MemberTable({
  searchQuery,
  isAdmin,
}: {
  searchQuery: string;
  isAdmin: boolean;
}) {
  const tableHeader = ["Name", "Role", "Joined", "Status"];

  return (
    <Table headers={tableHeader}>
      <ListOfMembers searchQuery={searchQuery} isAdmin={isAdmin} />
    </Table>
  );
}
