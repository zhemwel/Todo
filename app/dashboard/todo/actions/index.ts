"use server";
import { createSupabaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function createTodo(data: { title: string; completed: boolean }) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.from("todo").insert(data).single();

  revalidatePath("/todo");

  return JSON.stringify(result);
}

export async function updateTodoById(
  id: string,
  data: { title: string; completed: boolean }
) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from("todo").update(data).eq("id", id);
  revalidatePath("/todo");

  return JSON.stringify(result);
}

export async function deleteTodoById(id: string) {
  const supabase = await createSupabaseServerClient();
  const deleteResult = await supabase.from("todo").delete().eq("id", id);
  revalidatePath("/todo");

  return JSON.stringify(deleteResult);
}

export async function readTodos() {
  unstable_noStore();

  const supabase = await createSupabaseServerClient();
  return await supabase.from("todo").select("*, member(*)");
}
