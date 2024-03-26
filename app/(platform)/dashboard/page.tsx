import { Metadata } from 'next';
import React from 'react';
import UserInfo from '../_components/UserInfo';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAllRides, getActiveRide } from '@/actions/rides';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashBoard() {
  const rides = await getAllRides();
  const activeRide = await getActiveRide();
  return (
    <div className="w-full mb-20">
      <UserInfo />
      <Separator className="my-4" />
      <div className="flex flex-wrap gap-4">
        <div className="w-full">
          <h2 className="text-lg font-semibold">Active Ride</h2>
          {activeRide ? (
            <div>
              <p>you have an active ride</p>
              <Link href={`dashboard/ride/${activeRide.id}`}>See details</Link>
            </div>
          ) : (
            <p>No active Ride</p>
          )}

          <h2 className="text-lg font-semibold">Recent Rides</h2>
          <p className="text-sm">
            <Table className="w-full">
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
          </p>
        </div>
      </div>
    </div>
  );
}
