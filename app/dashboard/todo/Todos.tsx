"use client";
import React, { useState, useEffect } from "react";
import TodoTable from "./components/TodoTable";
import SearchTodo from "./components/SearchTodo";
import CreateTodo from "./components/CreateTodo";

export default function Todos({ todos }: { todos: any[] }) {
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [query, setQuery] = useState("");
  const [change, setChange] = useState(false);

  // Function to handle search logic
  const handleSearch = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    if (query.length >= 4) {
      const searchResults = todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(query.toLowerCase()) ||
          todo.member.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTodos(searchResults);
      setChange(true)
    } else {
      setFilteredTodos(todos); // Reset to original todos if query is less than 4 characters
      setChange(false);
    }
  }, [query, todos]);

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Todo</h1>
      <div className="flex gap-2">
        <SearchTodo onSearch={handleSearch} />
        <CreateTodo />
      </div>
      <TodoTable todos={filteredTodos} query={change} />
    </div>
  );
}
