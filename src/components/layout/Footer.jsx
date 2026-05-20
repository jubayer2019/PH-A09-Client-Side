import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto grid w-[92%] max-w-7xl gap-8 py-12 md:grid-cols-3">
        <div>
          <h4 className="text-2xl font-bold text-white">DriveFleet</h4>
          <p className="mt-3 text-sm text-slate-300">
            Premium car rental for professionals, teams, and modern travelers.
          </p>
        </div>

        <div>
          <h5 className="text-lg font-semibold text-white">Useful Links</h5>
          <div className="mt-3 space-y-2 text-slate-300">
            <Link href="/">Home</Link>
            <br />
            <Link href="/explore-cars">Explore Cars</Link>
            <br />
            <Link href="/my-bookings">My Bookings</Link>
          </div>
        </div>

        <div>
          <h5 className="text-lg font-semibold text-white">Contact</h5>
          <p className="mt-3 text-slate-300">jubayer.prodesigner@gmail.com</p>
          <p className="text-slate-300">+880 1935-615672</p>
          <div className="mt-4 flex items-center gap-3 text-slate-300">
            <a href="https://www.instagram.com/jubayer.info360/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/pro-jubayer/" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com/jubayer2019" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
