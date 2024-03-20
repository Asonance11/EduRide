'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { UserRole } from '@prisma/client';
import { currentRole } from '@/lib/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { driverRoutes, studentRoutes, adminRoutes } from './Routes';

export default function NavItem() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        setLoading(true);
        const role = await currentRole();
        setUserRole(role);
      } catch (error) {
        console.log('Error fetching user role', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  const routes =
    userRole === 'DRIVER'
      ? driverRoutes()
      : userRole === 'ADMIN'
        ? adminRoutes()
        : studentRoutes();

  const onClick = (href: string) => {
    router.push(href);
  };

  if (loading) {
    return <NavItem.Skeleton />;
  }

  return (
    <div>
      {routes.map((route) => (
        <Button
          key={route.href}
          size="default"
          onClick={() => onClick(route.href)}
          className={cn(
            'w-full font-normal justify-start pl-10 mb-1',
            pathname === route.href &&
              'bg-slate-900 text-white hover:bg-slate-900 hover:text-white',
          )}
          variant="ghost"
        >
          {route.icon}
          {route.label}
        </Button>
      ))}
    </div>
  );
}

NavItem.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center mb-1">
      <Skeleton className="w-full h-6 mb-1" />
    </div>
  );
};
