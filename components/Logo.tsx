import Link from 'next/link';
import React from 'react';

export default function Logo() {
  return (
    <Link href="/">
      <div className="text-black text-2xl font-bold hover:opacity-75 transition hidden md:flex">
        EduRide
      </div>
    </Link>
  );
}
