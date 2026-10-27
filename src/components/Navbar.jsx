import React, { useState, useEffect } from 'react';
import { Atom, BookOpen, Award, Sparkles } from 'lucide-react';

export default function Navbar({ onNavigateTopic }) {
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    // Membaca progres belajar tersimpan secara anonim dari localStorage
    try {
      const savedModules = JSON.parse(localStorage.getItem('hidrokarbon_completed_modules') || '[]');
      setCompletedCount(savedModules.length);
    } catch {
      setCompletedCount(0);
    }
  }, []);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar-container" aria-label="Navigasi Utama">
        {/* Identitas Media */}
        <div className="navbar-brand">
          <div className="brand-icon-box" aria-hidden="true">
            <Atom className="brand-icon" size={24} />
          </div>
          <div className="brand-text-group">
            <span className="brand-name">
              HidroKarbon <span className="brand-accent">Explorer</span>
            </span>
            <span className="brand-tagline">
              Media Pembelajaran Kimia • Fase E (Kelas X)
            </span>
          </div>
        </div>

        {/* Menu Navigasi & Progres Anonim Siswa */}
        <div className="navbar-actions">
          <div className="nav-links">
            <a href="#beranda" className="nav-link active">
              Beranda
            </a>
            <a href="#topik-pembelajaran" className="nav-link">
              Topik Materi
            </a>
          </div>

          <div 
            className="student-progress-badge"
            title="Progres modul yang sudah kamu selesaikan (tersimpan otomatis di browser kamu)"
          >
            <Award className="progress-icon" size={16} />
            <span className="progress-text">
              Progresmu: <strong>{completedCount} Topik</strong> Selesai
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}
