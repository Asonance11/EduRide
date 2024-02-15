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

  if (user) {
    return user;
  }

  const newUser = await db.user.create({
    data: {
      userId: loggedUser.id,
      firstname: loggedUser?.firstName!,
      lastname: loggedUser?.lastName!,
      imageUrl: loggedUser.imageUrl,
      email: loggedUser.emailAddresses[0].emailAddress,
    },
  });

  return newUser;
}

export type UserType = Awaited<ReturnType<typeof initialProfile>>;
