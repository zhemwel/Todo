"use client";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { deleteMemberById } from "../actions";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function DeleteMember({
  id,
  kembalikan,
}: {
  id: string;
  kembalikan: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(async () => {
      const result = JSON.parse(await deleteMemberById(id, kembalikan));

      if (result?.error?.message) {
        console.log(result?.error?.message);
        toast({
          title: `Gagal ${kembalikan ? "Pulihkan" : "Hapus"} Member`,
        });
      } else {
        // document.getElementById("update-trigger")?.click();

        toast({
          title: `Sukses ${kembalikan ? "Pulihkan" : "Hapus"} Member`,
        });
      }
    });
  };

  return (
    <form action={onSubmit}>
      <Button variant="outline">
        {kembalikan ? "Pulihkan" : "Hapus"}&nbsp;
        <AiOutlineLoading3Quarters
          className={cn("animate-spin", { hidden: !isPending })}
        />
      </Button>
    </form>
  );
}
