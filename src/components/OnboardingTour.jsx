import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  FlaskConical,
  Zap,
  User,
  GraduationCap,
  LogIn,
  Atom,
  Sparkles,
  CheckCircle,
  Map
} from 'lucide-react';

// ==================================================================================
// ONBOARDING TOUR — HydrocarbonEdu
// Menampilkan petunjuk langkah demi langkah untuk pengguna baru.
// Status "sudah melihat tour" disimpan di localStorage agar tidak muncul lagi.
// ==================================================================================

const TOUR_STEPS = [
  {
    id: 'welcome',
    icon: <Sparkles className="w-10 h-10 text-emerald-600" />,
    title: 'Selamat Datang di HydrocarbonEdu! 🧪',
    description:
      'Ini adalah platform pembelajaran kimia hidrokarbon interaktif berbasis web. Ikuti tur singkat ini untuk mengenal semua fitur yang tersedia untukmu.',
    highlight: null,
    position: 'center',
    emoji: '👋'
  },
  {
    id: 'login-panel',
    icon: <LogIn className="w-10 h-10 text-[#667436]" />,
    title: 'Panel Masuk (Login) Siswa & Guru',
    description:
      'Saat pertama kali membuka website, panel ini muncul otomatis.\n\n• Siswa: Daftar akun baru atau login dengan email & kata sandi untuk menyimpan progres belajar dan skor kuis secara permanen.\n• Guru: Login khusus untuk mengakses dashboard rekap nilai siswa secara real-time.\n• Tamu: Tekan tombol "Eksplorasi Tamu" untuk langsung belajar tanpa login.',
    highlight: 'login',
    position: 'center',
    emoji: '🔐'
  },
  {
    id: 'navbar',
    icon: <Map className="w-10 h-10 text-emerald-600" />,
    title: 'Navigasi Utama (Navbar)',
    description:
      'Bilah navigasi di bagian atas halaman berisi:\n\n• Beranda — Kembali ke halaman utama\n• Materi & Modul — Pelajari Alkana, Alkena, Alkuna, Isomer, dan IUPAC Builder\n• Lab Molekul 3D — Visualisasi 3D senyawa interaktif\n• Kuis Interaktif — Uji pemahamanmu dengan kuis berhadiah poin\n\nNavbar akan selalu terlihat saat kamu menggulir halaman.',
    highlight: 'navbar',
    position: 'bottom',
    emoji: '🗺️'
  },
  {
    id: 'hero',
    icon: <Atom className="w-10 h-10 text-emerald-600" />,
    title: 'Beranda — Kartu Pratinjau Hidrokarbon',
    description:
      'Di bagian Beranda, kamu bisa melihat pratinjau cepat 3 golongan hidrokarbon:\n\n• Alkana (CₙH₂ₙ₊₂) — jenuh, sp³, sudut 109,5°\n• Alkena (CₙH₂ₙ) — tak jenuh, sp², sudut 120°\n• Alkuna (CₙH₂ₙ₋₂) — tak jenuh, sp, sudut 180°\n\nKlik tombol di kartu untuk langsung menuju Lab Molekul 3D dan melihat bentuk geometri nyata.',
    highlight: 'hero',
    position: 'bottom',
    emoji: '⚗️'
  },
  {
    id: 'materi',
    icon: <BookOpen className="w-10 h-10 text-emerald-600" />,
    title: 'Materi & Modul — 5 Tab Pembelajaran',
    description:
      'Bagian materi menyediakan 5 tab interaktif:\n\n1. Alkana — Karakteristik ikatan jenuh, deret homolog, 4 aturan IUPAC\n2. Alkena — Ikatan rangkap dua, ciri reaktivitas, penamaan\n3. Alkuna — Ikatan rangkap tiga, geometri linear, contoh penamaan\n4. Isomerisme — Perbandingan visual 4 jenis isomer (Rantai, Posisi, Fungsi, Geometri cis-trans)\n5. IUPAC Builder — Simulator interaktif: pilih awalan karbon dan golongan, lihat nama & rumus terbentuk otomatis!',
    highlight: 'materi',
    position: 'top',
    emoji: '📖'
  },
  {
    id: 'lab',
    icon: <FlaskConical className="w-10 h-10 text-emerald-600" />,
    title: 'Lab Molekul 3D — Visualisasi WebGL',
    description:
      'Lab 3D memberikan pengalaman kimia seperti di laboratorium nyata!\n\n• Pilih molekul dari daftar (Metana, Etana, Etena, Etuna, Propana, Isobutana, Benzena)\n• Putar molekul 360° dengan klik & seret mouse\n• Zoom in/out dengan roda scroll\n• Ganti tampilan: Bola & Tongkat, Space-fill VDW, atau Wireframe\n• Aktifkan label nama atom (C/H)\n• Gunakan tab MolView untuk melihat model 3D berbasis database kimia terbuka',
    highlight: 'lab',
    position: 'top',
    emoji: '🔬'
  },
  {
    id: 'quiz',
    icon: <Zap className="w-10 h-10 text-emerald-600" />,
    title: 'Kuis Interaktif — Gamifikasi Belajar',
    description:
      'Uji pemahamanmu dengan kuis yang seru dan interaktif!\n\n• 8 soal berstandar kurikulum Kimia SMA Fase F\n• Poin +100 untuk setiap jawaban benar\n• Bonus Streak 🔥 (makin banyak jawaban benar beruntun, poin makin besar!)\n• Efek suara & konfeti selebrasi saat menjawab benar\n• Pembahasan ilmiah langsung di setiap soal\n• Skor disimpan ke Firebase secara real-time — guru bisa melihat nilaimu!',
    highlight: 'quiz',
    position: 'top',
    emoji: '🏆'
  },
  {
    id: 'profile',
    icon: <User className="w-10 h-10 text-[#667436]" />,
    title: 'Profil Siswa — Pantau Progres Belajarmu',
    description:
      'Tombol "Profil Siswa" di navbar membuka kartu profil pribadimu:\n\n• Nama lengkap & email akun\n• Total skor kuis yang terkumpul\n• Progres penguasaan materi (progress bar %)\n• Badge & level pencapaian (Peneliti Berbakat, Master Kimia, dll.)\n• Edit nama profil\n• Ganti kata sandi\n• Tombol Keluar / Logout',
    highlight: 'profile',
    position: 'bottom',
    emoji: '👤'
  },
  {
    id: 'teacher',
    icon: <GraduationCap className="w-10 h-10 text-emerald-700" />,
    title: 'Portal Guru — Dashboard Real-Time',
    description:
      'Tombol "Portal Guru" di navbar membuka dashboard khusus pendidik:\n\n• Login dengan email & sandi guru\n• Pantau nilai dan progres seluruh siswa secara real-time\n• Statistik kelas: rata-rata nilai, persentase ketuntasan\n• Cari & filter siswa berdasarkan nama, email, atau kelas\n• Ekspor rekap nilai ke file Excel (.CSV)\n• Hapus data setelah diekspor untuk memulai sesi baru',
    highlight: 'teacher',
    position: 'bottom',
    emoji: '👩‍🏫'
  },
  {
    id: 'done',
    icon: <CheckCircle className="w-10 h-10 text-emerald-600" />,
    title: 'Siap Belajar Kimia! 🎉',
    description:
      'Kamu sudah mengenal semua fitur HydrocarbonEdu.\n\nMulai perjalanan belajarmu sekarang:\n\n1. Buka tab Materi & pelajari Alkana, Alkena, Alkuna\n2. Lihat bentuk molekul di Lab 3D\n3. Uji pemahamanmu di Kuis Interaktif\n4. Pantau progresmu di Profil Siswa\n\nSelamat belajar! 💪',
    highlight: null,
    position: 'center',
    emoji: '🎉'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// Komponen Utama OnboardingTour
// ─────────────────────────────────────────────────────────────────────────────
export default function OnboardingTour({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Cek localStorage: tampilkan tour hanya untuk pengguna baru
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hydrocarb_tour_done');
    if (!hasSeenTour) {
      // Tunda sedikit agar panel login sempat tampil lebih dulu
      const timer = setTimeout(() => setIsVisible(true), 2200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleComplete = useCallback(() => {
    localStorage.setItem('hydrocarb_tour_done', '1');
    setIsVisible(false);
    if (onComplete) onComplete();
  }, [onComplete]);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleSkip = () => handleComplete();

  if (!isVisible) return null;

  const step = TOUR_STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === TOUR_STEPS.length - 1;
  const progress = ((currentStep + 1) / TOUR_STEPS.length) * 100;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15, 25, 15, 0.72)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) handleSkip(); }}
    >
      {/* Panel Utama Panduan */}
      <div
        className="relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-fadeIn"
        style={{ backgroundColor: '#FFFDD0', border: '3px solid #667436' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header Dekoratif */}
        <div
          className="relative px-6 pt-6 pb-4"
          style={{ background: 'linear-gradient(135deg, #2b471e 0%, #4a7a2d 100%)' }}
        >
          {/* Tombol Skip */}
          <button
            onClick={handleSkip}
            className="absolute top-3 right-3 p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
            title="Lewati tur panduan"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Badge Step */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-widest">
              Panduan Pengguna
            </span>
            <span className="text-[11px] text-white/50">
              {currentStep + 1} / {TOUR_STEPS.length}
            </span>
          </div>

          {/* Judul & Emoji */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0 border border-white/20 shadow-inner text-2xl">
              {step.emoji}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white font-heading leading-tight">
                {step.title}
              </h2>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #6DBDA3, #A8D5A2)'
              }}
            />
          </div>
        </div>

        {/* Konten Deskripsi */}
        <div className="px-6 py-5">
          {/* Ikon dekoratif golongan langkah */}
          <div
            className="flex items-center justify-center w-12 h-12 rounded-2xl mx-auto mb-4 shadow-sm"
            style={{ backgroundColor: 'rgba(102,116,54,0.12)', border: '1px solid rgba(102,116,54,0.25)' }}
          >
            {step.icon}
          </div>

          {/* Teks penjelasan — gunakan whitespace-pre-line agar \n dirender */}
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed whitespace-pre-line text-center">
            {step.description}
          </p>
        </div>

        {/* Dot Progress Navigasi */}
        <div className="flex justify-center gap-1.5 pb-2">
          {TOUR_STEPS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className="rounded-full transition-all cursor-pointer"
              style={{
                width: idx === currentStep ? '20px' : '8px',
                height: '8px',
                backgroundColor: idx === currentStep ? '#667436' : '#C5D1A5',
              }}
              aria-label={`Langkah ${idx + 1}`}
            />
          ))}
        </div>

        {/* Tombol Aksi */}
        <div className="px-6 pb-6 flex items-center justify-between gap-3 mt-1">
          {/* Tombol Kembali */}
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              isFirst
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-stone-200 text-stone-700'
            }`}
            style={{ backgroundColor: isFirst ? 'transparent' : '#EDE9DC' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Sebelumnya
          </button>

          {/* Tombol Skip (tengah, hanya jika bukan langkah terakhir) */}
          {!isLast && (
            <button
              onClick={handleSkip}
              className="text-xs text-stone-400 hover:text-stone-600 transition-colors cursor-pointer underline underline-offset-2"
            >
              Lewati tur
            </button>
          )}

          {/* Tombol Lanjut / Selesai */}
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] cursor-pointer shadow-md"
            style={{ backgroundColor: '#667436' }}
          >
            {isLast ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Mulai Belajar!
              </>
            ) : (
              <>
                Lanjut
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Keyboard navigation hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/35 text-[11px]">
        Tekan Escape atau klik luar panel untuk melewati panduan
      </div>
    </div>
  );
}

// Hook useOnboardingTour tersedia di src/hooks/useOnboardingTour.js
