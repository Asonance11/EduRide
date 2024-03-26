import { Metadata } from 'next';
import React from 'react';
import CreatePlaceForm from './_components/CreatePlaceForm';

export const metadata: Metadata = {
  title: 'Create Place',
};

export default function CreatePlacePage() {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <CreatePlaceForm />
      </div>
    </section>
  );
}
