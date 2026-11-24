import React from 'react';
import { Atom, CheckCircle2, Circle, Flame, Sparkles, BookOpen } from 'lucide-react';

export default function ModulAlkana({ isCompleted, onToggleComplete }) {
  const homologSeries = [
    { n: 1, nama: 'metana', rumus: 'CH₄', titikDidih: '-161,5 °C', kegunaan: 'Komponen utama gas alam (LNG)' },
    { n: 2, nama: 'etana', rumus: 'C₂H₆', titikDidih: '-88,6 °C', kegunaan: 'Bahan baku industri petrokimia' },
    { n: 3, nama: 'propana', rumus: 'C₃H₈', titikDidih: '-42,1 °C', kegunaan: 'Bahan bakar gas elpiji (LPG)' },
    { n: 4, nama: 'butana', rumus: 'C₄H₁₀', titikDidih: '-0,5 °C', kegunaan: 'Bahan bakar elpiji dan korek gas' },
    { n: 5, nama: 'pentana', rumus: 'C₅H₁₂', titikDidih: '36,1 °C', kegunaan: 'Pelarut nonpolar laboratorium' },
    { n: 6, nama: 'heksana', rumus: 'C₆H₁₄', titikDidih: '68,7 °C', kegunaan: 'Ekstraksi minyak nabati' },
    { n: 7, nama: 'heptana', rumus: 'C₇H₁₆', titikDidih: '98,4 °C', kegunaan: 'Standar nilai oktan bensin (skala 0)' },
    { n: 8, nama: 'oktana', rumus: 'C₈H₁₈', titikDidih: '125,6 °C', kegunaan: 'Bahan utama bensin (isooktana)' }
  ];

  return (
    <div className="modul-detail-card">
      <div className="modul-card-header">
        <div className="modul-title-box">
          <div className="modul-icon-wrap">
            <Atom size={28} />
          </div>
          <div>
            <div className="modul-tag">Modul 1 • Hidrokarbon Jenuh</div>
            <h3 className="modul-title">Alkana (CₙH₂ₙ₊₂)</h3>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleComplete}
          className={`btn-toggle-module ${isCompleted ? 'completed' : ''}`}
          aria-label={isCompleted ? 'Tandai belum selesai' : 'Tandai alkana selesai'}
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
        Alkana adalah kelompok senyawa hidrokarbon alifatik <strong>jenuh</strong>, artinya seluruh ikatan antaratom karbon (C–C) berupa ikatan kovalen tunggal. Karena setiap atom karbon sudah mengikat atom hidrogen secara maksimal, alkana bersifat stabil dan sukar bereaksi dengan zat lain pada suhu ruang.
      </p>

      {/* Grid Fakta Kunci */}
      <div className="modul-stats-grid">
        <div className="stat-card">
          <span className="stat-label">Rumus Umum</span>
          <span className="stat-value text-mono">CₙH₂ₙ₊₂</span>
          <span className="stat-desc">Contoh: jika n=3, maka H = 2(3)+2 = 8 → C₃H₈</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Jenis Ikatan</span>
          <span className="stat-value">Tunggal (C–C)</span>
          <span className="stat-desc">Ikatan kovalen sigma (σ) kuat</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Geometri Karbon</span>
          <span className="stat-value">Tetrahedral</span>
          <span className="stat-desc">Hibridisasi sp³ dengan sudut ikatan 109,5°</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Sebutan Khusus</span>
          <span className="stat-value">Parafin</span>
          <span className="stat-desc">Dari kata 'parum affinis' (afinitas kecil)</span>
        </div>
      </div>

      {/* Deret Homolog */}
      <div className="modul-section-block">
        <h4 className="modul-section-title">
          <BookOpen size={18} />
          <span>Deret Homolog Alkana (C₁ – C₈)</span>
        </h4>
        <p className="modul-note">
          Deret homolog adalah deretan senyawa hidrokarbon yang memiliki rumus umum sama dan tiap suku berikutnya bertambah sebesar gugus <strong>–CH₂–</strong> (selisih Mr = 14). Perhatikan bahwa nama senyawa IUPAC ditulis dengan huruf kecil sesuai kaidah.
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
              {homologSeries.map((item) => (
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
          <Flame size={18} />
          <span>Reaksi Kimia Khas Alkana</span>
        </h4>
        <div className="reaction-box">
          <div className="reaction-header">1. Reaksi Pembakaran Sempurna (Oksidasi)</div>
          <div className="reaction-equation text-mono">
            CH₄ + 2O₂ → CO₂ + 2H₂O &nbsp; (ΔH &lt; 0, Eksoterm)
          </div>
          <p className="reaction-explanation">
            Alkana sangat mudah terbakar dengan gas oksigen dan melepaskan banyak kalor (panas). Karena sifat ini, senyawa alkana seperti metana, propana, dan butana menjadi bahan bakar utama rumah tangga dan kendaraan.
          </p>
        </div>

        <div className="reaction-box" style={{ marginTop: '12px' }}>
          <div className="reaction-header">2. Reaksi Substitusi (Penggantian Atom H oleh Halogen)</div>
          <div className="reaction-equation text-mono">
            CH₄ + Cl₂ —(sinar UV)→ CH₃Cl + HCl
          </div>
          <p className="reaction-explanation">
            Karena ikatannya jenuh, alkana tidak dapat mengalami adisi. Alkana hanya dapat bereaksi melalui substitusi ketika dipicu oleh sinar ultraviolet atau suhu tinggi.
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
          Ingat pola rumus alkana: kalikan jumlah atom karbon dengan 2, lalu tambahkan 2. Jika ada 5 atom karbon, jumlah hidrogennya adalah 2 × 5 + 2 = 12, menghasilkan <strong>pentana (C₅H₁₂)</strong>.
        </p>
      </div>
    </div>
  );
}

