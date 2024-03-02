'use client';

import { usePathname, useRouter } from 'next/navigation';
import { CarTaxiFront, History, LayoutDashboard, Settings } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { UserRole } from '@prisma/client';
import { currentRole } from '@/lib/auth';

export default function NavItem() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await currentRole();
        setUserRole(role);
      } catch (error) {
        console.log('Error fetching user role', error);
      }
    };

    fetchUserRole();
  }, []);

  const routes = userRole === 'DRIVER' ? getDriverRoutes() : getStudentRoutes();

  const onClick = (href: string) => {
    router.push(href);
  };

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

function getDriverRoutes() {
  return [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
      href: '/dashboard',
    },
    {
      label: 'History',
      icon: <History className="h-4 w-4 mr-2" />,
      href: '/dashboard/history',
    },
    {
      label: 'Settings',
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: '/dashboard/settings',
    },
  ];
}

function getStudentRoutes() {
  return [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
      href: '/dashboard',
    },
    {
      label: 'Book Ride',
      icon: <CarTaxiFront className="h-4 w-4 mr-2" />,
      href: '/dashboard/book-ride',
    },
    {
      label: 'History',
      icon: <History className="h-4 w-4 mr-2" />,
      href: '/dashboard/history',
    },
    {
      label: 'Settings',
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: '/dashboard/settings',
    },
  ];
}
