import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EduRide',
  description:
    'EduRide is a cutting-edge Student Transport Management System, offering efficient route management, and user-friendly authentication. Simplify student transportation operations with our secure and reliable platform. Join EduRide now and experience the future of student transport management.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
