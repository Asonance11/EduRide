import {
  CarTaxiFront,
  History,
  LayoutDashboard,
  Settings,
  Plus,
} from 'lucide-react';
export function driverRoutes() {
  return [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
      href: '/dashboard',
    },
    {
      label: 'Available Rides',
      icon: <CarTaxiFront className="h-4 w-4 mr-2" />,
      href: '/dashboard/available-rides',
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

export function studentRoutes() {
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

export function adminRoutes() {
  return [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
      href: '/dashboard',
    },
    {
      label: 'Create Route',
      icon: <Plus className="h-4 w-4 mr-2" />,
      href: '/dashboard/create-route',
    },
  ];
}
