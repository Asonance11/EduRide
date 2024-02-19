import { Metadata } from 'next';
import React from 'react';
import UserInfo from '../_components/UserInfo';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashBoard() {
  return (
    <div className="w-full mb-20">
      <UserInfo />
    </div>
  );
}
