'use client';
import { useState } from 'react';
import PlatformNavbar from '../_components/PlatformNavbar';
import Sidebar from '../_components/Sidebar';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';
import { LoadScript } from '@react-google-maps/api';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pickup, setPickup] = useState<any>({});
  const [destination, setDestination] = useState<any>({});
  return (
    <section>
      <SourceContext.Provider value={{ pickup, setPickup }}>
        <DestinationContext.Provider value={{ destination, setDestination }}>
          <LoadScript
            libraries={['places']}
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}
          >
            <PlatformNavbar />
            <main className="pt-20 md:pt-24 px-4 mx-auto max-w-7xl 2xl:max-w-screen-xl ">
              <div className="flex gap-x-7">
                <div className="w-64 shrink-0 hidden md:block">
                  <Sidebar />
                </div>
                {children}
              </div>
            </main>
          </LoadScript>
        </DestinationContext.Provider>
      </SourceContext.Provider>
    </section>
  );
}
