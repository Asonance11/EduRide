'use server';

import { currentRole } from '@/lib/auth';
import db from '@/lib/db';
import { bookRideFormSchema } from '@/types/schemas';
import { z } from 'zod';
import { currentProfile } from './currentProfile';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

async function getUserInfo() {
  const profile = await currentProfile();
  const role = await currentRole();
  return { profile, role };
}

export const bookRide = async (data: z.infer<typeof bookRideFormSchema>) => {
  try {
    const { profile, role } = await getUserInfo();

    if (!profile || role !== 'STUDENT') {
      return {
        error:
          role !== 'STUDENT'
            ? 'Only students can book rides'
            : 'Unauthorized, Log in to continue',
      };
    }

    const existingRide = await db.ride.findFirst({
      where: {
        passengerId: profile.id,
        status: { notIn: ['COMPLETED', 'CANCELLED'] },
      },
    });

    if (existingRide) {
      return {
        error:
          'You have a ride already booked, please complete or cancel it before booking another ride.',
      };
    }

    const createdRide = await db.ride.create({
      data: {
        pickupPoint: data.pickupPoint,
        destination: data.destination,
        passengerId: profile.id,
      },
    });

    revalidatePath('/dashboard/available-rides');

    redirect(`/dashboard/ride/${createdRide.id}`);
  } catch (error) {
    throw error;
  }
};

export const fetchAvailableRides = async () => {
  try {
    const rides = await db.ride.findMany({
      where: {
        status: 'BOOKED',
      },
      include: {
        passenger: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
      },
    });

    return rides;
  } catch (error) {
    throw error;
  }
};
