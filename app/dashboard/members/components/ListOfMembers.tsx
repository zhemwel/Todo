"use client";
import React, { useEffect, useState } from "react";
import { getPaginatedMembers, readMembers } from "../actions";
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
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages available

  const pageSize = 15;

  // Fetch members based on search query and pagination
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let data = [];
      let count = 0;

      const result = await getPaginatedMembers(page, pageSize);
      data = result.data || [];
      count = result.count || 0;

      setPermissions(data);
      setTotalPages(Math.ceil(count / pageSize));
      setLoading(false);
    };

    if (!searchQuery) fetchData();
  }, [searchQuery, page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // Use effect to fetch data after component mounts
  useEffect(() => {
    const fetchData = async () => {
      setPage(1);
      const { data } = await readMembers();
      setPermissions(data || []);
      setLoading(false);
    };

    if (searchQuery.length > 3) fetchData();
  }, [searchQuery]); // Empty dependency array to only fetch data on mount

  const filteredPermissions = permissions?.filter((permission: IPermission) => {
    const searchLower = searchQuery.toLowerCase();
    if (searchQuery.length > 3) {
      return (
        permission.member.name.toLowerCase().includes(searchLower) ||
        permission.role.toLowerCase().includes(searchLower) ||
        permission.status.toLowerCase().includes(searchLower)
      );
    } else {
      return permission;
    }
  });

  if (loading) {
    return (
      <div className="grid grid-cols-5 rounded-sm p-3 align-middle font-normal">
        <h1 className="ml-4">Loading...</h1>
      </div>
    );
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

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-3 py-1 border rounded"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
