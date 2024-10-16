"use client"; // Ini tetap diperlukan agar bisa menggunakan state
import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import { cn } from "@/lib/utils";
import DeleteTodo from "./DeleteTodo";

export default function ListOfTodo({
  todos,
  query,
}: {
  todos: any[];
  query: boolean;
}) {
  // Pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 15; // Set limit for todos per page

  // Get current todos
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  return (
    <div>
      <div className="dark:bg-inherit bg-white mx-2 rounded-sm min-[1011px]:hidden p-2">
        {Array.isArray(currentTodos) &&
          currentTodos.map((todo: any, index: number) => {
            const todoNumber = indexOfFirstTodo + index + 1; // Menghitung nomor urut global
            return (
              <div
                className={`grid grid-cols-1 rounded-sm p-4 align-middle font-normal bg-gray-100 dark:bg-gray-900 mt-5`}
                key={index}
              >
                <div className="flex flex-col">
                  <strong>No.&nbsp;{`${todoNumber}`}</strong>

                  <div className="text-left mt-2">Title :</div>
                  <strong>{todo.title}</strong>

                  <div className="text-left mt-2">Status :</div>
                  <strong>
                    {!todo.completed ? (
                      <strong className="text-red-500">Not Completed</strong>
                    ) : (
                      <strong className="text-green-500">Done</strong>
                    )}
                  </strong>

                  <div className="text-left mt-2">Tanggal&nbsp;Dibuat:</div>
                  <strong>{new Date(todo.created_at).toDateString()}</strong>

                  <div className="text-left mt-2">Dibuat Oleh:</div>
                  <strong>{todo.member.name}</strong>

                  <div className="flex gap-2 items-center mt-5">
                    <EditTodo todo={todo} />
                    <DeleteTodo id={todo.id} />
                  </div>
                </div>
              </div>
            );
          })}

        {/* Pagination Controls */}
        <div className="flex justify-center my-5 items-center space-x-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-2 bg-gray-500 rounded-md text-white"
          >
            Prev
          </button>
          <span className="dark:text-white">
            Page {currentPage} of {Math.ceil(todos.length / todosPerPage) || 1}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastTodo >= todos.length}
            className="px-3 py-1 mx-2 bg-gray-500 rounded-md text-white"
          >
            Next
          </button>
        </div>
      </div>
      <div className="dark:bg-inherit bg-white mx-2 rounded-sm max-[1010px]:hidden">
        {Array.isArray(currentTodos) &&
          currentTodos.map((todo: any, index: number) => {
            const todoNumber = indexOfFirstTodo + index + 1; // Menghitung nomor urut global
            return (
              <div
                className="grid grid-cols-5 rounded-sm p-3 align-middle font-normal"
                key={index}
              >
                <h1 className="flex items-center dark:text-white text-lg break-words whitespace-normal pr-2">
                  {`${todoNumber}.`}&nbsp;&nbsp;{todo.title}
                </h1>

                <div className="flex items-center">
                  <div>
                    <span
                      className={cn(
                        "dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize border-[.5px] text-sm",
                        {
                          "border-green-500 bg-green-400 dark:text-green-400":
                            todo.completed && "completed",
                        }
                      )}
                    >
                      {todo.completed ? "Done" : "Not Completed"}
                    </span>
                  </div>
                </div>

                <h1 className="flex items-center dark:text-white text-lg">
                  {new Date(todo.created_at).toDateString()}
                </h1>

                <h1 className="flex items-center dark:text-white text-lg">
                  {todo.member.name}
                </h1>

                <div className="flex gap-2 items-center">
                  <EditTodo todo={todo} />
                  <DeleteTodo id={todo.id} />
                </div>
              </div>
            );
          })}

        {/* Pagination Controls */}
        <div className="flex justify-center my-5 items-center space-x-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-2 bg-gray-500 rounded-md text-white"
          >
            Prev
          </button>
          <span className="dark:text-white">
            Page {currentPage} of {Math.ceil(todos.length / todosPerPage) || 1}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastTodo >= todos.length}
            className="px-3 py-1 mx-2 bg-gray-500 rounded-md text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
