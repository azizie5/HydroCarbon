import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MateriSection from './components/MateriSection';
import MoleculeLab from './components/MoleculeLab';
import QuizSection from './components/QuizSection';
import ProfileModal from './components/ProfileModal';
import Footer from './components/Footer';

export default function App() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 selection:bg-emerald-200 selection:text-emerald-950 font-sans">
      {/* Sticky Glass Navbar dengan pemicu Profil Siswa */}
      <Navbar onOpenProfile={() => setIsProfileOpen(true)} />

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

      {/* Pop-up Modal Profil Siswa Terintegrasi Firebase */}
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
