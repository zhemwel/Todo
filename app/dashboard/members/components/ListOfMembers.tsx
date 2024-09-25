"use client";

import React, { useEffect, useState } from "react";
import { useUserStore } from "@/lib/store/user";
import { readMembers } from "../actions";
import { IPermission } from "@/lib/types";
import DeleteMember from "./DeleteMember";
import EditMember from "./edit/EditMember";
import { cn } from "@/lib/utils";

export default function ListOfMembers({
  searchQuery,
  isAdmin,
}: {
  searchQuery: string;
  isAdmin: boolean;
}) {
  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const [loading, setLoading] = useState(true);

  // Use effect to fetch data after component mounts
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await readMembers();
      setPermissions(data || []);
      setLoading(false);
    };

    fetchData();
  }, []); // Empty dependency array to only fetch data on mount

  const filteredPermissions = permissions?.filter((permission: IPermission) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      permission.member.name.toLowerCase().includes(searchLower) ||
      permission.role.toLowerCase().includes(searchLower) ||
      permission.status.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dark:bg-inherit bg-white mx-2 rounded-sm">
      {Array.isArray(filteredPermissions) &&
        filteredPermissions.map((permission: IPermission, index: number) => (
          <div
            className="grid grid-cols-5 rounded-sm p-3 align-middle font-normal"
            key={index}
          >
            <h1>{permission.member.name}</h1>
            <div>
              <span
                className={cn(
                  "dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize border-[.5px] text-sm",
                  {
                    "border-green-500 text-green-600 bg-green-200":
                      permission.role === "admin",
                    "border-zinc-300 dark:text-yellow-300 dark:border-yellow-700 px-4 bg-yellow-50":
                      permission.role === "user",
                  }
                )}
              >
                {permission.role}
              </span>
            </div>
            <h1>{new Date(permission.created_at).toDateString()}</h1>
            <div>
              <span
                className={cn(
                  "dark:bg-zinc-800 px-2 py-1 rounded-full capitalize text-sm border-zinc-300 border",
                  {
                    "text-green-600 px-4 dark:border-green-400 bg-green-200":
                      permission.status === "active",
                    "text-red-500 bg-red-100 dark:text-red-300 dark:border-red-400":
                      permission.status === "resigned",
                  }
                )}
              >
                {permission.status}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <EditMember isAdmin={isAdmin} permission={permission} />
              {isAdmin && <DeleteMember user_id={permission.member.id} />}
            </div>
          </div>
        ))}
    </div>
  );
}
