import React from "react";
import ListOfTodo from "./ListOfTodo";
import Table from "@/components/ui/Table";
import TablePhone from "@/components/ui/TablePhone";

export default function TodoTable({
  todos,
  query,
}: {
  todos: any[];
  query: boolean;
}) {
  const tableHeader = ["Title", "Status", "Created at", "Created by"];

  const tableHeaderPhone = ["Data"];

  return (
    <div>
      <div className="min-[1011px]:hidden">
        <TablePhone headers={tableHeaderPhone}>
          <ListOfTodo query={query} todos={todos} />
        </TablePhone>
      </div>
      <div className="max-[1011px]:hidden">
        <Table headers={tableHeader}>
          <ListOfTodo query={query} todos={todos} />
        </Table>
      </div>
    </div>
  );
}
