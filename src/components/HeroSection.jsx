import React from 'react';
import { ArrowRight, Compass, Sparkles, Atom, Zap, Flame, CheckCircle2 } from 'lucide-react';

export default function HeroSection({ onStartExploration, onOpenLab }) {
  const handleScrollToMateri = () => {
    if (onStartExploration) {
      onStartExploration();
    } else {
      const target = document.getElementById('materi');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollToLab = () => {
    if (onOpenLab) {
      onOpenLab();
    } else {
      const target = document.getElementById('lab');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="hero-section-wrapper" id="beranda" aria-labelledby="hero-title">
      <div className="hero-content-grid">
        {/* Left Column: Text & CTA */}
        <div className="hero-text-col">
          <div className="hero-pill-badge">
            <Sparkles size={16} />
            <span>Belajar Kimia Jadi Menyenangkan</span>
          </div>

          <h1 className="hero-main-title" id="hero-title">
            Kuasai Struktur & Tata Nama <span className="title-accent">Hidrokarbon</span> Bersama HydrocarbonEdu
          </h1>

          <p className="hero-description">
            Selamat datang! Di sini kamu dapat mempelajari ikatan kovalen tunggal pada <strong>alkana</strong>, ikatan rangkap dua pada <strong>alkena</strong>, serta ikatan rangkap tiga pada <strong>alkuna</strong> secara interaktif. Eksplorasi bentuk ruang 3D atom karbon, kaidah resmi IUPAC, dan uji pemahamanmu dengan kuis gamifikasi!
          </p>

          <div className="hero-buttons-group">
            <button
              type="button"
              onClick={handleScrollToMateri}
              className="btn-hero-primary"
              aria-label="Mulai Eksplorasi Materi Hidrokarbon"
            >
              <span>Mulai Eksplorasi</span>
              <ArrowRight size={19} />
            </button>

            <button
              type="button"
              onClick={handleScrollToLab}
              className="btn-hero-secondary"
              aria-label="Buka Lab Molekul Tiga Dimensi"
            >
              <Compass size={18} />
              <span>Buka Lab Molekul 3D</span>
            </button>
          </div>

          {/* Quick Pillars */}
          <div className="hero-pills-row">
            <div className="mini-pill">
              <Atom size={16} />
              <span>Alkana: <strong className="text-mono">CₙH₂ₙ₊₂</strong></span>
            </div>
            <div className="mini-pill">
              <Zap size={16} />
              <span>Alkena: <strong className="text-mono">CₙH₂ₙ</strong></span>
            </div>
            <div className="mini-pill">
              <Flame size={16} />
              <span>Alkuna: <strong className="text-mono">CₙH₂ₙ₋₂</strong></span>
            </div>
          </div>
        </div>

        {/* Right Column: Beautiful Chemistry Vector Illustration */}
        <div className="hero-illustration-col" aria-hidden="true">
          <div className="illustration-card">
            <svg
              viewBox="0 0 460 360"
              className="hero-vector-svg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Decorative Background Circles */}
              <circle cx="230" cy="180" r="145" fill="var(--pistachio)" opacity="0.3" />
              <circle cx="230" cy="180" r="115" stroke="var(--fern)" strokeWidth="1.5" strokeDasharray="6 6" />

              {/* Central Alkene / Alkyne Chain Illustration */}
              {/* Bonds */}
              {/* Single Bond C1-H */}
              <line x1="140" y1="180" x2="80" y2="120" stroke="var(--fern)" strokeWidth="4" strokeLinecap="round" />
              <line x1="140" y1="180" x2="80" y2="240" stroke="var(--fern)" strokeWidth="4" strokeLinecap="round" />

              {/* Double Bond C1=C2 */}
              <line x1="140" y1="174" x2="260" y2="174" stroke="var(--fern)" strokeWidth="5" strokeLinecap="round" />
              <line x1="140" y1="186" x2="260" y2="186" stroke="var(--fern)" strokeWidth="5" strokeLinecap="round" />

              {/* Single Bond C2-C3 */}
              <line x1="260" y1="180" x2="360" y2="120" stroke="var(--fern)" strokeWidth="4" strokeLinecap="round" />
              {/* C2-H */}
              <line x1="260" y1="180" x2="300" y2="250" stroke="var(--fern)" strokeWidth="3.5" strokeLinecap="round" />

              {/* C3 Hydrogens (Tetrahedral branch) */}
              <line x1="360" y1="120" x2="410" y2="80" stroke="var(--fern)" strokeWidth="3" strokeLinecap="round" />
              <line x1="360" y1="120" x2="420" y2="150" stroke="var(--fern)" strokeWidth="3" strokeLinecap="round" />
              <line x1="360" y1="120" x2="340" y2="60" stroke="var(--fern)" strokeWidth="3" strokeLinecap="round" />

              {/* Orbit Ellipses */}
              <ellipse cx="200" cy="180" rx="90" ry="40" stroke="var(--melon)" strokeWidth="2" opacity="0.75" transform="rotate(-15 200 180)" />
              <ellipse cx="200" cy="180" rx="90" ry="40" stroke="var(--pistachio)" strokeWidth="2" opacity="0.75" transform="rotate(45 200 180)" />

              {/* Carbon Nodes */}
              {/* C1 */}
              <circle cx="140" cy="180" r="28" fill="var(--fern)" stroke="var(--parchment)" strokeWidth="3" />
              <text x="140" y="186" fill="var(--parchment)" fontSize="16" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">C₁</text>

              {/* C2 */}
              <circle cx="260" cy="180" r="28" fill="var(--fern)" stroke="var(--parchment)" strokeWidth="3" />
              <text x="260" y="186" fill="var(--parchment)" fontSize="16" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">C₂</text>

              {/* C3 */}
              <circle cx="360" cy="120" r="26" fill="var(--fern)" stroke="var(--parchment)" strokeWidth="3" />
              <text x="360" y="126" fill="var(--parchment)" fontSize="15" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">C₃</text>

              {/* Hydrogen Nodes */}
              {/* H on C1 */}
              <circle cx="80" cy="120" r="18" fill="var(--pistachio)" stroke="var(--fern)" strokeWidth="2" />
              <text x="80" y="125" fill="var(--fern)" fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">H</text>

              <circle cx="80" cy="240" r="18" fill="var(--pistachio)" stroke="var(--fern)" strokeWidth="2" />
              <text x="80" y="245" fill="var(--fern)" fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">H</text>

              {/* H on C2 */}
              <circle cx="300" cy="250" r="18" fill="var(--pistachio)" stroke="var(--fern)" strokeWidth="2" />
              <text x="300" y="255" fill="var(--fern)" fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">H</text>

              {/* H on C3 */}
              <circle cx="410" cy="80" r="16" fill="var(--pistachio)" stroke="var(--fern)" strokeWidth="2" />
              <text x="410" y="85" fill="var(--fern)" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">H</text>

              <circle cx="420" cy="150" r="16" fill="var(--pistachio)" stroke="var(--fern)" strokeWidth="2" />
              <text x="420" y="155" fill="var(--fern)" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">H</text>

              <circle cx="340" cy="60" r="16" fill="var(--pistachio)" stroke="var(--fern)" strokeWidth="2" />
              <text x="340" y="65" fill="var(--fern)" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">H</text>

              {/* Floating badges */}
              <g transform="translate(40, 40)">
                <rect width="115" height="34" rx="17" fill="var(--parchment)" stroke="var(--fern)" strokeWidth="1.5" />
                <text x="57" y="22" fill="var(--fern)" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">1-propena</text>
              </g>

              <g transform="translate(290, 290)">
                <rect width="130" height="34" rx="17" fill="var(--melon)" stroke="var(--fern)" strokeWidth="1.5" />
                <text x="65" y="22" fill="var(--fern)" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">Ikatan C=C (sp²)</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
