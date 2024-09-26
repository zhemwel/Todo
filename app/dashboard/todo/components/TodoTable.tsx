import React from "react";
import ListOfTodo from "./ListOfTodo";
import Table from "@/components/ui/Table";

export default function TodoTable({ todos }: { todos: any[] }) {
  const tableHeader = ["Title", "Status", "Created at", "Created by"];

  return (
    <Table headers={tableHeader}>
      <ListOfTodo todos={todos} /> {/* Oper data todos yang sudah aman */}
    </Table>
  );
}
