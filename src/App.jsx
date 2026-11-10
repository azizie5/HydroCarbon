import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MateriSection from './components/MateriSection';
import MoleculeLab from './components/MoleculeLab';
import QuizSection from './components/QuizSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 selection:bg-emerald-200 selection:text-emerald-950 font-sans">
      {/* Sticky Glass Navbar */}
      <Navbar />

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

      {/* Footer */}
      <Footer />
    </div>
  );
}
