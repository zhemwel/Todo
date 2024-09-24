"use client"
import { Button } from '@/components/ui/button';
import { TrashIcon } from '@radix-ui/react-icons';
import React, { useTransition } from 'react'
import { deleteMemberById } from '../actions';
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function DeleteMember({ user_id }: {user_id: string}) {
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(async () => {
      const result = await deleteMemberById(user_id);
      const { error } = JSON.parse(result);

      if (error?.message) {
        toast({
          title: "Failed to delete"
        })
      } else {
        toast({
          title: "Success delete member",
        });
      }
    })
  }

  return (
    <form action={onSubmit}>
      <Button variant="outline">
          Delete
        <AiOutlineLoading3Quarters
          className={cn("animate-spin", { hidden: !isPending })}
        />
      </Button>
    </form>
  );
}
