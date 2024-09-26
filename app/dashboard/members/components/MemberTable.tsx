import React from "react";
import ListOfMembers from "./ListOfMembers";
import Table from "@/components/ui/Table";

export default function MemberTable({
  permissions,
  isAdmin,
  query,
}: {
  permissions: any[];
  isAdmin: boolean;
  query: boolean;
}) {
  const tableHeader = ["Name", "Role", "Joined", "Status"];

  return (
    <Table headers={tableHeader}>
      <ListOfMembers
        isAdmin={isAdmin}
        permissions={permissions}
        query={query}
      />
    </Table>
  );
}
