import Navbar from './_components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <Navbar />
      <main className="pt-32 pb-20">{children}</main>
    </div>
  );
}
