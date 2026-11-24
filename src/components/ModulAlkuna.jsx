import React from 'react';
import { Flame, CheckCircle2, Circle, Sparkles, BookOpen, Layers } from 'lucide-react';

export default function ModulAlkuna({ isCompleted, onToggleComplete }) {
  const alkyneHomologs = [
    { n: 2, nama: 'etuna', rumus: 'C₂H₂', titikDidih: '-84,0 °C', kegunaan: 'Gas asetilena untuk las karbit & pemotong logam' },
    { n: 3, nama: 'propuna', rumus: 'C₃H₄', titikDidih: '-23,2 °C', kegunaan: 'Bahan bakar propelan khusus pemotong logam' },
    { n: 4, nama: '1-butuna', rumus: 'C₄H₆', titikDidih: '8,1 °C', kegunaan: 'Zat antara dalam sintesis kimia organik lanjutan' },
    { n: 5, nama: '1-pentuna', rumus: 'C₅H₈', titikDidih: '40,2 °C', kegunaan: 'Bahan perantara obat-obatan sintetis' }
  ];

  return (
    <div className="modul-detail-card">
      <div className="modul-card-header">
        <div className="modul-title-box">
          <div className="modul-icon-wrap">
            <Flame size={28} />
          </div>
          <div>
            <div className="modul-tag">Modul 3 • Hidrokarbon Tak Jenuh</div>
            <h3 className="modul-title">Alkuna (CₙH₂ₙ₋₂)</h3>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleComplete}
          className={`btn-toggle-module ${isCompleted ? 'completed' : ''}`}
          aria-label={isCompleted ? 'Tandai belum selesai' : 'Tandai alkuna selesai'}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 size={18} />
              <span>Selesai Dipelajari</span>
            </>
          ) : (
            <>
              <Circle size={18} />
              <span>Tandai Selesai</span>
            </>
          )}
        </button>
      </div>

      <p className="modul-lead">
        Alkuna adalah senyawa hidrokarbon alifatik tak jenuh yang memiliki minimal satu ikatan rangkap tiga karbon–karbon (C≡C). Ikatan rangkap tiga ini menyimpan kerapatan elektron yang sangat tinggi, terdiri dari satu ikatan sigma (σ) kuat dan dua ikatan pi (π) yang saling tegak lurus, sehingga dapat mengalami adisi dua tahap berturut-turut.
      </p>

      {/* Grid Fakta Kunci */}
      <div className="modul-stats-grid">
        <div className="stat-card">
          <span className="stat-label">Rumus Umum</span>
          <span className="stat-value text-mono">CₙH₂ₙ₋₂</span>
          <span className="stat-desc">Dua kali jumlah C dikurangi 2 (n ≥ 2)</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Jenis Ikatan</span>
          <span className="stat-value">Rangkap Tiga (C≡C)</span>
          <span className="stat-desc">1 ikatan σ kuat + 2 ikatan π tegak lurus</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Geometri Karbon</span>
          <span className="stat-value">Linear (Lurus)</span>
          <span className="stat-desc">Hibridisasi sp dengan sudut ruang 180°</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Suku Terkenal</span>
          <span className="stat-value">Asetilena</span>
          <span className="stat-desc">Nama trivial untuk etuna (C₂H₂)</span>
        </div>
      </div>

      {/* Deret Homolog */}
      <div className="modul-section-block">
        <h4 className="modul-section-title">
          <BookOpen size={18} />
          <span>Deret Homolog Alkuna (C₂ – C₅)</span>
        </h4>
        <p className="modul-note">
          Sama halnya dengan alkena, deret homolog alkuna dimulai dari <strong>n = 2</strong>. Nama IUPAC ditulis dalam huruf kecil dengan akhiran <strong>-una</strong>.
        </p>
        <div className="table-responsive">
          <table className="chem-table">
            <thead>
              <tr>
                <th>Jumlah C (n)</th>
                <th>Nama IUPAC</th>
                <th>Rumus Molekul</th>
                <th>Titik Didih</th>
                <th>Kegunaan Sehari-hari</th>
              </tr>
            </thead>
            <tbody>
              {alkyneHomologs.map((item) => (
                <tr key={item.n}>
                  <td><strong>n = {item.n}</strong></td>
                  <td><code className="chem-name-code">{item.nama}</code></td>
                  <td><span className="text-mono">{item.rumus}</span></td>
                  <td>{item.titikDidih}</td>
                  <td>{item.kegunaan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reaksi Karakteristik */}
      <div className="modul-section-block">
        <h4 className="modul-section-title">
          <Layers size={18} />
          <span>Reaksi Kimia Khas Alkuna</span>
        </h4>

        <div className="reaction-box">
          <div className="reaction-header">1. Pembakaran Nyala Oksi-Asetilena (Las Karbit)</div>
          <div className="reaction-equation text-mono">
            2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O &nbsp; (ΔH = -2.600 kJ, Sangat Eksoterm)
          </div>
          <p className="reaction-explanation">
            Pembakaran gas etuna bersama oksigen murni menghasilkan nyala api bersuhu ekstrem hingga <strong>3.300 °C</strong>. Suhu ini sanggup melelehkan dan menyambungkan pelat besi baja tebal.
          </p>
        </div>

        <div className="reaction-box" style={{ marginTop: '12px' }}>
          <div className="reaction-header">2. Adisi Bertahap Dua Kali Lipat</div>
          <div className="reaction-equation text-mono">
            CH≡CH + H₂ —(katalis)→ CH₂=CH₂ &nbsp;kemudian&nbsp; CH₂=CH₂ + H₂ → CH₃–CH₃
          </div>
          <p className="reaction-explanation">
            Karena memiliki dua ikatan pi (π), alkuna dapat mengadisi dua mol hidrogen atau halogen secara bertahap hingga seluruh ikatannya menjadi tunggal dan jenuh.
          </p>
        </div>
      </div>

      {/* Tips Belajar */}
      <div className="tip-box">
        <div className="tip-title">
          <Sparkles size={16} />
          <span>Tips Belajar untuk Kamu</span>
        </div>
        <p className="tip-content">
          Agar tidak tertukar, bandingkan rumus senyawa dengan jumlah karbon sama: etana (C₂H₆), etena (C₂H₄), dan etuna (C₂H₂). Setiap penambahan ikatan kovalen antaratom karbon akan mengurangi 2 atom hidrogen!
        </p>
      </div>
    </div>
  );
}

