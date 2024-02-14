import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <div className="fixed top-0 w-full h-14 px-4  bg-transparent flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button variant="ghost" asChild>
            <Link href="sign-in">Login</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="sign-up">Sign up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
