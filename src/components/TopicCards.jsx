import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  X, 
  Sparkles, 
  Info,
  Atom,
  Flame,
  Zap
} from 'lucide-react';

const HYDROCARBON_TOPICS = [
  {
    id: 'alkana',
    title: 'Alkana',
    subtitle: 'Hidrokarbon Jenuh (Ikatan Tunggal C–C)',
    badge: 'Modul 1 • CnH2n+2',
    themeColor: 'emerald',
    icon: Atom,
    generalFormula: 'CₙH₂ₙ₊₂',
    bondType: 'Ikatan Tunggal (C–C)',
    hybridization: 'sp³ (Tetrahedral 109,5°)',
    summary: 'Alkana adalah hidrokarbon alifatik jenuh dengan rumus umum CₙH₂ₙ₊₂. Seluruh ikatan antar atom karbon merupakan ikatan kovalen tunggal yang kuat dan stabil.',
    keyPoints: [
      'Memiliki rumus umum CₙH₂ₙ₊₂ (contoh: metana CH₄, etana C₂H₆, propana C₃H₈)',
      'Hidrokarbon jenuh karena jumlah atom H yang diikat sudah maksimal',
      'Kurang reaktif (parafin), tetapi mudah mengalami reaksi pembakaran dan substitusi'
    ],
    sampleEquation: 'CH₄ + 2O₂ → CO₂ + 2H₂O + Energi Kalor',
    equationNote: 'Pembakaran sempurna metana menghasilkan karbon dioksida dan uap air.',
    detailModal: {
      overview: 'Alkana sering disebut parafin (daya gabung kecil) karena kestabilan ikatan tunggalnya. Senyawa alkana banyak kamu temukan dalam kehidupan sehari-hari sebagai bahan bakar gas elpiji (propana dan butana), bensin (oktana), dan lilin parafin.',
      rules: [
        { label: 'Rumus Umum', value: 'CₙH₂ₙ₊₂' },
        { label: 'Tata Nama IUPAC', value: 'Rantai karbon berakhiran "-ana" (metana, etana, propana, butana, pentana, dst.)' },
        { label: 'Aturan Penomoran', value: 'Dimulai dari ujung rantai terdekat dengan cabang alkil terdekat' },
        { label: 'Reaksi Khas', value: 'Pembakaran (oksidasi) dan Substitusi halogenasi (CH₄ + Cl₂ → CH₃Cl + HCl)' }
      ],
      homologSnippet: 'Deret Homolog: CH₄ (metana), C₂H₆ (etana), C₃H₈ (propana), C₄H₁₀ (butana), C₅H₁₂ (pentana)',
      studyTip: 'Untuk mengingat rumus alkana CₙH₂ₙ₊₂, ingat jika atom C ada 3 (n = 3), maka atom H = 2(3) + 2 = 8, menjadi C₃H₈ (propana).'
    }
  },
  {
    id: 'alkena',
    title: 'Alkena',
    subtitle: 'Hidrokarbon Tak Jenuh (Ikatan Rangkap Dua C=C)',
    badge: 'Modul 2 • CnH2n',
    themeColor: 'cyan',
    icon: Zap,
    generalFormula: 'CₙH₂ₙ',
    bondType: 'Ikatan Rangkap Dua (C=C)',
    hybridization: 'sp² (Trigonal Planar 120°)',
    summary: 'Alkena adalah hidrokarbon alifatik tak jenuh yang memiliki minimal satu ikatan rangkap dua karbon-karbon (C=C), membuatnya jauh lebih reaktif dibanding alkana.',
    keyPoints: [
      'Memiliki rumus umum CₙH₂ₙ (contoh: etena C₂H₄, propena C₃H₆, 1-butena C₄H₈)',
      'Hidrokarbon tak jenuh yang mudah mengalami reaksi adisi (pemutusan ikatan rangkap)',
      'Memiliki keunikan isomer posisi ikatan rangkap dan isomer geometri cis-trans'
    ],
    sampleEquation: 'CH₂=CH₂ + H₂ —(katalis Ni)→ CH₃–CH₃',
    equationNote: 'Reaksi adisi hidrogenasi mengubah etena tak jenuh menjadi etana jenuh.',
    detailModal: {
      overview: 'Alkena (disebut juga olefin) merupakan bahan baku penting di industri polimer sintetis. Senyawa etena (etilena) juga diproduksi alami oleh tumbuhan sebagai hormon pematangan buah.',
      rules: [
        { label: 'Rumus Umum', value: 'CₙH₂ₙ' },
        { label: 'Tata Nama IUPAC', value: 'Rantai utama memuat ikatan rangkap dan berakhiran "-ena" (etena, propena, 1-butena)' },
        { label: 'Prioritas Penomoran', value: 'Nomor 1 dimulai dari ujung rantai yang paling dekat dengan IKATAN RANGKAP' },
        { label: 'Reaksi Khas', value: 'Adisi (hidrogenasi, brominasi uji tak jenuh, kaidah Markovnikov), dan polimerisasi' }
      ],
      homologSnippet: 'Deret Homolog: C₂H₄ (etena), C₃H₆ (propena), C₄H₈ (1-butena), C₅H₁₀ (1-pentena)',
      studyTip: 'Penomoran rantai utama pada alkena wajib memprioritaskan posisi ikatan rangkap dua sekecil mungkin, baru kemudian memperhatikan cabang alkil!'
    }
  },
  {
    id: 'alkuna',
    title: 'Alkuna',
    subtitle: 'Hidrokarbon Tak Jenuh (Ikatan Rangkap Tiga C≡C)',
    badge: 'Modul 3 • CnH2n-2',
    themeColor: 'purple',
    icon: Flame,
    generalFormula: 'CₙH₂ₙ₋₂',
    bondType: 'Ikatan Rangkap Tiga (C≡C)',
    hybridization: 'sp (Linear 180°)',
    summary: 'Alkuna adalah hidrokarbon tak jenuh yang memiliki minimal satu ikatan rangkap tiga karbon-karbon (C≡C) yang sangat kaya elektron dan berenergi tinggi.',
    keyPoints: [
      'Memiliki rumus umum CₙH₂ₙ₋₂ (contoh: etuna C₂H₂, propuna C₃H₄, 1-butuna C₄H₆)',
      'Mampu mengadisi dua tahap pereaksi hingga menjadi alkana jenuh',
      'Gas etuna (asetilena) menghasilkan suhu nyala api sangat tinggi (~3.300 °C) pada las karbit'
    ],
    sampleEquation: 'CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂',
    equationNote: 'Sintesis gas asetilena (etuna) dari kalsium karbida yang ditetesi air.',
    detailModal: {
      overview: 'Ikatan rangkap tiga pada alkuna terdiri dari satu ikatan sigma (σ) kuat dan dua ikatan pi (π) tegak lurus. Hal ini memberikan sudut ikatan 180° (lurus/linear) pada atom karbon sp.',
      rules: [
        { label: 'Rumus Umum', value: 'CₙH₂ₙ₋₂' },
        { label: 'Tata Nama IUPAC', value: 'Rantai utama memuat ikatan rangkap tiga dan berakhiran "-una" (etuna, propuna, 1-butuna)' },
        { label: 'Prioritas Penomoran', value: 'Dimulai dari ujung rantai yang paling dekat dengan ikatan rangkap tiga' },
        { label: 'Reaksi Khas', value: 'Adisi bertahap dua kali lipat dan pembentukan ion asetilida (alkuna terminal)' }
      ],
      homologSnippet: 'Deret Homolog: C₂H₂ (etuna), C₃H₄ (propuna), C₄H₆ (1-butuna), C₅H₈ (1-pentuna)',
      studyTip: 'Gas etuna (C₂H₂) adalah anggota alkuna paling sederhana yang lebih dikenal sebagai gas asetilena untuk las logam.'
    }
  }
];

