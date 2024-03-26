import React from 'react';
import BookRideForm from './_components/BookRideForm';
import { Metadata } from 'next';
import { getAllPlaces } from '@/actions/places';
import GoogleMaps from '@/app/(platform)/_components/GoogleMaps';

export const metadata: Metadata = {
  title: 'Book Ride',
};

export default async function BookRidePage() {
  const places = await getAllPlaces();
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
      <div>
        <BookRideForm places={places} />
      </div>
      <div className="col-span-2">
        <GoogleMaps />
      </div>
    </section>
  );
}
