import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'Eduride',
    template: '%s | Eduride',
  },
  description:
    'Eduride is a state-of-the-art Student Transport Management System, offering efficient route management and user-friendly authentication. Simplify student transportation operations with our secure and reliable platform. Join Eduride now and experience the future of student transport management.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable)}>
        <Toaster richColors />
        {children}
      </body>
    </html>
  );
}
