import { Metadata } from 'next';
import React from 'react';
import UserInfo from '../_components/UserInfo';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashBoard() {
  return (
    <div className="w-full mb-20">
      <UserInfo />
      <Separator className="my-4" />
    </div>
  );
}
