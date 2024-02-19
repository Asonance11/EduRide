'use client';

import { usePathname, useRouter } from 'next/navigation';
import { CarTaxiFront, History, LayoutDashboard, Settings } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NavItem() {
  const pathname = usePathname();
  const router = useRouter();

  const routes = [
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

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <div>
      {routes.map((route) => (
        <Button
          key={route.href}
          size="sm"
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
