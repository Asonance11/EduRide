'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@clerk/nextjs';
// import Image from 'next/image';
import React from 'react';
// import cityDriver from '@/public/city-driver-pana.svg';

export default function UserInfo() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <UserInfo.Skeleton />;
  }

  return (
    <div className="rounded bg-[#5f6164] px-8 py-4 w-full text-white flex justify-between">
      <div className="flex flex-col">
        <h2 className="text-2xl">Welcome back,</h2>
        <p className="text-sm">{user?.fullName}</p>
      </div>
      {/*<Image src={cityDriver} alt="City driver Logo" width={400} height={150} /> */}
    </div>
  );
}

UserInfo.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton className="w-full h-full absolute" />
      </div>
      <Skeleton className="h-10 w-[200px]" />
    </div>
  );
};
