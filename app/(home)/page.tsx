import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    redirect("/signin");
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <div className="rounded-lg border bg-background p-5 shadow">
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <p>{user.email}</p>
      </div>
    </main>
  );
};

export default Home;
