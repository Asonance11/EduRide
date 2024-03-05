'use server';

import { currentRole } from '@/lib/auth';
import db from '@/lib/db';
import { bookRideFormSchema } from '@/types/schemas';
import { z } from 'zod';
import { currentProfile } from './currentProfile';

export const bookRide = async (data: z.infer<typeof bookRideFormSchema>) => {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return {
        error: 'Unauthorized, Log in to continue',
      };
    }

    const role = await currentRole();

    if (role !== 'STUDENT') {
      return {
        error: 'Only students can book rides',
      };
    }

    await db.ride.create({
      data: {
        pickupPoint: data.pickupPoint,
        destination: data.destination,
        passengerId: profile.id,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const fetchAvailableRides = async () => {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return {
        error: 'Unauthorized, Log in to continue',
      };
    }

    const role = await currentRole();

    if (role !== 'DRIVER') {
      return {
        error: 'Only drivers can book rides',
      };
    }

    const rides = await db.ride.findMany({
      where: {
        status: 'BOOKED',
      },
    });

    return rides;
  } catch (error) {
    throw error;
  }
};
