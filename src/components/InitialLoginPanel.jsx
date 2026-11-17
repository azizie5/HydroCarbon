import React, { useState } from 'react';
import { 
  auth, 
  db 
} from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { 
  X, 
  User, 
  Lock, 
  GraduationCap, 
  Atom, 
  Sparkles, 
  FlaskConical, 
  ShieldCheck, 
  Loader2, 
  ArrowRight,
  AlertCircle,
  Compass
} from 'lucide-react';

export default function InitialLoginPanel({ 
  isOpen, 
  onClose, 
  onStudentLoginSuccess, 
  onTeacherLoginSuccess 
}) {
  // Tab Peran: 'siswa' (Student) atau 'guru' (Teacher)
  const [activeRole, setActiveRole] = useState('siswa'); // 'siswa' | 'guru'

  // State Input Form Siswa
  const [studentMode, setStudentMode] = useState('login'); // 'login' | 'register'
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [studentName, setStudentName] = useState('');

  // State Input Form Guru (Hanya Email & Sandi)
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');

  // Status & Feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  // 1. Handle Submit Login / Register Siswa
  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (studentMode === 'login') {
        const userCredential = await signInWithEmailAndPassword(auth, studentEmail, studentPassword);
        // Catat akses masuk siswa ke Firestore secara real-time
        try {
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            fullName: userCredential.user.displayName || studentEmail.split('@')[0],
            email: userCredential.user.email,
            class: 'XI-MIPA-1',
            role: 'siswa',
            updatedAt: new Date().toISOString()
          }, { merge: true });
        } catch (e) { console.warn(e); }

        setSuccessMessage('Berhasil masuk sebagai Siswa! Menyiapkan materi...');
        setTimeout(() => {
          onClose();
          if (onStudentLoginSuccess) onStudentLoginSuccess(userCredential.user);
        }, 700);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, studentEmail, studentPassword);
        if (studentName.trim()) {
          await updateProfile(userCredential.user, { displayName: studentName.trim() });
        }
        // Inisialisasi dokumen siswa di Firestore
        try {
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            fullName: studentName.trim() || studentEmail.split('@')[0],
            email: userCredential.user.email,
            class: 'XI-MIPA-1',
            totalScore: 0,
            materiProgress: 0,
            role: 'siswa',
            updatedAt: new Date().toISOString()
          }, { merge: true });
        } catch (e) { console.warn(e); }

        setSuccessMessage('Akun Siswa berhasil didaftarkan!');
        setTimeout(() => {
          onClose();
          if (onStudentLoginSuccess) onStudentLoginSuccess(userCredential.user);
        }, 700);
      }
    } catch (err) {
      console.error("Student Auth Error:", err);
      let msg = "Gagal masuk. Periksa kembali email dan kata sandi.";
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        msg = "Email atau kata sandi siswa tidak sesuai.";
      } else if (err.code === 'auth/email-already-in-use') {
        msg = "Email ini sudah terdaftar. Silakan login.";
      } else if (err.code === 'auth/weak-password') {
        msg = "Kata sandi terlalu pendek (minimal 6 karakter).";
      }
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Handle Submit Login Guru (Hanya Email & Sandi)
  const handleTeacherSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    setTimeout(() => {
      // Validasi email guru & sandi (minimal 6 karakter)
      if (teacherEmail.includes('@') && teacherPassword.length >= 6) {
        setSuccessMessage('Berhasil masuk Portal Guru! Membuka Dashboard Kelas...');
        setTimeout(() => {
          onClose();
          if (onTeacherLoginSuccess) onTeacherLoginSuccess({ email: teacherEmail });
        }, 600);
      } else {
        setErrorMessage('Email atau sandi guru tidak sesuai (kata sandi minimal 6 karakter).');
      }
      setIsLoading(false);
    }, 500);
  };

  // 3. Masuk Cepat Demo Siswa (1-Klik)
  const handleQuickDemoStudent = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      try {
        await signInWithEmailAndPassword(auth, "siswa.kimia@hydrocarbedu.id", "kimia12345");
      } catch {
        const cred = await createUserWithEmailAndPassword(auth, "siswa.kimia@hydrocarbedu.id", "kimia12345");
        await updateProfile(cred.user, { displayName: "Siswa Kimia Berbakat" });
      }

      if (auth.currentUser) {
        try {
          await setDoc(doc(db, 'users', auth.currentUser.uid), {
            fullName: "Siswa Kimia Berbakat",
            email: "siswa.kimia@hydrocarbedu.id",
            class: "XI-MIPA-1",
            totalScore: 85,
            materiProgress: 80,
            role: "siswa",
            updatedAt: new Date().toISOString()
          }, { merge: true });
        } catch (e) { console.warn(e); }
      }

      setSuccessMessage('Masuk sebagai Siswa Demo!');
      setTimeout(() => {
        onClose();
        if (onStudentLoginSuccess) onStudentLoginSuccess({ displayName: "Siswa Kimia Berbakat" });
      }, 500);
    } catch (err) {
      console.warn("Fallback demo student:", err);
      onClose();
      if (onStudentLoginSuccess) onStudentLoginSuccess({ displayName: "Siswa Kimia Berbakat" });
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Masuk Cepat Demo Guru (1-Klik)
  const handleQuickDemoTeacher = () => {
    setTeacherEmail('guru.kimia@hydrocarbedu.id');
    setTeacherPassword('guru12345');
    setIsLoading(true);
    setSuccessMessage('Masuk sebagai Guru Demo (Dra. Fatichatun N.)');
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      if (onTeacherLoginSuccess) onTeacherLoginSuccess({ email: 'guru.kimia@hydrocarbedu.id' });
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-md animate-fadeIn">
      
      {/* Container Utama Berlatar Krem Pastel (#FFFDD0) */}
      <div 
        className="relative w-full max-w-md sm:max-w-lg rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-[#667436]/40 overflow-hidden"
        style={{ backgroundColor: '#FFFDD0' }} // Palet Krem Pastel Sesuai Instruksi
      >
        {/* Dekorasi Visual Partikel Kimia & Kilau Bintang */}
        <div className="absolute top-2 left-3 text-[#667436]/25 pointer-events-none select-none">
          <Atom className="w-12 h-12" />
        </div>
        <div className="absolute top-2 right-12 text-[#667436]/30 pointer-events-none select-none animate-pulse">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="absolute bottom-2 right-3 text-[#667436]/20 pointer-events-none select-none">
          <FlaskConical className="w-10 h-10" />
        </div>

        {/* Tombol Tutup Panel di Pojok Kanan Atas */}
        <button 
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-2 rounded-full text-[#667436] hover:bg-[#667436]/15 transition-colors cursor-pointer z-20"
          aria-label="Tutup dan Eksplorasi"
          title="Tutup dan Jelajahi Website"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Sapaan Header Platform */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#667436]/15 text-[#667436] border border-[#667436]/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Selamat Datang di HydrocarbonEdu</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-heading tracking-tight">
            Pilih Akses Masuk Pembelajaran
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Silakan pilih peran Anda untuk menyimpan progres materi atau memantau evaluasi kelas.
          </p>
        </div>

        {/* Tab Pilihan Peran: SISWA vs GURU */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-stone-200/70 rounded-2xl mb-4 border border-[#667436]/20">
          <button
            type="button"
            onClick={() => {
              setActiveRole('siswa');
              setErrorMessage('');
              setSuccessMessage('');
            }}
            className={`py-2 px-3 rounded-xl font-heading font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeRole === 'siswa'
                ? "bg-[#667436] text-white shadow-md"
                : "text-stone-700 hover:text-stone-900 hover:bg-white/50"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Masuk Siswa</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveRole('guru');
              setErrorMessage('');
              setSuccessMessage('');
            }}
            className={`py-2 px-3 rounded-xl font-heading font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeRole === 'guru'
                ? "bg-[#667436] text-white shadow-md"
                : "text-stone-700 hover:text-stone-900 hover:bg-white/50"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Portal Guru</span>
          </button>
        </div>

        {/* Feedback Alert Message */}
        {errorMessage && (
          <div className="mb-3.5 p-3 rounded-2xl bg-rose-100 border border-rose-300 text-rose-900 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-3.5 p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-emerald-700" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ========================================================
            KARTU FORM LOGIN (SESUAI GAMBAR REFERENSI USER)
           ======================================================== */}
        <div 
          className="rounded-3xl p-5 sm:p-6 shadow-xl text-center space-y-3.5 border border-white/20 transition-all"
          style={{ backgroundColor: '#2b471e' }} // Hijau Zaitun Gelap / Deep Forest
        >
          {activeRole === 'siswa' ? (
            /* --- FORM SISWA --- */
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Atom className="w-5 h-5 text-white" />
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading tracking-wide">
                  {studentMode === 'login' ? 'Login Siswa' : 'Daftar Akun Siswa'}
                </h3>
              </div>
              <p className="text-xs text-emerald-100/80 mb-3">
                Simpan skor kuis, lencana kimia, dan progres 3D molekul Anda.
              </p>

              <form onSubmit={handleStudentSubmit} className="space-y-3 text-left">
                {studentMode === 'register' && (
                  <div className="relative">
                    <input 
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Nama Lengkap Siswa"
                      className="w-full py-2.5 px-4 pr-11 rounded-full text-xs sm:text-sm bg-[#50723c] text-white placeholder-emerald-100/70 border border-emerald-400/30 outline-none focus:ring-2 focus:ring-white transition-all"
                    />
                    <User className="w-4 h-4 text-emerald-100 absolute right-4 top-1/2 -translate-y-1/2" />
                  </div>
                )}

                <div className="relative">
                  <input 
                    type="email"
                    required
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="Username / Email Siswa"
                    className="w-full py-2.5 px-4 pr-11 rounded-full text-xs sm:text-sm bg-[#50723c] text-white placeholder-emerald-100/70 border border-emerald-400/30 outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                  <User className="w-4 h-4 text-emerald-100 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>

                <div className="relative">
                  <input 
                    type="password"
                    required
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full py-2.5 px-4 pr-11 rounded-full text-xs sm:text-sm bg-[#50723c] text-white placeholder-emerald-100/70 border border-emerald-400/30 outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                  <Lock className="w-4 h-4 text-emerald-100 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 rounded-full font-heading font-extrabold text-sm sm:text-base bg-white hover:bg-stone-100 text-[#2b471e] shadow-lg transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <span>{studentMode === 'login' ? 'Login' : 'Daftar Sekarang'}</span>
                    )}
                  </button>
                </div>
              </form>

              {/* Toggle Login / Register Siswa */}
              <div className="pt-2 text-xs text-emerald-100/90">
                {studentMode === 'login' ? (
                  <span>
                    Belum punya akun?{' '}
                    <button 
                      type="button"
                      onClick={() => { setStudentMode('register'); setErrorMessage(''); }}
                      className="text-white font-bold underline cursor-pointer hover:text-amber-200"
                    >
                      Daftar Baru
                    </button>
                  </span>
                ) : (
                  <span>
                    Sudah punya akun?{' '}
                    <button 
                      type="button"
                      onClick={() => { setStudentMode('login'); setErrorMessage(''); }}
                      className="text-white font-bold underline cursor-pointer hover:text-amber-200"
                    >
                      Login di sini
                    </button>
                  </span>
                )}
              </div>
            </div>
          ) : (
            /* --- FORM GURU (HANYA EMAIL & SANDI) --- */
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <GraduationCap className="w-6 h-6 text-white" />
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading tracking-wide">
                  Login Guru
                </h3>
              </div>
              <p className="text-xs text-emerald-100/80 mb-3">
                Akses pemantauan nilai siswa, ketuntasan materi, dan rekap kelas.
              </p>

              <form onSubmit={handleTeacherSubmit} className="space-y-3 text-left">
                <div className="relative">
                  <input 
                    type="email"
                    required
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    placeholder="Email Guru"
                    className="w-full py-2.5 px-4 pr-11 rounded-full text-xs sm:text-sm bg-[#50723c] text-white placeholder-emerald-100/70 border border-emerald-400/30 outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                  <User className="w-4 h-4 text-emerald-100 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>

                <div className="relative">
                  <input 
                    type="password"
                    required
                    value={teacherPassword}
                    onChange={(e) => setTeacherPassword(e.target.value)}
                    placeholder="Kata Sandi"
                    className="w-full py-2.5 px-4 pr-11 rounded-full text-xs sm:text-sm bg-[#50723c] text-white placeholder-emerald-100/70 border border-emerald-400/30 outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                  <Lock className="w-4 h-4 text-emerald-100 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 rounded-full font-heading font-extrabold text-sm sm:text-base bg-white hover:bg-stone-100 text-[#2b471e] shadow-lg transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <span>Masuk Portal Guru</span>
                    )}
                  </button>
                </div>
              </form>

              {/* Keterangan Akun Demo Guru */}
              <div className="pt-2 text-[11px] text-emerald-100/80">
                Demo Guru: <span className="text-white font-semibold">guru.kimia@hydrocarbedu.id</span> / <span className="text-white font-semibold">guru12345</span>
              </div>
            </div>
          )}
        </div>

        {/* Pilihan Cepat 1-Klik Masuk Demo */}
        <div className="mt-3.5 flex items-center justify-center gap-2">
          {activeRole === 'siswa' ? (
            <button
              type="button"
              onClick={handleQuickDemoStudent}
              className="text-xs font-bold text-[#667436] hover:underline flex items-center gap-1.5 bg-white/70 px-3.5 py-1.5 rounded-full border border-[#667436]/30 shadow-xs cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Masuk Cepat Sebagai Siswa Demo (1-Klik)</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleQuickDemoTeacher}
              className="text-xs font-bold text-[#667436] hover:underline flex items-center gap-1.5 bg-white/70 px-3.5 py-1.5 rounded-full border border-[#667436]/30 shadow-xs cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Masuk Cepat Sebagai Guru Demo (1-Klik)</span>
            </button>
          )}
        </div>

        {/* Tombol Lanjutkan Tanpa Login (Mode Tamu / Eksplorasi) */}
        <div className="mt-3 pt-3 border-t border-[#667436]/20 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-stone-600 hover:text-stone-900 inline-flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-700 group-hover:rotate-45 transition-transform" />
            <span>Eksplorasi Web Terlebih Dahulu (Mode Tamu)</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>

    </div>
  );
}
