import React, { useState, useEffect } from 'react';
import { Atom, Zap, Flame, BookOpenCheck, GitCompare, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import ModulAlkana from './ModulAlkana.jsx';
import ModulAlkena from './ModulAlkena.jsx';
import ModulAlkuna from './ModulAlkuna.jsx';
import ModulIupac from './ModulIupac.jsx';
import ModulIsomer from './ModulIsomer.jsx';

export default function MateriSection({ activeSubTab, onSubTabChange, onProgressUpdate }) {
  const [currentTab, setCurrentTab] = useState(activeSubTab || 'ikhtisar');
  const [completedModules, setCompletedModules] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('hidrokarbon_completed_modules') || '[]');
      setCompletedModules(saved);
    } catch {
      setCompletedModules([]);
    }
  }, []);

  const toggleModuleCompletion = (modId) => {
    setCompletedModules((prev) => {
      const next = prev.includes(modId)
        ? prev.filter((id) => id !== modId)
        : [...prev, modId];
      try {
        localStorage.setItem('hidrokarbon_completed_modules', JSON.stringify(next));
        if (onProgressUpdate) onProgressUpdate(next);
      } catch (e) {
        console.error('Gagal menyimpan ke localStorage', e);
      }
      return next;
    });
  };

  const handleTabChange = (tabId) => {
    setCurrentTab(tabId);
    if (onSubTabChange) onSubTabChange(tabId);
  };

  const overviewCards = [
    {
      id: 'alkana',
      title: 'Alkana',
      tagline: 'Hidrokarbon Jenuh',
      rumus: 'CₙH₂ₙ₊₂',
      ikatan: 'Tunggal (C–C)',
      hibridisasi: 'sp³ (Tetrahedral 109,5°)',
      icon: Atom,
      deskripsi: 'Seluruh ikatan antaratom karbon berupa ikatan kovalen tunggal yang kuat dan stabil. Sering disebut parafin (sukar bereaksi).',
      contoh: 'metana (CH₄), etana (C₂H₆), propana (C₃H₈)',
      reaksi: 'CH₄ + 2O₂ → CO₂ + 2H₂O (Eksoterm)'
    },
    {
      id: 'alkena',
      title: 'Alkena',
      tagline: 'Hidrokarbon Tak Jenuh',
      rumus: 'CₙH₂ₙ',
      ikatan: 'Rangkap Dua (C=C)',
      hibridisasi: 'sp² (Trigonal Planar 120°)',
      icon: Zap,
      deskripsi: 'Memiliki minimal satu ikatan rangkap dua karbon–karbon yang kaya elektron dan sangat mudah mengalami reaksi adisi (penjenuhan).',
      contoh: 'etena (C₂H₄), propena (C₃H₆), 1-butena (C₄H₈)',
      reaksi: 'CH₂=CH₂ + H₂ → CH₃–CH₃ (Adisi)'
    },
    {
      id: 'alkuna',
      title: 'Alkuna',
      tagline: 'Hidrokarbon Tak Jenuh',
      rumus: 'CₙH₂ₙ₋₂',
      ikatan: 'Rangkap Tiga (C≡C)',
      hibridisasi: 'sp (Linear 180°)',
      icon: Flame,
      deskripsi: 'Memiliki minimal satu ikatan rangkap tiga karbon–karbon berenergi tinggi. Menghasilkan suhu nyala sangat panas pada las karbit.',
      contoh: 'etuna (C₂H₂, asetilena), propuna (C₃H₄)',
      reaksi: '2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O (3.300 °C)'
    }
  ];

  return (
    <section className="materi-section-container" id="materi" aria-labelledby="materi-heading">
      <div className="section-head text-center">
        <span className="section-pill">Kurikulum Kimia SMA Fase E</span>
        <h2 className="section-title" id="materi-heading">
          Materi Pembelajaran Hidrokarbon
        </h2>
        <p className="section-subtitle">
          Eksplorasi ringkasan konsep tiga golongan hidrokarbon alifatik utama, aturan tata nama resmi IUPAC, serta fenomena isomerisme molekul secara interaktif.
        </p>
      </div>

      {/* Navigasi Sub-Tab Materi */}
      <div className="materi-tabs-bar" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={currentTab === 'ikhtisar'}
          onClick={() => handleTabChange('ikhtisar')}
          className={`materi-tab-btn ${currentTab === 'ikhtisar' ? 'active' : ''}`}
        >
          <span>Ringkasan 3 Golongan</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={currentTab === 'alkana'}
          onClick={() => handleTabChange('alkana')}
          className={`materi-tab-btn ${currentTab === 'alkana' ? 'active' : ''}`}
        >
          <Atom size={16} />
          <span>Alkana</span>
          {completedModules.includes('alkana') && <span className="tab-done-dot">✓</span>}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={currentTab === 'alkena'}
          onClick={() => handleTabChange('alkena')}
          className={`materi-tab-btn ${currentTab === 'alkena' ? 'active' : ''}`}
        >
          <Zap size={16} />
          <span>Alkena</span>
          {completedModules.includes('alkena') && <span className="tab-done-dot">✓</span>}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={currentTab === 'alkuna'}
          onClick={() => handleTabChange('alkuna')}
          className={`materi-tab-btn ${currentTab === 'alkuna' ? 'active' : ''}`}
        >
          <Flame size={16} />
          <span>Alkuna</span>
          {completedModules.includes('alkuna') && <span className="tab-done-dot">✓</span>}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={currentTab === 'iupac'}
          onClick={() => handleTabChange('iupac')}
          className={`materi-tab-btn ${currentTab === 'iupac' ? 'active' : ''}`}
        >
          <BookOpenCheck size={16} />
          <span>Tata Nama IUPAC</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={currentTab === 'isomer'}
          onClick={() => handleTabChange('isomer')}
          className={`materi-tab-btn ${currentTab === 'isomer' ? 'active' : ''}`}
        >
          <GitCompare size={16} />
          <span>Isomerisme</span>
        </button>
      </div>

      {/* Konten Tab Aktif */}
      <div className="materi-tab-panel">
        {currentTab === 'ikhtisar' && (
          <div className="overview-cards-grid">
            {overviewCards.map((card) => {
              const IconComp = card.icon;
              const isDone = completedModules.includes(card.id);

              return (
                <div key={card.id} className={`materi-card ${isDone ? 'card-completed' : ''}`}>
                  <div className="materi-card-top">
                    <span className="card-badge">{card.tagline}</span>
                    <button
                      type="button"
                      onClick={() => toggleModuleCompletion(card.id)}
                      className={`btn-check-pill ${isDone ? 'done' : ''}`}
                      title={isDone ? 'Modul ini sudah kamu tandai selesai' : 'Tandai modul selesai'}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 size={16} />
                          <span>Selesai</span>
                        </>
                      ) : (
                        <>
                          <Circle size={16} />
                          <span>Tandai Selesai</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="materi-card-heading">
                    <div className="card-icon-container">
                      <IconComp size={24} />
                    </div>
                    <div>
                      <h3 className="materi-card-title">{card.title}</h3>
                      <span className="card-formula-highlight text-mono">{card.rumus}</span>
                    </div>
                  </div>

                  <div className="card-spec-box">
                    <div className="spec-row">
                      <span className="spec-name">Jenis Ikatan:</span>
                      <strong className="spec-data">{card.ikatan}</strong>
                    </div>
                    <div className="spec-row">
                      <span className="spec-name">Bentuk Ruang:</span>
                      <strong className="spec-data">{card.hibridisasi}</strong>
                    </div>
                  </div>

                  <p className="card-desc-text">{card.deskripsi}</p>

                  <div className="card-reaction-strip">
                    <span className="reaction-strip-lbl">Reaksi Khas:</span>
                    <span className="reaction-strip-code text-mono">{card.reaksi}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleTabChange(card.id)}
                    className="btn-read-deep"
                  >
                    <span>Buka Modul Lengkap {card.title}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {currentTab === 'alkana' && (
          <ModulAlkana
            isCompleted={completedModules.includes('alkana')}
            onToggleComplete={() => toggleModuleCompletion('alkana')}
          />
        )}

        {currentTab === 'alkena' && (
          <ModulAlkena
            isCompleted={completedModules.includes('alkena')}
            onToggleComplete={() => toggleModuleCompletion('alkena')}
          />
        )}

        {currentTab === 'alkuna' && (
          <ModulAlkuna
            isCompleted={completedModules.includes('alkuna')}
            onToggleComplete={() => toggleModuleCompletion('alkuna')}
          />
        )}

        {currentTab === 'iupac' && <ModulIupac />}

        {currentTab === 'isomer' && <ModulIsomer />}
      </div>
    </section>
  );
}

