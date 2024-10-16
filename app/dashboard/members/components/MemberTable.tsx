import React from "react";
import ListOfMembers from "./ListOfMembers";
import TablePhone from "@/components/ui/TablePhone";
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
  const tableHeaderPhone = ["Data"];

  return (
    <div>
      <div className="min-[1011px]:hidden">
        <TablePhone headers={tableHeaderPhone}>
          <ListOfMembers
            isAdmin={isAdmin}
            permissions={permissions}
            query={query}
          />
        </TablePhone>
      </div>
      <div className="max-[1011px]:hidden">
        <Table headers={tableHeader}>
          <ListOfMembers
            isAdmin={isAdmin}
            permissions={permissions}
            query={query}
          />
        </Table>
      </div>
    </div>
  );
}
