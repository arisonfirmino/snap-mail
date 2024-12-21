"use server";

import { db } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export const isUsernameAvailable = async ({
  username,
}: {
  username: string;
}) => {
  if (!username) {
    return false;
  }

  const usernameExists = await db.user.findUnique({
    where: {
      username: username,
    },
  });

  if (usernameExists) {
    return false;
  } else {
    return true;
  }
};

export const isUserExists = async ({ user }: { user: string }) => {
  if (!user) {
    return false;
  }

  const userExists = await db.user.findFirst({
    where: {
      OR: [{ email: user }, { username: user }],
    },
  });

  if (userExists) {
    return true;
  } else {
    return false;
  }
};

export const comparePasswords = async ({
  user,
  password,
}: {
  user: string;
  password: string;
}) => {
  if (!user || !password) {
    return false;
  }

  const foundUser = await db.user.findFirst({
    where: {
      OR: [{ email: user }, { username: user }],
    },
  });

  if (!foundUser) {
    return false;
  }

  const isPasswordValid = await bcrypt.compare(password, foundUser.password);

  if (isPasswordValid) {
    return true;
  } else {
    return false;
  }
};
