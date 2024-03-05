import { fetchAvailableRides } from '@/actions/rides';
import { Metadata } from 'next';
import React from 'react';
import RidesTableList from './_components/RidesTableList';

export const metadata: Metadata = {
  title: 'Available Rides',
};

export default async function AvailableRidesPage() {
  const rides = await fetchAvailableRides();

  return (
    <div className="w-full">
      <RidesTableList rides={rides} />
    </div>
  );
}
