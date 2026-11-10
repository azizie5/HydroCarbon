import React, { useState, useEffect } from 'react';
import {
  Atom,
  Menu,
  X,
  BookOpen,
  FlaskConical,
  Zap,
  Home
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['hero', 'materi', 'lab', 'quiz'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Beranda', icon: Home },
    { id: 'materi', label: 'Materi & Modul', icon: BookOpen },
    { id: 'lab', label: 'Lab Molekul 3D', icon: FlaskConical },
    { id: 'quiz', label: 'Kuis Interaktif', icon: Zap }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-3 pb-2 transition-all duration-300">
      <div className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${isScrolled
          ? "bg-[#FAF8F5]/90 backdrop-blur-md shadow-lg border border-stone-200/80 px-4 sm:px-6 py-3"
          : "bg-[#FAF8F5]/60 backdrop-blur-sm border border-stone-200/40 px-4 sm:px-6 py-3.5"
        }`}>
        <div className="flex items-center justify-between">

          {/* Logo & Brand Name */}
          <a href="#hero" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Atom className="w-6 h-6 animate-spin" style={{ animationDuration: '16s' }} />
            </div>
            <div>
              <div className="font-heading font-extrabold text-lg sm:text-xl text-stone-900 tracking-tight flex items-center gap-1">
                <span>Hydrocarbon</span>
                <span className="text-emerald-700">Edu</span>
              </div>
              <div className="text-[10px] text-stone-500 font-medium tracking-wide uppercase">
                Media Kimia Interaktif
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5 bg-stone-100/70 p-1 rounded-2xl border border-stone-200/60">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all flex items-center gap-1.5 cursor-pointer ${isActive
                      ? "bg-white text-emerald-800 shadow-sm"
                      : "text-stone-600 hover:text-stone-900 hover:bg-white/50"
                    }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-700" : "text-stone-400"}`} />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#quiz"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all duration-200 hover:scale-[1.02] flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Coba Kuis</span>
            </a>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-stone-200/80 mt-3 space-y-1 animate-fadeIn">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-heading font-bold transition-all ${isActive
                      ? "bg-emerald-100/80 text-emerald-900"
                      : "text-stone-700 hover:bg-stone-100"
                    }`}
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  <span>{link.label}</span>
                </a>
              );
            })}

            <div className="pt-2">
              <a
                href="#quiz"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-heading font-bold text-sm text-center flex items-center justify-center gap-2 shadow"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Mulai Kuis Interaktif</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
