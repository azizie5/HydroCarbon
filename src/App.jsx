import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MateriSection from './components/MateriSection';
import MoleculeLab from './components/MoleculeLab';
import QuizSection from './components/QuizSection';
import ProfileModal from './components/ProfileModal';
import TeacherPortalModal from './components/TeacherPortalModal';
import InitialLoginPanel from './components/InitialLoginPanel';
import OnboardingTour from './components/OnboardingTour';
import Footer from './components/Footer';

export default function App() {
  // State Panel Login Awal: Otomatis terbuka saat website pertama kali dibuka
  const [isInitialAuthOpen, setIsInitialAuthOpen] = useState(true);

  // State Modal Profil Siswa & Portal Guru
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTeacherPortalOpen, setIsTeacherPortalOpen] = useState(false);

  // Callback saat Siswa berhasil login dari panel awal
  const handleStudentLoginSuccess = () => {
    setIsInitialAuthOpen(false);
    setIsProfileOpen(true); // Langsung tampilkan profil siswa
  };

  // Callback saat Guru berhasil login dari panel awal
  const handleTeacherLoginSuccess = () => {
    setIsInitialAuthOpen(false);
    setIsTeacherPortalOpen(true); // Langsung tampilkan dashboard guru
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 selection:bg-emerald-200 selection:text-emerald-950 font-sans">
      {/* Sticky Glass Navbar dengan pemicu Profil Siswa, Portal Guru, dan Login Awal */}
      <Navbar 
        onOpenProfile={() => setIsProfileOpen(true)} 
        onOpenTeacherPortal={() => setIsTeacherPortalOpen(true)}
        onOpenLoginPanel={() => setIsInitialAuthOpen(true)}
      />

      {/* Main Single Page Content */}
      <main>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Materi & Modul Section (Alkana, Alkena, Alkuna, Isomer, IUPAC Explorer) */}
        <MateriSection />

        {/* 3. Interactive 3D Molecule Lab */}
        <MoleculeLab />

        {/* 4. Gamified Quiz Section */}
        <QuizSection />
      </main>

      {/* Panel Login Awal (Siswa & Guru) di Awal Buka Website */}
      <InitialLoginPanel
        isOpen={isInitialAuthOpen}
        onClose={() => setIsInitialAuthOpen(false)}
        onStudentLoginSuccess={handleStudentLoginSuccess}
        onTeacherLoginSuccess={handleTeacherLoginSuccess}
      />

      {/* Pop-up Modal Profil Siswa Terintegrasi Firebase */}
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />

      {/* Pop-up Portal & Dashboard Khusus Guru Kimia */}
      <TeacherPortalModal
        isOpen={isTeacherPortalOpen}
        onClose={() => setIsTeacherPortalOpen(false)}
      />

      {/* Panduan Tur Onboarding — hanya tampil sekali untuk pengguna baru */}
      <OnboardingTour />

      {/* Footer */}
      <Footer />
    </div>
  );
}
