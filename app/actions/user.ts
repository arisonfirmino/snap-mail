"use server";

import { db } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export const createNewUser = async ({
  firstName,
  lastName,
  username,
  password,
}: {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}) => {
  if (!firstName || !lastName || !username || !password) {
    throw new Error("Campos não preenchidos.");
  }

  const usernameIsAvailable = await db.user.findUnique({
    where: {
      username: username,
    },
  });

  if (usernameIsAvailable) {
    throw new Error("O nome de usuário já está em uso. Tente outro.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      firstName,
      lastName,
      username,
      email: `${username}@snapmail.com`,
      password: hashedPassword,
    },
  });

  revalidatePath("/");
};
