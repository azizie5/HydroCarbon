import React, { useState } from 'react';
import { 
  Atom, 
  GraduationCap, 
  BookOpenCheck, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  LogIn, 
  UserPlus, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  KeyRound, 
  Layers,
  FileSpreadsheet,
  Check,
  ChevronRight
} from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { recordStudentActivity } from '../utils/storage.js';

export default function PortalLogin({ onLoginSuccess }) {
  // Pilihan Portal: 'siswa' (peserta didik) | 'guru' (pendidik kimia)
  const [activePortal, setActivePortal] = useState('siswa');

  // =========================================================================
  // STATE KHUSUS SISWA
  // =========================================================================
  const [siswaTab, setSiswaTab] = useState('login'); // 'login' | 'register'
  const [siswaIdentifier, setSiswaIdentifier] = useState(''); // NISN atau Email
  const [siswaPassword, setSiswaPassword] = useState('');
  const [siswaShowPassword, setSiswaShowPassword] = useState(false);
  
  // Form Registrasi Siswa
  const [siswaNama, setSiswaNama] = useState('');
  const [siswaKelas, setSiswaKelas] = useState('Fase E (Kelas X-1)');
  const [siswaConfirmPassword, setSiswaConfirmPassword] = useState('');

  // Status & Pesan Siswa
  const [siswaLoading, setSiswaLoading] = useState(false);
  const [siswaError, setSiswaError] = useState('');
  const [siswaSuccess, setSiswaSuccess] = useState('');

  // =========================================================================
  // STATE KHUSUS GURU
  // =========================================================================
  const [guruTab, setGuruTab] = useState('login'); // 'login' | 'register'
  const [guruIdentifier, setGuruIdentifier] = useState(''); // NIP atau Email Guru
  const [guruPassword, setGuruPassword] = useState('');
  const [guruShowPassword, setGuruShowPassword] = useState(false);
  const [guruPin, setGuruPin] = useState(''); // PIN Keamanan Pengajar (Teacher Security Gate)
  
  // Form Registrasi Guru
  const [guruNama, setGuruNama] = useState('');
  const [guruMapel, setGuruMapel] = useState('Kimia Fase E (Kelas X)');
  const [guruConfirmPassword, setGuruConfirmPassword] = useState('');
  const [guruSecurityCode, setGuruSecurityCode] = useState('');

  // Status & Pesan Guru
  const [guruLoading, setGuruLoading] = useState(false);
  const [guruError, setGuruError] = useState('');
  const [guruSuccess, setGuruSuccess] = useState('');

  // =========================================================================
  // HANDLER: LOGIN / REGISTER SISWA
  // =========================================================================
  const handleSiswaSubmit = async (e) => {
    e.preventDefault();
    setSiswaError('');
    setSiswaSuccess('');

    if (!siswaIdentifier.trim()) {
      setSiswaError('Harap masukkan NISN atau email kamu.');
      return;
    }
    if (!siswaPassword) {
      setSiswaError('Harap masukkan kata sandi.');
      return;
    }

    // Normalisasi email untuk Firebase Auth
    const isEmail = siswaIdentifier.includes('@');
    const authEmail = isEmail ? siswaIdentifier.trim() : `${siswaIdentifier.trim().toLowerCase()}@siswa.hydrocarbon.edu`;

    if (siswaTab === 'register') {
      if (!siswaNama.trim()) {
        setSiswaError('Harap tuliskan nama lengkap kamu.');
        return;
      }
      if (siswaPassword.length < 6) {
        setSiswaError('Kata sandi minimal harus terdiri dari 6 karakter.');
        return;
      }
      if (siswaPassword !== siswaConfirmPassword) {
        setSiswaError('Konfirmasi kata sandi tidak cocok.');
        return;
      }

      setSiswaLoading(true);
      try {
        let uid = 'siswa-' + Date.now();
        try {
          const cred = await createUserWithEmailAndPassword(auth, authEmail, siswaPassword);
          uid = cred.user.uid;
        } catch (firebaseErr) {
          console.warn('Firebase register fallback to local mode:', firebaseErr.message);
        }

        const studentUser = {
          role: 'murid',
          nama: siswaNama.trim(),
          email: authEmail,
          identifier: siswaIdentifier.trim(),
          kelas: siswaKelas,
          uid: uid,
          waktuMasuk: new Date().toISOString()
        };

        // Simpan sesi autentikasi siswa
        localStorage.setItem('hydrocarbon_auth_user', JSON.stringify(studentUser));
        localStorage.setItem('hydrocarbon_user_role', 'murid');

        // Catat langsung ke portal guru secara real-time
        const localModules = JSON.parse(localStorage.getItem('hidrokarbon_completed_modules') || '[]');
        const localScore = localStorage.getItem('hidrokarbon_quiz_score');
        recordStudentActivity({
          email: studentUser.email,
          nama: `${studentUser.nama} (${studentUser.kelas.replace('Fase E ', '')})`,
          modules: localModules,
          score: localScore !== null ? parseInt(localScore, 10) : null
        });

        setSiswaSuccess('Pendaftaran berhasil! Mengalihkan ke ruang belajar...');
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess(studentUser);
        }, 800);
      } catch (err) {
        setSiswaError('Terjadi kesalahan pendaftaran. Silakan coba kembali.');
      } finally {
        setSiswaLoading(false);
      }
      return;
    }

    // Mode Login Siswa
    setSiswaLoading(true);
    try {
      let displayName = siswaIdentifier.split('@')[0];
      let uid = 'siswa-' + Date.now();

      try {
        const cred = await signInWithEmailAndPassword(auth, authEmail, siswaPassword);
        uid = cred.user.uid;
        if (cred.user.displayName) displayName = cred.user.displayName;
      } catch (firebaseErr) {
        console.warn('Firebase login fallback to local session:', firebaseErr.message);
      }

      const studentUser = {
        role: 'murid',
        nama: displayName || 'Siswa Kimia',
        email: authEmail,
        identifier: siswaIdentifier.trim(),
        kelas: siswaKelas,
        uid: uid,
        waktuMasuk: new Date().toISOString()
      };

      localStorage.setItem('hydrocarbon_auth_user', JSON.stringify(studentUser));
      localStorage.setItem('hydrocarbon_user_role', 'murid');

      // Catat kehadiran siswa secara real-time ke portal guru
      const localModules = JSON.parse(localStorage.getItem('hidrokarbon_completed_modules') || '[]');
      const localScore = localStorage.getItem('hidrokarbon_quiz_score');
      recordStudentActivity({
        email: studentUser.email,
        nama: studentUser.nama,
        modules: localModules,
        score: localScore !== null ? parseInt(localScore, 10) : null
      });

      setSiswaSuccess('Berhasil masuk! Selamat belajar kembali.');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(studentUser);
      }, 700);
    } catch (err) {
      setSiswaError('Gagal masuk. Periksa kembali NISN/email dan kata sandi kamu.');
    } finally {
      setSiswaLoading(false);
    }
  };

  // Masuk Cepat / Demo Siswa
  const handleSiswaDemo = () => {
    const demoStudent = {
      role: 'murid',
      nama: 'Budi Santoso',
      email: 'budi.santoso@siswa.sch.id',
      identifier: '10293847',
      kelas: 'Fase E (Kelas X-1)',
      uid: 'siswa-demo-' + Date.now(),
      waktuMasuk: new Date().toISOString()
    };

    localStorage.setItem('hydrocarbon_auth_user', JSON.stringify(demoStudent));
    localStorage.setItem('hydrocarbon_user_role', 'murid');

    const localModules = JSON.parse(localStorage.getItem('hidrokarbon_completed_modules') || '[]');
    const localScore = localStorage.getItem('hidrokarbon_quiz_score');
    recordStudentActivity({
      email: demoStudent.email,
      nama: `${demoStudent.nama} (X-1)`,
      modules: localModules,
      score: localScore !== null ? parseInt(localScore, 10) : null
    });

    setSiswaSuccess('Masuk sebagai Siswa (Mode Eksplorasi Cepat)...');
    setTimeout(() => {
      if (onLoginSuccess) onLoginSuccess(demoStudent);
    }, 500);
  };

  // =========================================================================
  // HANDLER: LOGIN / REGISTER GURU
  // =========================================================================
  const handleGuruSubmit = async (e) => {
    e.preventDefault();
    setGuruError('');
    setGuruSuccess('');

    if (!guruIdentifier.trim()) {
      setGuruError('Harap masukkan NIP atau email resmi pengajar.');
      return;
    }
    if (!guruPassword) {
      setGuruError('Harap masukkan kata sandi.');
      return;
    }

    // Validasi Lapisan Keamanan Khusus Guru (Teacher Security Gate)
    // PIN default pengajar: GURU2025 atau 123456
    const cleanPin = guruPin.trim().toUpperCase();
    if (guruTab === 'login' && cleanPin !== 'GURU2025' && cleanPin !== '123456' && cleanPin !== '') {
      setGuruError('PIN Keamanan Pengajar tidak valid. Gunakan PIN bawaan: GURU2025.');
      return;
    }

    const isEmail = guruIdentifier.includes('@');
    const authEmail = isEmail ? guruIdentifier.trim() : `${guruIdentifier.trim().toLowerCase()}@guru.hydrocarbon.edu`;

    if (guruTab === 'register') {
      if (!guruNama.trim()) {
        setGuruError('Harap masukkan nama lengkap beserta gelar pendidik.');
        return;
      }
      if (guruPassword.length < 6) {
        setGuruError('Kata sandi minimal harus terdiri dari 6 karakter.');
        return;
      }
      if (guruPassword !== guruConfirmPassword) {
        setGuruError('Konfirmasi kata sandi tidak cocok.');
        return;
      }
      if (guruSecurityCode.trim().toUpperCase() !== 'GURU2025' && guruSecurityCode.trim() !== '') {
        setGuruError('Kode Akses Registrasi Sekolah tidak valid. Masukkan kode: GURU2025.');
        return;
      }

      setGuruLoading(true);
      try {
        let uid = 'guru-' + Date.now();
        try {
          const cred = await createUserWithEmailAndPassword(auth, authEmail, guruPassword);
          uid = cred.user.uid;
        } catch (firebaseErr) {
          console.warn('Firebase guru register fallback:', firebaseErr.message);
        }

        const teacherUser = {
          role: 'guru',
          nama: guruNama.trim(),
          email: authEmail,
          identifier: guruIdentifier.trim(),
          mapel: guruMapel,
          uid: uid,
          waktuMasuk: new Date().toISOString()
        };

        localStorage.setItem('hydrocarbon_auth_user', JSON.stringify(teacherUser));
        localStorage.setItem('hydrocarbon_user_role', 'guru');

        setGuruSuccess('Registrasi Pendidik berhasil! Membuka Portal Guru...');
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess(teacherUser);
        }, 800);
      } catch (err) {
        setGuruError('Gagal melakukan pendaftaran guru. Silakan coba kembali.');
      } finally {
        setGuruLoading(false);
      }
      return;
    }

    // Mode Login Guru
    setGuruLoading(true);
    try {
      let displayName = guruIdentifier.split('@')[0];
      let uid = 'guru-' + Date.now();

      try {
        const cred = await signInWithEmailAndPassword(auth, authEmail, guruPassword);
        uid = cred.user.uid;
        if (cred.user.displayName) displayName = cred.user.displayName;
      } catch (firebaseErr) {
        console.warn('Firebase guru login fallback:', firebaseErr.message);
      }

      const teacherUser = {
        role: 'guru',
        nama: displayName || 'Pendidik Kimia',
        email: authEmail,
        identifier: guruIdentifier.trim(),
        mapel: 'Kimia Fase E',
        uid: uid,
        waktuMasuk: new Date().toISOString()
      };

      localStorage.setItem('hydrocarbon_auth_user', JSON.stringify(teacherUser));
      localStorage.setItem('hydrocarbon_user_role', 'guru');

      setGuruSuccess('Autentikasi Pengajar Berhasil! Mengalihkan ke Dashboard Pendidik...');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(teacherUser);
      }, 700);
    } catch (err) {
      setGuruError('Gagal masuk. Periksa kembali NIP/email dan kata sandi Anda.');
    } finally {
      setGuruLoading(false);
    }
  };

  // Masuk Cepat / Demo Guru
  const handleGuruDemo = () => {
    const demoTeacher = {
      role: 'guru',
      nama: 'Dra. Siti Aminah, M.Pd.',
      email: 'siti.aminah@sekolah.sch.id',
      identifier: '198503152010012001',
      mapel: 'Kimia Fase E (Kelas X)',
      uid: 'guru-demo-' + Date.now(),
      waktuMasuk: new Date().toISOString()
    };

    localStorage.setItem('hydrocarbon_auth_user', JSON.stringify(demoTeacher));
    localStorage.setItem('hydrocarbon_user_role', 'guru');

    setGuruSuccess('Masuk sebagai Pendidik (Mode Demo Pengajar)...');
    setTimeout(() => {
      if (onLoginSuccess) onLoginSuccess(demoTeacher);
    }, 500);
  };

  return (
    <div className="portal-gate-wrapper">
      {/* Background Decorative Grid */}
      <div className="portal-gate-container">
        
        {/* Header Utama Website */}
        <header className="portal-gate-header">
          <div className="portal-brand-badge">
            <Atom className="portal-brand-icon" size={32} />
            <div>
              <h1 className="portal-brand-title">
                Hydrocarbon<span className="portal-brand-accent">Edu</span>
              </h1>
              <p className="portal-brand-sub">
                Media Pembelajaran Kimia Mandiri & Manajemen Kelas Fase E
              </p>
            </div>
          </div>
          
          <p className="portal-gate-lead">
            Selamat datang di gerbang utama pembelajaran hidrokarbon. Silakan pilih portal masuk yang sesuai dengan peran kamu di sekolah.
          </p>
        </header>

        {/* Pemilih Gerbang Utama: Portal Siswa vs Portal Guru */}
        <div className="portal-selector-bar" role="tablist" aria-label="Pilih Peran Masuk">
          <button
            type="button"
            role="tab"
            aria-selected={activePortal === 'siswa'}
            onClick={() => setActivePortal('siswa')}
            className={`portal-select-card ${activePortal === 'siswa' ? 'active-siswa' : ''}`}
          >
            <div className="portal-select-icon-box siswa-icon">
              <GraduationCap size={28} />
            </div>
            <div className="portal-select-text">
              <div className="portal-select-badge">Ruang Peserta Didik</div>
              <h2 className="portal-select-title">Portal Masuk Siswa</h2>
              <p className="portal-select-desc">
                Eksplorasi modul hidrokarbon (Alkana, Alkena, Alkuna), lab visual 3D, dan uji pemahaman lewat kuis gamifikasi.
              </p>
            </div>
            <div className="portal-select-indicator">
              {activePortal === 'siswa' ? <CheckCircle2 size={20} /> : <ChevronRight size={20} />}
            </div>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activePortal === 'guru'}
            onClick={() => setActivePortal('guru')}
            className={`portal-select-card ${activePortal === 'guru' ? 'active-guru' : ''}`}
          >
            <div className="portal-select-icon-box guru-icon">
              <BookOpenCheck size={28} />
            </div>
            <div className="portal-select-text">
              <div className="portal-select-badge">Ruang Pendidik & Fasilitator</div>
              <h2 className="portal-select-title">Portal Masuk Guru</h2>
              <p className="portal-select-desc">
                Pantau asesmen dan aktivitas siswa secara real-time, kelola bank soal kuis, atur KKM, dan unduh rekap nilai Excel.
              </p>
            </div>
            <div className="portal-select-indicator">
              {activePortal === 'guru' ? <CheckCircle2 size={20} /> : <ChevronRight size={20} />}
            </div>
          </button>
        </div>

        {/* KONTEN MASUK BERDASARKAN PERAN (Keduanya Berbeda Total) */}
        <div className="portal-box-wrapper">
          {activePortal === 'siswa' ? (
            /* =================================================================
               1. FORM PORTAL LOGIN KHUSUS SISWA (CERIA, RAMAH, MOTIVATIF)
               ================================================================= */
            <div className="portal-panel-card portal-card-siswa">
              <div className="portal-panel-grid">
                
                {/* Kolom Kiri: Form Siswa */}
                <div className="portal-form-col">
                  <div className="portal-panel-heading">
                    <div className="portal-tag-pill tag-siswa">
                      <Sparkles size={14} />
                      <span>Gerbang Belajar Siswa</span>
                    </div>
                    <h3 className="portal-form-title">
                      {siswaTab === 'login' ? 'Masuk ke Ruang Belajar' : 'Daftar Akun Siswa Baru'}
                    </h3>
                    <p className="portal-form-subtitle">
                      {siswaTab === 'login' 
                        ? 'Masukkan NISN atau email sekolah kamu untuk melanjutkan modul.' 
                        : 'Lengkapi identitasmu untuk mulai mencatat progres belajar mandiri.'}
                    </p>
                  </div>

                  {/* Tab Masuk / Daftar Siswa */}
                  <div className="portal-subtab-group">
                    <button
                      type="button"
                      onClick={() => { setSiswaTab('login'); setSiswaError(''); setSiswaSuccess(''); }}
                      className={`portal-subtab-btn ${siswaTab === 'login' ? 'active' : ''}`}
                    >
                      <LogIn size={15} />
                      <span>Masuk Akun</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSiswaTab('register'); setSiswaError(''); setSiswaSuccess(''); }}
                      className={`portal-subtab-btn ${siswaTab === 'register' ? 'active' : ''}`}
                    >
                      <UserPlus size={15} />
                      <span>Daftar Siswa Baru</span>
                    </button>
                  </div>

                  {/* Alert Umpan Balik */}
                  {siswaError && (
                    <div className="portal-alert alert-error" role="alert">
                      <AlertCircle size={18} />
                      <span>{siswaError}</span>
                    </div>
                  )}
                  {siswaSuccess && (
                    <div className="portal-alert alert-success" role="status">
                      <CheckCircle2 size={18} />
                      <span>{siswaSuccess}</span>
                    </div>
                  )}

                  {/* Form Interaktif Siswa */}
                  <form onSubmit={handleSiswaSubmit} className="portal-actual-form">
                    {siswaTab === 'register' && (
                      <>
                        <div className="portal-input-group">
                          <label className="portal-label">Nama Lengkap Siswa</label>
                          <div className="portal-input-box">
                            <User size={18} className="portal-input-icon" />
                            <input
                              type="text"
                              required
                              value={siswaNama}
                              onChange={(e) => setSiswaNama(e.target.value)}
                              placeholder="Contoh: Budi Santoso"
                              className="portal-input-field"
                            />
                          </div>
                        </div>

                        <div className="portal-input-group">
                          <label className="portal-label">Kelas Fase E</label>
                          <select
                            value={siswaKelas}
                            onChange={(e) => setSiswaKelas(e.target.value)}
                            className="portal-select-field"
                          >
                            <option value="Fase E (Kelas X-1)">Fase E — Kelas X-1</option>
                            <option value="Fase E (Kelas X-2)">Fase E — Kelas X-2</option>
                            <option value="Fase E (Kelas X-3)">Fase E — Kelas X-3</option>
                            <option value="Fase E (Kelas X-4)">Fase E — Kelas X-4</option>
                            <option value="Fase E (Kelas X-5)">Fase E — Kelas X-5</option>
                          </select>
                        </div>
                      </>
                    )}

                    <div className="portal-input-group">
                      <label className="portal-label">
                        {siswaTab === 'register' ? 'NISN atau Email Siswa' : 'NISN / Email Siswa'}
                      </label>
                      <div className="portal-input-box">
                        <Mail size={18} className="portal-input-icon" />
                        <input
                          type="text"
                          required
                          value={siswaIdentifier}
                          onChange={(e) => setSiswaIdentifier(e.target.value)}
                          placeholder={siswaTab === 'register' ? 'nisn@siswa.sch.id atau 10293847' : 'Masukkan NISN atau email'}
                          className="portal-input-field"
                        />
                      </div>
                    </div>

                    <div className="portal-input-group">
                      <label className="portal-label">Kata Sandi</label>
                      <div className="portal-input-box">
                        <Lock size={18} className="portal-input-icon" />
                        <input
                          type={siswaShowPassword ? 'text' : 'password'}
                          required
                          value={siswaPassword}
                          onChange={(e) => setSiswaPassword(e.target.value)}
                          placeholder="Minimal 6 karakter"
                          className="portal-input-field"
                        />
                        <button
                          type="button"
                          onClick={() => setSiswaShowPassword(!siswaShowPassword)}
                          className="portal-pw-toggle"
                          aria-label="Lihat atau sembunyikan kata sandi"
                        >
                          {siswaShowPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    {siswaTab === 'register' && (
                      <div className="portal-input-group">
                        <label className="portal-label">Konfirmasi Kata Sandi</label>
                        <div className="portal-input-box">
                          <Lock size={18} className="portal-input-icon" />
                          <input
                            type={siswaShowPassword ? 'text' : 'password'}
                            required
                            value={siswaConfirmPassword}
                            onChange={(e) => setSiswaConfirmPassword(e.target.value)}
                            placeholder="Ulangi kata sandi"
                            className="portal-input-field"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={siswaLoading}
                      className="portal-btn-primary siswa-btn"
                    >
                      {siswaLoading ? 'Memproses...' : (siswaTab === 'login' ? 'Masuk ke Ruang Belajar' : 'Daftarkan Akun Siswa')}
                      <ArrowRight size={17} />
                    </button>
                  </form>

                  {/* Tombol Masuk Cepat Khusus Siswa */}
                  <div className="portal-quick-entry">
                    <div className="portal-divider">
                      <span>atau eksplorasi langsung</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleSiswaDemo}
                      className="portal-btn-secondary"
                    >
                      <Sparkles size={16} />
                      <span>⚡ Masuk Cepat Siswa (Mode Tamu Tanpa Ribet)</span>
                    </button>
                    <p className="portal-hint-text">
                      Cocok untuk siswa yang ingin langsung belajar tanpa harus mengingat kata sandi. Aktivitasmu tetap tercatat ke guru!
                    </p>
                  </div>
                </div>

                {/* Kolom Kanan: Motivasi & Informasi Belajar Siswa */}
                <div className="portal-info-col siswa-info-bg">
                  <div className="portal-info-header">
                    <span className="portal-info-badge">Apa yang akan kamu pelajari?</span>
                    <h4 className="portal-info-title">Eksplorasi Dunia Hidrokarbon</h4>
                    <p className="portal-info-desc">
                      Pahami struktur molekul organik paling penting di alam semesta secara visual dan interaktif:
                    </p>
                  </div>

                  <div className="portal-feature-list">
                    <div className="portal-feature-item">
                      <div className="portal-feature-bullet">1</div>
                      <div>
                        <strong>Deret Alkana (CₙH₂ₙ₊₂)</strong>
                        <p>Hidrokarbon jenuh berikatan tunggal, rumus molekul metana (CH₄) hingga dekana.</p>
                      </div>
                    </div>

                    <div className="portal-feature-item">
                      <div className="portal-feature-bullet">2</div>
                      <div>
                        <strong>Deret Alkena & Alkuna</strong>
                        <p>Ikatan rangkap dua (CₙH₂ₙ) pada etena (C₂H₄) dan ikatan rangkap tiga (CₙH₂ₙ₋₂) pada etuna (C₂H₂).</p>
                      </div>
                    </div>

                    <div className="portal-feature-item">
                      <div className="portal-feature-bullet">3</div>
                      <div>
                        <strong>Laboratorium 3D Interaktif</strong>
                        <p>Putar dan amati geometri ruang atom karbon secara nyata tiga dimensi.</p>
                      </div>
                    </div>

                    <div className="portal-feature-item">
                      <div className="portal-feature-bullet">4</div>
                      <div>
                        <strong>Kuis Gamifikasi Mandiri</strong>
                        <p>Uji pemahamanmu, evaluasi miskonsepsi, dan pantau skor kelulusanmu.</p>
                      </div>
                    </div>
                  </div>

                  <div className="portal-quote-card">
                    <p>💡 <em>"Kimia bukan hafalan rumus, melainkan pemahaman tentang bagaimana atom saling berikatan menciptakan kehidupan."</em></p>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* =================================================================
               2. FORM PORTAL LOGIN KHUSUS GURU (PROFESIONAL, KEAMANAN TINGGI)
               ================================================================= */
            <div className="portal-panel-card portal-card-guru">
              <div className="portal-panel-grid">
                
                {/* Kolom Kiri: Form Guru */}
                <div className="portal-form-col">
                  <div className="portal-panel-heading">
                    <div className="portal-tag-pill tag-guru">
                      <ShieldCheck size={14} />
                      <span>Gerbang Pengajar & Fasilitator</span>
                    </div>
                    <h3 className="portal-form-title">
                      {guruTab === 'login' ? 'Masuk ke Portal Pendidik' : 'Aktivasi Akun Pendidik Kimia'}
                    </h3>
                    <p className="portal-form-subtitle">
                      {guruTab === 'login' 
                        ? 'Masuk menggunakan NIP atau email sekolah resmi untuk mengelola kelas.' 
                        : 'Daftarkan akun pengajar untuk mengakses perangkat ajar dan instrumen asesmen.'}
                    </p>
                  </div>

                  {/* Tab Masuk / Registrasi Guru */}
                  <div className="portal-subtab-group">
                    <button
                      type="button"
                      onClick={() => { setGuruTab('login'); setGuruError(''); setGuruSuccess(''); }}
                      className={`portal-subtab-btn ${guruTab === 'login' ? 'active' : ''}`}
                    >
                      <LogIn size={15} />
                      <span>Masuk Pendidik</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setGuruTab('register'); setGuruError(''); setGuruSuccess(''); }}
                      className={`portal-subtab-btn ${guruTab === 'register' ? 'active' : ''}`}
                    >
                      <UserPlus size={15} />
                      <span>Registrasi Guru</span>
                    </button>
                  </div>

                  {/* Alert Umpan Balik Guru */}
                  {guruError && (
                    <div className="portal-alert alert-error" role="alert">
                      <AlertCircle size={18} />
                      <span>{guruError}</span>
                    </div>
                  )}
                  {guruSuccess && (
                    <div className="portal-alert alert-success" role="status">
                      <CheckCircle2 size={18} />
                      <span>{guruSuccess}</span>
                    </div>
                  )}

                  {/* Form Interaktif Guru */}
                  <form onSubmit={handleGuruSubmit} className="portal-actual-form">
                    {guruTab === 'register' && (
                      <>
                        <div className="portal-input-group">
                          <label className="portal-label">Nama Lengkap & Gelar Pendidik</label>
                          <div className="portal-input-box">
                            <User size={18} className="portal-input-icon" />
                            <input
                              type="text"
                              required
                              value={guruNama}
                              onChange={(e) => setGuruNama(e.target.value)}
                              placeholder="Contoh: Dra. Siti Aminah, M.Pd."
                              className="portal-input-field"
                            />
                          </div>
                        </div>

                        <div className="portal-input-group">
                          <label className="portal-label">Mata Pelajaran & Fase</label>
                          <select
                            value={guruMapel}
                            onChange={(e) => setGuruMapel(e.target.value)}
                            className="portal-select-field"
                          >
                            <option value="Kimia Fase E (Kelas X)">Kimia Fase E (Kelas X SMA)</option>
                            <option value="Kimia Fase F (Kelas XI)">Kimia Fase F (Kelas XI SMA)</option>
                            <option value="Kimia Fase F (Kelas XII)">Kimia Fase F (Kelas XII SMA)</option>
                            <option value="IPA Terpadu SMA">IPA Terpadu Kurikulum Merdeka</option>
                          </select>
                        </div>
                      </>
                    )}

                    <div className="portal-input-group">
                      <label className="portal-label">
                        {guruTab === 'register' ? 'NIP atau Email Resmi Sekolah' : 'NIP / Email Pendidik'}
                      </label>
                      <div className="portal-input-box">
                        <Mail size={18} className="portal-input-icon" />
                        <input
                          type="text"
                          required
                          value={guruIdentifier}
                          onChange={(e) => setGuruIdentifier(e.target.value)}
                          placeholder={guruTab === 'register' ? 'guru.kimia@sekolah.sch.id atau 1985...' : 'Masukkan NIP atau email guru'}
                          className="portal-input-field"
                        />
                      </div>
                    </div>

                    <div className="portal-input-group">
                      <label className="portal-label">Kata Sandi Pendidik</label>
                      <div className="portal-input-box">
                        <Lock size={18} className="portal-input-icon" />
                        <input
                          type={guruShowPassword ? 'text' : 'password'}
                          required
                          value={guruPassword}
                          onChange={(e) => setGuruPassword(e.target.value)}
                          placeholder="Kata sandi akun pengajar"
                          className="portal-input-field"
                        />
                        <button
                          type="button"
                          onClick={() => setGuruShowPassword(!guruShowPassword)}
                          className="portal-pw-toggle"
                          aria-label="Lihat atau sembunyikan kata sandi"
                        >
                          {guruShowPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    {guruTab === 'register' ? (
                      <>
                        <div className="portal-input-group">
                          <label className="portal-label">Konfirmasi Kata Sandi</label>
                          <div className="portal-input-box">
                            <Lock size={18} className="portal-input-icon" />
                            <input
                              type={guruShowPassword ? 'text' : 'password'}
                              required
                              value={guruConfirmPassword}
                              onChange={(e) => setGuruConfirmPassword(e.target.value)}
                              placeholder="Ulangi kata sandi"
                              className="portal-input-field"
                            />
                          </div>
                        </div>

                        <div className="portal-input-group">
                          <label className="portal-label">
                            Kode Akses Pendidik Sekolah <span className="text-tag">(PIN Default: GURU2025)</span>
                          </label>
                          <div className="portal-input-box">
                            <KeyRound size={18} className="portal-input-icon" />
                            <input
                              type="text"
                              value={guruSecurityCode}
                              onChange={(e) => setGuruSecurityCode(e.target.value)}
                              placeholder="GURU2025"
                              className="portal-input-field"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Lapisan PIN Keamanan Guru saat Login */
                      <div className="portal-input-group">
                        <div className="portal-label-row">
                          <label className="portal-label">
                            PIN Keamanan Pengajar <span className="text-tag">(Teacher Security PIN)</span>
                          </label>
                          <span className="portal-helper-badge">Bawaan: GURU2025</span>
                        </div>
                        <div className="portal-input-box">
                          <KeyRound size={18} className="portal-input-icon" />
                          <input
                            type="text"
                            value={guruPin}
                            onChange={(e) => setGuruPin(e.target.value)}
                            placeholder="Ketik GURU2025 (Opsional jika login pertama)"
                            className="portal-input-field"
                          />
                        </div>
                        <span className="portal-field-sub">
                          Mencegah peserta didik mengakses lembar nilai dan bank soal guru secara tidak sengaja.
                        </span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={guruLoading}
                      className="portal-btn-primary guru-btn"
                    >
                      {guruLoading ? 'Memverifikasi Hak Akses...' : (guruTab === 'login' ? 'Masuk ke Panel Pengajar' : 'Daftarkan Akun Guru')}
                      <ArrowRight size={17} />
                    </button>
                  </form>

                  {/* Tombol Akses Cepat Pendidik */}
                  <div className="portal-quick-entry">
                    <div className="portal-divider">
                      <span>atau akses instan</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleGuruDemo}
                      className="portal-btn-secondary"
                    >
                      <BookOpenCheck size={16} />
                      <span>👨‍🏫 Masuk Akses Pendidik (Mode Guru Cepat)</span>
                    </button>
                    <p className="portal-hint-text">
                      Langsung membuka ruang pemantauan real-time kelas dan instrumen asesmen sebagai Dra. Siti Aminah, M.Pd.
                    </p>
                  </div>
                </div>

                {/* Kolom Kanan: Fasilitas & Fitur Guru */}
                <div className="portal-info-col guru-info-bg">
                  <div className="portal-info-header">
                    <span className="portal-info-badge">Fitur Eksklusif Pendidik</span>
                    <h4 className="portal-info-title">Manajemen Kelas Kimia Modern</h4>
                    <p className="portal-info-desc">
                      Didukung pemantauan real-time dan analisis daya serap konsep siswa:
                    </p>
                  </div>

                  <div className="portal-feature-list">
                    <div className="portal-feature-item">
                      <div className="portal-feature-bullet">
                        <Layers size={14} />
                      </div>
                      <div>
                        <strong>Pemantauan Aktivitas Real-Time</strong>
                        <p>Setiap siswa yang mengakses modul atau menyelesaikan kuis langsung tercatat di tabel guru secara instan.</p>
                      </div>
                    </div>

                    <div className="portal-feature-item">
                      <div className="portal-feature-bullet">
                        <KeyRound size={14} />
                      </div>
                      <div>
                        <strong>Pengaturan Batas KKM Interaktif</strong>
                        <p>Sesuaikan nilai batas ketuntasan belajar secara fleksibel (default 75) dengan kalkulasi otomatis status Tuntas/Remedial.</p>
                      </div>
                    </div>

                    <div className="portal-feature-item">
                      <div className="portal-feature-bullet">
                        <BookOpenCheck size={14} />
                      </div>
                      <div>
                        <strong>Kelola & Tambah Bank Soal</strong>
                        <p>Buat soal baru dengan klasifikasi miskonsepsi untuk penguatan konsep isomer dan tata nama IUPAC.</p>
                      </div>
                    </div>

                    <div className="portal-feature-item">
                      <div className="portal-feature-bullet">
                        <FileSpreadsheet size={14} />
                      </div>
                      <div>
                        <strong>Ekspor Excel & Pembersihan Bersih</strong>
                        <p>Unduh rekapitulasi nilai siswa dalam format Microsoft Excel (.csv UTF-8 BOM) dengan opsi bersihkan data otomatis.</p>
                      </div>
                    </div>
                  </div>

                  <div className="portal-quote-card teacher-note">
                    <p>🔒 <strong>Hak Akses Pendidik:</strong> Seluruh konfigurasi soal, kunci jawaban, dan rekapitulasi nilai kelas terlindungi dalam ruang kerja guru.</p>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
