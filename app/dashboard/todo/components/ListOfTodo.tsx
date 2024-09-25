import React from "react";
import EditTodo from "./EditTodo";
import { cn } from "@/lib/utils";
import { readTodos } from "../actions";
import DeleteTodo from "./DeleteTodo";

export default async function ListOfTodo() {
  const { data: todos } = await readTodos();

  return (
    <div className="dark:bg-inherit bg-white mx-2 rounded-sm">
      {Array.isArray(todos) &&
        todos.map((todo: any, index: number) => {
          return (
            <div
              className=" grid grid-cols-5  rounded-sm  p-3 align-middle font-normal "
              key={index}
            >
              <h1 className="flex items-center dark:text-white text-lg break-words whitespace-normal pr-2">
                {todo.title}
              </h1>

              <div className="flex items-center">
                <div>
                  <span
                    className={cn(
                      "  dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
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
    </div>
  );
}
