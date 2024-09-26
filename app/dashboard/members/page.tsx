import React from "react";
import MemberTable from "./components/MemberTable";
import SearchMembers from "./components/SearchMembers";
import { readMembers } from "./actions"; // Import untuk fetch data user dan member
import { readUserSession } from "@/lib/actions";
import CreateMember from "./components/create/CreateMember";

export default async function MembersPage() {
  const { data: permissions } = await readMembers();
  const { data: userSession } = await readUserSession(); // Fetch user session
  const safePermission = permissions ?? [];

  // Pastikan bahwa userSession tidak null
  const isAdmin = userSession.session?.user.user_metadata.role === "admin";

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Members</h1>
      <div className="flex gap-2 mb-5">
        {isAdmin && (
          <>
            <SearchMembers />
            <CreateMember />
          </>
        )}
      </div>
      <MemberTable permissions={safePermission} isAdmin={isAdmin} />
    </div>
  );
}
