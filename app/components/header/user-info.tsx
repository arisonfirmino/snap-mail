"use client";

import { User } from "@prisma/client";

import { signOut } from "next-auth/react";

import { DotIcon, LogOutIcon } from "lucide-react";

interface UserInfoProps {
  user: User;
}

const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <div className="flex items-center justify-between rounded-[1px] border bg-background px-3 py-2 md:h-10">
      <div className="flex flex-col text-start md:flex-row md:items-center">
        <h2 className="text-base font-medium text-primary">
          {user.firstName} {user.lastName}
        </h2>
        <DotIcon size={14} className="hidden text-muted md:flex" />
        <p className="text-xs text-muted">{user.username}</p>
      </div>

      <button onClick={async () => await signOut()}>
        <LogOutIcon size={16} />
      </button>
    </div>
  );
};

export default UserInfo;
