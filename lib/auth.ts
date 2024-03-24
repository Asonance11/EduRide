'use server';
import { currentUser } from '@clerk/nextjs';
import db from './db';

export const currentRole = async () => {
  const loggedUser = await currentUser();
  if (!loggedUser) {
    throw new Error('User not logged in');
  }

  const user = await db.user.findUnique({
    where: {
      userId: loggedUser.id,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user.role;
};
