import { ALKANE_INFO } from '../data/alkanes.js';
import { ALKENE_INFO } from '../data/alkenes.js';
import { ALKYNE_INFO } from '../data/alkynes.js';
import { createMoleculeSvg } from './MoleculeViewer2D.js';
import { formatChemicalFormula } from '../utils/storage.js';

export function renderHomologExplorer(containerId, initialFamily = 'alkane') {
  const container = document.getElementById(containerId);
  if (!container) return;

  let currentFamily = initialFamily; // 'alkane', 'alkene', 'alkyne'
  let selectedIndex = 0; // index in series

  function getFamilyData() {
    if (currentFamily === 'alkane') return ALKANE_INFO;
    if (currentFamily === 'alkene') return ALKENE_INFO;
    return ALKYNE_INFO;
  }

  function getAccentColor() {
    if (currentFamily === 'alkane') return { primary: '#10b981', light: 'rgba(16, 185, 129, 0.15)', name: 'Alkana' };
    if (currentFamily === 'alkene') return { primary: '#0284c7', light: 'rgba(2, 132, 199, 0.15)', name: 'Alkena' };
    return { primary: '#8b5cf6', light: 'rgba(139, 92, 246, 0.15)', name: 'Alkuna' };
  }

  function render() {
    const data = getFamilyData();
    const colors = getAccentColor();
    const activeItem = data.series[selectedIndex] || data.series[0];

    container.innerHTML = `
      <div class="explorer-card">
        <!-- Family Switcher Header -->
        <div class="explorer-top-bar">
          <div class="family-pills">
            <button class="pill-btn ${currentFamily === 'alkane' ? 'active alkane-pill' : ''}" data-family="alkane">
              <span class="dot alkane-dot"></span> Alkana (C<sub>n</sub>H<sub>2n+2</sub>)
            </button>
            <button class="pill-btn ${currentFamily === 'alkene' ? 'active alkene-pill' : ''}" data-family="alkene">
              <span class="dot alkene-dot"></span> Alkena (C<sub>n</sub>H<sub>2n</sub>)
            </button>
            <button class="pill-btn ${currentFamily === 'alkyne' ? 'active alkyne-pill' : ''}" data-family="alkyne">
              <span class="dot alkyne-dot"></span> Alkuna (C<sub>n</sub>H<sub>2n-2</sub>)
            </button>
          </div>

          <div class="family-summary-badge" style="border-color: ${colors.primary}; background: ${colors.light};">
            <span class="label">Hibridisasi:</span> <strong>${data.hybridization}</strong> •
            <span class="label">Geometri:</span> <strong>${data.geometry}</strong>
          </div>
        </div>

        <!-- C1 - C10 Selector Bar -->
        <div class="carbon-selector-track">
          <span class="track-label">Pilih Atom Karbon (C):</span>
          <div class="carbon-buttons-list">
            ${data.series.map((item, idx) => `
              <button class="carbon-chip ${idx === selectedIndex ? 'active' : ''}" data-index="${idx}" style="${idx === selectedIndex ? `background: ${colors.primary}; border-color: ${colors.primary};` : ''}">
                <span class="c-num">C${item.c}</span>
                <span class="c-subname">${item.name.slice(0, 4)}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Detail Display Grid -->
        <div class="compound-detail-grid">
          <!-- Left: Identity & Specs -->
          <div class="spec-panel">
            <div class="compound-header">
              <div class="title-wrap">
                <span class="eyebrow" style="color: ${colors.primary};">C${activeItem.c} • ${colors.name}</span>
                <h3 class="compound-name">${activeItem.name}</h3>
              </div>
              <div class="state-badge ${activeItem.state.toLowerCase()}">
                ${activeItem.state} pada 25°C
              </div>
            </div>

            <div class="formula-box">
              <div class="formula-item">
                <span class="f-label">Rumus Molekul:</span>
                <span class="f-val text-mono highlight">${formatChemicalFormula(activeItem.formula)}</span>
              </div>
              <div class="formula-item">
                <span class="f-label">Rumus Mampat:</span>
                <span class="f-val text-mono">${activeItem.condensed}</span>
              </div>
              <div class="formula-item">
                <span class="f-label">Massa Molar (Mr):</span>
                <span class="f-val">${activeItem.molarMass} g/mol</span>
              </div>
            </div>

            <!-- Boiling Point Bar -->
            <div class="thermal-box">
              <div class="thermal-header">
                <span>Titik Didih (Tb):</span>
                <strong class="thermal-val" style="color: ${activeItem.boilingPoint < 0 ? '#38bdf8' : '#f97316'};">
                  ${activeItem.boilingPoint} °C
                </strong>
              </div>
              <div class="thermal-bar-bg">
                <div class="thermal-bar-fill" style="width: ${Math.min(Math.max((activeItem.boilingPoint + 170) / 3.5, 5), 100)}%; background: ${activeItem.boilingPoint < 0 ? '#0284c7' : '#ea580c'};"></div>
              </div>
              <small class="thermal-hint">
                ${activeItem.boilingPoint < 25 ? '❄️ Berwujud Gas pada suhu kamar (25°C)' : '💧 Berwujud Cair pada suhu kamar (25°C)'}
              </small>
            </div>

            <div class="uses-callout">
              <div class="uses-title">💡 Aplikasi & Kegunaan Sehari-hari:</div>
              <p class="uses-text">${activeItem.uses}</p>
            </div>
          </div>

          <!-- Right: Visualizer & Reactions -->
          <div class="visualizer-panel">
            <div class="viz-header">
              <span class="viz-title">Visualisasi Struktur Rantai 2D</span>
              <span class="viz-tag">Model Lewis & Ikatan</span>
            </div>
            
            <div class="viz-canvas-wrapper">
              ${createMoleculeSvg({
                type: currentFamily,
                carbons: activeItem.c,
                bondType: currentFamily === 'alkane' ? 'single' : (currentFamily === 'alkene' ? 'double' : 'triple'),
                bondPos: 1
              })}
            </div>

            <!-- Key Reactions for this family -->
            <div class="reactions-collapsible">
              <div class="reaction-item">
                <div class="rxn-badge">Reaksi Karakteristik ${colors.name}</div>
                <div class="rxn-eq text-mono">${data.keyReactions[0].equation}</div>
                <div class="rxn-desc">${data.keyReactions[0].explanation}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Attach listeners
    container.querySelectorAll('.pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        currentFamily = e.currentTarget.dataset.family;
        selectedIndex = 0;
        render();
      });
    });

    container.querySelectorAll('.carbon-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        selectedIndex = parseInt(e.currentTarget.dataset.index, 10);
        render();
      });
    });
  }

  render();
}
