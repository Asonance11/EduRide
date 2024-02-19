'use client';
import { initialProfile } from '@/actions/initialProfile';
import Logo from '@/components/Logo';
import { UserButton } from '@clerk/nextjs';
import { User } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import MobileSidebar from './MobileSidebar';

export default function PlatformNavbar() {
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await initialProfile();
        setProfile(userProfile);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-x-2">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
}
