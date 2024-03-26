import { getActiveRideStatus } from '@/actions/rides';
import { RideStatus } from '@prisma/client';
import React from 'react';

export default async function RidePage({ params }: { params: { id: string } }) {
  const id = params.id;
  const rideStatus = await getActiveRideStatus(id);

  const getStatusMessage = (status: RideStatus) => {
    switch (status) {
      case 'BOOKED':
        return 'Waiting for a driver';
      case 'ACCEPTED':
        return 'Your ride has been accepted by a driver';
      case 'IN_PROGRESS':
        return 'Your ride is in progress';
      case 'COMPLETED':
        return 'Your ride has been completed';
      case 'CANCELLED':
        return 'Your ride has been cancelled';
      default:
        return 'Invalid ride status';
    }
  };

  const message = getStatusMessage(rideStatus);
  return (
    <div>
      <h1>Ride Status</h1>
      <p>{message}</p>
    </div>
  );
}
