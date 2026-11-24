import React, { useState } from 'react';
import { BookOpenCheck, CheckCircle2, AlertCircle, ChevronRight, Sparkles } from 'lucide-react';

export default function ModulIupac() {
  const [activeStep, setActiveStep] = useState(0);
  const [quizState, setQuizState] = useState({
    answered: false,
    selected: null,
    isCorrect: false
  });

  const iupacSteps = [
    {
      no: 1,
      judul: 'Tentukan Rantai Utama (Induk Terpanjang)',
      deskripsi: 'Cari rantai karbon tak terputus terpanjang. Pada alkena dan alkuna, rantai induk WAJIB mengikutsertakan ikatan rangkap dua (C=C) atau rangkap tiga (C≡C) meskipun bukan rantai terpanjang.',
      contoh: 'Rantai 5 karbon ikatan tunggal = pentana. Rantai 4 karbon berikatan rangkap dua = butena.',
      perhatian: 'Rantai terpanjang tidak harus digambar lurus mendatar, bisa berbelok ke atas atau ke bawah!'
    },
    {
      no: 2,
      judul: 'Beri Nomor Atom Karbon',
      deskripsi: 'Penomoran rantai dimulai dari ujung yang memberikan nomor sekecil mungkin:\n• Pada alkana: mulai dari ujung terdekat dengan cabang alkil pertama.\n• Pada alkena & alkuna: mulai dari ujung terdekat dengan IKATAN RANGKAP (ikatan rangkap lebih diprioritaskan daripada cabang).',
      contoh: 'CH₃–CH₂–CH=CH₂ diberi nomor dari kanan (C-1 adalah =CH₂), sehingga namanya 1-butena, bukan 3-butena.',
      perhatian: 'Prioritas nomor terkecil: Ikatan Rangkap > Cabang Alkil.'
    },
    {
      no: 3,
      judul: 'Identifikasi dan Beri Nama Cabang Alkil',
      deskripsi: 'Gugus atom yang berada di luar rantai utama disebut cabang alkil (rumus CₙH₂ₙ₊₁ berakhiran -il):',
      contoh: '–CH₃ (metil), –CH₂–CH₃ atau –C₂H₅ (etil), –CH(CH₃)₂ (isopropil). Jika ada cabang sama lebih dari satu, gunakan awalan di- (2), tri- (3), tetra- (4).',
      perhatian: 'Awalan di-, tri-, tidak dihitung dalam urutan abjad penulisan cabang (kecuali isopropil).'
    },
    {
      no: 4,
      judul: 'Tuliskan Nama Sesuai Kaidah Baku IUPAC',
      deskripsi: 'Urutan penulisan nama lengkap:\n[nomor cabang]-[nama cabang][nomor posisi ikatan rangkap]-[nama rantai induk]. Sesuai kaidah, nama ditulis dengan huruf kecil.',
      contoh: '2-metilbutana, 3-metil-1-butena, 4,4-dimetil-2-pentuna.',
      perhatian: 'Gunakan tanda hubung (-) antara angka dan huruf, serta tanda koma (,) antara dua angka.'
    }
  ];

  const practiceExample = {
    struktur: 'CH₃ – CH(CH₃) – CH₂ – CH₃',
    soal: 'Bagaimanakah nama IUPAC resmi untuk struktur senyawa di atas?',
    opsi: [
      { id: 'A', teks: 'pentana', benar: false, alasan: 'Salah. Pentana adalah rantai lurus 5 karbon, sedangkan senyawa ini memiliki 4 karbon utama dan 1 cabang metil.' },
      { id: 'B', teks: '2-metilbutana', benar: true, alasan: 'Tepat sekali! Rantai induk terpanjang memiliki 4 atom C (butana). Penomoran dimulai dari kiri agar cabang metil (–CH₃) mendapat nomor terkecil, yaitu di atom C nomor 2.' },
      { id: 'C', teks: '3-metilbutana', benar: false, alasan: 'Kurang tepat. Penomoran harus dimulai dari ujung terdekat cabang. Jika dinomori dari kiri, cabang berada di C-2 (lebih kecil daripada C-3).' },
      { id: 'D', teks: 'isopropiletana', benar: false, alasan: 'Bukan penamaan IUPAC sistematis. IUPAC menggunakan rantai utama terpanjang sebagai induk.' }
    ]
  };

  const handleSelectAnswer = (opsi) => {
    setQuizState({
      answered: true,
      selected: opsi.id,
      isCorrect: opsi.benar
    });
  };

  return (
    <div className="modul-detail-card">
      <div className="modul-card-header">
        <div className="modul-title-box">
          <div className="modul-icon-wrap">
            <BookOpenCheck size={28} />
          </div>
          <div>
            <div className="modul-tag">Panduan Sistematis</div>
            <h3 className="modul-title">Tata Nama IUPAC Hidrokarbon</h3>
          </div>
        </div>
      </div>

      <p className="modul-lead">
        IUPAC (<em>International Union of Pure and Applied Chemistry</em>) menetapkan aturan penamaan internasional agar setiap senyawa kimia di seluruh dunia memiliki nama baku yang unik. Sesuai aturan, nama senyawa hidrokarbon ditulis dengan <strong>huruf kecil</strong>.
      </p>

      {/* Navigasi Langkah Aturan */}
      <div className="iupac-stepper">
        {iupacSteps.map((step, idx) => (
          <button
            key={step.no}
            type="button"
            onClick={() => setActiveStep(idx)}
            className={`iupac-step-btn ${activeStep === idx ? 'active' : ''}`}
          >
            <span className="step-num">{step.no}</span>
            <span className="step-label">Langkah {step.no}</span>
          </button>
        ))}
      </div>

      {/* Kartu Langkah Aktif */}
      <div className="iupac-step-card">
        <div className="step-card-header">
          <span className="step-card-badge">Langkah ke-{iupacSteps[activeStep].no}</span>
          <h4 className="step-card-title">{iupacSteps[activeStep].judul}</h4>
        </div>
        <p className="step-card-desc">{iupacSteps[activeStep].deskripsi}</p>

        <div className="step-example-box">
          <div className="example-label">Contoh Penerapan:</div>
          <div className="example-text">{iupacSteps[activeStep].contoh}</div>
        </div>

        <div className="step-warning-box">
          <AlertCircle size={18} />
          <span><strong>Perhatian:</strong> {iupacSteps[activeStep].perhatian}</span>
        </div>
      </div>

      {/* Latihan Interaktif Mini */}
      <div className="modul-section-block" style={{ marginTop: '28px' }}>
        <h4 className="modul-section-title">
          <Sparkles size={18} />
          <span>Uji Pemahaman Cepat Tata Nama untuk Kamu</span>
        </h4>
        <div className="practice-box">
          <div className="practice-formula text-mono">
            {practiceExample.struktur}
          </div>
          <p className="practice-question">{practiceExample.soal}</p>

          <div className="practice-options">
            {practiceExample.opsi.map((opsi) => {
              const isSelected = quizState.selected === opsi.id;
              let btnClass = 'practice-opt-btn';
              if (quizState.answered) {
                if (opsi.benar) btnClass += ' opt-correct';
                else if (isSelected && !opsi.benar) btnClass += ' opt-incorrect';
              } else if (isSelected) {
                btnClass += ' opt-selected';
              }

              return (
                <button
                  key={opsi.id}
                  type="button"
                  onClick={() => handleSelectAnswer(opsi)}
                  className={btnClass}
                >
                  <span className="opt-letter">{opsi.id}.</span>
                  <span className="opt-text text-mono">{opsi.teks}</span>
                </button>
              );
            })}
          </div>

          {quizState.answered && (
            <div className={`practice-feedback ${quizState.isCorrect ? 'correct-feed' : 'incorrect-feed'}`}>
              <div className="feed-title">
                {quizState.isCorrect ? (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Jawaban Kamu Benar!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={18} />
                    <span>Jawaban Kamu Kurang Tepat</span>
                  </>
                )}
              </div>
              <p className="feed-text">
                {practiceExample.opsi.find((o) => o.id === quizState.selected)?.alasan}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

