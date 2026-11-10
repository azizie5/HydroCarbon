import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  Lock, 
  Mail, 
  Users, 
  BookOpen, 
  Trophy, 
  TrendingUp, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  Sparkles, 
  Atom, 
  Search,
  KeyRound,
  ShieldCheck,
  Loader2
} from 'lucide-react';

export default function TeacherPortalModal({ isOpen, onClose }) {
  // State Autentikasi Guru
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nipInput, setNipInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [searchStudent, setSearchStudent] = useState('');
  const [selectedClass, setSelectedClass] = useState('XI-MIPA-1');

  // Profil Guru Aktif
  const [teacherProfile, setTeacherProfile] = useState({
    name: 'Dra. Fatichatun Nazlah, M.Pd.',
    nip: '19850412 201001 2 018',
    subject: 'Kimia Organik (Fase F - Kelas XI)',
    school: 'SMA Negeri Indonesia',
    activeClass: 'XI MIPA 1'
  });

  // Data Contoh Siswa & Rekap Nilai Kuis Hidrokarbon
  const [studentsData] = useState([
    { id: 1, name: 'Ahmad Fauzi', email: 'ahmad.f@siswa.id', class: 'XI-MIPA-1', score: 92, progress: 95, status: 'Sangat Baik', lastActivity: 'Hari ini, 09:30' },
    { id: 2, name: 'Bunga Citra Lestari', email: 'bunga.c@siswa.id', class: 'XI-MIPA-1', score: 88, progress: 85, status: 'Sangat Baik', lastActivity: 'Hari ini, 08:15' },
    { id: 3, name: 'Dimas Setiawan', email: 'dimas.s@siswa.id', class: 'XI-MIPA-1', score: 78, progress: 70, status: 'Tuntas', lastActivity: 'Kemarin, 14:20' },
    { id: 4, name: 'Fitri Handayani', email: 'fitri.h@siswa.id', class: 'XI-MIPA-1', score: 95, progress: 100, status: 'Sangat Baik', lastActivity: 'Hari ini, 10:05' },
    { id: 5, name: 'Gilang Ramadhan', email: 'gilang.r@siswa.id', class: 'XI-MIPA-1', score: 62, progress: 50, status: 'Perlu Remedial', lastActivity: '3 hari lalu' },
    { id: 6, name: 'Hana Anindita', email: 'hana.a@siswa.id', class: 'XI-MIPA-1', score: 84, progress: 80, status: 'Tuntas', lastActivity: 'Kemarin, 16:40' },
    { id: 7, name: 'Indra Pratama', email: 'indra.p@siswa.id', class: 'XI-MIPA-2', score: 90, progress: 90, status: 'Sangat Baik', lastActivity: 'Hari ini, 07:50' },
    { id: 8, name: 'Joko Widodo Putra', email: 'joko.w@siswa.id', class: 'XI-MIPA-2', score: 58, progress: 45, status: 'Perlu Remedial', lastActivity: '4 hari lalu' }
  ]);

  // Handle Login Guru
  const handleTeacherLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');

    setTimeout(() => {
      // Verifikasi sederhana untuk login guru
      if (emailInput.includes('@') && passwordInput.length >= 6) {
        setIsLoggedIn(true);
        if (nipInput) {
          setTeacherProfile(prev => ({ ...prev, nip: nipInput }));
        }
      } else {
        setAuthError('Email atau password tidak sesuai (minimal 6 karakter).');
      }
      setIsLoading(false);
    }, 600);
  };

  // Login Cepat Akun Guru Demo
  const handleDemoTeacherLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 400);
  };

  // Logout Guru
  const handleTeacherLogout = () => {
    setIsLoggedIn(false);
    setEmailInput('');
    setPasswordInput('');
    setNipInput('');
    setAuthError('');
  };

  // Filter Siswa Berdasarkan Kelas & Pencarian
  const filteredStudents = studentsData.filter(s => {
    const matchClass = selectedClass === 'ALL' || s.class === selectedClass;
    const matchSearch = s.name.toLowerCase().includes(searchStudent.toLowerCase()) || 
                        s.email.toLowerCase().includes(searchStudent.toLowerCase());
    return matchClass && matchSearch;
  });

  // Ekspor Rekap Nilai CSV
  const handleExportCSV = () => {
    const headers = "No,Nama Siswa,Email,Kelas,Skor Kuis,Progres Materi,Status\n";
    const rows = filteredStudents.map((s, idx) => 
      `${idx + 1},"${s.name}","${s.email}","${s.class}",${s.score},${s.progress}%,"${s.status}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Rekap_Nilai_Hidrokarbon_${selectedClass}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/65 backdrop-blur-sm animate-fadeIn">
      
      {/* Container Dialog Portal Guru */}
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
             FORM LOGIN GURU KIMIA (TERTATA ELEGAN SEPERTI REFERENSI)
             ======================================================== */
          <div className="max-w-md mx-auto my-4 text-center">
            
            {/* Box Kartu Hijau Zaitun Gelap */}
            <div 
              className="rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-4 border border-white/25"
              style={{ backgroundColor: '#2b471e' }}
            >
              {/* Header Icon Guru */}
              <div className="w-16 h-16 rounded-2xl bg-white/15 mx-auto flex items-center justify-center text-white shadow-inner mb-2 border border-white/20">
                <GraduationCap className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-wide">
                  Portal Masuk Guru
                </h3>
                <p className="text-xs text-emerald-100/80 mt-1 max-w-xs mx-auto">
                  Akses panel pemantauan nilai, progres ketuntasan siswa, dan bank soal Hidrokarbon SMA.
                </p>
              </div>

              {authError && (
                <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-300 text-rose-100 text-xs flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Form Input Guru */}
              <form onSubmit={handleTeacherLogin} className="space-y-3 pt-1 text-left">
                {/* NIP / NIK */}
                <div className="relative">
                  <input 
                    type="text"
                    value={nipInput}
                    onChange={(e) => setNipInput(e.target.value)}
                    placeholder="NIP / No. Induk Pendidik (Opsional)"
                    className="w-full py-3 px-4 pr-11 rounded-full text-xs sm:text-sm bg-[#50723c] text-white placeholder-emerald-100/70 border border-emerald-400/30 outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                  <KeyRound className="w-4 h-4 text-emerald-100 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>

                {/* Email Guru */}
                <div className="relative">
                  <input 
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Email Resmi Guru"
                    className="w-full py-3 px-4 pr-11 rounded-full text-xs sm:text-sm bg-[#50723c] text-white placeholder-emerald-100/70 border border-emerald-400/30 outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                  <Mail className="w-4 h-4 text-emerald-100 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>

                {/* Password Guru */}
                <div className="relative">
                  <input 
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Kata Sandi Akun Guru"
                    className="w-full py-3 px-4 pr-11 rounded-full text-xs sm:text-sm bg-[#50723c] text-white placeholder-emerald-100/70 border border-emerald-400/30 outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                  <Lock className="w-4 h-4 text-emerald-100 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>

                {/* Tombol Masuk Guru (Pill Putih) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-full font-heading font-extrabold text-sm sm:text-base bg-white hover:bg-stone-100 text-[#2b471e] shadow-lg transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <span>Masuk Portal Guru</span>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Demo Login Guru */}
            <div className="mt-4">
              <button
                type="button"
                onClick={handleDemoTeacherLogin}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#667436] bg-white border border-[#667436]/40 hover:bg-stone-50 shadow-sm cursor-pointer transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Masuk Cepat Sebagai Akun Guru Demo (1-Klik)</span>
              </button>
            </div>

          </div>
        ) : (
          /* ========================================================
             DASHBOARD GURU KIMIA: REKAP NILAI & KETUNTASAN SISWA
             ======================================================== */
          <div className="space-y-6">
            
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
                    Pendidik Terverifikasi
                  </div>
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-stone-900 mt-0.5">
                    {teacherProfile.name}
                  </h3>
                  <p className="text-xs text-stone-600">
                    NIP: {teacherProfile.nip} • {teacherProfile.subject}
                  </p>
                </div>
              </div>

              {/* Tombol Logout Guru */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleTeacherLogout}
                  className="py-2 px-3.5 rounded-xl font-heading font-bold text-xs bg-white text-rose-700 hover:bg-rose-50 border border-rose-300 flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar Guru</span>
                </button>
              </div>
            </div>

            {/* Grid 4 Kartu Statistik Ringkasan Kelas */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-white/85 border border-[#667436]/25 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 text-xs">
                  <span>Total Siswa</span>
                  <Users className="w-4 h-4 text-[#667436]" />
                </div>
                <div className="text-2xl font-extrabold text-stone-900 font-heading mt-1">
                  36 <span className="text-xs font-normal text-stone-500">Siswa</span>
                </div>
                <div className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>34 Siswa Aktif</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/85 border border-[#667436]/25 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 text-xs">
                  <span>Rata-Rata Nilai</span>
                  <Trophy className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-extrabold text-[#667436] font-heading mt-1">
                  84.6 <span className="text-xs font-normal text-stone-500">/ 100</span>
                </div>
                <div className="text-[11px] text-emerald-700 mt-1">
                  +4.2 poin dari kuis awal
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/85 border border-[#667436]/25 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 text-xs">
                  <span>Ketuntasan Modul</span>
                  <TrendingUp className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="text-2xl font-extrabold text-stone-900 font-heading mt-1">
                  88.5%
                </div>
                <div className="text-[11px] text-stone-500 mt-1">
                  Target KKM: 75.0%
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/85 border border-[#667436]/25 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 text-xs">
                  <span>Perlu Remedial</span>
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                </div>
                <div className="text-2xl font-extrabold text-rose-700 font-heading mt-1">
                  2 <span className="text-xs font-normal text-stone-500">Siswa</span>
                </div>
                <div className="text-[11px] text-rose-600 mt-1">
                  Materi: Isomer Geometri
                </div>
              </div>
            </div>

            {/* Analisis Ketuntasan Materi Per Bab */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-[#667436]/25 shadow-xs space-y-3">
              <h4 className="font-heading font-extrabold text-sm text-stone-800 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#667436]" />
                Analisis Pemahaman Materi Hidrokarbon Kelas
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                {/* Alkana */}
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200">
                  <div className="flex justify-between text-xs font-bold text-stone-800">
                    <span>1. Alkana (CₙH₂ₙ₊₂)</span>
                    <span className="text-emerald-700">94% Tuntas</span>
                  </div>
                  <div className="w-full h-2 bg-stone-200 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                  <div className="text-[10px] text-stone-500 mt-1">Ikatan tunggal & tata nama dikuasai sangat baik</div>
                </div>

                {/* Alkena */}
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200">
                  <div className="flex justify-between text-xs font-bold text-stone-800">
                    <span>2. Alkena (CₙH₂ₙ)</span>
                    <span className="text-emerald-700">86% Tuntas</span>
                  </div>
                  <div className="w-full h-2 bg-stone-200 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '86%' }}></div>
                  </div>
                  <div className="text-[10px] text-stone-500 mt-1">Pemahaman ikatan rangkap dua stabil</div>
                </div>

                {/* Alkuna & Isomer */}
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200">
                  <div className="flex justify-between text-xs font-bold text-stone-800">
                    <span>3. Alkuna & Isomer</span>
                    <span className="text-amber-700">74% Cukup</span>
                  </div>
                  <div className="w-full h-2 bg-stone-200 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '74%' }}></div>
                  </div>
                  <div className="text-[10px] text-amber-800 mt-1">Perlu penguatan konsep isomer cis-trans</div>
                </div>
              </div>
            </div>

            {/* Papan Rekap Nilai Siswa Real-time */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#667436]/25 shadow-xs space-y-4">
              
              {/* Toolbar: Filter Kelas, Cari Siswa, & Export CSV */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-700">Kelas:</span>
                  <select 
                    value={selectedClass} 
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-stone-300 text-xs font-semibold text-stone-800 outline-none"
                  >
                    <option value="XI-MIPA-1">XI MIPA 1</option>
                    <option value="XI-MIPA-2">XI MIPA 2</option>
                    <option value="ALL">Semua Kelas</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  {/* Kolom Pencarian */}
                  <div className="relative flex-1 sm:w-48">
                    <input 
                      type="text"
                      value={searchStudent}
                      onChange={(e) => setSearchStudent(e.target.value)}
                      placeholder="Cari siswa..."
                      className="w-full py-1.5 pl-8 pr-3 rounded-xl bg-[#FAF8F5] border border-stone-300 text-xs text-stone-800 outline-none"
                    />
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Tombol Export CSV */}
                  <button
                    onClick={handleExportCSV}
                    className="py-1.5 px-3 rounded-xl bg-[#667436] hover:bg-[#525e2b] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors shrink-0"
                    title="Unduh Lembar Nilai (.CSV)"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Tabel Daftar Nilai */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-500 font-semibold bg-[#FAF8F5]">
                      <th className="py-2.5 px-3 rounded-l-lg">No</th>
                      <th className="py-2.5 px-3">Nama Siswa</th>
                      <th className="py-2.5 px-3">Kelas</th>
                      <th className="py-2.5 px-3">Skor Kuis</th>
                      <th className="py-2.5 px-3">Progres Modul</th>
                      <th className="py-2.5 px-3 rounded-r-lg">Status Evaluasi</th>
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
                              <div className="w-16 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-emerald-600 rounded-full" 
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                              <span className="font-mono text-[11px] text-stone-700">{student.progress}%</span>
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
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-6 text-center text-stone-400">
                          Tidak ada siswa yang cocok dengan filter pencarian.
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
    </div>
  );
}
