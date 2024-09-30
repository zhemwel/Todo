import React from "react";
import { readMembers } from "./actions"; // Import untuk fetch data user dan member
import { readUserSession } from "@/lib/actions";
import Members from "./Members";

export default async function MembersPage() {
  const { data: permissions } = await readMembers();
  const { data: userSession } = await readUserSession(); // Fetch user session
  const safePermission = permissions ?? [];

  // Pastikan bahwa userSession tidak null
  const isAdmin = userSession.session?.user.user_metadata.role === "admin";

  const sortedPermission = safePermission.sort((a, b) => {
    if (a.role === "admin" && b.role === "user") return -1;
    if (a.role === "user" && b.role === "admin") return 1;
    return 0;
  });

  return <Members permissions={sortedPermission} isAdmin={isAdmin} />;
}
