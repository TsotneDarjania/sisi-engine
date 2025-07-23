"use client";

import { userLogout } from "@/services/auth";
import { FiLogOut } from "react-icons/fi";

export default function LogOutButton() {
  return (
    <FiLogOut
      onClick={userLogout}
      className="absolute right-4 bottom-4 text-5xl cursor-pointer"
    />
  );
}
