import { UserProfile } from '@clerk/nextjs';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Book Ride',
};

export default function SettingPage() {
  return (
    <div className="w-full">
      <UserProfile
        appearance={{
          elements: {
            rootBox: {
              boxShadow: 'none',
              width: '100%',
            },
            card: {
              width: '100%',
              boxShadow: 'none',
              border: '1px solid #e5e5e5',
            },
          },
        }}
      />
    </div>
  );
}
