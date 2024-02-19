'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';

export default function UserInfo() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <UserInfo.Skeleton />;
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Image
          fill
          src={user?.imageUrl!}
          alt="User"
          className="rounded-md object-cover"
        />
      </div>
      <p className="font-semibold">{user?.fullName}</p>
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
