import React from "react";
import MemberTable from "./components/TodoTable";
import SearchTodo from "./components/SearchTodo";
import CreateTodo from "./components/CreateTodo";
import { readTodos } from "./actions"; // Panggil fungsi fetch di Server Component

export default async function Todo() {
  const { data: todos } = await readTodos(); // Fetch data di Server Component

  // Pastikan todos tidak null, jika null, default ke array kosong
  const safeTodos = todos ?? [];

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Todo</h1>
      <div className="flex gap-2">
        <SearchTodo />
        <CreateTodo />
      </div>
      <MemberTable todos={safeTodos} />{" "}
      {/* Kirim data yang sudah aman ke komponen Client */}
    </div>
  );
}
