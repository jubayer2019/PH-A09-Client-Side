import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-app-gradient text-slate-100">
      <Navbar />
      <main className="mx-auto w-[92%] max-w-7xl py-10">{children}</main>
      <Footer />
    </div>
  );
}
