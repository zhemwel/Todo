"use client";
import React, { useEffect, useState } from "react";
import EditMember from "./edit/EditMember";
import { cn } from "@/lib/utils";
import DeleteMember from "./DeleteMember";

export default function ListOfMembers({
  permissions,
  isAdmin,
  query,
}: {
  permissions: any[];
  isAdmin: boolean;
  query: boolean;
}) {
  // Pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const permissionsPerPage = 2; // Set limit for todos per page

  // Get current permission
  const indexOfLastPermisson = currentPage * permissionsPerPage;
  const indexOfFirstPermisson = indexOfLastPermisson - permissionsPerPage;
  const currentPermissions = permissions.slice(
    indexOfFirstPermisson,
    indexOfLastPermisson
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  return (
    <div className="dark:bg-inherit bg-white mx-2 rounded-sm">
      {Array.isArray(currentPermissions) &&
        currentPermissions.map((permission: any, index: number) => {
          const permissionNumber = indexOfFirstPermisson + index + 1; // Menghitung nomor urut global
          return (
            <div
              className=" grid grid-cols-5  rounded-sm  p-3 align-middle font-normal"
              key={index}
            >
              <h1 className="flex items-center dark:text-white text-lg break-words whitespace-normal pr-2">
                {`${permissionNumber}.`}&nbsp;&nbsp;{permission.member.name}
              </h1>
              <div>
                <span
                  className={cn(
                    " dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
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
                    " dark:bg-zinc-800 px-2 py-1 rounded-full  capitalize text-sm border-zinc-300  border",
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
          );
        })}
      {/* Pagination Controls */}
      <div className="flex justify-center my-5 items-center space-x-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-2 bg-gray-500 rounded-md text-white"
        >
          Prev
        </button>
        <span className="text-white">
          Page {currentPage} of{" "}
          {Math.ceil(permissions.length / permissionsPerPage)}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastPermisson >= permissions.length}
          className="px-3 py-1 mx-2 bg-gray-500 rounded-md text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}
