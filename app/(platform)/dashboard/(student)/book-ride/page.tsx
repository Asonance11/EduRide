import React from 'react';
import BookRideForm from './_components/BookRideForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Ride',
};

export default function BookRidePage() {
  return (
    <div>
      <BookRideForm />
    </div>
  );
}
