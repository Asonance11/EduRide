'use client';

import { approveRide } from '@/actions/rides';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Prisma } from '@prisma/client';
import React from 'react';
import { toast } from 'sonner';

type RidesWithPassenger = Prisma.RideGetPayload<{
  include: {
    passenger: { select: { firstname: true; lastname: true } };
    pickupPoint: true;
    destination: true;
  };
}>;

const RidesTableList: React.FC<{ rides: RidesWithPassenger[] }> = ({
  rides,
}) => {
  async function onConfirmRide(id: string) {
    const response = await approveRide(id);
    if (response?.error) {
      return toast.error(response.error);
    }
    toast.success('Ride approved successfully');
  }
  return (
    <div>
      <Table>
        <TableCaption>Available Rides</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Passenger</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rides.map((ride) => (
            <TableRow key={ride.id}>
              <TableCell>
                {ride.passenger.firstname} {ride.passenger.lastname}
              </TableCell>
              <TableCell>{ride.pickupPoint.name}</TableCell>
              <TableCell>{ride.destination.name}</TableCell>
              <TableCell>
                <Button
                  variant="default"
                  onClick={() => {
                    onConfirmRide(ride.id);
                  }}
                >
                  Accept
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RidesTableList;
