import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";

const PrivatePageLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return <>{children}</>;
};

export default PrivatePageLayout;
