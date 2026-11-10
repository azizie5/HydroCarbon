import React from 'react';
import { Atom, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="mt-20 border-t border-stone-200/80 bg-[#FAF7F2] text-stone-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Brand & Purpose (5 cols) */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-sm">
              <Atom className="w-5 h-5" />
            </div>
            <div className="font-heading font-extrabold text-xl text-stone-900 tracking-tight">
              <span>Hydrocarbon</span>
              <span className="text-emerald-700">Edu</span>
            </div>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed max-w-sm">
            Platform pembelajaran kimia interaktif terpadu yang dirancang khusus untuk mempermudah siswa memahami struktur ruang molekul, tata nama IUPAC resmi, dan isomerisme hidrokarbon.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200/50">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kimia Fase F • SMA Kurikulum Merdeka</span>
          </div>
        </div>

        {/* Quick Cheat Sheet (4 cols) */}
        <div className="md:col-span-4 space-y-2">
          <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-stone-800">
            Rumus Cepat Hidrokarbon
          </h4>
          <div className="space-y-1.5 text-xs text-stone-600">
            <div className="p-2 rounded-xl bg-white border border-stone-200/70 flex justify-between items-center">
              <span>Alkana (Jenuh, Tunggal):</span>
              <span className="font-mono font-bold text-emerald-800">CₙH₂ₙ₊₂</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-stone-200/70 flex justify-between items-center">
              <span>Alkena (Tak Jenuh, Rangkap 2):</span>
              <span className="font-mono font-bold text-teal-800">CₙH₂ₙ</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-stone-200/70 flex justify-between items-center">
              <span>Alkuna (Tak Jenuh, Rangkap 3):</span>
              <span className="font-mono font-bold text-emerald-800">CₙH₂ₙ₋₂</span>
            </div>
          </div>
        </div>

        {/* Navigation & Resources (3 cols) */}
        <div className="md:col-span-3 space-y-2">
          <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-stone-800">
            Navigasi Pintas
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <a href="#hero" className="hover:text-emerald-700 transition-colors">Beranda Utama</a>
            </li>
            <li>
              <a href="#materi" className="hover:text-emerald-700 transition-colors">Modul Alkana, Alkena & Alkuna</a>
            </li>
            <li>
              <a href="#lab" className="hover:text-emerald-700 transition-colors">Laboratorium Molekul 3D</a>
            </li>
            <li>
              <a href="#quiz" className="hover:text-emerald-700 transition-colors">Kuis Gamifikasi & Evaluasi</a>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
        <div>
          © {currentYear} HydrocarbonEdu. Dirancang dengan cinta untuk edukasi kimia Indonesia.
        </div>
        <div className="flex items-center gap-1">
          <span>Dibuat dengan React, Tailwind CSS, & Three.js</span>
        </div>
      </div>
    </footer>
  );
}
