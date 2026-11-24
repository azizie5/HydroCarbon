import React, { useState, useEffect } from 'react';
import { 
  Atom, 
  Award, 
  Menu, 
  X, 
  LogIn, 
  LogOut, 
  UserCheck,
  GraduationCap,
  BookOpenCheck,
  BarChart3,
  Users,
  HelpCircle,
  FileText
} from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import AuthModal from './AuthModal.jsx';
import { recordStudentActivity } from '../utils/storage.js';

export default function Navbar({ 
  activeSection, 
  onNavigate,
  userRole = 'murid',
  onRoleChange,
  currentUser: propCurrentUser = null,
  onLogout: propOnLogout = null,
  onOpenPortal = null
}) {
  const [completedCount, setCompletedCount] = useState(0);
  const [quizScore, setQuizScore] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State untuk autentikasi Firebase lokal (jika tidak dipass dari App)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedAuth = localStorage.getItem('hydrocarbon_auth_user');
      if (savedAuth) return JSON.parse(savedAuth);
    } catch (e) {}
    return null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const effectiveUser = propCurrentUser || currentUser;

  // Memantau status login Firebase & akun demo secara real-time
  useEffect(() => {
    try {
      const savedDemo = localStorage.getItem('hydrocarbon_demo_user');
      if (savedDemo) {
        const parsed = JSON.parse(savedDemo);
        setCurrentUser(parsed);

        const localModules = JSON.parse(localStorage.getItem('hidrokarbon_completed_modules') || '[]');
        const localScore = localStorage.getItem('hidrokarbon_quiz_score');
        recordStudentActivity({
          email: parsed.email,
          nama: parsed.displayName || parsed.email.split('@')[0],
          modules: localModules,
          score: localScore !== null ? parseInt(localScore, 10) : null
        });
      }
    } catch (e) {}

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);

        const localModules = JSON.parse(localStorage.getItem('hidrokarbon_completed_modules') || '[]');
        const localScore = localStorage.getItem('hidrokarbon_quiz_score');
        recordStudentActivity({
          email: user.email,
          nama: user.displayName || user.email.split('@')[0],
          modules: localModules,
          score: localScore !== null ? parseInt(localScore, 10) : null
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync anonymous progress from localStorage
  const refreshProgress = () => {
    try {
      const savedModules = JSON.parse(localStorage.getItem('hidrokarbon_completed_modules') || '[]');
      setCompletedCount(savedModules.length);

      const savedScore = localStorage.getItem('hidrokarbon_quiz_score');
      if (savedScore !== null) {
        setQuizScore(parseInt(savedScore, 10));
      }
    } catch {
      setCompletedCount(0);
      setQuizScore(null);
    }
  };

  useEffect(() => {
    refreshProgress();
    window.addEventListener('storage', refreshProgress);
    return () => window.removeEventListener('storage', refreshProgress);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('hydrocarbon_auth_user');
      localStorage.removeItem('hydrocarbon_demo_user');
      await signOut(auth);
      setCurrentUser(null);
    } catch (err) {
      console.error('Gagal keluar akun', err);
      setCurrentUser(null);
    }
    if (propOnLogout) {
      propOnLogout();
    }
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar-container" aria-label="Navigasi Utama">
        {/* Brand Identitas HydrocarbonEdu */}
        <div 
          className="navbar-brand cursor-pointer" 
          onClick={() => handleNavClick('beranda')}
          role="button"
          tabIndex={0}
        >
          <div className="brand-icon-box" aria-hidden="true">
            <Atom className="brand-icon" size={26} />
          </div>
          <div className="brand-text-group">
            <span className="brand-name">
              Hydrocarbon<span className="brand-accent">Edu</span>
            </span>
            <span className="brand-tagline">
              Kimia Interaktif • Alkana, Alkena, & Alkuna
            </span>
          </div>
        </div>

        {/* Desktop Nav Links & Role Switcher */}
        <div className="desktop-nav-group">
          {/* Switcher 2 Panel: Murid vs Guru */}
          <div className="role-switcher-box" title="Beralih antara Panel Murid dan Panel Guru">
            <button
              type="button"
              onClick={() => onRoleChange && onRoleChange('murid')}
              className={`role-tab-btn ${userRole === 'murid' ? 'active' : ''}`}
            >
              <GraduationCap size={15} />
              <span>Panel Murid</span>
            </button>
            <button
              type="button"
              onClick={() => onRoleChange && onRoleChange('guru')}
              className={`role-tab-btn ${userRole === 'guru' ? 'active' : ''}`}
            >
              <BookOpenCheck size={15} />
              <span>Panel Guru</span>
            </button>
          </div>

          {/* Nav Links Sesuai Role Aktif */}
          {userRole === 'murid' ? (
            <div className="nav-links">
              <button
                type="button"
                onClick={() => handleNavClick('beranda')}
                className={`nav-link ${activeSection === 'beranda' ? 'active' : ''}`}
              >
                Beranda
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('materi')}
                className={`nav-link ${activeSection === 'materi' ? 'active' : ''}`}
              >
                Materi & Modul
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('lab')}
                className={`nav-link ${activeSection === 'lab' ? 'active' : ''}`}
              >
                Lab Molekul 3D
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('kuis')}
                className={`nav-link ${activeSection === 'kuis' ? 'active' : ''}`}
              >
                Kuis Interaktif
              </button>
            </div>
          ) : (
            <div className="nav-links">
              <button
                type="button"
                onClick={() => handleNavClick('panel-guru')}
                className="nav-link active"
              >
                Dashboard Pendidik
              </button>
            </div>
          )}

          {/* Student Progress Badge (Murid) vs Teacher Badge (Guru) */}
          {userRole === 'murid' ? (
            <div 
              className="student-progress-badge"
              title="Progres belajar kamu tersimpan aman di browser"
            >
              <Award className="progress-icon" size={17} />
              <span className="progress-text">
                Progresmu: <strong>{completedCount}/3 Modul</strong>
                {quizScore !== null && ` • Nilai: ${quizScore}`}
              </span>
            </div>
          ) : (
            <div 
              className="student-progress-badge teacher-badge"
              title="Anda sedang berada di mode pengelolaan Guru"
            >
              <BookOpenCheck className="progress-icon" size={17} />
              <span className="progress-text">
                Mode: <strong>Pengajar Aktif</strong>
              </span>
            </div>
          )}

          {/* Tombol Autentikasi Pastel (Login / User Info) */}
          {!effectiveUser ? (
            <button
              type="button"
              onClick={() => onOpenPortal ? onOpenPortal() : setIsAuthModalOpen(true)}
              className="btn-auth-trigger"
              title="Buka Portal Masuk Siswa / Guru"
            >
              <LogIn size={16} />
              <span>Portal Masuk</span>
            </button>
          ) : (
            <div className="user-logged-box">
              <div 
                className="user-avatar-tag" 
                title={`${effectiveUser.role === 'guru' ? 'Akun Pendidik' : 'Akun Siswa'}: ${effectiveUser.email || effectiveUser.nama}`}
              >
                {effectiveUser.role === 'guru' ? <BookOpenCheck size={16} /> : <GraduationCap size={16} />}
                <span className="user-email-preview">
                  {effectiveUser.nama || effectiveUser.email?.split('@')[0]}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="btn-logout-trigger"
                title="Keluar dari sesi dan kembali ke portal login awal"
              >
                <LogOut size={14} />
                <span>Keluar Portal</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="btn-mobile-menu"
          aria-label={isMobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-drawer">
          {/* Role Switcher Mobile */}
          <div className="mobile-role-switcher">
            <span className="mobile-role-label">Pilih Tampilan Panel:</span>
            <div className="role-switcher-box full-width">
              <button
                type="button"
                onClick={() => {
                  onRoleChange && onRoleChange('murid');
                  setIsMobileMenuOpen(false);
                }}
                className={`role-tab-btn ${userRole === 'murid' ? 'active' : ''}`}
              >
                <GraduationCap size={15} />
                <span>Panel Murid</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onRoleChange && onRoleChange('guru');
                  setIsMobileMenuOpen(false);
                }}
                className={`role-tab-btn ${userRole === 'guru' ? 'active' : ''}`}
              >
                <BookOpenCheck size={15} />
                <span>Panel Guru</span>
              </button>
            </div>
          </div>

          {userRole === 'murid' ? (
            <>
              <button
                type="button"
                onClick={() => handleNavClick('beranda')}
                className={`mobile-nav-link ${activeSection === 'beranda' ? 'active' : ''}`}
              >
                Beranda
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('materi')}
                className={`mobile-nav-link ${activeSection === 'materi' ? 'active' : ''}`}
              >
                Materi & Modul
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('lab')}
                className={`mobile-nav-link ${activeSection === 'lab' ? 'active' : ''}`}
              >
                Lab Molekul 3D
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('kuis')}
                className={`mobile-nav-link ${activeSection === 'kuis' ? 'active' : ''}`}
              >
                Kuis Interaktif
              </button>

              <div className="mobile-progress-badge">
                <Award size={16} />
                <span>
                  Progres Belajar: <strong>{completedCount}/3 Modul</strong>
                  {quizScore !== null && ` • Skor Kuis: ${quizScore}`}
                </span>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleNavClick('panel-guru')}
                className="mobile-nav-link active"
              >
                Dashboard Pendidik
              </button>
              <div className="mobile-progress-badge teacher-badge">
                <BookOpenCheck size={16} />
                <span>Mode Aktif: <strong>Pengajar & Asesmen</strong></span>
              </div>
            </>
          )}

          {/* Autentikasi di Mobile Drawer */}
          <div className="mobile-auth-section">
            {!effectiveUser ? (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenPortal) onOpenPortal();
                  else setIsAuthModalOpen(true);
                }}
                className="btn-auth-trigger mobile-btn"
              >
                <LogIn size={16} />
                <span>Portal Masuk Siswa / Guru</span>
              </button>
            ) : (
              <div className="mobile-user-row">
                <div className="user-avatar-tag">
                  {effectiveUser.role === 'guru' ? <BookOpenCheck size={16} /> : <GraduationCap size={16} />}
                  <span>{effectiveUser.nama || effectiveUser.email}</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn-logout-trigger"
                >
                  <LogOut size={14} />
                  <span>Keluar Portal</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pop-up Modal Autentikasi Firebase (Login, Register, Forgot Password) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
        }}
      />

      {/* CSS Khusus Tombol Autentikasi & Role Switcher */}
      <style>{`
        .role-switcher-box {
          display: inline-flex;
          align-items: center;
          background-color: var(--pistachio);
          border: 1.5px solid var(--fern);
          border-radius: var(--radius-full);
          padding: 3px;
          gap: 2px;
        }

        .role-switcher-box.full-width {
          width: 100%;
        }

        .role-switcher-box.full-width .role-tab-btn {
          flex: 1;
          justify-content: center;
        }

        .role-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: var(--fern);
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .role-tab-btn:hover {
          background-color: rgba(62, 132, 64, 0.1);
        }

        .role-tab-btn.active {
          background-color: var(--fern);
          color: var(--parchment);
          box-shadow: 0 2px 6px rgba(62, 132, 64, 0.2);
        }

        .student-progress-badge.teacher-badge {
          background-color: var(--parchment);
          border-color: var(--fern);
        }

        .mobile-role-switcher {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-bottom: 8px;
          border-bottom: 1.5px dashed var(--fern);
        }

        .mobile-role-label {
          font-size: 12px;
          font-weight: 700;
          color: var(--fern);
          text-transform: uppercase;
        }

        .btn-auth-trigger {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #667436; /* Hijau Zaitun */
          color: #FFFDD0;            /* Krem */
          border: 2px solid #FFC0CB; /* Pink Lembut */
          font-family: inherit;
          font-size: 13.5px;
          font-weight: 700;
          padding: 7px 18px;
          border-radius: 9999px;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 2px 8px rgba(102, 116, 54, 0.18);
        }

        .btn-auth-trigger:hover {
          transform: translateY(-1.5px);
          opacity: 0.95;
          box-shadow: 0 4px 12px rgba(102, 116, 54, 0.25);
        }

        .btn-auth-trigger.mobile-btn {
          width: 100%;
          justify-content: center;
          padding: 11px 18px;
          font-size: 14.5px;
        }

        .user-logged-box {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #FFFDD0; /* Krem */
          border: 1.5px solid #FFC0CB; /* Pink Lembut */
          border-radius: 9999px;
          padding: 4px 6px 4px 12px;
        }

        .user-avatar-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: #667436; /* Hijau Zaitun */
        }

        .user-email-preview {
          max-width: 110px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .btn-logout-trigger {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background-color: #FFC0CB; /* Pink Lembut */
          color: #667436;            /* Hijau Zaitun */
          border: 1px solid #667436;
          font-family: inherit;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 9999px;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .btn-logout-trigger:hover {
          opacity: 0.85;
        }

        .mobile-auth-section {
          margin-top: 6px;
          padding-top: 10px;
          border-top: 1px dashed #FFC0CB;
        }

        .mobile-user-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          background-color: #FFFDD0;
          border: 1.5px solid #FFC0CB;
          border-radius: 12px;
        }
      `}</style>
    </header>
  );
}
