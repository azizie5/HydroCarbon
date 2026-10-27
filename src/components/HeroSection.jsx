import React from 'react';
import { ArrowRight, Sparkles, BookOpenCheck, Flame, Atom, Zap } from 'lucide-react';

export default function HeroSection({ onStartLearning }) {
  const handleScrollToTopics = () => {
    if (onStartLearning) {
      onStartLearning();
    } else {
      const target = document.getElementById('topik-pembelajaran');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="hero-container" id="beranda" aria-labelledby="hero-title">
      {/* Visual Ambient Glows */}
      <div className="hero-glow glow-cyan" aria-hidden="true"></div>
      <div className="hero-glow glow-purple" aria-hidden="true"></div>

      <div className="hero-inner">
        {/* Badge Kurikulum */}
        <div className="curriculum-badge">
          <Sparkles size={15} className="badge-sparkle" />
          <span>Kurikulum Merdeka • Kimia Fase E (Kelas X)</span>
        </div>

        {/* Judul Utama */}
        <h1 className="hero-main-heading" id="hero-title">
          Pahami Senyawa Hidrokarbon Bersama{' '}
          <span className="text-gradient">HidroKarbon Explorer</span>
        </h1>

        {/* Deskripsi & Sapaan Siswa (Menggunakan 'Kamu') Sesuai PRD */}
        <p className="hero-lead-text">
          Selamat datang! Di sini kamu dapat membedakan ikatan kovalen tunggal pada <strong>alkana</strong>,
          ikatan rangkap dua pada <strong>alkena</strong>, dan ikatan rangkap tiga pada <strong>alkuna</strong>.
          Kuasai rumus umum, deret homolog, dan aturan tata nama resmi IUPAC secara mudah dan interaktif!
        </p>

        {/* Aksi Utama: Tombol Mulai Belajar */}
        <div className="hero-action-group">
          <button 
            type="button"
            className="btn-primary-hero"
            onClick={handleScrollToTopics}
            aria-label="Mulai Belajar Modul Hidrokarbon"
          >
            <span>Mulai Belajar</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Quick Highlights Notasi Kimia Baku Sesuai AGENTS.md */}
        <div className="hero-features-bar">
          <div className="feature-pill">
            <Atom size={16} className="pill-icon text-emerald" />
            <span>Alkana: <strong>CₙH₂ₙ₊₂</strong> (CH₄, C₂H₆)</span>
          </div>
          <div className="feature-pill">
            <Zap size={16} className="pill-icon text-cyan" />
            <span>Alkena: <strong>CₙH₂ₙ</strong> (C₂H₄, C₃H₆)</span>
          </div>
          <div className="feature-pill">
            <Flame size={16} className="pill-icon text-purple" />
            <span>Alkuna: <strong>CₙH₂ₙ₋₂</strong> (C₂H₂, C₃H₄)</span>
          </div>
          <div className="feature-pill">
            <BookOpenCheck size={16} className="pill-icon text-amber" />
            <span>Penyimpanan Progres Anonim</span>
          </div>
        </div>
      </div>
    </section>
  );
}
