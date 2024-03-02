'use server'
import db from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import { UserRole } from '@prisma/client';
import { redirect } from 'next/navigation';

export const createUser = async (role: UserRole) => {
  const loggedUser = await currentUser();
  if (!loggedUser) {
    return null;
  }

  await db.user.create({
    data: {
      userId: loggedUser.id,
      firstname: loggedUser?.firstName!,
      lastname: loggedUser?.lastName!,
      imageUrl: loggedUser.imageUrl,
      email: loggedUser.emailAddresses[0].emailAddress,
      role: role,
    },
  });

    redirect('/dashboard')
};
