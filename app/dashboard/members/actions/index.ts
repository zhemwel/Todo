"use server";
import { readUserSession } from "@/lib/actions";
import {
  createSupabaseAdmin,
  createSupabaseServerClient,
} from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function createMember(data: {
  name: string;
  role: "user" | "admin";
  status: "active" | "resigned";
  email: string;
  password: string;
  confirm: string;
}) {
  const { data: userSession } = await readUserSession();

  if (userSession.session?.user.user_metadata.role !== "admin") {
    return JSON.stringify({
      error: { message: "You are not allowed to do this!" },
    });
  }

  const supabase = await createSupabaseAdmin();

  const createResult = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      role: data.role,
    },
  });

  if (createResult.error?.message) {
    return JSON.stringify(createResult);
  } else {
    const memberResult = await supabase.from("member").insert({
      name: data.name,
      email: data.email,
      id: createResult.data.user?.id,
    });

    if (memberResult.error?.message) {
      return JSON.stringify(memberResult);
    } else {
      const permissionResult = await supabase.from("permission").insert({
        role: data.role,
        member_id: createResult.data.user?.id,
        status: data.status,
      });
      revalidatePath("/dashboard/member");

      return JSON.stringify(permissionResult);
    }
  }
}

export async function updateMemberAccountById(
  id: string,
  data: {
    email: string;
    password?: string | undefined;
    confirm?: string | undefined;
  }
) {
  const { data: userSession } = await readUserSession();

  if (userSession.session?.user.user_metadata.role !== "admin") {
    return JSON.stringify({
      error: { message: "You are not allowed to do this!" },
    });
  }

  let updateObject: {
    email: string;
    password?: string | undefined;
  } = {
    email: data.email,
  };

  if (data.password) {
    updateObject["password"] = data.password;
  }

  const supabaseAdmin = await createSupabaseAdmin();
  const updateResult = await supabaseAdmin.auth.admin.updateUserById(
    id,
    updateObject
  );

  if (updateResult.error?.message) {
    return JSON.stringify(updateResult);
  } else {
    const supabase = await createSupabaseServerClient();
    const result = await supabase
      .from("member")
      .update({email: data.email})
      .eq("id", id);
    revalidatePath("/dashboard/member");

    return JSON.stringify(result);
  }
}

export async function updateMemberBasicById(
  id: string,
  data: {
    name: string;
  }
) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from("member").update(data).eq("id", id);
  revalidatePath("/dashboard/member");

  return JSON.stringify(result);
}

export async function updateMemberAdvanceById(
  id: string,
  user_id: string,
  data: {
    role: "admin" | "user";
    status: "active" | "resigned";
  }
) {
  const { data: userSession } = await readUserSession();

  if (userSession.session?.user.user_metadata.role !== "admin") {
    return JSON.stringify({
      error: { message: "You are not allowed to do this!" },
    });
  }

  const supabaseAdmin = await createSupabaseAdmin();

  const updateResult = await supabaseAdmin.auth.admin.updateUserById(user_id, {
    user_metadata: { role: data.role },
  });

  if (updateResult.error?.message) {
    return JSON.stringify(updateResult);
  } else {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.from("permission").update(data).eq("id", id);
    revalidatePath("/dashboard/member");

    return JSON.stringify(result);
  }
}

export async function deleteMemberById(user_id: string) {
  const { data: userSession } = await readUserSession();

  if (userSession.session?.user.user_metadata.role !== "admin") {
    return JSON.stringify({
      error: { message: "You are not allowed to do this!" },
    });
  }

  const supabase = await createSupabaseAdmin();

  const result = await supabase.auth.admin.deleteUser(user_id);

  if (result.error?.message) {
    return JSON.stringify(result);
  } else {
    const supabase = await createSupabaseServerClient();
    const deleteResult = await supabase
      .from("member")
      .delete()
      .eq("id", user_id);
    revalidatePath("/dashboard/member");

    return JSON.stringify(deleteResult);
  }
}

export async function readMembers() {
  unstable_noStore();

  const supabase = await createSupabaseServerClient();
  return await supabase.from("permission").select("*, member(*)");
}
