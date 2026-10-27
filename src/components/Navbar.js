import { getStoredProgress } from '../utils/storage.js';

export function renderNavbar(containerId, activeTab, onTabChange) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const progress = getStoredProgress();
  const totalSteps = 5;
  const completed = (progress.completedModules?.length || 1);
  const percent = Math.min(Math.round((completed / totalSteps) * 100), 100);

  const navItems = [
    { id: 'intro', label: 'Ringkasan & Konsep', icon: '🧪' },
    { id: 'homolog', label: 'Deret Homolog', icon: '⛓️' },
    { id: 'isomers', label: 'Isomeri Hidrokarbon', icon: '🔄' },
    { id: 'iupac', label: 'Tata Nama IUPAC', icon: '📝' },
    { id: 'quiz', label: 'Kuis Evaluasi', icon: '🏆' }
  ];

  container.innerHTML = `
    <nav class="main-navbar">
      <div class="nav-brand">
        <div class="brand-logo-hex">
          <span class="hex-icon">⬡</span>
          <span class="brand-c">C</span>
        </div>
        <div class="brand-titles">
          <span class="brand-name">Hydro<span class="text-teal">Carbon</span></span>
          <span class="brand-sub">Web-Based Learning</span>
        </div>
      </div>

      <div class="nav-links">
        ${navItems.map(item => `
          <button class="nav-item-btn ${activeTab === item.id ? 'active' : ''}" data-tab="${item.id}">
            <span class="nav-icon">${item.icon}</span>
            <span class="nav-text">${item.label}</span>
          </button>
        `).join('')}
      </div>

      <div class="nav-right">
        <div class="progress-pill" title="Progres Materi Terpelajari">
          <div class="progress-ring-label">Progres: ${percent}%</div>
          <div class="progress-track-mini">
            <div class="progress-fill-mini" style="width: ${percent}%;"></div>
          </div>
        </div>
      </div>
    </nav>
  `;

  container.querySelectorAll('.nav-item-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tabId = e.currentTarget.dataset.tab;
      onTabChange(tabId);
    });
  });
}
