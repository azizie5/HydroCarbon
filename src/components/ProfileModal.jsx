import React, { useState, useEffect } from 'react';
import { 
  auth, 
  db 
} from '../firebase/config';
import { 
  onAuthStateChanged, 
  signOut, 
  updateProfile, 
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc 
} from 'firebase/firestore';
import { 
  X, 
  User, 
  Lock, 
  Mail, 
  Trophy, 
  Award, 
  Atom, 
  FlaskConical, 
  Sparkles, 
  LogOut, 
  Edit3, 
  KeyRound, 
  Check, 
  Loader2, 
  Flame,
  ShieldCheck
} from 'lucide-react';

export default function ProfileModal({ isOpen, onClose }) {
  // State Autentikasi & Data Siswa
  const [currentUser, setCurrentUser] = useState(null);
  const [studentStats, setStudentStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mode Tampilan: 'profile' (jika sudah login) atau 'login' / 'register' (jika belum login)
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  // State Modal Aksi Edit Nama & Ganti Password
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [actionMessage, setActionMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Logika: Fetch / Inisialisasi Data Statistik Siswa dari Firestore
  const fetchStudentStats = async (user) => {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setStudentStats(userDocSnap.data());
      } else {
        // Data inisialisasi default jika dokumen siswa baru dibuat
        const initialData = {
          fullName: user.displayName || 'Siswa Kimia',
          email: user.email,
          totalScore: 520,
          materiProgress: 75,
          badge: 'Peneliti Hidrokarbon Muda',
          level: 2,
          completedQuizzes: 5,
          streak: 3,
          formulaMastered: 'Alkana & Alkena',
          updatedAt: new Date().toISOString()
        };
        await setDoc(userDocRef, initialData);
        setStudentStats(initialData);
      }
    } catch (error) {
      console.warn("Firestore fetch notice (menggunakan data profil lokal):", error);
      // Fallback data jika Firestore offline / rules belum dibuka
      setStudentStats({
        fullName: user.displayName || 'Siswa Kimia',
        email: user.email,
        totalScore: 520,
        materiProgress: 75,
        badge: 'Peneliti Hidrokarbon Muda',
        level: 2,
        completedQuizzes: 5,
        streak: 3,
        formulaMastered: 'Alkana & Alkena'
      });
    }
  };

  // 2. Logika: Memeriksa Sesi Pengguna (onAuthStateChanged)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setCurrentUser(user);
        setNewName(user.displayName || '');
        await fetchStudentStats(user);
      } else {
        // Membersihkan sesi dan antarmuka saat logout
        setCurrentUser(null);
        setStudentStats(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 3. Logika: Handle Login & Registrasi
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setActionMessage({ type: '', text: '' });

    try {
      if (authMode === 'login') {
        await signInWithEmailAndPassword(auth, emailInput, passwordInput);
        setActionMessage({ type: 'success', text: 'Berhasil login! Selamat datang kembali.' });
      } else {
        const userCred = await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
        if (nameInput.trim()) {
          await updateProfile(userCred.user, { displayName: nameInput.trim() });
        }
        setActionMessage({ type: 'success', text: 'Akun berhasil dibuat!' });
      }
      setEmailInput('');
      setPasswordInput('');
    } catch (err) {
      console.error(err);
      let errMsg = "Terjadi kesalahan autentikasi.";
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        errMsg = "Email atau password yang Anda masukkan salah.";
      } else if (err.code === 'auth/email-already-in-use') {
        errMsg = "Email ini sudah terdaftar. Silakan login.";
      } else if (err.code === 'auth/weak-password') {
        errMsg = "Password terlalu lemah (minimal 6 karakter).";
      }
      setActionMessage({ type: 'error', text: errMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Logika: Update Nama Lengkap (Edit Profil)
  const handleUpdateName = async () => {
    if (!newName.trim() || !currentUser) return;
    setIsSubmitting(true);
    try {
      await updateProfile(currentUser, { displayName: newName.trim() });
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, { fullName: newName.trim() });
      
      setStudentStats(prev => ({ ...prev, fullName: newName.trim() }));
      setIsEditingName(false);
      setActionMessage({ type: 'success', text: 'Nama profil berhasil diperbarui!' });
    } catch (err) {
      console.error(err);
      setActionMessage({ type: 'error', text: 'Gagal memperbarui nama profil.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. Logika: Ganti / Reset Password via Email
  const handleResetPassword = async () => {
    if (!currentUser?.email) return;
    setIsSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, currentUser.email);
      setActionMessage({ 
        type: 'success', 
        text: `Link reset password telah dikirimkan ke email: ${currentUser.email}` 
      });
    } catch (err) {
      console.error(err);
      setActionMessage({ type: 'error', text: 'Gagal mengirim email reset password.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 6. Logika: Keluar / Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setActionMessage({ type: 'success', text: 'Anda telah berhasil keluar.' });
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      
      {/* Container Kartu Profil / Login di Tengah Layar */}
      <div 
        className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#667436]/30 overflow-hidden transition-all duration-300"
        style={{ backgroundColor: '#FFFDD0' }} // Palet Krem Pastel #FFFDD0
      >
        {/* Dekorasi Partikel Kimia & Kilau Bintang (Sesuai Referensi) */}
        <div className="absolute top-3 left-4 text-[#667436]/25 pointer-events-none select-none">
          <Atom className="w-12 h-12" />
        </div>
        <div className="absolute top-2 right-12 text-[#667436]/30 pointer-events-none select-none animate-pulse">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="absolute bottom-3 right-4 text-[#667436]/20 pointer-events-none select-none">
          <FlaskConical className="w-10 h-10" />
        </div>

        {/* Tombol Tutup Modal */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#667436] hover:bg-[#667436]/15 transition-colors cursor-pointer z-10"
          aria-label="Tutup Halaman Profil"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Feedback Alert Box */}
        {actionMessage.text && (
          <div className={`mb-4 p-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 ${
            actionMessage.type === 'success' 
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
              : 'bg-rose-100 text-rose-900 border border-rose-300'
          }`}>
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>{actionMessage.text}</span>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center text-[#667436]">
            <Loader2 className="w-10 h-10 animate-spin mb-3" />
            <p className="font-heading font-bold text-sm">Menghubungkan ke Firebase...</p>
          </div>
        ) : currentUser ? (
          /* ========================================================
             TAMPILAN PROFIL SISWA AKTIF (LOGGED IN)
             ======================================================== */
          <div className="space-y-6">
            
            {/* Header Profil: Avatar & Identitas */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              {/* Ikon Avatar Bertema Kimia */}
              <div className="relative group">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/60"
                  style={{ backgroundColor: '#667436' }}
                >
                  <Atom className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '18s' }} />
                </div>
                {/* Level badge di avatar */}
                <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-amber-400 text-stone-900 font-extrabold text-[10px] shadow border border-white">
                  Lv.{studentStats?.level || 1}
                </div>
              </div>

              {/* Info Nama & Email */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  {isEditingName ? (
                    <div className="flex items-center gap-2 w-full max-w-xs">
                      <input 
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="px-3 py-1 rounded-xl bg-white border border-[#667436] text-xs sm:text-sm font-semibold text-stone-800 w-full outline-none"
                        placeholder="Ketik nama baru..."
                      />
                      <button 
                        onClick={handleUpdateName}
                        disabled={isSubmitting}
                        className="p-1.5 rounded-lg bg-[#667436] text-white hover:bg-[#525e2b]"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#667436] truncate">
                        {currentUser.displayName || studentStats?.fullName || 'Siswa Kimia'}
                      </h3>
                      <button 
                        onClick={() => setIsEditingName(true)}
                        title="Ubah Nama"
                        className="text-[#667436]/70 hover:text-[#667436] transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
                
                <p className="text-xs sm:text-sm text-stone-600 truncate flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-[#667436]" />
                  <span>{currentUser.email}</span>
                </p>

                {/* Gelar / Badge Siswa */}
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#667436]/15 text-[#667436] border border-[#667436]/30">
                  <Award className="w-3.5 h-3.5" />
                  <span>{studentStats?.badge || 'Siswa Berbakat'}</span>
                </div>
              </div>
            </div>

            {/* Papan Statistik Belajar (Gamifikasi Siswa) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#667436]/25 shadow-sm space-y-4">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#667436]">
                <span className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4" />
                  Papan Statistik Belajar
                </span>
                <span className="text-[11px] text-stone-500 font-normal">
                  Sesi: Hidrokarbon SMA
                </span>
              </div>

              {/* Grid Skor & Streak */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {/* Total Skor Kuis */}
                <div className="p-3 rounded-xl bg-[#FFFDD0]/70 border border-[#667436]/20 text-center">
                  <div className="text-[10px] text-stone-600 font-medium">Total Skor Kuis</div>
                  <div className="text-xl font-extrabold text-[#667436] font-heading mt-0.5">
                    {studentStats?.totalScore || 0} <span className="text-xs font-normal">Pts</span>
                  </div>
                </div>

                {/* Kuis Selesai */}
                <div className="p-3 rounded-xl bg-[#FFFDD0]/70 border border-[#667436]/20 text-center">
                  <div className="text-[10px] text-stone-600 font-medium">Kuis Selesai</div>
                  <div className="text-xl font-extrabold text-stone-800 font-heading mt-0.5">
                    {studentStats?.completedQuizzes || 0} <span className="text-xs font-normal">Sesi</span>
                  </div>
                </div>

                {/* Streak Belajar */}
                <div className="p-3 rounded-xl bg-[#FFFDD0]/70 border border-[#667436]/20 text-center col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-stone-600 font-medium">Streak Belajar</div>
                  <div className="text-xl font-extrabold text-amber-700 font-heading mt-0.5 flex items-center justify-center gap-1">
                    <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>{studentStats?.streak || 1}x</span>
                  </div>
                </div>
              </div>

              {/* Progres Materi Hidrokarbon */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-stone-700 mb-1.5">
                  <span className="flex items-center gap-1">
                    <span>Progres Materi Hidrokarbon</span>
                    <span className="text-[10px] text-stone-500 font-normal">(Alkana, Alkena, Alkuna)</span>
                  </span>
                  <span className="text-[#667436] font-mono">{studentStats?.materiProgress || 70}%</span>
                </div>
                {/* Progress Bar Bergaya Gamifikasi */}
                <div className="w-full h-3 rounded-full bg-stone-200/80 overflow-hidden p-0.5 border border-[#667436]/20">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${studentStats?.materiProgress || 70}%`,
                      backgroundColor: '#667436' 
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Tombol Aksi Siswa */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Tombol Ganti Password */}
              <button
                onClick={handleResetPassword}
                disabled={isSubmitting}
                className="py-3 px-4 rounded-2xl bg-white hover:bg-stone-50 text-[#667436] font-heading font-bold text-xs sm:text-sm border-2 border-[#667436] flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>Ganti Password</span>
              </button>

              {/* Tombol Keluar / Logout */}
              <button
                onClick={handleLogout}
                className="py-3 px-4 rounded-2xl font-heading font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 shadow-md transition-all duration-200 hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: '#667436' }}
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar / Logout</span>
              </button>
            </div>

          </div>
        ) : (
          /* ========================================================
             TAMPILAN LOGIN & REGISTER (SESUAI GAMBAR REFERENSI USER)
             ======================================================== */
          <div>
            {/* Box Kartu Hijau Zaitun Gelap (Mirip Desain Referensi yang Dilampirkan) */}
            <div 
              className="rounded-3xl p-6 sm:p-7 shadow-xl text-center space-y-4 border border-white/20"
              style={{ backgroundColor: '#2b471e' }} // Hijau Zaitun Gelap / Deep Forest
            >
              {/* Headline Login */}
              <div className="flex items-center justify-center gap-2">
                <Atom className="w-6 h-6 text-white" />
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-wide">
                  {authMode === 'login' ? 'Login Siswa' : 'Daftar Akun'}
                </h3>
              </div>
              <p className="text-xs text-emerald-100/80 max-w-xs mx-auto">
                Masuk untuk menyimpan pencapaian skor kuis, lencana kimia, dan progres modul Anda.
              </p>

              {/* Form Input Pill */}
              <form onSubmit={handleAuthSubmit} className="space-y-3.5 pt-2 text-left">
                {/* Field Nama (Hanya saat Register) */}
                {authMode === 'register' && (
                  <div className="relative">
                    <input 
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="Nama Lengkap Siswa"
                      className="w-full py-3 px-4 pr-11 rounded-full text-xs sm:text-sm font-medium bg-[#50723c] text-white placeholder-emerald-100/70 border border-emerald-400/30 outline-none focus:ring-2 focus:ring-white transition-all"
                    />
                    <User className="w-4 h-4 text-emerald-100 absolute right-4 top-1/2 -translate-y-1/2" />
                  </div>
                )}

                {/* Field Email / Username */}
                <div className="relative">
                  <input 
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Username / Email"
                    className="w-full py-3 px-4 pr-11 rounded-full text-xs sm:text-sm font-medium bg-[#50723c] text-white placeholder-emerald-100/70 border border-emerald-400/30 outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                  <User className="w-4 h-4 text-emerald-100 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>

                {/* Field Password */}
                <div className="relative">
                  <input 
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Password"
                    className="w-full py-3 px-4 pr-11 rounded-full text-xs sm:text-sm font-medium bg-[#50723c] text-white placeholder-emerald-100/70 border border-emerald-400/30 outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                  <Lock className="w-4 h-4 text-emerald-100 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>

                {/* Forgot Password link */}
                {authMode === 'login' && (
                  <div className="text-left">
                    <button
                      type="button"
                      onClick={() => {
                        if (!emailInput) {
                          setActionMessage({ type: 'error', text: 'Ketikkan email Anda di kolom atas terlebih dahulu untuk reset password.' });
                        } else {
                          sendPasswordResetEmail(auth, emailInput)
                            .then(() => setActionMessage({ type: 'success', text: 'Email pemulihan password telah dikirim!' }))
                            .catch(() => setActionMessage({ type: 'error', text: 'Email tidak ditemukan.' }));
                        }
                      }}
                      className="text-[11px] text-emerald-200 hover:text-white underline transition-colors cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {/* Tombol Utama Login / Daftar (Pill Putih dengan teks Hijau Zaitun) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-full font-heading font-extrabold text-sm sm:text-base bg-white hover:bg-stone-100 text-[#2b471e] shadow-lg transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <span>{authMode === 'login' ? 'Login' : 'Daftar Sekarang'}</span>
                    )}
                  </button>
                </div>
              </form>

              {/* Toggle Antara Login dan Register */}
              <div className="pt-2 text-xs text-emerald-100/90">
                {authMode === 'login' ? (
                  <span>
                    Belum punya akun?{' '}
                    <button 
                      onClick={() => { setAuthMode('register'); setActionMessage({ type: '', text: '' }); }}
                      className="text-white font-bold underline cursor-pointer hover:text-amber-200"
                    >
                      Daftar Baru
                    </button>
                  </span>
                ) : (
                  <span>
                    Sudah punya akun?{' '}
                    <button 
                      onClick={() => { setAuthMode('login'); setActionMessage({ type: '', text: '' }); }}
                      className="text-white font-bold underline cursor-pointer hover:text-amber-200"
                    >
                      Login di sini
                    </button>
                  </span>
                )}
              </div>

            </div>

            {/* Quick Demo Login Option untuk kemudahan demonstrasi tanpa setup manual */}
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={async () => {
                  setIsSubmitting(true);
                  try {
                    // Coba sign in dengan akun siswa demo atau buat jika belum ada
                    try {
                      await signInWithEmailAndPassword(auth, "siswa.kimia@hydrocarbedu.id", "kimia12345");
                    } catch {
                      const cred = await createUserWithEmailAndPassword(auth, "siswa.kimia@hydrocarbedu.id", "kimia12345");
                      await updateProfile(cred.user, { displayName: "Siswa Berbakat Kimia" });
                    }
                  } catch (err) {
                    console.warn("Demo sign-in fallback:", err);
                    // Jika Firebase Auth belum disetup di console, tetap berikan pengalaman visual siswa
                    setCurrentUser({
                      displayName: "Fatichatun Nazlah",
                      email: "siswa.fatichatun@hydrocarbedu.id",
                      uid: "demo_student_uid"
                    });
                    setStudentStats({
                      fullName: "Fatichatun Nazlah",
                      email: "siswa.fatichatun@hydrocarbedu.id",
                      totalScore: 780,
                      materiProgress: 85,
                      badge: "Master Alkana & Isomer",
                      level: 3,
                      completedQuizzes: 8,
                      streak: 4
                    });
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#667436] hover:underline cursor-pointer bg-white/70 px-3 py-1.5 rounded-full border border-[#667436]/30 shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Masuk Cepat Sebagai Siswa Demo (1-Klik)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

