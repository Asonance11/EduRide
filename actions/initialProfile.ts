'use server';
import { currentUser } from '@clerk/nextjs';
import { type User } from '@prisma/client';
import db from '@/lib/db';

export async function initialProfile(): Promise<User | null> {
  const loggedUser = await currentUser();
  if (!loggedUser) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      userId: loggedUser.id,
    },
  });

  return user;
}

export type UserType = Awaited<ReturnType<typeof initialProfile>>;
