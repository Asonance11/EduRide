import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import KeyFeatures from './_components/KeyFeatures';

export default function LandingPage() {
  return (
    <main className="flex items-center justify-center">
      <div className="max-w-screen-xl px-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-6xl text-center mb-6">
            Your Ultimate Student Transport Solution
          </h1>
          <div className="text-sm md:text-lg text-center max-w-xs md:max-w-2xl mx-auto">
            <p>
              Streamlined Student Transport Management System, optimizing route
              planning, authentication, and attendance tracking. It offers a
              secure and flexible solution for educational institutions,
              simplifying student transportation operations.
            </p>
            <Button className="mt-6" size="lg" variant="default" asChild>
              <Link href="sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
        <KeyFeatures />
      </div>
    </main>
  );
}
