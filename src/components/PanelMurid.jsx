import React from 'react';
import HeroSection from './HeroSection.jsx';
import MateriSection from './MateriSection.jsx';
import LabMolekul from './LabMolekul.jsx';
import Kuis from './Kuis.jsx';
import { Award, BookOpen, Compass, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PanelMurid({
  onNavigate,
  onProgressUpdate,
  onQuizCompleted,
  progressState
}) {
  const completedCount = progressState?.completedModules?.length || 0;
  const quizScore = progressState?.quizScore;

  return (
    <div className="panel-murid-container">
      {/* Banner Ringkasan Progres Belajar Siswa */}
      <div className="student-dashboard-hero-badge">
        <div className="badge-welcome-group">
          <div className="badge-icon-box">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="badge-welcome-title">Panel Belajar Mandiri Siswa</h3>
            <p className="badge-welcome-sub">
              Selesaikan modul materi, eksplorasi simulasi molekul 3D, dan ukur pemahamanmu melalui kuis interaktif.
            </p>
          </div>
        </div>

        <div className="badge-stats-pills">
          <div className="stat-pill">
            <BookOpen size={16} />
            <span>Modul: <strong>{completedCount}/3 Selesai</strong></span>
          </div>
          <div className="stat-pill">
            <Award size={16} />
            <span>Skor Kuis: <strong>{quizScore !== null ? `${quizScore}/100` : 'Belum Dikerjakan'}</strong></span>
          </div>
        </div>
      </div>

      {/* 1. Hero Section (Beranda) */}
      <HeroSection
        onStartExploration={() => onNavigate('materi')}
        onOpenLab={() => onNavigate('lab')}
      />

      <div className="section-divider"></div>

      {/* 2. Materi & Modul (Alkana, Alkena, Alkuna, IUPAC, Isomerisme) */}
      <MateriSection
        onProgressUpdate={onProgressUpdate}
      />

      <div className="section-divider"></div>

      {/* 3. Lab Molekul 3D (Simulasi Interaktif & MolView) */}
      <LabMolekul />

      <div className="section-divider"></div>

      {/* 4. Kuis Interaktif Gamifikasi */}
      <Kuis
        onQuizCompleted={onQuizCompleted}
      />
    </div>
  );
}
