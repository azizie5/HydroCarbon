import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  UserPlus, 
  LogIn, 
  KeyRound, 
  AlertCircle, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail 
} from 'firebase/auth';
import { auth } from '../firebase';
import { recordStudentActivity } from '../utils/storage.js';

/**
 * =============================================================================
 * KOMPONEN MANDIRI: AuthModal (Login, Register, Forgot Password)
 * =============================================================================
 * Tema Warna Pastel:
 * - Background Form   : Krem (#FFFDD0)
 * - Teks & Tombol Utama: Hijau Zaitun (#667436)
 * - Aksen & Border    : Pink Lembut (#FFC0CB)
 * 
 * Props:
 * - isOpen (boolean)     : Menentukan apakah modal tampil atau tersembunyi
 * - onClose (function)   : Callback saat pengguna menutup modal
 * - onSuccess (function) : Callback saat login/register berhasil (menerima user object)
 * - initialMode (string) : 'login' | 'register' | 'forgot' (default: 'login')
 * =============================================================================
 */
export default function AuthModal({ 
  isOpen = false, 
  onClose, 
  onSuccess, 
  initialMode = 'login' 
}) {
  // State navigasi antar form: 'login' | 'register' | 'forgot'
  const [mode, setMode] = useState(initialMode);

  // State input form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State toggle lihat/sembunyikan password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State status eksekusi
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Jika modal ditutup, jangan render apa pun
  if (!isOpen) return null;

  // Reset form saat berpindah mode navigasi form
  const switchMode = (newMode) => {
    setMode(newMode);
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Menerjemahkan kode error Firebase ke Bahasa Indonesia yang ramah & informatif
  const getFriendlyErrorMessage = (code, fullError) => {
    const errorStr = (fullError?.message || '') + ' ' + (code || '');
    
    if (errorStr.includes('CONFIGURATION_NOT_FOUND') || code === 'auth/configuration-not-found') {
      return 'Layanan Authentication BELUM DIMULAI di Firebase Console! Buka Firebase Console (proyek hydrocarbon-ecbea) > menu "Authentication" > klik tombol biru "Get started" (Mulai) > pilih tab "Sign-in method" > aktifkan "Email/Password".';
    }

    switch (code) {
      case 'auth/operation-not-allowed':
        return 'Layanan "Email/Password" belum diaktifkan di Firebase Console! Buka Firebase Console > Authentication > tab "Sign-in method" > klik Email/Password lalu pilih "Enable" dan simpan.';
      case 'auth/invalid-email':
        return 'Format alamat email tidak valid. Pastikan penulisan email sudah benar (contoh: nama@email.com).';
      case 'auth/user-not-found':
        return 'Akun dengan email ini belum terdaftar. Silakan pilih tab "Daftar sekarang" terlebih dahulu.';
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Email atau password yang kamu masukkan salah. Periksa kembali penulisan huruf besar/kecil.';
      case 'auth/email-already-in-use':
        return 'Email ini sudah terdaftar. Silakan gunakan email lain atau masuk ke akunmu.';
      case 'auth/weak-password':
        return 'Password terlalu lemah. Gunakan minimal 6 karakter.';
      case 'auth/too-many-requests':
        return 'Terlalu banyak percobaan gagal. Silakan tunggu beberapa saat atau reset password.';
      case 'auth/network-request-failed':
        return 'Gagal terhubung ke jaringan. Periksa koneksi internet atau matikan pemblokir iklan (adblock).';
      case 'auth/api-key-not-valid':
      case 'auth/invalid-api-key':
        return 'API Key Firebase tidak valid. Periksa kembali API Key di src/firebase/config.js.';
      case 'auth/unauthorized-domain':
        return 'Domain ini belum diizinkan di Firebase Console > Authentication > Settings > Authorized domains.';
      default:
        return fullError?.message 
          ? `Terjadi kesalahan (${code || 'Error'}): ${fullError.message}`
          : 'Terjadi kesalahan autentikasi. Pastikan Email/Password sudah diaktifkan di Firebase Console.';
    }
  };

  // Fungsi Masuk Cepat / Akun Demo (Memudahkan pengujian tanpa hambatan)
  const handleDemoLogin = () => {
    const demoUser = {
      email: email.trim() || 'siswa.kimia@hydrocarbon.edu',
      uid: 'demo-user-' + Date.now(),
      displayName: 'Siswa Kimia'
    };
    try {
      localStorage.setItem('hydrocarbon_demo_user', JSON.stringify(demoUser));
      const localModules = JSON.parse(localStorage.getItem('hidrokarbon_completed_modules') || '[]');
      const localScore = localStorage.getItem('hidrokarbon_quiz_score');
      recordStudentActivity({
        email: demoUser.email,
        nama: demoUser.displayName,
        modules: localModules,
        score: localScore !== null ? parseInt(localScore, 10) : null
      });
    } catch (e) {}

    setSuccessMessage('Berhasil masuk dengan Mode Demo Uji Coba!');
    if (onSuccess) onSuccess(demoUser);
    setTimeout(() => {
      if (onClose) onClose();
    }, 900);
  };

  // Eksekusi Submit Form (Login / Register / Forgot Password)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Validasi dasar input email
    if (!email.trim()) {
      setErrorMessage('Harap masukkan alamat email kamu.');
      return;
    }

    // MODE: REGISTER (PENDAFTARAN)
    if (mode === 'register') {
      if (!password) {
        setErrorMessage('Harap masukkan password.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password minimal harus terdiri dari 6 karakter.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Konfirmasi password tidak cocok dengan password.');
        return;
      }

      setIsLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        setSuccessMessage('Pendaftaran berhasil! Selamat datang.');
        
        try {
          const localModules = JSON.parse(localStorage.getItem('hidrokarbon_completed_modules') || '[]');
          const localScore = localStorage.getItem('hidrokarbon_quiz_score');
          recordStudentActivity({
            email: userCredential.user.email,
            nama: userCredential.user.displayName || userCredential.user.email.split('@')[0],
            modules: localModules,
            score: localScore !== null ? parseInt(localScore, 10) : null
          });
        } catch (e) {}

        if (onSuccess) onSuccess(userCredential.user);
        setTimeout(() => {
          if (onClose) onClose();
        }, 1200);
      } catch (err) {
        console.error('Firebase Auth Error:', err);
        setErrorMessage(getFriendlyErrorMessage(err.code, err));
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // MODE: LOGIN (MASUK)
    if (mode === 'login') {
      if (!password) {
        setErrorMessage('Harap masukkan password kamu.');
        return;
      }

      setIsLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
        setSuccessMessage('Berhasil masuk! Selamat belajar kembali.');
        
        try {
          const localModules = JSON.parse(localStorage.getItem('hidrokarbon_completed_modules') || '[]');
          const localScore = localStorage.getItem('hidrokarbon_quiz_score');
          recordStudentActivity({
            email: userCredential.user.email,
            nama: userCredential.user.displayName || userCredential.user.email.split('@')[0],
            modules: localModules,
            score: localScore !== null ? parseInt(localScore, 10) : null
          });
        } catch (e) {}

        if (onSuccess) onSuccess(userCredential.user);
        setTimeout(() => {
          if (onClose) onClose();
        }, 1000);
      } catch (err) {
        console.error('Firebase Auth Error:', err);
        setErrorMessage(getFriendlyErrorMessage(err.code, err));
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // MODE: FORGOT PASSWORD (RESET PASSWORD)
    if (mode === 'forgot') {
      setIsLoading(true);
      try {
        await sendPasswordResetEmail(auth, email.trim());
        setSuccessMessage('Tautan pemulihan password telah dikirim ke email kamu. Silakan periksa kotak masuk/spam.');
      } catch (err) {
        console.error('Firebase Auth Error:', err);
        setErrorMessage(getFriendlyErrorMessage(err.code, err));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div 
      className="auth-modal-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Box Form Autentikasi Mandiri */}
      <div 
        className="auth-modal-card" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Tutup Pop-up */}
        <button 
          type="button" 
          onClick={onClose} 
          className="auth-close-btn"
          aria-label="Tutup jendela autentikasi"
        >
          <X size={20} />
        </button>

        {/* Header Form */}
        <div className="auth-header">
          <div className="auth-icon-circle">
            {mode === 'login' && <LogIn size={26} />}
            {mode === 'register' && <UserPlus size={26} />}
            {mode === 'forgot' && <KeyRound size={26} />}
          </div>
          <h2 className="auth-title">
            {mode === 'login' && 'Masuk ke Akun Kamu'}
            {mode === 'register' && 'Buat Akun Baru'}
            {mode === 'forgot' && 'Pemulihan Password'}
          </h2>
          <p className="auth-subtitle">
            {mode === 'login' && 'Masuk untuk menyimpan riwayat belajar dan skor kuis kamu.'}
            {mode === 'register' && 'Daftar sekarang untuk memulai perjalanan belajar kimia hidrokarbon.'}
            {mode === 'forgot' && 'Masukkan email kamu dan kami akan mengirimkan tautan reset password.'}
          </p>
        </div>

        {/* Notifikasi Pesan Galat (Error) */}
        {errorMessage && (
          <div className="auth-alert error">
            <AlertCircle size={18} className="alert-icon" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Notifikasi Pesan Berhasil (Success) */}
        {successMessage && (
          <div className="auth-alert success">
            <CheckCircle2 size={18} className="alert-icon" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form Input Interaktif */}
        <form onSubmit={handleSubmit} className="auth-form-body">
          {/* Input Email */}
          <div className="auth-field-group">
            <label className="auth-label" htmlFor="auth-email">
              Alamat Email
            </label>
            <div className="auth-input-container">
              <Mail size={18} className="auth-field-icon" />
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@contoh.com"
                required
                className="auth-input-field"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Input Password (untuk Login & Register) */}
          {mode !== 'forgot' && (
            <div className="auth-field-group">
              <div className="auth-label-row">
                <label className="auth-label" htmlFor="auth-password">
                  Password
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="auth-link-text small"
                  >
                    Lupa password?
                  </button>
                )}
              </div>
              <div className="auth-input-container">
                <Lock size={18} className="auth-field-icon" />
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  required
                  className="auth-input-field with-toggle"
                  disabled={isLoading}
                />
                {/* Tombol Show/Hide Password */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-toggle-visibility-btn"
                  title={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          {/* Input Konfirmasi Password (Khusus Register) */}
          {mode === 'register' && (
            <div className="auth-field-group">
              <label className="auth-label" htmlFor="auth-confirm-password">
                Ulangi Konfirmasi Password
              </label>
              <div className="auth-input-container">
                <Lock size={18} className="auth-field-icon" />
                <input
                  id="auth-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Masukkan kembali password"
                  required
                  className="auth-input-field with-toggle"
                  disabled={isLoading}
                />
                {/* Tombol Show/Hide Confirm Password */}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="auth-toggle-visibility-btn"
                  title={showConfirmPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          {/* Tombol Eksekusi Utama */}
          <button
            type="submit"
            disabled={isLoading}
            className="auth-submit-btn"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="spin-icon" />
                <span>Sedang Memproses...</span>
              </>
            ) : (
              <>
                {mode === 'login' && 'Masuk Sekarang'}
                {mode === 'register' && 'Daftar Akun Baru'}
                {mode === 'forgot' && 'Kirim Link Reset Password'}
              </>
            )}
          </button>

          {/* Opsi Uji Coba Cepat (Mode Simulasi Demo) */}
          <div className="auth-divider-demo">
            <span>atau</span>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="auth-demo-btn"
            title="Masuk langsung untuk pengujian antarmuka tanpa perlu aktivasi Firebase"
          >
            ⚡ Masuk Cepat (Mode Simulasi Demo)
          </button>
        </form>

        {/* Tautan Navigasi Antar Form */}
        <div className="auth-footer-nav">
          {mode === 'login' && (
            <p className="auth-switch-text">
              Belum punya akun?{' '}
              <button
                type="button"
                onClick={() => switchMode('register')}
                className="auth-link-text highlight"
              >
                Daftar sekarang
              </button>
            </p>
          )}

          {mode === 'register' && (
            <p className="auth-switch-text">
              Sudah punya akun sebelumnya?{' '}
              <button
                type="button"
                onClick={() => switchMode('login')}
                className="auth-link-text highlight"
              >
                Masuk ke akunmu
              </button>
            </p>
          )}

          {mode === 'forgot' && (
            <p className="auth-switch-text">
              Ingat password kamu kembali?{' '}
              <button
                type="button"
                onClick={() => switchMode('login')}
                className="auth-link-text highlight"
              >
                Kembali ke halaman Masuk
              </button>
            </p>
          )}
        </div>
      </div>

      {/* =====================================================================
          STYLING MANDIRI SCOPED DENGAN TEMA PASTEL:
          - Background Form Krem        : #FFFDD0
          - Teks & Tombol Utama Hijau   : #667436
          - Aksen & Border Pink Lembut  : #FFC0CB
         ===================================================================== */}
      <style>{`
        .auth-modal-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(102, 116, 54, 0.45);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: authFadeIn 0.25s ease-out;
        }

        @keyframes authFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .auth-modal-card {
          background-color: #FFFDD0; /* Background Form Krem */
          border: 3px solid #FFC0CB; /* Border Pink Lembut */
          border-radius: 24px;
          max-width: 440px;
          width: 100%;
          padding: 32px 28px;
          position: relative;
          box-shadow: 0 16px 36px rgba(102, 116, 54, 0.22), 0 0 0 1px rgba(255, 192, 203, 0.4);
          color: #667436; /* Teks Hijau Zaitun */
          font-family: inherit;
          animation: authSlideUp 0.25s ease-out;
        }

        @keyframes authSlideUp {
          from { transform: translateY(16px) scale(0.97); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .auth-close-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          background-color: #FFFDD0;
          border: 2px solid #FFC0CB;
          color: #667436;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .auth-close-btn:hover {
          background-color: #FFC0CB;
          color: #667436;
          transform: rotate(90deg);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 22px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .auth-icon-circle {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background-color: #667436; /* Hijau Zaitun */
          color: #FFFDD0;            /* Krem */
          border: 3px solid #FFC0CB; /* Pink Lembut */
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          box-shadow: 0 4px 12px rgba(102, 116, 54, 0.15);
        }

        .auth-title {
          font-size: 24px;
          font-weight: 800;
          color: #667436;
          margin: 0 0 6px 0;
          line-height: 1.25;
        }

        .auth-subtitle {
          font-size: 13.5px;
          color: #667436;
          opacity: 0.9;
          margin: 0;
          line-height: 1.5;
        }

        .auth-alert {
          border-radius: 12px;
          padding: 10px 14px;
          margin-bottom: 18px;
          font-size: 13px;
          line-height: 1.45;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .auth-alert.error {
          background-color: #ffe4e6;
          border: 1.5px solid #FFC0CB;
          color: #881337;
        }

        .auth-alert.success {
          background-color: #ecfccb;
          border: 1.5px solid #667436;
          color: #365314;
        }

        .alert-icon {
          flex-shrink: 0;
          margin-top: 1px;
        }

        .auth-form-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .auth-field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: left;
        }

        .auth-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .auth-label {
          font-size: 13px;
          font-weight: 700;
          color: #667436;
        }

        .auth-input-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .auth-field-icon {
          position: absolute;
          left: 14px;
          color: #667436;
          pointer-events: none;
          opacity: 0.85;
        }

        .auth-input-field {
          width: 100%;
          background-color: #FFFFFF;
          border: 2px solid #FFC0CB; /* Border Pink Lembut */
          border-radius: 14px;
          padding: 12px 14px 12px 42px;
          font-size: 14px;
          color: #667436;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          font-family: inherit;
        }

        .auth-input-field.with-toggle {
          padding-right: 44px;
        }

        .auth-input-field:focus {
          border-color: #667436; /* Highlight Hijau Zaitun saat fokus */
          box-shadow: 0 0 0 3px rgba(255, 192, 203, 0.45);
        }

        .auth-input-field::placeholder {
          color: #667436;
          opacity: 0.45;
        }

        .auth-toggle-visibility-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #667436;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          opacity: 0.75;
          transition: opacity 0.2s ease;
        }

        .auth-toggle-visibility-btn:hover {
          opacity: 1;
        }

        .auth-submit-btn {
          margin-top: 8px;
          width: 100%;
          background-color: #667436; /* Tombol Utama Hijau Zaitun */
          color: #FFFDD0;            /* Teks Krem */
          border: 2px solid #667436;
          border-radius: 14px;
          padding: 13px 20px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(102, 116, 54, 0.25);
          transition: transform 0.2s ease, opacity 0.2s ease, background-color 0.2s ease;
          font-family: inherit;
        }

        .auth-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          opacity: 0.95;
          box-shadow: 0 6px 16px rgba(102, 116, 54, 0.3);
        }

        .auth-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spin-icon {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .auth-divider-demo {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 6px 0;
          color: #667436;
          opacity: 0.6;
          font-size: 12px;
          font-weight: 700;
        }

        .auth-divider-demo::before,
        .auth-divider-demo::after {
          content: '';
          flex: 1;
          border-bottom: 1.5px dashed #FFC0CB;
        }

        .auth-divider-demo span {
          padding: 0 10px;
        }

        .auth-demo-btn {
          width: 100%;
          background-color: #FFFDD0;
          color: #667436;
          border: 1.5px dashed #667436;
          border-radius: 14px;
          padding: 9px 16px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
          font-family: inherit;
        }

        .auth-demo-btn:hover {
          background-color: #FFC0CB;
          transform: translateY(-1px);
        }

        .auth-footer-nav {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1.5px dashed #FFC0CB;
          text-align: center;
        }

        .auth-switch-text {
          font-size: 13.5px;
          color: #667436;
          margin: 0;
        }

        .auth-link-text {
          background: none;
          border: none;
          padding: 0;
          color: #667436;
          font-family: inherit;
          font-size: inherit;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: opacity 0.2s ease;
        }

        .auth-link-text.small {
          font-size: 12px;
          font-weight: 600;
        }

        .auth-link-text.highlight {
          color: #667436;
          font-weight: 800;
        }

        .auth-link-text:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}

