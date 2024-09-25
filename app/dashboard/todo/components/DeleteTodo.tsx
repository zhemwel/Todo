"use client";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { deleteTodoById } from "../actions";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function DeleteTodo({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(async () => {
      const result = await deleteTodoById(id);
      const { error } = JSON.parse(result);

      if (error?.message) {
        toast({
          title: "Failed to delete",
        });
      } else {
        toast({
          title: "Success delete todo",
        });
      }
    });
  };

  return (
    <form action={onSubmit}>
      <Button variant="outline">
        Delete&nbsp;
        <AiOutlineLoading3Quarters
          className={cn("animate-spin", { hidden: !isPending })}
        />
      </Button>
    </form>
  );
}
