/**
 * Utility functions for HydroCarbon Web-Based Learning
 */

// Format chemical formula string to HTML with subscripts, e.g. "C2H6" -> "C<sub>2</sub>H<sub>6</sub>"
export function formatChemicalFormula(formula) {
  if (!formula) return '';
  return formula.replace(/(\d+)/g, '<sub>$1</sub>');
}

// Format IUPAC display name
export function formatIupacName(name) {
  return name;
}

// Local storage management for learning progress
const STORAGE_KEY = 'hydrocarbon_learning_progress_v1';
export const TEACHER_STUDENTS_KEY = 'hydrocarbon_teacher_students';

// Saluran BroadcastChannel untuk sinkronisasi multi-tab secara real-time
const syncChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window 
  ? new BroadcastChannel('hydrocarbon_realtime_sync') 
  : null;

/**
 * Mengambil daftar siswa yang tercatat di portal guru.
 * Secara bawaan bernilai array kosong [] sesuai permintaan pengguna.
 */
export function getTeacherStudents() {
  try {
    const raw = localStorage.getItem(TEACHER_STUDENTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Gagal membaca data siswa guru', e);
    return [];
  }
}

/**
 * Menyimpan data siswa ke localStorage dan memancarkan sinyal update real-time
 */
export function saveTeacherStudents(students) {
  try {
    localStorage.setItem(TEACHER_STUDENTS_KEY, JSON.stringify(students));
    
    // Broadcast ke tab lain
    if (syncChannel) {
      syncChannel.postMessage({ type: 'STUDENTS_UPDATED', students });
    }
    
    // Trigger event lokal di window yang sama
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('hydrocarbon_students_sync', { detail: students }));
    }
  } catch (e) {
    console.error('Gagal menyimpan data siswa guru', e);
  }
}

/**
 * Menghapus seluruh data siswa (setelah ekspor ke Excel atau reset berkala)
 */
export function clearTeacherStudents() {
  saveTeacherStudents([]);
}

/**
 * Menghapus satu siswa berdasarkan ID
 */
export function deleteTeacherStudent(studentId) {
  const current = getTeacherStudents();
  const updated = current.filter(s => s.id !== studentId);
  saveTeacherStudents(updated);
  return updated;
}

/**
 * Sinkronisasi data siswa secara real-time saat siswa masuk, menyelesaikan modul, atau kuis
 */
export function recordStudentActivity({ email, nama, modules, score }) {
  if (!email && !nama) return;

  const currentStudents = getTeacherStudents();
  const studentEmail = email || (nama ? `${nama.toLowerCase().replace(/\s+/g, '.')}@siswa.local` : 'siswa.tamu@hydrocarbon.edu');
  const studentName = nama || (email ? email.split('@')[0] : 'Siswa Tamu');

  const existingIndex = currentStudents.findIndex(s => s.email.toLowerCase() === studentEmail.toLowerCase());
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0] + ' ' + now.toTimeString().substring(0, 5);

  let updatedStudents = [...currentStudents];

  if (existingIndex >= 0) {
    const existing = updatedStudents[existingIndex];
    updatedStudents[existingIndex] = {
      ...existing,
      nama: studentName,
      modules: modules !== undefined ? modules : existing.modules,
      score: score !== undefined && score !== null ? score : existing.score,
      tanggal: dateStr
    };
  } else {
    // Tambah siswa baru yang baru masuk / beraktivitas
    updatedStudents.unshift({
      id: 'std-' + Date.now(),
      nama: studentName,
      email: studentEmail,
      modules: modules || [],
      score: score !== undefined ? score : null,
      tanggal: dateStr
    });
  }

  saveTeacherStudents(updatedStudents);
}

export function getStoredProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        completedModules: [],
        quizScore: 0,
        quizAttempts: 0,
        solvedIupac: [],
        lastActiveTab: 'intro'
      };
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading progress from localStorage', e);
    return {
      completedModules: [],
      quizScore: 0,
      quizAttempts: 0,
      solvedIupac: [],
      lastActiveTab: 'intro'
    };
  }
}

export function saveStoredProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed saving progress to localStorage', e);
  }
}

export function markModuleComplete(moduleId) {
  const progress = getStoredProgress();
  if (!progress.completedModules.includes(moduleId)) {
    progress.completedModules.push(moduleId);
    saveStoredProgress(progress);
  }
  return progress;
}

export function recordIupacSolved(practiceId) {
  const progress = getStoredProgress();
  if (!progress.solvedIupac.includes(practiceId)) {
    progress.solvedIupac.push(practiceId);
    saveStoredProgress(progress);
  }
  return progress;
}
