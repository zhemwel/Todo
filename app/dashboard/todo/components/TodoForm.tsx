"use client";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { createTodo, updateTodoById } from "../actions";
import { Checkbox } from "@/components/ui/checkbox";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { ITodo } from "@/lib/types";

const FormSchema = z.object({
	title: z.string().min(10, {
		message: "Title must be at least 10 characters.",
	}),
	completed: z.boolean(),
});

export default function TodoForm({ isEdit, todo }: { isEdit: boolean; todo: ITodo }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: isEdit ? todo.title : "",
      completed: isEdit ? todo.completed : false,
    },
  });

  const handleCreateMember = (data: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const result = JSON.parse(await createTodo(data));

      if (result?.error?.message) {
        toast({
          title: "Failed to create todo",
        });
      } else {
        document.getElementById("create-trigger")?.click();

        toast({
          title: "Success create todo",
        });
      }
    });
  };

  const handleUpdateMember = (data: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const result = JSON.parse(await updateTodoById(todo.id, data));

      if (result?.error?.message) {
        toast({
          title: "Failed to update todo",
        });
      } else {
        // document.getElementById("update-trigger")?.click();

        toast({
          title: "Success update todo",
        });
      }
    });
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (isEdit) {
      handleUpdateMember(data);
    } else {
      handleCreateMember(data);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Todo Title"
                  type="text"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="completed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Complete</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" variant="outline">
          Submit&nbsp;
          <AiOutlineLoading3Quarters
            className={cn("animate-spin", { hidden: !isPending })}
          />
        </Button>
      </form>
    </Form>
  );
}
