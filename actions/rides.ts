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

export const bookRide = async (
  pickupPointId: string,
  destinationId: string,
) => {
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
    const pickupPlace = await db.place.findUnique({
      where: {
        id: pickupPointId,
      },
    });

    const destinationPlace = await db.place.findUnique({
      where: {
        id: destinationId,
      },
    });

    if (!pickupPlace || !destinationPlace) {
      throw new Error('Invalid pickup or destination place ID');
    }

    const createdRide = await db.ride.create({
      data: {
        status: 'BOOKED',
        pickupPoint: { connect: { id: pickupPointId } },
        destination: { connect: { id: destinationId } },
        passenger: {
          connect: {
            id: profile.id,
          },
        },
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
        pickupPoint: true,
        destination: true,
      },
    });

    return rides;
  } catch (error) {
    throw error;
  }
};

export const approveRide = async (rideid: string) => {
  try {
    const { role, profile } = await getUserInfo();

    if (!profile || role !== 'DRIVER') {
      return {
        error: 'Only drivers can approve rides',
      };
    }

    await db.ride.update({
      where: {
        id: rideid,
      },
      data: {
        status: 'IN_PROGRESS',
        driver: {
          connect: {
            id: profile.id,
          },
        },
      },
    });

    revalidatePath('/dashboard/available-rides');
  } catch (error) {
    throw error;
  }
};

export const getAllRides = async () => {
  const { profile, role } = await getUserInfo();
  if (!profile) {
    throw new Error('Unauthorized, Log in to continue');
  }
  try {
    let rides;
    if (role === 'DRIVER') {
      rides = await db.ride.findMany({
        where: {
          driverId: profile.id,
        },
        include: {
          passenger: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
          driver: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
          pickupPoint: true,
          destination: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else if (role === 'STUDENT') {
      rides = await db.ride.findMany({
        where: {
          passengerId: profile.id,
        },
        include: {
          passenger: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
          driver: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
          pickupPoint: true,
          destination: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }
    // else {
    //   rides = await db.ride.findMany({
    //     include: {
    //       driver: {
    //         select: {
    //           firstname: true,
    //           lastname: true,
    //         },
    //       },
    //       passenger: {
    //         select: {
    //           firstname: true,
    //           lastname: true,
    //         },
    //       },
    //       pickupPoint: true,
    //       destination: true,
    //     },
    //   });
    // }
    return rides;
  } catch (error) {
    throw error;
  }
};

export const getActiveRide = async () => {
  const { role, profile } = await getUserInfo();
  if (!profile) {
    throw new Error('Unauthorized, Log in to continue');
  }

  let activeRide;

  if (role === 'DRIVER') {
    activeRide = await db.ride.findFirst({
      where: {
        status: {
          in: ['BOOKED', 'ACCEPTED', 'IN_PROGRESS'], // Assuming these are the statuses for an active ride
        },
        driverId: profile.id,
      },
      include: {
        passenger: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
        pickupPoint: true,
        destination: true,
      },
      orderBy: {
        createdAt: 'desc', // Assuming you want the most recent ride
      },
    });
  } else if (role === 'STUDENT') {
    activeRide = await db.ride.findFirst({
      where: {
        status: {
          in: ['BOOKED', 'ACCEPTED', 'IN_PROGRESS'], // Assuming these are the statuses for an active ride
        },
        driverId: profile.id,
      },
      include: {
        passenger: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
        pickupPoint: true,
        destination: true,
      },
      orderBy: {
        createdAt: 'desc', // Assuming you want the most recent ride
      },
    });
  }

  return activeRide;
};

export async function getActiveRideStatus(id: string) {
  const ride = await db.ride.findUnique({
    where: {
      id: id,
    },
  });

  if (!ride) {
    throw new Error('No ride with this id');
  }

  return ride.status;
}
