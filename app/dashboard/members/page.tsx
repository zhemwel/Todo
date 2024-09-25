import type { Metadata } from "next";
import Member from "./Member";
import { useUserStore } from "@/lib/store/user";

export const metadata: Metadata = {
  title: "Member",
  description:
    "Todo List",
};

export default function Page() {
	const user = useUserStore.getState().user;

	const isAdmin = user?.user_metadata.role === "admin";
  return (
    <>
      <Member isAdmin={isAdmin} />
    </>
  );
}
