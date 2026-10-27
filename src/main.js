import './style.css';
import { renderNavbar } from './components/Navbar.js';
import { renderHero } from './components/Hero.js';
import { renderHomologExplorer } from './components/HomologExplorer.js';
import { renderIsomerInteractive } from './components/IsomerInteractive.js';
import { renderIupacTrainer } from './components/IupacTrainer.js';
import { renderQuizModule } from './components/QuizModule.js';
import { markModuleComplete, getStoredProgress } from './utils/storage.js';

// Application State
let state = {
  activeTab: 'intro' // 'intro' | 'homolog' | 'isomers' | 'iupac' | 'quiz'
};

function initApp() {
  const progress = getStoredProgress();
  if (progress.lastActiveTab) {
    state.activeTab = progress.lastActiveTab;
  }

  // Initial render
  updateNavigation();
  renderCurrentTab();
}

function updateNavigation() {
  renderNavbar('navbar-container', state.activeTab, (tabId) => {
    switchTab(tabId);
  });
}

function switchTab(tabId) {
  state.activeTab = tabId;
  markModuleComplete(tabId);
  
  // Update state in storage
  const progress = getStoredProgress();
  progress.lastActiveTab = tabId;
  localStorage.setItem('hydrocarbon_learning_progress_v1', JSON.stringify(progress));

  updateNavigation();
  renderCurrentTab();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCurrentTab() {
  const mainEl = document.getElementById('main-content');
  if (!mainEl) return;

  mainEl.innerHTML = `<div id="tab-outlet"></div>`;

  switch (state.activeTab) {
    case 'intro':
      renderHero('tab-outlet', (targetTab) => switchTab(targetTab));
      break;

    case 'homolog':
      renderHomologExplorer('tab-outlet');
      break;

    case 'isomers':
      renderIsomerInteractive('tab-outlet');
      break;

    case 'iupac':
      renderIupacTrainer('tab-outlet');
      break;

    case 'quiz':
      renderQuizModule('tab-outlet');
      break;

    default:
      renderHero('tab-outlet', (targetTab) => switchTab(targetTab));
  }
}

// Bootstrap
window.addEventListener('DOMContentLoaded', initApp);
