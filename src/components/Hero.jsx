import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Atom
} from 'lucide-react';

export default function Hero() {
  const [activeCard, setActiveCard] = useState('alkana');

  const cardsData = {
    alkana: {
      title: "Alkana",
      formula: "CₙH₂ₙ₊₂",
      compound: "Metana (CH₄)",
      bond: "Ikatan Tunggal (C-C)",
      hybrid: "sp³",
      angle: "109.5°",
      desc: "Hidrokarbon jenuh dengan ikatan kovalen tunggal dan geometri tetrahedral."
    },
    alkena: {
      title: "Alkena",
      formula: "CₙH₂ₙ",
      compound: "Etena (C₂H₄)",
      bond: "1 Ikatan Rangkap Dua (C=C)",
      hybrid: "sp²",
      angle: "120°",
      desc: "Hidrokarbon tak jenuh dengan ikatan rangkap dua (1 ikatan σ + 1 ikatan π)."
    },
    alkuna: {
      title: "Alkuna",
      formula: "CₙH₂ₙ₋₂",
      compound: "Etuna (C₂H₂)",
      bond: "1 Ikatan Rangkap Tiga (C≡C)",
      hybrid: "sp",
      angle: "180°",
      desc: "Hidrokarbon alifatik sangat tak jenuh dengan ikatan rangkap tiga dan geometri linear."
    }
  };

  const current = cardsData[activeCard];

  return (
    <section id="hero" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Decorative Pastel Background Glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-200/40 rounded-full blur-3xl pointer-events-none -z-10 animate-glow"></div>
      <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-amber-100/50 rounded-full blur-2xl pointer-events-none -z-10"></div>
      <div className="absolute top-40 left-10 w-[250px] h-[250px] bg-teal-100/40 rounded-full blur-2xl pointer-events-none -z-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Headlines & CTA (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs sm:text-sm font-semibold border border-emerald-200/60 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Platform Pembelajaran Kimia Interaktif Terpadu</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 font-heading tracking-tight leading-[1.15]">
            Pahami Struktur & Tata Nama{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 underline decoration-emerald-300 decoration-wavy decoration-2">
              Hidrokarbon
            </span>{' '}
            Secara Visual
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Kuasai konsep <strong>Alkana</strong>, <strong>Alkena</strong>, dan <strong>Alkuna</strong> dengan visualisasi 3D realtime, tata nama IUPAC interaktif, perbandingan isomer terperinci, dan kuis gamifikasi seru!
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
            <a
              href="#materi"
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <span>Mulai Eksplorasi</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#lab"
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#F3EFE6] text-stone-800 border border-stone-200/90 font-heading font-bold text-sm sm:text-base shadow-xs flex items-center gap-2 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <Atom className="w-4 h-4 text-emerald-700" />
              <span>Buka Lab Molekul 3D</span>
            </a>

            <a
              href="#quiz"
              className="px-5 py-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-heading font-bold text-sm sm:text-base border border-emerald-200/70 transition-all duration-200 cursor-pointer"
            >
              <span>Uji Kuis</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 border-t border-stone-200/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-800 font-heading">3 Seri</div>
              <div className="text-xs text-stone-500 font-medium">Alkana, Alkena, Alkuna</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-800 font-heading">3D WebGL</div>
              <div className="text-xs text-stone-500 font-medium">Orbit & Manipulasi Molekul</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-800 font-heading">Gamifikasi</div>
              <div className="text-xs text-stone-500 font-medium">Kuis Feedback Realtime</div>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Vector & Concept Showcase (5 cols) */}
        <div className="lg:col-span-5">
          
          <div className="relative">
            
            {/* Main Interactive Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-2xl space-y-5">
              
              {/* Card Switcher Pills */}
              <div className="flex items-center justify-between bg-[#F4EEDF] p-1.5 rounded-2xl">
                {['alkana', 'alkena', 'alkuna'].map((key) => {
                  const isActive = activeCard === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveCard(key)}
                      className={`flex-1 py-1.5 px-3 rounded-xl text-xs sm:text-sm font-heading font-bold capitalize transition-all cursor-pointer ${
                        isActive
                          ? "bg-white text-emerald-900 shadow-sm"
                          : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>

              {/* Hydrocarbon Visual Display */}
              <div className="bg-gradient-to-br from-[#FAF8F5] to-[#EAE6DB] rounded-2xl p-6 border border-stone-200/70 text-center relative overflow-hidden">
                
                {/* Background Molecule Wireframe Pattern */}
                <div className="absolute -right-4 -bottom-4 w-28 h-28 opacity-10 pointer-events-none">
                  <Atom className="w-full h-full text-emerald-900" />
                </div>

                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold text-emerald-800 bg-emerald-100 mb-2">
                  {current.title} • {current.formula}
                </div>

                <div className="text-2xl sm:text-3xl font-extrabold text-stone-800 font-heading">
                  {current.compound}
                </div>

                {/* Molecule 2D representation */}
                <div className="my-5 flex items-center justify-center">
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-stone-200 font-mono text-base sm:text-lg font-bold text-emerald-900 tracking-wider">
                    {activeCard === 'alkana' && (
                      <div className="flex items-center gap-1.5">
                        <span>H</span>
                        <span>—</span>
                        <div className="flex flex-col items-center">
                          <span className="text-xs">H</span>
                          <span className="text-xs">|</span>
                          <span className="text-emerald-700 font-extrabold text-xl">C</span>
                          <span className="text-xs">|</span>
                          <span className="text-xs">H</span>
                        </div>
                        <span>—</span>
                        <span>H</span>
                      </div>
                    )}
                    {activeCard === 'alkena' && (
                      <div className="flex items-center gap-2">
                        <span>H₂C</span>
                        <span className="text-emerald-600 font-extrabold text-xl">=</span>
                        <span>CH₂</span>
                      </div>
                    )}
                    {activeCard === 'alkuna' && (
                      <div className="flex items-center gap-2">
                        <span>HC</span>
                        <span className="text-emerald-600 font-extrabold text-xl">≡</span>
                        <span>CH</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-600">
                  {current.desc}
                </p>
              </div>

              {/* Parameters Breakdown */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200">
                  <div className="text-stone-400">Ikatan</div>
                  <div className="font-bold text-stone-800 mt-0.5">{current.bond}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200">
                  <div className="text-stone-400">Hibridisasi</div>
                  <div className="font-bold text-emerald-700 mt-0.5">{current.hybrid}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200">
                  <div className="text-stone-400">Sudut</div>
                  <div className="font-bold text-stone-800 mt-0.5">{current.angle}</div>
                </div>
              </div>

              {/* Bottom Direct CTA */}
              <a
                href="#lab"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow transition-all cursor-pointer"
              >
                <span>Lihat Senyawa Ini di Laboratorium 3D</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

            </div>

            {/* Floating Achievement Badge */}
            <div className="hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-200 shadow-xl absolute -bottom-6 -left-6 animate-float">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Atom className="w-6 h-6 animate-spin" style={{ animationDuration: '10s' }} />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-800 font-heading">Geometri 3D Karbon</div>
                <div className="text-[11px] text-stone-500">Tetrahedral • Planar • Linear</div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
