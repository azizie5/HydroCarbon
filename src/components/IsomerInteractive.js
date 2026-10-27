import { ISOMER_INFO } from '../data/isomers.js';
import { createMoleculeSvg } from './MoleculeViewer2D.js';

export function renderIsomerInteractive(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let activeCategoryIndex = 0;

  function render() {
    const category = ISOMER_INFO.categories[activeCategoryIndex];

    container.innerHTML = `
      <div class="isomer-wrapper">
        <div class="isomer-intro-banner">
          <div class="banner-badge">Konsep Kunci</div>
          <h3>${ISOMER_INFO.definition}</h3>
          <p>${ISOMER_INFO.importanceNote}</p>
        </div>

        <!-- Category Tabs -->
        <div class="isomer-tabs">
          ${ISOMER_INFO.categories.map((cat, idx) => `
            <button class="iso-tab-btn ${idx === activeCategoryIndex ? 'active' : ''}" data-cat-idx="${idx}">
              ${cat.title}
            </button>
          `).join('')}
        </div>

        <!-- Active Category Card -->
        <div class="iso-card">
          <div class="iso-card-head">
            <h4 class="iso-card-title">${category.title}</h4>
            <p class="iso-card-desc">${category.description}</p>
            ${category.principle ? `<div class="iso-principle"><strong>Prinsip:</strong> ${category.principle}</div>` : ''}
            ${category.condition ? `<div class="iso-condition"><strong>Syarat:</strong> ${category.condition}</div>` : ''}
          </div>

          <!-- Comparative Display -->
          <div class="iso-comparison-container">
            <div class="comparison-header-tag">
              Rumus Molekul Sama: <strong class="badge-formula">${category.examplePair.formula}</strong>
            </div>

            <div class="iso-pair-grid">
              ${category.examplePair.compounds.map((comp, cIdx) => `
                <div class="iso-compound-card ${cIdx === 0 ? 'comp-a' : 'comp-b'}">
                  <div class="comp-head">
                    <span class="comp-tag">${comp.type || 'Bentuk ' + (cIdx + 1)}</span>
                    <h5 class="comp-name">${comp.name}</h5>
                  </div>

                  <div class="comp-formula-box text-mono">
                    ${comp.condensed}
                  </div>

                  <!-- Visual SVG for Cis/Trans or structure -->
                  ${category.id === 'geometri' ? `
                    <div class="iso-svg-box">
                      ${createMoleculeSvg({
                        isomerType: cIdx === 0 ? 'cis-2-butene' : 'trans-2-butene'
                      })}
                    </div>
                  ` : ''}

                  <div class="comp-specs">
                    ${comp.boilingPoint !== undefined ? `
                      <div class="spec-row">
                        <span class="s-lbl">Titik Didih:</span>
                        <span class="s-val highlight">${comp.boilingPoint} °C</span>
                      </div>
                    ` : ''}
                    ${comp.meltingPoint !== undefined ? `
                      <div class="spec-row">
                        <span class="s-lbl">Titik Leleh:</span>
                        <span class="s-val">${comp.meltingPoint} °C</span>
                      </div>
                    ` : ''}
                    ${comp.dipole ? `
                      <div class="spec-row">
                        <span class="s-lbl">Kepolaran:</span>
                        <span class="s-val">${comp.dipole}</span>
                      </div>
                    ` : ''}
                    ${comp.reagentBromine ? `
                      <div class="spec-row">
                        <span class="s-lbl">Uji Bromin:</span>
                        <span class="s-val">${comp.reagentBromine}</span>
                      </div>
                    ` : ''}
                  </div>

                  <p class="comp-notes">${comp.description}</p>
                </div>
              `).join('')}
            </div>

            <!-- Additional multi-isomer example if exists (e.g. C5H12) -->
            ${category.secondExample ? `
              <div class="multi-isomer-section">
                <h6>${category.secondExample.formula}</h6>
                <div class="multi-iso-grid">
                  ${category.secondExample.items.map(item => `
                    <div class="mini-iso-pill">
                      <strong>${item.name}</strong>
                      <span class="text-mono">${item.formula}</span>
                      <small>Tb: ${item.bp} • ${item.shape}</small>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    // Listeners
    container.querySelectorAll('.iso-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeCategoryIndex = parseInt(e.currentTarget.dataset.catIdx, 10);
        render();
      });
    });
  }

  render();
}
