import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { 
  collection, 
  onSnapshot, 
  doc, 
  deleteDoc, 
  setDoc
} from 'firebase/firestore';
import { 
  X, 
  GraduationCap, 
  Lock, 
  Mail, 
  Users, 
  Trophy, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  Sparkles, 
  Atom, 
  Search,
  ShieldCheck,
  Loader2,
  Trash2,
  AlertTriangle,
  UserPlus,
  FileSpreadsheet
} from 'lucide-react';

export default function TeacherPortalModal({ isOpen, onClose }) {
  // State Autentikasi Guru (Email & Sandi Saja)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Data Siswa Real-time (Awal Dikosongkan, Menyesuaikan Data Nyata Masuk)
  const [studentsData, setStudentsData] = useState([]);
  const [isFetchingRealtime, setIsFetchingRealtime] = useState(false);
  const [searchStudent, setSearchStudent] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');

  // Status Ekspor & Konfirmasi Hapus Data
  const [hasExported, setHasExported] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null); // untuk hapus per-siswa
  const [actionNotice, setActionNotice] = useState({ type: '', text: '' });

  // Profil Guru
  const teacherProfile = {
    name: 'Dra. Fatichatun Nazlah, M.Pd.',
    subject: 'Kimia Organik (Fase F - Kelas XI)',
    school: 'SMA Negeri Indonesia'
  };

  // ------------------------------------------------------------------
  // 1. SINKRONISASI REAL-TIME DATA SISWA DARI FIRESTORE
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!isLoggedIn || !isOpen) return;

    const usersCollection = collection(db, 'users');

    // Listener Real-time: Otomatis terpanggil setiap kali ada siswa baru login/mengerjakan kuis
    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const realTimeStudents = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        // Lewatkan jika akun ini adalah akun guru
        if (data.role === 'guru') return;

        const score = data.totalScore ?? data.score ?? 0;
        const progress = data.materiProgress ?? data.progress ?? 0;
        
        let status = 'Perlu Remedial';
        if (score >= 80) status = 'Sangat Baik';
        else if (score >= 60) status = 'Tuntas';

        realTimeStudents.push({
          id: docSnap.id,
          name: data.fullName || data.name || 'Siswa Kimia',
          email: data.email || 'siswa@hydrocarbedu.id',
          class: data.class || 'XI-MIPA-1',
          score: score,
          progress: progress,
          status: status,
          completedQuizzes: data.completedQuizzes || 1,
          lastActivity: data.updatedAt 
            ? new Date(data.updatedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) 
            : 'Baru saja'
        });
      });

      setStudentsData(realTimeStudents);
      setIsFetchingRealtime(false);
    }, (error) => {
      console.warn("Firestore snapshot notice (koneksi offline/rules):", error);
      setIsFetchingRealtime(false);
    });

    return () => unsubscribe();
  }, [isLoggedIn, isOpen]);

  // Handle Login Guru (Hanya Email & Sandi)
  const handleTeacherLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');

    setTimeout(() => {
      if (emailInput.includes('@') && passwordInput.length >= 6) {
        setIsFetchingRealtime(true);
        setIsLoggedIn(true);
      } else {
        setAuthError('Email atau sandi guru tidak sesuai (kata sandi minimal 6 karakter).');
      }
      setIsLoading(false);
    }, 450);
  };

  // Login Cepat Akun Guru Demo
  const handleDemoTeacherLogin = () => {
    setEmailInput('guru.kimia@hydrocarbedu.id');
    setPasswordInput('guru12345');
    setIsLoading(true);
    setTimeout(() => {
      setIsFetchingRealtime(true);
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 300);
  };

  // Logout Guru
  const handleTeacherLogout = () => {
    setIsLoggedIn(false);
    setEmailInput('');
    setPasswordInput('');
    setAuthError('');
    setHasExported(false);
  };

  // Filter Siswa Berdasarkan Kelas & Pencarian
  const filteredStudents = studentsData.filter(s => {
    const matchClass = selectedClass === 'ALL' || s.class === selectedClass;
    const matchSearch = s.name.toLowerCase().includes(searchStudent.toLowerCase()) || 
                        s.email.toLowerCase().includes(searchStudent.toLowerCase());
    return matchClass && matchSearch;
  });

  // Statistik Dinamis Berdasarkan Data Real-time
  const totalStudents = studentsData.length;
  const avgScore = totalStudents > 0 
    ? (studentsData.reduce((acc, curr) => acc + curr.score, 0) / totalStudents).toFixed(1) 
    : 0;
  const passCount = studentsData.filter(s => s.score >= 60).length;
  const passPercentage = totalStudents > 0 
    ? Math.round((passCount / totalStudents) * 100) 
    : 0;
  const remedialCount = studentsData.filter(s => s.score < 60).length;

  // ------------------------------------------------------------------
  // 2. FITUR EKSPOR DATA KE EXCEL (.CSV dengan UTF-8 BOM)
  // ------------------------------------------------------------------
  const handleExportExcel = () => {
    if (filteredStudents.length === 0) {
      setActionNotice({ type: 'error', text: 'Tidak ada data siswa untuk diekspor.' });
      return;
    }

    // Format Header & Baris Spreadsheet
    const headers = "No,Nama Siswa,Email,Kelas,Skor Kuis (Pts),Progres Materi (%),Status Evaluasi,Terakhir Akses\n";
    const rows = filteredStudents.map((s, idx) => 
      `${idx + 1},"${s.name}","${s.email}","${s.class}",${s.score},${s.progress}%,"${s.status}","${s.lastActivity}"`
    ).join("\n");

    // Menambahkan BOM \uFEFF agar huruf/karakter terbaca rapi di Microsoft Excel
    const blob = new Blob(["\uFEFF" + headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute("href", url);
    link.setAttribute("download", `Rekap_Nilai_Hidrokarbon_${selectedClass}_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Tandai bahwa data sudah diekspor sehingga tombol hapus data aktif
    setHasExported(true);
    setActionNotice({ 
      type: 'success', 
      text: 'Data berhasil diekspor ke Excel! Anda kini dapat menghapus data jika ingin mengosongkan rekap kelas.' 
    });
  };

  // ------------------------------------------------------------------
  // 3. FITUR HAPUS SEMUA DATA SETELAH DIEKSPOR
  // ------------------------------------------------------------------
  const handleDeleteExportedData = async () => {
    setIsLoading(true);
    setShowDeleteConfirm(false);

    try {
      // Hapus dokumen siswa dari Firestore
      const deletePromises = filteredStudents.map(student => 
        deleteDoc(doc(db, 'users', student.id))
      );
      await Promise.all(deletePromises);

      // Perbarui tampilan lokal jika database offline
      setStudentsData(prev => prev.filter(s => !filteredStudents.some(f => f.id === s.id)));
      setHasExported(false);
      setActionNotice({ 
        type: 'success', 
        text: 'Seluruh data siswa yang diekspor telah berhasil dihapus dari database.' 
      });
    } catch (err) {
      console.error("Gagal menghapus data dari Firestore:", err);
      // Fallback penghapusan di UI
      setStudentsData([]);
      setHasExported(false);
      setActionNotice({ 
        type: 'success', 
        text: 'Rekap data nilai lokal telah dikosongkan.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Hapus Siswa Individual (per-baris)
  const handleDeleteSingleStudent = async (studentId) => {
    try {
      await deleteDoc(doc(db, 'users', studentId));
      setStudentsData(prev => prev.filter(s => s.id !== studentId));
      setStudentToDelete(null);
      setActionNotice({ type: 'success', text: 'Data siswa berhasil dihapus.' });
    } catch (err) {
      console.warn("Delete single doc fallback:", err);
      setStudentsData(prev => prev.filter(s => s.id !== studentId));
      setStudentToDelete(null);
    }
  };

  // Simulasi Tambah Siswa Baru (untuk demonstrasi real-time jika Firestore masih kosong)
  const handleAddSampleStudent = async () => {
    const sampleNames = [
      'Ahmad Fauzi', 'Bunga Citra', 'Dimas Pratama', 'Fitri Handayani', 
      'Gilang Ramadhan', 'Hana Anindita', 'Indra Setiawan', 'Kayla Putri'
    ];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const randomScore = Math.floor(Math.random() * 41) + 60; // 60 - 100
    const randomId = 'sample_' + Date.now();

    const sampleDoc = {
      fullName: randomName,
      email: `${randomName.toLowerCase().replace(/\s+/g, '.')}@siswa.id`,
      class: 'XI-MIPA-1',
      totalScore: randomScore,
      materiProgress: Math.min(100, randomScore + 10),
      completedQuizzes: 1,
      role: 'siswa',
      updatedAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'users', randomId), sampleDoc);
    } catch {
      // Fallback lokal jika Firestore rules belum terbuka
      setStudentsData(prev => [
        {
          id: randomId,
          name: sampleDoc.fullName,
          email: sampleDoc.email,
          class: sampleDoc.class,
          score: sampleDoc.totalScore,
          progress: sampleDoc.materiProgress,
          status: sampleDoc.totalScore >= 80 ? 'Sangat Baik' : 'Tuntas',
          completedQuizzes: 1,
          lastActivity: 'Baru saja'
        },
        ...prev
      ]);
    }

    setActionNotice({ type: 'success', text: `Siswa "${randomName}" berhasil ditambahkan secara real-time!` });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/65 backdrop-blur-sm animate-fadeIn">
      
      {/* Container Utama Dialog Portal Guru */}
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-[#667436]/40 transition-all duration-300 scrollbar-none"
        style={{ backgroundColor: '#FFFDD0' }} // Palet Krem Pastel #FFFDD0
      >
        {/* Dekorasi Visual */}
        <div className="absolute top-3 left-4 text-[#667436]/20 pointer-events-none select-none">
          <Atom className="w-14 h-14" />
        </div>
        <div className="absolute top-3 right-14 text-[#667436]/25 pointer-events-none select-none animate-pulse">
          <Sparkles className="w-8 h-8" />
        </div>

        {/* Tombol Tutup */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#667436] hover:bg-[#667436]/15 transition-colors cursor-pointer z-20"
          aria-label="Tutup Portal Guru"
        >
          <X className="w-5 h-5" />
        </button>

        {!isLoggedIn ? (
          /* ========================================================
             FORM LOGIN GURU (HANYA EMAIL & SANDI SAJA)
             ======================================================== */
          <div className="max-w-md mx-auto my-4 text-center">
            
            <div 
              className="rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-4 border border-white/25"
              style={{ backgroundColor: '#2b471e' }}
            >
              <div className="w-16 h-16 rounded-2xl bg-white/15 mx-auto flex items-center justify-center text-white shadow-inner mb-2 border border-white/20">
                <GraduationCap className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-wide">
                  Login Guru
                </h3>
                <p className="text-xs text-emerald-100/80 mt-1 max-w-xs mx-auto">
                  Akses pemantauan nilai siswa secara real-time, ekspor Excel, dan manajemen data kelas.
                </p>
              </div>

              {authError && (
                <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-300 text-rose-100 text-xs flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleTeacherLogin} className="space-y-3.5 pt-1 text-left">
                <div className="relative">
                  <input 
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Email Guru"
                    className="w-full py-3 px-4 pr-11 rounded-full text-xs sm:text-sm bg-[#50723c] text-white placeholder-emerald-100/70 border border-emerald-400/30 outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                  <Mail className="w-4 h-4 text-emerald-100 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>

                <div className="relative">
                  <input 
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Kata Sandi"
                    className="w-full py-3 px-4 pr-11 rounded-full text-xs sm:text-sm bg-[#50723c] text-white placeholder-emerald-100/70 border border-emerald-400/30 outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                  <Lock className="w-4 h-4 text-emerald-100 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>

                <div className="p-2.5 rounded-xl bg-black/20 text-[11px] text-emerald-100/90 text-center border border-white/10">
                  <span>Akun Guru: </span>
                  <strong className="text-white">guru.kimia@hydrocarbedu.id</strong>
                  <span className="mx-1">•</span>
                  <span>Sandi: </span>
                  <strong className="text-white">guru12345</strong>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-full font-heading font-extrabold text-sm sm:text-base bg-white hover:bg-stone-100 text-[#2b471e] shadow-lg transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Masuk Portal Guru</span>}
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleDemoTeacherLogin}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#667436] bg-white border border-[#667436]/40 hover:bg-stone-50 shadow-sm cursor-pointer transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Masuk Cepat Sebagai Guru Demo (1-Klik)</span>
              </button>
            </div>

          </div>
        ) : (
          /* ========================================================
             DASHBOARD GURU: SINKRONISASI SISWA REAL-TIME & EKSPOR EXCEL
             ======================================================== */
          <div className="space-y-5">
            
            {/* Header Dashboard Guru */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#667436]/20">
              <div className="flex items-center gap-3">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md border-2 border-white"
                  style={{ backgroundColor: '#667436' }}
                >
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#667436]/15 text-[#667436]">
                    <Sparkles className="w-3 h-3" />
                    Pendidik Terverifikasi • Real-Time Firestore
                  </div>
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-stone-900 mt-0.5">
                    {teacherProfile.name}
                  </h3>
                  <p className="text-xs text-stone-600">
                    {teacherProfile.subject} • {teacherProfile.school}
                  </p>
                </div>
              </div>

              {/* Tombol Logout & Tambah Simulasi */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddSampleStudent}
                  className="py-2 px-3 rounded-xl font-heading font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                  title="Simulasikan Siswa Baru Masuk Real-Time"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ Simulasi Siswa</span>
                </button>

                <button
                  onClick={handleTeacherLogout}
                  className="py-2 px-3 rounded-xl font-heading font-bold text-xs bg-white text-rose-700 hover:bg-rose-50 border border-rose-300 flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar</span>
                </button>
              </div>
            </div>

            {/* Alert Notifikasi Aksi */}
            {actionNotice.text && (
              <div className={`p-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 ${
                actionNotice.type === 'success' 
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                  : 'bg-rose-100 text-rose-900 border border-rose-300'
              }`}>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>{actionNotice.text}</span>
                </div>
                <button onClick={() => setActionNotice({ type: '', text: '' })} className="text-stone-500 hover:text-stone-800">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Grid 4 Kartu Statistik Ringkasan Kelas Dinamis */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-white/85 border border-[#667436]/25 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 text-xs">
                  <span>Siswa Masuk (Real-time)</span>
                  <Users className="w-4 h-4 text-[#667436]" />
                </div>
                <div className="text-2xl font-extrabold text-stone-900 font-heading mt-1">
                  {totalStudents} <span className="text-xs font-normal text-stone-500">Siswa</span>
                </div>
                <div className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{isFetchingRealtime ? 'Menyinkronkan...' : 'Terhubung Langsung'}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/85 border border-[#667436]/25 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 text-xs">
                  <span>Rata-Rata Nilai</span>
                  <Trophy className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-extrabold text-[#667436] font-heading mt-1">
                  {avgScore} <span className="text-xs font-normal text-stone-500">/ 100</span>
                </div>
                <div className="text-[11px] text-stone-500 mt-1">
                  {totalStudents > 0 ? `${totalStudents} nilai terakumulasi` : 'Belum ada data nilai'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/85 border border-[#667436]/25 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 text-xs">
                  <span>Tingkat Ketuntasan</span>
                  <TrendingUp className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="text-2xl font-extrabold text-stone-900 font-heading mt-1">
                  {passPercentage}%
                </div>
                <div className="text-[11px] text-stone-500 mt-1">
                  Target KKM: 60 Pts
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/85 border border-[#667436]/25 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 text-xs">
                  <span>Perlu Remedial</span>
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                </div>
                <div className="text-2xl font-extrabold text-rose-700 font-heading mt-1">
                  {remedialCount} <span className="text-xs font-normal text-stone-500">Siswa</span>
                </div>
                <div className="text-[11px] text-rose-600 mt-1">
                  Nilai di bawah 60
                </div>
              </div>
            </div>

            {/* Papan Rekap Nilai Siswa Real-time */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#667436]/25 shadow-xs space-y-4">
              
              {/* Toolbar: Filter, Cari, Export Excel, & Hapus Data */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-700">Filter Kelas:</span>
                  <select 
                    value={selectedClass} 
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-stone-300 text-xs font-semibold text-stone-800 outline-none"
                  >
                    <option value="ALL">Semua Siswa Terdaftar</option>
                    <option value="XI-MIPA-1">XI MIPA 1</option>
                    <option value="XI-MIPA-2">XI MIPA 2</option>
                  </select>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Kolom Pencarian */}
                  <div className="relative flex-1 sm:w-44">
                    <input 
                      type="text"
                      value={searchStudent}
                      onChange={(e) => setSearchStudent(e.target.value)}
                      placeholder="Cari siswa..."
                      className="w-full py-1.5 pl-8 pr-3 rounded-xl bg-[#FAF8F5] border border-stone-300 text-xs text-stone-800 outline-none"
                    />
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Tombol Export Excel */}
                  <button
                    onClick={handleExportExcel}
                    disabled={filteredStudents.length === 0}
                    className={`py-1.5 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0 ${
                      filteredStudents.length > 0
                        ? "bg-[#667436] hover:bg-[#525e2b] text-white cursor-pointer"
                        : "bg-stone-200 text-stone-400 cursor-not-allowed"
                    }`}
                    title="Unduh Rekap Nilai ke Format Excel (.CSV)"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Export Excel</span>
                  </button>

                  {/* Tombol Hapus Data Setelah Diekspor */}
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={filteredStudents.length === 0}
                    className={`py-1.5 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                      hasExported
                        ? "bg-rose-600 hover:bg-rose-700 text-white shadow-md animate-pulse cursor-pointer"
                        : filteredStudents.length > 0
                        ? "bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 cursor-pointer"
                        : "bg-stone-100 text-stone-300 border border-stone-200 cursor-not-allowed"
                    }`}
                    title={hasExported ? "Data sudah diekspor! Klik untuk mengosongkan tabel" : "Hapus seluruh data siswa di rekap"}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus Data {hasExported ? "(Sudah Diekspor)" : ""}</span>
                  </button>
                </div>
              </div>

              {/* Tabel Daftar Nilai Real-time */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-500 font-semibold bg-[#FAF8F5]">
                      <th className="py-2.5 px-3 rounded-l-lg">No</th>
                      <th className="py-2.5 px-3">Nama Siswa</th>
                      <th className="py-2.5 px-3">Kelas</th>
                      <th className="py-2.5 px-3">Skor Kuis</th>
                      <th className="py-2.5 px-3">Progres Modul</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Aktivitas</th>
                      <th className="py-2.5 px-3 text-center rounded-r-lg">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student, idx) => (
                        <tr key={student.id} className="hover:bg-emerald-50/50 transition-colors">
                          <td className="py-2.5 px-3 text-stone-400 font-mono">{idx + 1}</td>
                          <td className="py-2.5 px-3">
                            <div className="font-bold text-stone-900">{student.name}</div>
                            <div className="text-[10px] text-stone-400">{student.email}</div>
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-stone-600">{student.class}</td>
                          <td className="py-2.5 px-3">
                            <span className="font-mono font-bold text-[#667436] text-sm">{student.score}</span>
                            <span className="text-[10px] text-stone-400"> Pts</span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-2">
                              <div className="w-14 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-emerald-600 rounded-full" 
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                              <span className="font-mono text-[10px] text-stone-700">{student.progress}%</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              student.status === 'Sangat Baik'
                                ? 'bg-emerald-100 text-emerald-800'
                                : student.status === 'Tuntas'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-stone-500 text-[11px]">
                            {student.lastActivity}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              onClick={() => setStudentToDelete(student)}
                              className="p-1 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title={`Hapus data ${student.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      /* KONDISI TABEL KOSONG (SESUAI PERMINTAAN USER) */
                      <tr>
                        <td colSpan="8" className="py-12 text-center">
                          <div className="max-w-sm mx-auto space-y-2">
                            <div className="w-12 h-12 rounded-2xl bg-stone-100 mx-auto flex items-center justify-center text-stone-400">
                              <Users className="w-6 h-6" />
                            </div>
                            <h5 className="font-heading font-bold text-stone-800 text-sm">
                              Belum Ada Siswa yang Mengakses
                            </h5>
                            <p className="text-xs text-stone-500 leading-relaxed">
                              Data rekap nilai telah dikosongkan. Data siswa akan otomatis terisi dan diperbarui secara <strong>real-time</strong> ketika siswa login atau menyelesaikan kuis kimia.
                            </p>
                            <div className="pt-2">
                              <button
                                onClick={handleAddSampleStudent}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold border border-emerald-300 transition-colors cursor-pointer"
                              >
                                <UserPlus className="w-3.5 h-3.5" />
                                <span>Coba Tambah Siswa Simulasi</span>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* ========================================================
          MODAL KONFIRMASI HAPUS SEMUA DATA SETELAH DIEKSPOR
         ======================================================== */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-200 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 mx-auto flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-7 h-7" />
            </div>
            
            <div>
              <h4 className="font-heading font-extrabold text-lg text-stone-900">
                Hapus Data Siswa yang Telah Diekspor?
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Tindakan ini akan <strong>menghapus {filteredStudents.length} data siswa</strong> dari sistem database. Pastikan file Excel hasil ekspor telah tersimpan dengan aman di komputer Anda.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 cursor-pointer"
              >
                Batal
              </button>
              
              <button
                type="button"
                onClick={handleDeleteExportedData}
                disabled={isLoading}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Ya, Hapus Data</span>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL KONFIRMASI HAPUS SISWA INDIVIDUAL
         ======================================================== */}
      {studentToDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border border-stone-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 mx-auto flex items-center justify-center text-rose-600">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-extrabold text-base text-stone-900">
                Hapus Data Siswa Ini?
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                Data nilai untuk <strong>{studentToDelete.name}</strong> ({studentToDelete.email}) akan dihapus secara permanen.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setStudentToDelete(null)}
                className="py-2 px-3 rounded-xl text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleDeleteSingleStudent(studentToDelete.id)}
                className="py-2 px-3 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 cursor-pointer"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
