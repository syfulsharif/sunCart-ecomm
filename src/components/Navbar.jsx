import { Link } from 'react-router-dom';
import { useSession } from '../context/AuthContext';
import { LogOut, User, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { user, signOut } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={clsx(
      "navbar fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-12 border-b",
      isScrolled ? "bg-[var(--color-summer-sand)] shadow-sm border-black/10" : "bg-transparent border-transparent"
    )}>
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-black tracking-tighter uppercase text-[var(--color-summer-dark)]">
          SunCart<span className="text-[var(--color-summer-orange)]">.</span>
        </Link>
      </div>
      <div className="flex gap-3 overflow-hidden">
        <div className="hidden lg:flex gap-8 ml-auto">
          <Link to="/" className="text-[13px] font-bold uppercase tracking-wide text-[var(--color-summer-dark)] opacity-60 hover:opacity-100 hover:text-[var(--color-summer-orange)] transition-colors">Home</Link>
          <a href="#products" className="text-[13px] font-bold uppercase tracking-wide text-[var(--color-summer-dark)] opacity-60 hover:opacity-100 hover:text-[var(--color-summer-orange)] transition-colors">Products</a>
          <Link to="/profile" className="text-[13px] font-bold uppercase tracking-wide text-[var(--color-summer-dark)] opacity-60 hover:opacity-100 hover:text-[var(--color-summer-orange)] transition-colors">My Profile</Link>
        </div>

        <button className="lg:hidden btn btn-ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            <div className="avatar w-10 h-10 rounded-full overflow-hidden border border-gray-200">
              {user.image ? (
                <img src={user.image} alt={user.name} />
              ) : (
                <div className="bg-gray-100 w-full h-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
              )}
            </div>
            <button onClick={signOut} className="btn btn-sm mx-2 border-none bg-[var(--color-summer-dark)] text-white hover:bg-[var(--color-summer-orange)] rounded-full px-5 py-2 uppercase tracking-wider transition-all duration-300">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-sm shrink-0 border-none bg-[var(--color-summer-dark)] text-white hover:bg-[var(--color-summer-orange)] rounded-full px-6 py-2 h-auto text-[11px] font-bold uppercase tracking-wider transition-all duration-300">
            Login / Register
          </Link>
        )}
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[var(--color-summer-sand)] border-b border-black/10 flex flex-col items-center py-4 gap-4 shadow-md">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-[13px] font-bold uppercase tracking-wide text-[var(--color-summer-dark)] opacity-60 hover:opacity-100 hover:text-[var(--color-summer-orange)] transition-colors">Home</Link>
          <a href="#products" onClick={() => setIsMenuOpen(false)} className="text-[13px] font-bold uppercase tracking-wide text-[var(--color-summer-dark)] opacity-60 hover:opacity-100 hover:text-[var(--color-summer-orange)] transition-colors">Products</a>
          <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="text-[13px] font-bold uppercase tracking-wide text-[var(--color-summer-dark)] opacity-60 hover:opacity-100 hover:text-[var(--color-summer-orange)] transition-colors">My Profile</Link>
          {user ? (
            <button onClick={() => { signOut(); setIsMenuOpen(false); }} className="btn btn-sm border-none bg-[var(--color-summer-dark)] text-white hover:bg-[var(--color-summer-orange)] rounded-full px-5 py-2 uppercase tracking-wider transition-all duration-300">
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn btn-sm border-none bg-[var(--color-summer-dark)] text-white hover:bg-[var(--color-summer-orange)] rounded-full px-6 py-2 h-auto text-[11px] font-bold uppercase tracking-wider transition-all duration-300">
              Login / Register
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