export default function TopicCards() {
  const [completedModules, setCompletedModules] = useState([]);
  const [activeModalTopic, setActiveModalTopic] = useState(null);

  // Membaca status modul yang telah diselesaikan siswa dari localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('hidrokarbon_completed_modules') || '[]');
      setCompletedModules(saved);
    } catch {
      setCompletedModules([]);
    }
  }, []);

  // Menyimpan status selesai ke localStorage secara anonim
  const toggleModuleCompletion = (moduleId) => {
    setCompletedModules((prev) => {
      const next = prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId];
      
      try {
        localStorage.setItem('hidrokarbon_completed_modules', JSON.stringify(next));
      } catch (err) {
        console.error('Gagal menyimpan progres ke localStorage', err);
      }
      return next;
    });
  };

  return (
    <section className="topics-section" id="topik-pembelajaran" aria-labelledby="topics-title">
      <div className="topics-header">
        <span className="section-eyebrow">Tiga Pilar Senyawa Hidrokarbon</span>
        <h2 className="section-heading" id="topics-title">
          Modul Alkana, Alkena, dan Alkuna
        </h2>
        <p className="section-subtext">
          Pilihlah modul yang ingin kamu pelajari hari ini. Setiap modul dilengkapi ciri ikatan khas,
          rumus umum baku, aturan tata nama IUPAC huruf kecil, serta penanda progres belajar kamu.
        </p>
      </div>

      {/* Grid 3 Kartu Topik Hidrokarbon */}
      <div className="topics-grid">
        {HYDROCARBON_TOPICS.map((topic) => {
          const IconComponent = topic.icon;
          const isDone = completedModules.includes(topic.id);

          return (
            <article 
              key={topic.id} 
              className={`topic-card card-${topic.themeColor} ${isDone ? 'is-completed' : ''}`}
            >
              <div className="card-top-bar">
                <span className="topic-badge">{topic.badge}</span>
                <button
                  type="button"
                  className={`btn-check-progress ${isDone ? 'done' : ''}`}
                  onClick={() => toggleModuleCompletion(topic.id)}
                  title={isDone ? 'Tandai belum selesai' : 'Tandai modul ini sudah kamu pelajari'}
                  aria-label={isDone ? 'Tandai belum selesai' : 'Tandai selesai'}
                >
                  {isDone ? (
                    <>
                      <CheckCircle2 size={18} className="check-icon done" />
                      <span>Selesai</span>
                    </>
                  ) : (
                    <>
                      <Circle size={18} className="check-icon" />
                      <span>Tandai Selesai</span>
                    </>
                  )}
                </button>
              </div>

              {/* Header Kartu */}
              <div className="card-title-group">
                <div className={`card-icon-bubble bg-${topic.themeColor}`}>
                  <IconComponent size={24} />
                </div>
                <div>
                  <h3 className="card-title">{topic.title}</h3>
                  <span className="card-subtitle">{topic.subtitle}</span>
                </div>
              </div>

              {/* Formula & Bond Quick Tags */}
              <div className="card-quick-specs">
                <div className="spec-item">
                  <span className="spec-lbl">Rumus Umum:</span>
                  <strong className="text-mono highlight-formula">{topic.generalFormula}</strong>
                </div>
                <div className="spec-item">
                  <span className="spec-lbl">Hibridisasi:</span>
                  <span>{topic.hybridization}</span>
                </div>
              </div>

              {/* Rangkuman Materi */}
              <p className="card-summary">{topic.summary}</p>

              {/* Poin-Poin Kunci */}
              <div className="card-keypoints">
                <span className="keypoints-label">Karakteristik Utama:</span>
                <ul className="keypoints-list">
                  {topic.keyPoints.map((point, pIdx) => (
                    <li key={pIdx}>
                      <span className="bullet-dot">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box Contoh Reaksi dengan Notasi Subskrip Presisi */}
              <div className="card-equation-box">
                <span className="eq-label">Contoh Reaksi Karakteristik:</span>
                <div className="eq-code text-mono">{topic.sampleEquation}</div>
                <small className="eq-note">{topic.equationNote}</small>
              </div>

              {/* Tombol Aksi Buka Rangkuman Mendalam */}
              <div className="card-footer">
                <button
                  type="button"
                  className="btn-open-modal"
                  onClick={() => setActiveModalTopic(topic)}
                  aria-label={`Pelajari Rangkuman Lengkap ${topic.title}`}
                >
                  <span>Pelajari Aturan & Deret</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal / Dialog Rangkuman Interaktif Modul */}
      {activeModalTopic && (
        <div 
          className="modal-overlay" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="modal-topic-title"
          onClick={() => setActiveModalTopic(null)}
        >
          <div 
            className="modal-card" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title-wrap">
                <span className="modal-badge">{activeModalTopic.badge}</span>
                <h3 id="modal-topic-title" className="modal-title">
                  Materi Lengkap: {activeModalTopic.title}
                </h3>
                <span className="modal-sub">{activeModalTopic.subtitle}</span>
              </div>
              <button 
                type="button" 
                className="btn-close-modal"
                onClick={() => setActiveModalTopic(null)}
                aria-label="Tutup Jendela Materi"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-overview-box">
                <Info size={20} className="info-icon" />
                <p>{activeModalTopic.detailModal.overview}</p>
              </div>

              {/* Tabel Aturan & Ciri */}
              <div className="modal-section">
                <h4 className="modal-sec-title">Kaidah & Tata Nama IUPAC</h4>
                <div className="modal-formulas-grid">
                  {activeModalTopic.detailModal.rules.map((item, rIdx) => (
                    <div key={rIdx} className="formula-chip">
                      <span className="formula-label">{item.label}</span>
                      <span className="formula-val">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deret Homolog Contoh */}
              <div className="modal-section">
                <h4 className="modal-sec-title">Deret Homolog</h4>
                <div className="modal-homolog-box text-mono">
                  {activeModalTopic.detailModal.homologSnippet}
                </div>
              </div>

              {/* Contoh Persamaan */}
              <div className="modal-section">
                <h4 className="modal-sec-title">Persamaan Reaksi</h4>
                <div className="modal-eq-banner text-mono">
                  {activeModalTopic.sampleEquation}
                </div>
                <p className="modal-eq-desc">{activeModalTopic.equationNote}</p>
              </div>

              {/* Tips Belajar Siswa */}
              <div className="modal-tip-box">
                <strong>💡 Tips Belajar untuk Kamu:</strong>
                <p>{activeModalTopic.detailModal.studyTip}</p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-modal-action"
                onClick={() => {
                  if (!completedModules.includes(activeModalTopic.id)) {
                    toggleModuleCompletion(activeModalTopic.id);
                  }
                  setActiveModalTopic(null);
                }}
              >
                {completedModules.includes(activeModalTopic.id)
                  ? 'Tutup Rangkuman'
                  : 'Pahami & Tandai Selesai ✓'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
