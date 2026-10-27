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
