import React from "react";
import ListOfTodo from "./ListOfTodo";
import Table from "@/components/ui/Table";

export default function TodoTable({
  todos,
  query,
}: {
  todos: any[];
  query: boolean;
}) {
  const tableHeader = ["Title", "Status", "Created at", "Created by"];

  return (
    <Table headers={tableHeader}>
      <ListOfTodo query={query} todos={todos} />
    </Table>
  );
}
