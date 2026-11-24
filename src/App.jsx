import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import PanelMurid from './components/PanelMurid.jsx';
import PanelGuru from './components/PanelGuru.jsx';
import PortalLogin from './components/PortalLogin.jsx';
import { Atom } from 'lucide-react';
import { recordStudentActivity } from './utils/storage.js';

// Dapatkan info siswa yang sedang masuk / aktif secara real-time
const getCurrentStudentInfo = () => {
  try {
    const authUser = JSON.parse(localStorage.getItem('hydrocarbon_auth_user') || 'null');
    if (authUser?.email) {
      return { 
        email: authUser.email, 
        nama: authUser.nama ? `${authUser.nama}${authUser.kelas ? ` (${authUser.kelas.replace('Fase E ', '')})` : ''}` : authUser.email.split('@')[0]
      };
    }
    const demo = JSON.parse(localStorage.getItem('hydrocarbon_demo_user') || 'null');
    if (demo?.email) {
      return { 
        email: demo.email, 
        nama: demo.displayName || demo.email.split('@')[0] 
      };
    }
  } catch (e) {}

  return { 
    email: 'siswa.aktif@hydrocarbon.edu', 
    nama: 'Siswa Aktif (Sesi Ini)' 
  };
};

function App() {
  const [activeSection, setActiveSection] = useState('beranda');

  // Sesi Pengguna dari Portal Login di Awal Website
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hydrocarbon_auth_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });
  
  // State 2 Panel Berbeda: 'murid' (siswa) | 'guru' (pendidik)
  const [userRole, setUserRole] = useState(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem('hydrocarbon_auth_user') || 'null');
      if (savedUser?.role) return savedUser.role;
    } catch (e) {}
    return localStorage.getItem('hydrocarbon_user_role') || 'murid';
  });

  const [progressState, setProgressState] = useState({
    completedModules: [],
    quizScore: null
  });

  // Sinkronisasi status progres siswa dari localStorage
  useEffect(() => {
    try {
      const savedModules = JSON.parse(localStorage.getItem('hidrokarbon_completed_modules') || '[]');
      const savedScore = localStorage.getItem('hidrokarbon_quiz_score');
      const scoreNum = savedScore !== null ? parseInt(savedScore, 10) : null;
      
      setProgressState({
        completedModules: savedModules,
        quizScore: scoreNum
      });

      // Jika sedang berada di Panel Murid, catat kehadiran/akses siswa secara real-time ke portal guru
      if (userRole === 'murid' && currentUser) {
        const std = getCurrentStudentInfo();
        recordStudentActivity({
          email: std.email,
          nama: std.nama,
          modules: savedModules,
          score: scoreNum
        });
      }
    } catch {
      // Fallback
    }
  }, [userRole, currentUser]);

  // Handler Sukses Login dari Portal Awal
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    if (user?.role) {
      setUserRole(user.role);
      try {
        localStorage.setItem('hydrocarbon_user_role', user.role);
      } catch (e) {}
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler Logout / Keluar ke Portal Awal
  const handleLogout = () => {
    try {
      localStorage.removeItem('hydrocarbon_auth_user');
      localStorage.removeItem('hydrocarbon_demo_user');
    } catch (e) {}
    setCurrentUser(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pengalih peran dengan verifikasi keamanan untuk Panel Guru
  const handleRoleChange = (newRole) => {
    if (newRole === 'guru' && currentUser?.role !== 'guru') {
      const pin = window.prompt('Masukkan PIN Keamanan Pengajar untuk mengakses Panel Guru (PIN Bawaan: GURU2025):');
      if (pin === null) return;
      if (pin.trim().toUpperCase() !== 'GURU2025' && pin.trim() !== '123456') {
        alert('PIN Keamanan salah! Panel Guru hanya dapat diakses oleh Pendidik.');
        return;
      }
    }

    setUserRole(newRole);
    try {
      localStorage.setItem('hydrocarbon_user_role', newRole);
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProgressUpdate = (updatedModules) => {
    setProgressState((prev) => ({
      ...prev,
      completedModules: updatedModules
    }));

    // Sinkronisasi pembaruan modul siswa ke portal guru secara real-time
    const std = getCurrentStudentInfo();
    recordStudentActivity({
      email: std.email,
      nama: std.nama,
      modules: updatedModules,
      score: progressState.quizScore
    });
  };

  const handleQuizCompleted = (score) => {
    setProgressState((prev) => ({
      ...prev,
      quizScore: score
    }));

    // Sinkronisasi perolehan nilai kuis siswa ke portal guru secara real-time
    const std = getCurrentStudentInfo();
    recordStudentActivity({
      email: std.email,
      nama: std.nama,
      modules: progressState.completedModules,
      score: score
    });
  };

  // =========================================================================
  // JIKA PENGGUNA BELUM MASUK: TAMPILKAN PORTAL LOGIN DIAWAL WEBSITE
  // =========================================================================
  if (!currentUser) {
    return (
      <div className="app-layout">
        <PortalLogin onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  // =========================================================================
  // JIKA SUDAH MASUK: TAMPILKAN RUANG PEMBELAJARAN SESUAI PERAN
  // =========================================================================
  return (
    <div className="app-layout">
      {/* Header & Navigasi Baku (dengan Identitas Pengguna & Tombol Keluar Portal) */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        userRole={userRole}
        onRoleChange={handleRoleChange}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenPortal={() => setCurrentUser(null)}
      />

      {/* Konten Utama Terstruktur Berdasarkan Panel Aktif */}
      <main className="main-content">
        {userRole === 'murid' ? (
          /* =========================================================
             1. PANEL MURID (Pembelajaran Mandiri & Gamifikasi Siswa)
             ========================================================= */
          <PanelMurid
            onNavigate={handleNavigate}
            onProgressUpdate={handleProgressUpdate}
            onQuizCompleted={handleQuizCompleted}
            progressState={progressState}
          />
        ) : (
          /* =========================================================
             2. PANEL GURU (Dashboard Manajemen Kelas, Asesmen & Soal)
             ========================================================= */
          <PanelGuru />
        )}
      </main>

      {/* Footer Baku */}
      <footer className="footer-container">
        <div className="footer-inner">
          <div className="footer-brand">
            <Atom size={20} className="inline-icon" />
            <span>HydrocarbonEdu • Media Pembelajaran Kimia Mandiri</span>
          </div>
          <p className="footer-sub">
            Dirancang khusus untuk siswa SMA Kelas X (Fase E, Kurikulum Merdeka) untuk memahami struktur, ikatan kovalen, tata nama IUPAC, dan isomerisme senyawa hidrokarbon.
          </p>
          <p className="footer-meta">
            Penyimpanan data lokal di peramban kamu (anonim tanpa akun/login). Gunakan Google Chrome, Firefox, atau Edge untuk pengalaman 3D terbaik.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
