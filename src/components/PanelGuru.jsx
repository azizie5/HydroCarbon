import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Award, 
  BarChart3, 
  BookOpen, 
  PlusCircle, 
  Download, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2, 
  RotateCcw, 
  FileText, 
  Sliders, 
  Sparkles,
  HelpCircle,
  GraduationCap,
  Save,
  Layers,
  Flame,
  Atom,
  Zap,
  Radio,
  Clock,
  Check,
  X
} from 'lucide-react';
import { chemData } from '../data/chemdata.js';
import { 
  getTeacherStudents, 
  saveTeacherStudents, 
  clearTeacherStudents, 
  deleteTeacherStudent 
} from '../utils/storage.js';

export default function PanelGuru() {
  const [activeTab, setActiveTab] = useState('nilai'); // 'nilai' | 'ringkasan' | 'soal' | 'perangkat'

  // KKM (Kriteria Ketercapaian Tujuan Pembelajaran)
  const [kkm, setKkm] = useState(() => {
    return parseInt(localStorage.getItem('hydrocarbon_kkm') || '75', 10);
  });

  // State Daftar Siswa Kelas (DIMULAI DARI KOSONG [], menyesuaikan siswa yang masuk secara real-time)
  const [students, setStudents] = useState(() => getTeacherStudents());

  // Modal konfirmasi penghapusan data setelah ekspor ke Excel
  const [showExportModal, setShowExportModal] = useState(false);
  const [lastExportedCount, setLastExportedCount] = useState(0);

  // Sinkronisasi data siswa secara REAL-TIME (Lintas tab browser & aktivitas in-page)
  useEffect(() => {
    const handleSync = (e) => {
      if (e?.detail) {
        setStudents(e.detail);
      } else {
        setStudents(getTeacherStudents());
      }
    };

    window.addEventListener('hydrocarbon_students_sync', handleSync);
    window.addEventListener('storage', handleSync);

    // BroadcastChannel untuk pembaruan real-time antar tab
    let channel = null;
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      channel = new BroadcastChannel('hydrocarbon_realtime_sync');
      channel.onmessage = (event) => {
        if (event.data?.type === 'STUDENTS_UPDATED' && Array.isArray(event.data.students)) {
          setStudents(event.data.students);
        }
      };
    }

    return () => {
      window.removeEventListener('hydrocarbon_students_sync', handleSync);
      window.removeEventListener('storage', handleSync);
      if (channel) channel.close();
    };
  }, []);

  // State Bank Soal Kuis
  const [quizQuestions, setQuizQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem('hydrocarbon_quiz_questions');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return chemData;
  });

  const saveQuestions = (newQuestions) => {
    setQuizQuestions(newQuestions);
    try {
      localStorage.setItem('hydrocarbon_quiz_questions', JSON.stringify(newQuestions));
    } catch (e) {
      console.error('Gagal menyimpan soal kuis', e);
    }
  };

  // Form Tambah Siswa Simulasi / Manual
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentScore, setNewStudentScore] = useState(80);
  const [newStudentAlkana, setNewStudentAlkana] = useState(true);
  const [newStudentAlkena, setNewStudentAlkena] = useState(true);
  const [newStudentAlkuna, setNewStudentAlkuna] = useState(false);

  // Filter & Pencarian Siswa
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'tuntas' | 'remedial'

  // Form Tambah Soal Baru
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [newKonsep, setNewKonsep] = useState('tata-nama-alkana');
  const [newPertanyaan, setNewPertanyaan] = useState('');
  const [newOpsiA, setNewOpsiA] = useState('');
  const [newOpsiB, setNewOpsiB] = useState('');
  const [newOpsiC, setNewOpsiC] = useState('');
  const [newOpsiD, setNewOpsiD] = useState('');
  const [newJawabanBenar, setNewJawabanBenar] = useState('A');
  const [newMiskonsepsi, setNewMiskonsepsi] = useState('');
  const [newFeedbackBenar, setNewFeedbackBenar] = useState('');

  // Catatan Guru / RPP Ringkas
  const [teacherNotes, setTeacherNotes] = useState(() => {
    return localStorage.getItem('hydrocarbon_teacher_notes') || 
      'Rencana Aksi Pembelajaran Kimia Fase E:\n1. Siswa yang belum tuntas pada penamaan isomer posisi 1-butena dan 2-butena akan diberikan pendalaman melalui Lab 3D.\n2. Jadwal praktikum virtual visualisasi ikatan rangkap dua diadakan pada hari Kamis.';
  });

  const handleSaveNotes = () => {
    try {
      localStorage.setItem('hydrocarbon_teacher_notes', teacherNotes);
      alert('Catatan perangkat pembelajaran berhasil disimpan!');
    } catch (e) {}
  };

  // =========================================================================
  // EKSPOR KE EXCEL (.CSV dengan UTF-8 BOM untuk Microsoft Excel)
  // =========================================================================
  const exportToExcel = () => {
    if (students.length === 0) {
      alert('Belum ada data siswa untuk diekspor!');
      return;
    }

    const headers = ['No', 'Nama Siswa', 'Email Siswa', 'Modul Selesai', 'Nilai Kuis', 'Status Kelulusan', 'Waktu Akses Terakhir'];
    const rows = students.map((s, idx) => [
      idx + 1,
      `"${(s.nama || '').replace(/"/g, '""')}"`,
      `"${(s.email || '').replace(/"/g, '""')}"`,
      `"${(s.modules || []).join(', ') || 'Belum ada'}"`,
      s.score !== null ? s.score : 'Belum kuis',
      s.score !== null ? (s.score >= kkm ? 'Tuntas' : 'Remedial') : 'Belum kuis',
      `"${s.tanggal || '-'}"`
    ]);

    // Menggunakan UTF-8 BOM (\uFEFF) & titik koma (;) agar Microsoft Excel otomatis memisahkan kolom dengan rapi
    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(e => e.join(';'))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    
    link.setAttribute('href', url);
    link.setAttribute('download', `rekap_nilai_hidrokarbon_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Buka pop-up opsi untuk menghapus data yang baru saja diekspor
    setLastExportedCount(students.length);
    setShowExportModal(true);
  };

  // Eksekusi pembersihan data setelah ekspor
  const handleConfirmClearAfterExport = () => {
    clearTeacherStudents();
    setStudents([]);
    setShowExportModal(false);
  };

  // Hapus semua data siswa secara manual
  const handleManualClearAll = () => {
    if (students.length === 0) return;
    if (window.confirm(`Hapus seluruh (${students.length}) data siswa yang ada di portal? Pastikan Anda sudah mengekspor rekap nilai terlebih dahulu.`)) {
      clearTeacherStudents();
      setStudents([]);
    }
  };

  // Handler Tambah Siswa Manual
  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentEmail.trim()) return;

    const modules = [];
    if (newStudentAlkana) modules.push('alkana');
    if (newStudentAlkena) modules.push('alkena');
    if (newStudentAlkuna) modules.push('alkuna');

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0] + ' ' + now.toTimeString().substring(0, 5);

    const newObj = {
      id: 'std-' + Date.now(),
      nama: newStudentName.trim(),
      email: newStudentEmail.trim(),
      modules,
      score: parseInt(newStudentScore, 10),
      tanggal: dateStr
    };

    const updated = [newObj, ...students];
    saveTeacherStudents(updated);
    setStudents(updated);
    setNewStudentName('');
    setNewStudentEmail('');
    setShowAddStudentModal(false);
  };

  // Handler Hapus 1 Siswa
  const handleDeleteStudent = (id) => {
    if (window.confirm('Hapus data siswa ini dari daftar portal?')) {
      const updated = deleteTeacherStudent(id);
      setStudents(updated);
    }
  };

  // Handler Tambah Soal
  const handleAddQuestionSubmit = (e) => {
    e.preventDefault();
    if (!newPertanyaan.trim() || !newOpsiA.trim() || !newOpsiB.trim()) return;

    const newQuestionObj = {
      id: 'custom-' + Date.now(),
      konsep: newKonsep,
      pertanyaan: newPertanyaan.trim(),
      opsi: [
        { id: 'A', teks: newOpsiA.trim(), feedback: newJawabanBenar === 'A' ? (newFeedbackBenar || 'Tepat sekali!') : 'Pilihan ini belum tepat.' },
        { id: 'B', teks: newOpsiB.trim(), feedback: newJawabanBenar === 'B' ? (newFeedbackBenar || 'Tepat sekali!') : 'Pilihan ini belum tepat.' },
        { id: 'C', teks: newOpsiC.trim(), feedback: newJawabanBenar === 'C' ? (newFeedbackBenar || 'Tepat sekali!') : 'Pilihan ini belum tepat.' },
        { id: 'D', teks: newOpsiD.trim(), feedback: newJawabanBenar === 'D' ? (newFeedbackBenar || 'Tepat sekali!') : 'Pilihan ini belum tepat.' }
      ],
      jawabanBenar: newJawabanBenar,
      miskonsepsiUtama: newMiskonsepsi.trim() || 'Miskonsepsi konsep hidrokarbon'
    };

    saveQuestions([...quizQuestions, newQuestionObj]);
    setNewPertanyaan('');
    setNewOpsiA('');
    setNewOpsiB('');
    setNewOpsiC('');
    setNewOpsiD('');
    setNewFeedbackBenar('');
    setNewMiskonsepsi('');
    setShowAddQuestionModal(false);
  };

  // Handler Hapus Soal
  const handleDeleteQuestion = (id) => {
    if (quizQuestions.length <= 1) {
      alert('Minimal harus tersisa 1 butir soal kuis!');
      return;
    }
    if (window.confirm('Hapus soal ini dari bank soal kuis aktif?')) {
      const updated = quizQuestions.filter(q => q.id !== id);
      saveQuestions(updated);
    }
  };

  // Reset Soal ke Standar
  const handleResetQuestions = () => {
    if (window.confirm('Kembalikan bank soal ke butir soal standar kurikulum?')) {
      saveQuestions(chemData);
    }
  };

  // Kalkulasi Metrik Kelas (Hanya dihitung dari siswa yang nyata masuk)
  const totalStudents = students.length;
  const assessedStudents = students.filter(s => s.score !== null);
  const avgScore = assessedStudents.length > 0 
    ? Math.round(assessedStudents.reduce((acc, curr) => acc + curr.score, 0) / assessedStudents.length)
    : 0;
  const passedStudents = assessedStudents.filter(s => s.score >= kkm).length;
  const passRate = assessedStudents.length > 0 ? Math.round((passedStudents / assessedStudents.length) * 100) : 0;
  const alkanaDone = students.filter(s => s.modules?.includes('alkana')).length;
  const alkenaDone = students.filter(s => s.modules?.includes('alkena')).length;
  const alkunaDone = students.filter(s => s.modules?.includes('alkuna')).length;

  // Filtered Students Table
  const filteredStudents = students.filter(s => {
    const matchesSearch = (s.nama || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (s.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    if (statusFilter === 'tuntas') return matchesSearch && s.score !== null && s.score >= kkm;
    if (statusFilter === 'remedial') return matchesSearch && s.score !== null && s.score < kkm;
    return matchesSearch;
  });

  return (
    <div className="panel-guru-container" id="panel-guru">
      {/* Header Banner Guru */}
      <div className="guru-header-card">
        <div className="guru-header-content">
          <div className="guru-badge">
            <Radio size={14} className="pulse-icon" />
            <span>Portal Pendidik Real-Time • Kimia SMA Kelas X (Fase E)</span>
          </div>
          <h2 className="guru-header-title">
            Dashboard Pemantauan & Asesmen Hidrokarbon
          </h2>
          <p className="guru-header-sub">
            Portal ini terhubung secara real-time: data akan otomatis bertambah ketika siswa membuka web, masuk akun, mempelajari modul, atau mengerjakan kuis.
          </p>
        </div>

        <div className="guru-header-actions">
          <div className="kkm-pill">
            <Sliders size={16} />
            <span>KKM Kelulusan:</span>
            <input 
              type="number" 
              value={kkm} 
              onChange={(e) => {
                const val = Math.max(0, Math.min(100, parseInt(e.target.value, 10) || 0));
                setKkm(val);
                localStorage.setItem('hydrocarbon_kkm', val.toString());
              }}
              className="kkm-input"
              title="Ubah batas kelulusan KKM"
            />
          </div>

          <button 
            type="button" 
            onClick={exportToExcel}
            className="btn-guru-primary"
            title="Ekspor rekap nilai ke format Excel (.CSV)"
          >
            <Download size={16} />
            <span>Ekspor ke Excel ({students.length})</span>
          </button>
        </div>
      </div>

      {/* Navigasi Tab Panel Guru */}
      <div className="guru-tabs-bar" role="tablist">
        <button
          type="button"
          onClick={() => setActiveTab('nilai')}
          className={`guru-tab-btn ${activeTab === 'nilai' ? 'active' : ''}`}
        >
          <Users size={17} />
          <span>Daftar Siswa Real-Time ({students.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ringkasan')}
          className={`guru-tab-btn ${activeTab === 'ringkasan' ? 'active' : ''}`}
        >
          <BarChart3 size={17} />
          <span>Ikhtisar & Statistik Kelas</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('soal')}
          className={`guru-tab-btn ${activeTab === 'soal' ? 'active' : ''}`}
        >
          <HelpCircle size={17} />
          <span>Manajemen Bank Soal ({quizQuestions.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('perangkat')}
          className={`guru-tab-btn ${activeTab === 'perangkat' ? 'active' : ''}`}
        >
          <FileText size={17} />
          <span>Perangkat Ajar & Kurikulum</span>
        </button>
      </div>

      {/* ===================================================================
          TAB 1: DAFTAR NILAI & PANTAUAN SISWA REAL-TIME
         =================================================================== */}
      {activeTab === 'nilai' && (
        <div className="guru-tab-content">
          <div className="guru-table-toolbar">
            <div className="toolbar-search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Cari nama atau email siswa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="toolbar-actions">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">Semua Status Ketuntasan</option>
                <option value="tuntas">Hanya Tuntas (&ge; {kkm})</option>
                <option value="remedial">Perlu Remedial (&lt; {kkm})</option>
              </select>

              <button
                type="button"
                onClick={() => setShowAddStudentModal(true)}
                className="btn-guru-secondary"
                title="Masukkan data siswa secara manual jika diperlukan"
              >
                <PlusCircle size={16} />
                <span>Tambah Siswa Manual</span>
              </button>

              {students.length > 0 && (
                <button
                  type="button"
                  onClick={handleManualClearAll}
                  className="btn-guru-danger"
                  title="Hapus seluruh data siswa di portal"
                >
                  <Trash2 size={15} />
                  <span>Bersihkan Semua Data</span>
                </button>
              )}
            </div>
          </div>

          {/* Indikator Status Real-time */}
          <div className="realtime-status-strip">
            <span className="live-dot"></span>
            <span>
              <strong>Pemantauan Real-Time Aktif:</strong> Setiap ada siswa yang login, membuka modul, atau mengerjakan kuis, datanya akan langsung masuk ke tabel ini secara instan.
            </span>
          </div>

          {/* Tabel Nilai Siswa */}
          <div className="table-responsive">
            <table className="guru-data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Siswa</th>
                  <th>Email Siswa</th>
                  <th>Modul Tuntas</th>
                  <th>Nilai Kuis</th>
                  <th>Status Kelulusan</th>
                  <th>Waktu Akses</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((std, idx) => {
                    const isAssessed = std.score !== null;
                    const isPassed = isAssessed && std.score >= kkm;

                    return (
                      <tr key={std.id}>
                        <td>{idx + 1}</td>
                        <td>
                          <strong>{std.nama}</strong>
                        </td>
                        <td className="text-muted">{std.email}</td>
                        <td>
                          <div className="module-chips-group">
                            <span className={`mod-chip ${std.modules?.includes('alkana') ? 'done' : ''}`}>
                              Alkana
                            </span>
                            <span className={`mod-chip ${std.modules?.includes('alkena') ? 'done' : ''}`}>
                              Alkena
                            </span>
                            <span className={`mod-chip ${std.modules?.includes('alkuna') ? 'done' : ''}`}>
                              Alkuna
                            </span>
                          </div>
                        </td>
                        <td>
                          {isAssessed ? (
                            <strong className="text-mono" style={{ fontSize: '15px' }}>
                              {std.score}/100
                            </strong>
                          ) : (
                            <span className="text-muted" style={{ fontSize: '12px', fontStyle: 'italic' }}>
                              Belum Kuis
                            </span>
                          )}
                        </td>
                        <td>
                          {isAssessed ? (
                            <span className={`status-pill ${isPassed ? 'status-tuntas' : 'status-remedial'}`}>
                              {isPassed ? '✓ Tuntas' : '⚠ Remedial'}
                            </span>
                          ) : (
                            <span className="status-pill status-pending">
                              Sedang Belajar
                            </span>
                          )}
                        </td>
                        <td className="text-muted text-mono" style={{ fontSize: '12px' }}>
                          {std.tanggal || '-'}
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleDeleteStudent(std.id)}
                            className="btn-delete-row"
                            title="Hapus baris siswa ini"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  /* Tampilan Saat Portal Masih Kosong */
                  <tr>
                    <td colSpan="8">
                      <div className="empty-portal-card">
                        <div className="empty-icon-wrap">
                          <Users size={36} />
                        </div>
                        <h4 className="empty-title">Portal Guru Siap — Menunggu Siswa Masuk</h4>
                        <p className="empty-desc">
                          Saat ini belum ada siswa yang mengakses atau mengerjakan aktivitas.
                          <br />
                          Data akan <strong>otomatis terisi secara real-time</strong> saat siswa membuka aplikasi di HP/laptop mereka, melakukan login, atau menyelesaikan modul/kuis.
                        </p>
                        <div className="empty-actions">
                          <button
                            type="button"
                            onClick={() => setShowAddStudentModal(true)}
                            className="btn-guru-secondary"
                          >
                            <PlusCircle size={15} />
                            <span>Simulasikan / Tambah Data Siswa Uji Coba</span>
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
      )}

      {/* ===================================================================
          TAB 2: IKHTISAR & STATISTIK KELAS
         =================================================================== */}
      {activeTab === 'ringkasan' && (
        <div className="guru-tab-content">
          {/* 4 Kartu Metrik Utama */}
          <div className="guru-stats-grid">
            <div className="metric-box">
              <span className="metric-lbl">Total Siswa Aktif</span>
              <div className="metric-num-wrap">
                <span className="metric-num">{totalStudents}</span>
                <span className="metric-unit">Peserta Didik</span>
              </div>
              <span className="metric-footnote">Tercatat di sistem real-time</span>
            </div>

            <div className="metric-box">
              <span className="metric-lbl">Rata-rata Nilai Kuis</span>
              <div className="metric-num-wrap">
                <span className="metric-num">{avgScore}</span>
                <span className="metric-unit">/ 100</span>
              </div>
              <span className="metric-footnote">Batas KKM: {kkm}</span>
            </div>

            <div className="metric-box">
              <span className="metric-lbl">Ketuntasan Klasikal</span>
              <div className="metric-num-wrap">
                <span className="metric-num">{passRate}%</span>
                <span className="metric-unit">{passedStudents}/{assessedStudents.length || 0} Tuntas</span>
              </div>
              <span className="metric-footnote">Dari siswa yang sudah kuis</span>
            </div>

            <div className="metric-box">
              <span className="metric-lbl">Penyelesaian Modul</span>
              <div className="metric-num-wrap">
                <span className="metric-num">{alkanaDone}</span>
                <span className="metric-unit">Alkana</span>
              </div>
              <span className="metric-footnote">Alkena: {alkenaDone} • Alkuna: {alkunaDone}</span>
            </div>
          </div>

          {/* Grafik Ketuntasan Per Modul & Analisis Miskonsepsi */}
          <div className="guru-analytics-split">
            {/* Progres Ketuntasan Modul */}
            <div className="guru-card">
              <h3 className="guru-card-title">
                <BookOpen size={18} />
                <span>Pemantauan Progres per Modul Materi</span>
              </h3>
              <p className="guru-card-desc">
                Jumlah dan persentase siswa aktif yang telah menuntaskan pembelajaran mandiri pada masing-masing kelompok senyawa:
              </p>

              {totalStudents > 0 ? (
                <div className="progress-bars-stack">
                  <div className="bar-item">
                    <div className="bar-labels">
                      <span className="bar-title">
                        <Atom size={16} />
                        <strong>Modul 1: Alkana (CₙH₂ₙ₊₂)</strong>
                      </span>
                      <span className="bar-val">{alkanaDone} dari {totalStudents} Siswa ({Math.round((alkanaDone/totalStudents)*100)}%)</span>
                    </div>
                    <div className="bar-track">
                      <div 
                        className="bar-fill" 
                        style={{ width: `${(alkanaDone/totalStudents)*100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bar-item">
                    <div className="bar-labels">
                      <span className="bar-title">
                        <Zap size={16} />
                        <strong>Modul 2: Alkena (CₙH₂ₙ)</strong>
                      </span>
                      <span className="bar-val">{alkenaDone} dari {totalStudents} Siswa ({Math.round((alkenaDone/totalStudents)*100)}%)</span>
                    </div>
                    <div className="bar-track">
                      <div 
                        className="bar-fill" 
                        style={{ width: `${(alkenaDone/totalStudents)*100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bar-item">
                    <div className="bar-labels">
                      <span className="bar-title">
                        <Flame size={16} />
                        <strong>Modul 3: Alkuna (CₙH₂ₙ₋₂)</strong>
                      </span>
                      <span className="bar-val">{alkunaDone} dari {totalStudents} Siswa ({Math.round((alkunaDone/totalStudents)*100)}%)</span>
                    </div>
                    <div className="bar-track">
                      <div 
                        className="bar-fill" 
                        style={{ width: `${(alkunaDone/totalStudents)*100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="empty-mini-box">
                  <Clock size={20} />
                  <span>Menunggu aktivitas belajar siswa pertama untuk menampilkan grafik progres...</span>
                </div>
              )}
            </div>

            {/* Peta Miskonsepsi Siswa */}
            <div className="guru-card">
              <h3 className="guru-card-title">
                <AlertTriangle size={18} />
                <span>Peta Miskonsepsi Kritis Siswa (Diagnostik)</span>
              </h3>
              <p className="guru-card-desc">
                Pedoman konsep hidrokarbon yang paling rawan salah dipahami siswa berdasarkan evaluasi formatif:
              </p>

              <div className="misconceptions-list">
                <div className="misconception-item">
                  <div className="misc-badge">Frekuensi Tertinggi</div>
                  <strong className="misc-title">Mencampur Rumus Deret Homolog Alkena vs Alkuna</strong>
                  <p className="misc-desc">
                    Sebagian siswa masih mengira rumus CₙH₂ₙ₋₂ adalah milik alkena. Tegaskan kembali bahwa ikatan rangkap tiga memangkas 4 atom H dari alkana jenuh.
                  </p>
                </div>

                <div className="misconception-item">
                  <div className="misc-badge">Prioritas Penomoran</div>
                  <strong className="misc-title">Menomori Rantai dari Cabang bukan dari Ikatan Rangkap</strong>
                  <p className="misc-desc">
                    Pada alkena dan alkuna, posisi ikatan rangkap dua/tiga wajib mendapat nomor terkecil, lebih diprioritaskan daripada letak cabang alkil.
                  </p>
                </div>

                <div className="misconception-item">
                  <div className="misc-badge">Isomeri Ruang</div>
                  <strong className="misc-title">Menganggap Rantai Bengkok sebagai Isomer Baru</strong>
                  <p className="misc-desc">
                    Siswa sering menganggap struktur n-butana yang digambar melengkung ke bawah sebagai isomer berbeda, padahal rantai utamanya tetap lurus 4 karbon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          TAB 3: MANAJEMEN BANK SOAL KUIS
         =================================================================== */}
      {activeTab === 'soal' && (
        <div className="guru-tab-content">
          <div className="soal-toolbar">
            <div>
              <h3 className="guru-card-title">Bank Soal Kuis Interaktif Siswa</h3>
              <p className="guru-card-desc">
                Butir soal yang aktif di sini akan langsung dikerjakan oleh siswa pada <strong>Panel Murid (Kuis Interaktif)</strong>.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={handleResetQuestions}
                className="btn-guru-secondary"
                title="Kembalikan ke butir soal standar bawaan"
              >
                <RotateCcw size={16} />
                <span>Reset Soal Standar</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAddQuestionModal(true)}
                className="btn-guru-primary"
              >
                <PlusCircle size={16} />
                <span>Tambah Butir Soal Baru</span>
              </button>
            </div>
          </div>

          {/* Daftar Kartu Soal */}
          <div className="soal-cards-stack">
            {quizQuestions.map((soal, sIdx) => (
              <div key={soal.id} className="soal-item-card">
                <div className="soal-item-head">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="soal-num-badge">Soal #{sIdx + 1}</span>
                    <span className="soal-concept-badge">Topik: {soal.konsep}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(soal.id)}
                    className="btn-delete-soal"
                    title="Hapus butir soal ini"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <h4 className="soal-question-text">{soal.pertanyaan}</h4>

                {/* 4 Pilihan Jawaban */}
                <div className="soal-options-grid">
                  {soal.opsi.map((op) => {
                    const isKey = op.id === soal.jawabanBenar;
                    return (
                      <div key={op.id} className={`soal-opt-box ${isKey ? 'key-answer' : ''}`}>
                        <span className="opt-key-id">{op.id}.</span>
                        <div style={{ flex: 1 }}>
                          <span className="text-mono" style={{ fontWeight: isKey ? 700 : 500 }}>
                            {op.teks}
                          </span>
                          {isKey && <span className="key-tag">✓ Kunci Jawaban</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pembahasan & Miskonsepsi */}
                <div className="soal-feedback-box">
                  <div className="fb-row">
                    <strong>Catatan Miskonsepsi:</strong>
                    <span>{soal.miskonsepsiUtama || 'Identifikasi konsep dasar'}</span>
                  </div>
                  <div className="fb-row">
                    <strong>Pembahasan Jawaban Benar:</strong>
                    <span>{soal.opsi.find(o => o.id === soal.jawabanBenar)?.feedback}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================
          TAB 4: PERANGKAT AJAR & KURIKULUM MERDEKA
         =================================================================== */}
      {activeTab === 'perangkat' && (
        <div className="guru-tab-content">
          <div className="perangkat-grid">
            {/* Alur Tujuan Pembelajaran & Capaian */}
            <div className="guru-card">
              <h3 className="guru-card-title">
                <GraduationCap size={18} />
                <span>Capaian Pembelajaran (CP) Kimia Fase E</span>
              </h3>
              <p className="guru-card-desc">
                Sesuai Badan Standar, Kurikulum, dan Asesmen Pendidikan (BSKAP) Kemendikbudristek:
              </p>

              <div className="curriculum-points-box">
                <div className="cp-item">
                  <strong>Elemen Pemahaman Kimia:</strong>
                  <p>
                    Peserta didik mampu mengamati, menyelidiki, dan menjelaskan fenomena kekhasan atom karbon, membedakan ikatan kovalen jenuh (alkana) dan tak jenuh (alkena, alkuna), memberi nama senyawa berdasarkan kaidah IUPAC huruf kecil, serta menganalisis jenis-jenis isomer struktur dan geometri.
                  </p>
                </div>

                <div className="cp-item">
                  <strong>Alur 4 Pertemuan Tatap Muka:</strong>
                  <ul className="atp-steps-list">
                    <li><strong>Pertemuan 1 (2 JP):</strong> Karakteristik atom karbon, hidrokarbon alifatik, dan deret homolog Alkana (CₙH₂ₙ₊₂).</li>
                    <li><strong>Pertemuan 2 (2 JP):</strong> Ikatan rangkap dua Alkena (CₙH₂ₙ), reaksi adisi, dan uji bromin.</li>
                    <li><strong>Pertemuan 3 (2 JP):</strong> Ikatan rangkap tiga Alkuna (CₙH₂ₙ₋₂), pembakaran nyala asetilena, dan tata nama IUPAC.</li>
                    <li><strong>Pertemuan 4 (2 JP):</strong> Isomerisme (rangka, posisi, geometri cis-trans), praktikum virtual Lab 3D, dan kuis formatif.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Format LKPD & Petunjuk Praktikum Virtual */}
            <div className="guru-card">
              <h3 className="guru-card-title">
                <FileText size={18} />
                <span>Panduan Lembar Kerja Peserta Didik (LKPD)</span>
              </h3>
              <p className="guru-card-desc">
                Panduan praktikum virtual untuk siswa saat mengakses <strong>Lab Molekul 3D</strong>:
              </p>

              <div className="lkpd-guide-box">
                <div className="lkpd-step">
                  <span className="lkpd-step-no">1</span>
                  <div>
                    <strong>Observasi Geometri Tetrahedral (Alkana):</strong>
                    <p>Minta siswa memutar molekul metana (CH₄) dan mencatat sudut 109,5° dengan hibridisasi sp³.</p>
                  </div>
                </div>

                <div className="lkpd-step">
                  <span className="lkpd-step-no">2</span>
                  <div>
                    <strong>Observasi Bidang Datar Trigonal Planar (Alkena):</strong>
                    <p>Minta siswa mengamati molekul etena (C₂H₄), menguji sudut 120°, dan mencatat kekakuan rotasi ikatan rangkap C=C.</p>
                  </div>
                </div>

                <div className="lkpd-step">
                  <span className="lkpd-step-no">3</span>
                  <div>
                    <strong>Observasi Linear (Alkuna):</strong>
                    <p>Minta siswa mengamati molekul etuna (C₂H₂) dengan sudut lurus 180° akibat hibridisasi sp.</p>
                  </div>
                </div>
              </div>

              {/* Catatan Instruksional Guru (Editable) */}
              <div className="teacher-notes-section">
                <div className="notes-header">
                  <strong>Catatan Harian / Pengingat Pendidik:</strong>
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    className="btn-save-notes"
                  >
                    <Save size={14} />
                    <span>Simpan Catatan</span>
                  </button>
                </div>
                <textarea
                  value={teacherNotes}
                  onChange={(e) => setTeacherNotes(e.target.value)}
                  className="notes-textarea"
                  rows="4"
                  placeholder="Ketik catatan mengajar, daftar siswa remedial, atau rencana pembelajaran di sini..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL SETELAH EKSPOR EXCEL: OPSI HAPUS DATA
         =================================================================== */}
      {showExportModal && (
        <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
          <div className="modal-card" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={22} style={{ color: 'var(--fern)' }} />
                <h3 className="modal-title">Rekap Nilai Berhasil Diekspor!</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setShowExportModal(false)}
                className="btn-close-modal"
              >
                ✕
              </button>
            </div>

            <div className="modal-body" style={{ gap: '14px' }}>
              <p style={{ fontSize: '14.5px', lineHeight: '1.55' }}>
                File spreadsheet <strong>.CSV</strong> berisi <strong>{lastExportedCount} data siswa</strong> telah berhasil diunduh ke komputer/perangkat Anda.
              </p>

              <div className="export-confirm-box">
                <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Apakah Anda ingin mengosongkan data di portal sekarang?</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12.5px', opacity: 0.9 }}>
                    Menghapus data siswa yang sudah diekspor akan membuat portal bersih kembali untuk sesi kelas berikutnya.
                  </p>
                </div>
              </div>

              <div className="export-modal-actions">
                <button
                  type="button"
                  onClick={handleConfirmClearAfterExport}
                  className="btn-guru-danger full"
                >
                  <Trash2 size={16} />
                  <span>Ya, Hapus Data yang Sudah Diekspor</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowExportModal(false)}
                  className="btn-guru-secondary full"
                >
                  <Check size={16} />
                  <span>Tidak, Tetap Simpan Data di Portal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL: TAMBAH SISWA MANUAL / SIMULASI
         =================================================================== */}
      {showAddStudentModal && (
        <div className="modal-overlay" onClick={() => setShowAddStudentModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Tambah Siswa Secara Manual</h3>
              <button 
                type="button" 
                onClick={() => setShowAddStudentModal(false)}
                className="btn-close-modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="modal-body">
              <div className="form-group">
                <label className="form-label">Nama Lengkap Siswa:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Zahra Khairunnisa"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Alamat Email:</label>
                <input
                  type="email"
                  required
                  placeholder="zahra@sekolah.sch.id"
                  value={newStudentEmail}
                  onChange={(e) => setNewStudentEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Skor Kuis (0 - 100):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={newStudentScore}
                  onChange={(e) => setNewStudentScore(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status Ketuntasan Modul:</label>
                <div style={{ display: 'flex', gap: '16px', marginTop: '6px' }}>
                  <label className="checkbox-control">
                    <input
                      type="checkbox"
                      checked={newStudentAlkana}
                      onChange={(e) => setNewStudentAlkana(e.target.checked)}
                    />
                    <span>Alkana</span>
                  </label>
                  <label className="checkbox-control">
                    <input
                      type="checkbox"
                      checked={newStudentAlkena}
                      onChange={(e) => setNewStudentAlkena(e.target.checked)}
                    />
                    <span>Alkena</span>
                  </label>
                  <label className="checkbox-control">
                    <input
                      type="checkbox"
                      checked={newStudentAlkuna}
                      onChange={(e) => setNewStudentAlkuna(e.target.checked)}
                    />
                    <span>Alkuna</span>
                  </label>
                </div>
              </div>

              <div className="modal-footer" style={{ border: 'none', padding: '16px 0 0 0' }}>
                <button type="submit" className="btn-guru-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <PlusCircle size={16} />
                  <span>Simpan Data Siswa</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL: TAMBAH SOAL KUIS BARU
         =================================================================== */}
      {showAddQuestionModal && (
        <div className="modal-overlay" onClick={() => setShowAddQuestionModal(false)}>
          <div className="modal-card" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Tambah Butir Soal Kuis Baru</h3>
              <button 
                type="button" 
                onClick={() => setShowAddQuestionModal(false)}
                className="btn-close-modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddQuestionSubmit} className="modal-body">
              <div className="form-group">
                <label className="form-label">Topik / Konsep Soal:</label>
                <select
                  value={newKonsep}
                  onChange={(e) => setNewKonsep(e.target.value)}
                  className="form-input"
                >
                  <option value="tata-nama-alkana">Tata Nama Alkana</option>
                  <option value="tata-nama-alkena">Tata Nama Alkena</option>
                  <option value="tata-nama-alkuna">Tata Nama Alkuna</option>
                  <option value="rumus-umum">Rumus Umum & Deret Homolog</option>
                  <option value="isomer-struktur">Isomer Struktur & Rangka</option>
                  <option value="isomer-geometri">Isomer Geometri Cis-Trans</option>
                  <option value="reaksi-hidrokarbon">Reaksi Pembakaran & Adisi</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Kalimat Pertanyaan:</label>
                <textarea
                  required
                  rows="2"
                  placeholder="Contoh: Senyawa hidrokarbon yang memiliki ikatan kovalen rangkap dua adalah..."
                  value={newPertanyaan}
                  onChange={(e) => setNewPertanyaan(e.target.value)}
                  className="form-input"
                ></textarea>
              </div>

              {/* 4 Opsi Input */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="form-group">
                  <label className="form-label">Pilihan A:</label>
                  <input
                    type="text"
                    required
                    placeholder="Teks opsi A"
                    value={newOpsiA}
                    onChange={(e) => setNewOpsiA(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Pilihan B:</label>
                  <input
                    type="text"
                    required
                    placeholder="Teks opsi B"
                    value={newOpsiB}
                    onChange={(e) => setNewOpsiB(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Pilihan C:</label>
                  <input
                    type="text"
                    required
                    placeholder="Teks opsi C"
                    value={newOpsiC}
                    onChange={(e) => setNewOpsiC(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Pilihan D:</label>
                  <input
                    type="text"
                    required
                    placeholder="Teks opsi D"
                    value={newOpsiD}
                    onChange={(e) => setNewOpsiD(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Kunci Jawaban Benar:</label>
                <select
                  value={newJawabanBenar}
                  onChange={(e) => setNewJawabanBenar(e.target.value)}
                  className="form-input"
                  style={{ fontWeight: 'bold' }}
                >
                  <option value="A">Pilihan A</option>
                  <option value="B">Pilihan B</option>
                  <option value="C">Pilihan C</option>
                  <option value="D">Pilihan D</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Penjelasan / Umpan Balik untuk Siswa:</label>
                <textarea
                  rows="2"
                  placeholder="Alasan mengapa jawaban tersebut benar..."
                  value={newFeedbackBenar}
                  onChange={(e) => setNewFeedbackBenar(e.target.value)}
                  className="form-input"
                ></textarea>
              </div>

              <div className="modal-footer" style={{ border: 'none', padding: '16px 0 0 0' }}>
                <button type="submit" className="btn-guru-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <PlusCircle size={16} />
                  <span>Simpan ke Bank Soal Aktif</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================
          STYLING KHUSUS PANEL GURU
         =================================================================== */}
      <style>{`
        .panel-guru-container {
          display: flex;
          flex-direction: column;
          gap: 28px;
          animation: fadeInGuru 0.25s ease-out;
        }

        @keyframes fadeInGuru {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .guru-header-card {
          background-color: var(--parchment);
          border: 2px solid var(--fern);
          border-radius: var(--radius-lg);
          padding: 28px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          box-shadow: var(--shadow-md);
        }

        .guru-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--pistachio);
          color: var(--fern);
          border: 1.5px solid var(--fern);
          padding: 4px 14px;
          border-radius: var(--radius-full);
          font-size: 12.5px;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .pulse-icon {
          color: var(--fern);
          animation: pulseRadio 1.8s infinite;
        }

        @keyframes pulseRadio {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }

        .guru-header-title {
          font-size: 28px;
          color: var(--fern);
          line-height: 1.25;
          margin-bottom: 8px;
        }

        .guru-header-sub {
          font-size: 14.5px;
          color: var(--fern);
          opacity: 0.92;
          max-width: 680px;
        }

        .guru-header-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          flex-shrink: 0;
        }

        .kkm-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: var(--pistachio);
          border: 1.5px solid var(--fern);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 13px;
          font-weight: 700;
          color: var(--fern);
        }

        .kkm-input {
          width: 50px;
          text-align: center;
          font-weight: 800;
          font-size: 14px;
          border: 1px solid var(--fern);
          border-radius: 6px;
          background-color: var(--parchment);
          color: var(--fern);
          padding: 2px 4px;
          outline: none;
        }

        .btn-guru-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--fern);
          color: var(--parchment);
          border: 1.5px solid var(--fern);
          padding: 10px 20px;
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease;
          font-family: inherit;
        }

        .btn-guru-primary:hover {
          transform: translateY(-1.5px);
          opacity: 0.95;
        }

        .btn-guru-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--pistachio);
          color: var(--fern);
          border: 1.5px solid var(--fern);
          padding: 9px 18px;
          border-radius: var(--radius-full);
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s ease;
          font-family: inherit;
        }

        .btn-guru-secondary:hover {
          background-color: var(--parchment);
        }

        .btn-guru-secondary.full {
          width: 100%;
          justify-content: center;
          padding: 11px;
        }

        .btn-guru-danger {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--melon);
          color: var(--fern);
          border: 1.5px solid var(--fern);
          padding: 9px 16px;
          border-radius: var(--radius-full);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s ease;
          font-family: inherit;
        }

        .btn-guru-danger:hover {
          opacity: 0.9;
        }

        .btn-guru-danger.full {
          width: 100%;
          justify-content: center;
          padding: 11px;
        }

        .realtime-status-strip {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: var(--pistachio);
          border: 1.5px solid var(--fern);
          border-radius: var(--radius-md);
          padding: 10px 16px;
          font-size: 13px;
          color: var(--fern);
        }

        .live-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--fern);
          box-shadow: 0 0 0 3px rgba(62, 132, 64, 0.35);
          animation: pulseDot 1.6s infinite;
          flex-shrink: 0;
        }

        @keyframes pulseDot {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(62, 132, 64, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(62, 132, 64, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(62, 132, 64, 0); }
        }

        .guru-tabs-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          border-bottom: 2px solid var(--fern);
          padding-bottom: 12px;
        }

        .guru-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--parchment);
          border: 1.5px solid var(--fern);
          color: var(--fern);
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          padding: 9px 20px;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .guru-tab-btn:hover {
          background-color: var(--pistachio);
        }

        .guru-tab-btn.active {
          background-color: var(--fern);
          color: var(--parchment);
        }

        .guru-tab-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .guru-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .metric-box {
          background-color: var(--parchment);
          border: 2px solid var(--fern);
          border-radius: var(--radius-lg);
          padding: 20px 22px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          box-shadow: var(--shadow-sm);
        }

        .metric-lbl {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--fern);
        }

        .metric-num-wrap {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .metric-num {
          font-size: 34px;
          font-weight: 800;
          font-family: var(--font-display);
          color: var(--fern);
          line-height: 1;
        }

        .metric-unit {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--fern);
          opacity: 0.85;
        }

        .metric-footnote {
          font-size: 11.5px;
          color: var(--fern);
          opacity: 0.8;
        }

        .guru-analytics-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .guru-card {
          background-color: var(--parchment);
          border: 2px solid var(--fern);
          border-radius: var(--radius-lg);
          padding: 24px 26px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: var(--shadow-sm);
        }

        .guru-card-title {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 19px;
          color: var(--fern);
        }

        .guru-card-desc {
          font-size: 14px;
          color: var(--fern);
          opacity: 0.9;
        }

        .progress-bars-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .bar-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .bar-labels {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }

        .bar-title {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .bar-track {
          width: 100%;
          height: 12px;
          background-color: var(--parchment);
          border: 1.5px solid var(--fern);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          background-color: var(--fern);
          transition: width 0.4s ease;
        }

        .empty-mini-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: var(--parchment);
          border: 1.5px dashed var(--fern);
          border-radius: var(--radius-md);
          padding: 20px;
          font-size: 13.5px;
          color: var(--fern);
          justify-content: center;
        }

        .misconceptions-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .misconception-item {
          background-color: var(--melon);
          border: 1.5px solid var(--fern);
          border-radius: var(--radius-md);
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .misc-badge {
          font-size: 10.5px;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--fern);
        }

        .misc-title {
          font-size: 14px;
          color: var(--fern);
        }

        .misc-desc {
          font-size: 12.5px;
          color: var(--fern);
          line-height: 1.45;
        }

        /* Toolbar Tabel Nilai */
        .guru-table-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
        }

        .toolbar-search-box {
          position: relative;
          display: flex;
          align-items: center;
          min-width: 280px;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--fern);
          opacity: 0.8;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          background-color: var(--parchment);
          border: 1.5px solid var(--fern);
          border-radius: var(--radius-full);
          padding: 9px 14px 9px 40px;
          font-size: 13.5px;
          color: var(--fern);
          outline: none;
        }

        .toolbar-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .filter-select {
          background-color: var(--parchment);
          border: 1.5px solid var(--fern);
          border-radius: var(--radius-full);
          padding: 8px 16px;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--fern);
          outline: none;
          cursor: pointer;
        }

        /* Tabel Siswa */
        .guru-data-table {
          width: 100%;
          border-collapse: collapse;
          background-color: var(--parchment);
          border: 2px solid var(--fern);
          border-radius: var(--radius-lg);
          overflow: hidden;
          font-size: 13.5px;
        }

        .guru-data-table th {
          background-color: var(--pistachio);
          color: var(--fern);
          font-weight: 700;
          text-align: left;
          padding: 12px 14px;
          border-bottom: 2px solid var(--fern);
        }

        .guru-data-table td {
          padding: 12px 14px;
          border-bottom: 1px solid rgba(62, 132, 64, 0.2);
          color: var(--fern);
        }

        .guru-data-table tr:hover td {
          background-color: rgba(186, 221, 127, 0.18);
        }

        .module-chips-group {
          display: flex;
          gap: 4px;
        }

        .mod-chip {
          font-size: 10.5px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: var(--radius-full);
          border: 1px solid var(--fern);
          background-color: var(--parchment);
          color: var(--fern);
          opacity: 0.55;
        }

        .mod-chip.done {
          background-color: var(--pistachio);
          opacity: 1;
        }

        .status-pill {
          display: inline-block;
          font-size: 12px;
          font-weight: 800;
          padding: 3px 12px;
          border-radius: var(--radius-full);
          border: 1px solid var(--fern);
        }

        .status-tuntas {
          background-color: var(--pistachio);
          color: var(--fern);
        }

        .status-remedial {
          background-color: var(--melon);
          color: var(--fern);
        }

        .status-pending {
          background-color: var(--parchment);
          border-color: var(--fern);
          color: var(--fern);
          opacity: 0.85;
        }

        .btn-delete-row {
          background: none;
          border: 1px solid var(--fern);
          color: var(--fern);
          border-radius: 6px;
          padding: 4px 6px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .btn-delete-row:hover {
          background-color: var(--melon);
        }

        /* Empty State Card */
        .empty-portal-card {
          padding: 40px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .empty-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background-color: var(--pistachio);
          border: 2px solid var(--fern);
          color: var(--fern);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .empty-title {
          font-size: 18px;
          color: var(--fern);
          margin-bottom: 2px;
        }

        .empty-desc {
          font-size: 14px;
          color: var(--fern);
          opacity: 0.88;
          max-width: 520px;
          line-height: 1.55;
        }

        .empty-actions {
          margin-top: 6px;
        }

        /* Modal Ekspor Konfirmasi */
        .export-confirm-box {
          display: flex;
          gap: 10px;
          background-color: var(--melon);
          border: 1.5px solid var(--fern);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          font-size: 13.5px;
          color: var(--fern);
        }

        .export-modal-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 8px;
        }

        /* Bank Soal Toolbar & Cards */
        .soal-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
        }

        .soal-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .soal-item-card {
          background-color: var(--parchment);
          border: 2px solid var(--fern);
          border-radius: var(--radius-lg);
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: var(--shadow-sm);
        }

        .soal-item-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .soal-num-badge {
          background-color: var(--fern);
          color: var(--parchment);
          font-size: 12px;
          font-weight: 800;
          padding: 2px 10px;
          border-radius: var(--radius-full);
        }

        .soal-concept-badge {
          background-color: var(--pistachio);
          color: var(--fern);
          font-size: 11.5px;
          font-weight: 700;
          padding: 2px 10px;
          border-radius: var(--radius-full);
          border: 1px solid var(--fern);
        }

        .btn-delete-soal {
          background: none;
          border: 1px solid var(--fern);
          color: var(--fern);
          border-radius: 6px;
          padding: 5px 8px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .btn-delete-soal:hover {
          background-color: var(--melon);
        }

        .soal-question-text {
          font-size: 16px;
          color: var(--fern);
          line-height: 1.45;
        }

        .soal-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .soal-opt-box {
          background-color: var(--parchment);
          border: 1.5px solid var(--fern);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
        }

        .soal-opt-box.key-answer {
          background-color: var(--pistachio);
          font-weight: 700;
        }

        .opt-key-id {
          font-weight: 800;
        }

        .key-tag {
          display: inline-block;
          font-size: 10.5px;
          font-weight: 800;
          background-color: var(--fern);
          color: var(--parchment);
          padding: 1px 6px;
          border-radius: var(--radius-full);
          margin-left: 6px;
        }

        .soal-feedback-box {
          background-color: var(--pistachio);
          border: 1px solid var(--fern);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 12.5px;
        }

        .fb-row {
          display: flex;
          gap: 6px;
        }

        /* Perangkat Ajar */
        .perangkat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .curriculum-points-box {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .cp-item {
          background-color: var(--pistachio);
          border: 1.5px solid var(--fern);
          border-radius: var(--radius-md);
          padding: 14px;
          font-size: 13.5px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .atp-steps-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-left: 0;
        }

        .lkpd-guide-box {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .lkpd-step {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          background-color: var(--parchment);
          border: 1.5px solid var(--fern);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          font-size: 13px;
        }

        .lkpd-step-no {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background-color: var(--fern);
          color: var(--parchment);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 13px;
          flex-shrink: 0;
        }

        .teacher-notes-section {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .notes-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }

        .btn-save-notes {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: var(--fern);
          color: var(--parchment);
          border: none;
          padding: 5px 12px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .notes-textarea {
          width: 100%;
          background-color: var(--parchment);
          border: 1.5px solid var(--fern);
          border-radius: var(--radius-md);
          padding: 10px 12px;
          font-family: inherit;
          font-size: 13px;
          color: var(--fern);
          outline: none;
          resize: vertical;
        }

        /* Form Inputs in Modals */
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 12px;
        }

        .form-label {
          font-size: 13px;
          font-weight: 700;
          color: var(--fern);
        }

        .form-input {
          width: 100%;
          background-color: var(--parchment);
          border: 1.5px solid var(--fern);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          font-family: inherit;
          font-size: 13.5px;
          color: var(--fern);
          outline: none;
        }

        @media (max-width: 900px) {
          .guru-stats-grid {
            grid-template-columns: 1fr 1fr;
          }
          .guru-analytics-split {
            grid-template-columns: 1fr;
          }
          .perangkat-grid {
            grid-template-columns: 1fr;
          }
          .soal-options-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
