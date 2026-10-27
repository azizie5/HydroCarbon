import { IUPAC_DATA } from '../data/iupacRules.js';
import { recordIupacSolved } from '../utils/storage.js';

export function renderIupacTrainer(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let activeTab = 'rules'; // 'rules' | 'practice'
  let currentPracticeIdx = 0;
  let userSelectedAnswer = null;
  let showExplanation = false;

  function render() {
    container.innerHTML = `
      <div class="iupac-wrapper">
        <!-- Sub Header & Toggle -->
        <div class="iupac-header-nav">
          <div class="iupac-info">
            <span class="sub-badge">Standar Internasional</span>
            <h3 class="iupac-main-title">Tata Nama Senyawa Hidrokarbon (IUPAC)</h3>
            <p class="iupac-desc">${IUPAC_DATA.subtitle}</p>
          </div>

          <div class="iupac-mode-switch">
            <button class="mode-btn ${activeTab === 'rules' ? 'active' : ''}" data-mode="rules">
              📘 5 Aturan Emas IUPAC
            </button>
            <button class="mode-btn ${activeTab === 'practice' ? 'active' : ''}" data-mode="practice">
              🎯 Latihan Interaktif Penamaan
            </button>
          </div>
        </div>

        ${activeTab === 'rules' ? renderRulesView() : renderPracticeView()}
      </div>
    `;

    // Mode switch listeners
    container.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeTab = e.currentTarget.dataset.mode;
        userSelectedAnswer = null;
        showExplanation = false;
        render();
      });
    });

    if (activeTab === 'practice') {
      attachPracticeListeners();
    }
  }

  function renderRulesView() {
    return `
      <div class="rules-container">
        <!-- Rule Cards Grid -->
        <div class="rules-list">
          ${IUPAC_DATA.goldenRules.map(rule => `
            <div class="rule-card">
              <div class="rule-top">
                <span class="rule-badge">${rule.badge}</span>
                <h4 class="rule-title">${rule.name}</h4>
              </div>
              
              <div class="rule-body">
                <p class="rule-detail">${rule.detail.replace(/\n/g, '<br/>')}</p>

                ${rule.alkylTable ? `
                  <div class="alkyl-table-wrap">
                    <span class="sub-caption">Daftar Gugus Alkil Umum:</span>
                    <table class="alkyl-table">
                      <thead>
                        <tr>
                          <th>Rumus Cabang</th>
                          <th>Nama Alkil</th>
                          <th>Keterangan Asal</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${rule.alkylTable.map(alk => `
                          <tr>
                            <td class="text-mono highlight-teal">${alk.formula}</td>
                            <td><strong>${alk.name}</strong></td>
                            <td class="text-muted">${alk.origin}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                ` : ''}

                ${rule.prefixes ? `
                  <div class="prefixes-grid">
                    ${rule.prefixes.map(p => `
                      <div class="prefix-chip">
                        <span class="prefix-count">${p.count} cabang:</span>
                        <strong>${p.prefix}</strong>
                        <small>(${p.example})</small>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}

                ${rule.formatPattern ? `
                  <div class="pattern-callout">
                    <span class="p-title">Format Standar Penulisan:</span>
                    <code class="pattern-code">${rule.formatPattern}</code>
                    <ul class="punct-list">
                      ${rule.punctuationRules.map(punct => `<li>${punct}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}

                ${rule.example ? `
                  <div class="rule-ex-box">
                    <strong>Contoh:</strong> ${rule.example}
                  </div>
                ` : ''}

                ${rule.tip ? `
                  <div class="rule-tip-box">
                    💡 <em>${rule.tip}</em>
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderPracticeView() {
    const practice = IUPAC_DATA.interactivePractices[currentPracticeIdx];
    const isAnswered = userSelectedAnswer !== null;
    const isCorrect = userSelectedAnswer === practice.correctName;

    return `
      <div class="practice-box">
        <div class="practice-top-bar">
          <div class="practice-counter">
            Kasus ${currentPracticeIdx + 1} dari ${IUPAC_DATA.interactivePractices.length}
            <span class="category-pill">${practice.compoundType}</span>
          </div>

          <div class="case-nav-btns">
            <button class="nav-case-btn" id="prevCaseBtn" ${currentPracticeIdx === 0 ? 'disabled' : ''}>← Kasus Sebelumnya</button>
            <button class="nav-case-btn" id="nextCaseBtn" ${currentPracticeIdx === IUPAC_DATA.interactivePractices.length - 1 ? 'disabled' : ''}>Kasus Berikutnya →</button>
          </div>
        </div>

        <div class="practice-main-card">
          <h4 class="case-title">${practice.title}</h4>
          
          <!-- Structure Display Area -->
          <div class="chem-terminal">
            <div class="term-bar">
              <span class="term-dot red"></span>
              <span class="term-dot yellow"></span>
              <span class="term-dot green"></span>
              <span class="term-title">Rumus Struktur Senyawa</span>
            </div>
            <pre class="chem-ascii">${practice.structureDisplay}</pre>
            <div class="condensed-sub">Rumus Mampat: <code>${practice.condensed}</code></div>
          </div>

          <!-- Question Prompt -->
          <div class="quiz-prompt">
            <p>Berdasarkan kaidah IUPAC di atas, tentukan nama resmi senyawa ini:</p>
          </div>

          <!-- Options Grid -->
          <div class="options-grid">
            ${practice.options.map(opt => {
              let optClass = 'opt-btn';
              if (isAnswered) {
                if (opt === practice.correctName) optClass += ' correct';
                else if (opt === userSelectedAnswer) optClass += ' incorrect';
                else optClass += ' disabled';
              }
              return `
                <button class="${optClass}" data-answer="${opt}" ${isAnswered ? 'disabled' : ''}>
                  <span class="opt-label">${opt}</span>
                  ${isAnswered && opt === practice.correctName ? '✓' : ''}
                  ${isAnswered && opt === userSelectedAnswer && !isCorrect ? '✗' : ''}
                </button>
              `;
            }).join('')}
          </div>

          <!-- Feedback & Step-by-Step Explanation -->
          ${isAnswered ? `
            <div class="feedback-card ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}">
              <div class="feedback-head">
                <span class="icon">${isCorrect ? '🎉 Benar Sekali!' : '⚠️ Masih Kurang Tepat!'}</span>
                <strong>Nama yang tepat: <span class="text-highlight">${practice.correctName}</span></strong>
              </div>
              <p class="fb-explanation">${practice.explanation}</p>

              <!-- Step-by-Step Breakdown Accordion -->
              <div class="steps-breakdown">
                <h5>Langkah Pembongkaran Aturan IUPAC:</h5>
                <div class="breakdown-list">
                  ${practice.steps.map((st, sIdx) => `
                    <div class="step-row">
                      <span class="st-num">${sIdx + 1}</span>
                      <div class="st-info">
                        <strong>${st.title}:</strong>
                        <span>${st.result}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  function attachPracticeListeners() {
    const practice = IUPAC_DATA.interactivePractices[currentPracticeIdx];

    container.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        userSelectedAnswer = e.currentTarget.dataset.answer;
        if (userSelectedAnswer === practice.correctName) {
          recordIupacSolved(practice.id);
        }
        render();
      });
    });

    const prevBtn = document.getElementById('prevCaseBtn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentPracticeIdx > 0) {
          currentPracticeIdx--;
          userSelectedAnswer = null;
          render();
        }
      });
    }

    const nextBtn = document.getElementById('nextCaseBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentPracticeIdx < IUPAC_DATA.interactivePractices.length - 1) {
          currentPracticeIdx++;
          userSelectedAnswer = null;
          render();
        }
      });
    }
  }

  render();
}
