import { currentUser } from '@clerk/nextjs';
import db from './db';

export const currentRole = async () => {
  const loggedUser = await currentUser();
  if (!loggedUser) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      userId: loggedUser.id,
    },
  });

  if (!user) {
    return null;
  }

  return user.role;
};
