import PlatformNavbar from '../_components/PlatformNavbar';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <PlatformNavbar />
      {children}
    </section>
  );
}
