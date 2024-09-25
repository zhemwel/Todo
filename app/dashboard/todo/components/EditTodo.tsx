import React from "react";
import DailogForm from "./DialogForm";
import { Button } from "@/components/ui/button";
import MemberForm from "./TodoForm";

export default function EditTodo({ todo }: { todo: any }) {
  return (
    <DailogForm
      id="update-trigger"
      title="Edit Todo"
      Trigger={<Button variant="outline">Edit</Button>}
      form={<MemberForm isEdit={true} todo={todo} />}
    />
  );
}
