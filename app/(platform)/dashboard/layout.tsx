import PlatformNavbar from '../_components/PlatformNavbar';
import Sidebar from '../_components/Sidebar';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <PlatformNavbar />
      <main className="pt-20 md:pt-24 px-4 mx-auto">
        <div className="flex gap-x-7">
          <div className="w-64 shrink-0 hidden md:block">
            <Sidebar />
          </div>
          {children}
        </div>
      </main>
    </section>
  );
}
