import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import UserInfo from "@/app/components/header/user-info";
import UserEmail from "@/app/components/header/user-email";

import { MenuIcon } from "lucide-react";

const Header = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return null;

  return (
    <header className="fixed left-0 top-0 z-10 w-full border-b bg-gray-100 p-5 md:border-b-0 md:p-0 md:px-5 md:pt-5 xl:left-20 xl:w-[calc(100%-584px)] xl:px-0">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <div className="space-y-2.5">
                <UserInfo user={user} />
                <UserEmail email={user.email} />
              </div>
              <SheetTitle>Caixa de entrada</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden space-y-2.5 md:block">
        <UserInfo user={user} />
        <UserEmail email={user.email} />
      </div>
    </header>
  );
};

export default Header;
