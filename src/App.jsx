import React from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import TopicCards from './components/TopicCards.jsx';

export default function App() {
  const scrollToTopics = () => {
    const el = document.getElementById('topik-pembelajaran');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-layout">
      {/* 1. Navbar dengan identitas media */}
      <Navbar onNavigateTopic={scrollToTopics} />

      {/* Konten Halaman Beranda */}
      <main className="main-content">
        {/* 2. Hero dengan judul dan tombol "Mulai Belajar" */}
        <HeroSection onStartLearning={scrollToTopics} />

        {/* 3. Tiga kartu: Stoikiometri, Termokimia, dan Larutan Asam-Basa */}
        <TopicCards />
      </main>

      {/* Footer Edukasi Baku */}
      <footer className="footer-container">
        <div className="footer-inner">
          <p className="footer-brand">
            <strong>HidroKarbon Explorer</strong> • Media Pembelajaran Mandiri Kimia Fase E
          </p>
          <p className="footer-sub">
            Dikembangkan sesuai Capaian Pembelajaran Kurikulum Merdeka SMA Kelas X.
            Seluruh data progres belajar kamu disimpan secara aman dan anonim di browser lokal.
          </p>
        </div>
      </footer>
    </div>
  );
}
