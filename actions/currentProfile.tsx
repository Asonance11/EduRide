import db from '@/lib/db';
import { auth } from '@clerk/nextjs';

export const currentProfile = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }
  let profile;
  try {
    profile = await db.user.findUnique({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.error(error, 'Error fetching user profile');
  }

  if (!profile) {
    return null;
  }

  return profile;
};
