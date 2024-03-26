import { getAllRides } from '@/actions/rides';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'History',
};

export default async function HistoryPage() {
  const rides = await getAllRides();
  return (
    <Table>
      <TableCaption>History of rides</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Passenger</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Driver</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rides?.map((ride) => (
          <TableRow key={ride.id}>
            <TableCell>
              {ride.passenger?.firstname} {ride.passenger?.lastname}
            </TableCell>
            <TableCell>{ride.pickupPoint.name}</TableCell>
            <TableCell>{ride.destination.name}</TableCell>
            <TableCell>
              {ride.driver?.firstname} {ride.driver?.lastname}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
