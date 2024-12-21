import { CopyIcon } from "lucide-react";

const UserEmail = ({ email }: { email: string }) => {
  return (
    <div className="flex h-10 items-center justify-between rounded-[1px] border bg-background px-3 py-2 text-sm">
      {email}

      <button>
        <CopyIcon size={14} />
      </button>
    </div>
  );
};

export default UserEmail;
