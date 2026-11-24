import React from 'react';
import { Zap, CheckCircle2, Circle, Sparkles, BookOpen, FlaskConical } from 'lucide-react';

export default function ModulAlkena({ isCompleted, onToggleComplete }) {
  const alkeneHomologs = [
    { n: 2, nama: 'etena', rumus: 'C₂H₄', titikDidih: '-103,7 °C', kegunaan: 'Gas pematangan buah & bahan baku plastik polietilena' },
    { n: 3, nama: 'propena', rumus: 'C₃H₆', titikDidih: '-47,6 °C', kegunaan: 'Bahan pembuat serat sintetis & botol polipropilena' },
    { n: 4, nama: '1-butena', rumus: 'C₄H₈', titikDidih: '-6,3 °C', kegunaan: 'Kopolimer pada produksi karet sintesis' },
    { n: 5, nama: '1-pentena', rumus: 'C₅H₁₀', titikDidih: '30,0 °C', kegunaan: 'Zat aditif bahan bakar dan pelarut' },
    { n: 6, nama: '1-heksena', rumus: 'C₆H₁₂', titikDidih: '63,5 °C', kegunaan: 'Bahan baku pembuatan surfaktan dan deterjen' }
  ];

  return (
    <div className="modul-detail-card">
      <div className="modul-card-header">
        <div className="modul-title-box">
          <div className="modul-icon-wrap">
            <Zap size={28} />
          </div>
          <div>
            <div className="modul-tag">Modul 2 • Hidrokarbon Tak Jenuh</div>
            <h3 className="modul-title">Alkena (CₙH₂ₙ)</h3>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleComplete}
          className={`btn-toggle-module ${isCompleted ? 'completed' : ''}`}
          aria-label={isCompleted ? 'Tandai belum selesai' : 'Tandai alkena selesai'}
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
        Alkena adalah senyawa hidrokarbon alifatik <strong>tak jenuh</strong> yang memiliki minimal satu ikatan rangkap dua karbon–karbon (C=C). Adanya ikatan rangkap dua ini membuat alkena jauh lebih reaktif dibandingkan alkana, karena ikatan pi (π) pada ikatan rangkap mudah diputus untuk mengikat atom baru.
      </p>

      {/* Grid Fakta Kunci */}
      <div className="modul-stats-grid">
        <div className="stat-card">
          <span className="stat-label">Rumus Umum</span>
          <span className="stat-value text-mono">CₙH₂ₙ</span>
          <span className="stat-desc">Jumlah H tepat dua kali lipat jumlah C (n ≥ 2)</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Jenis Ikatan</span>
          <span className="stat-value">Rangkap Dua (C=C)</span>
          <span className="stat-desc">Terdiri dari 1 ikatan σ kuat dan 1 ikatan π reaktif</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Geometri Karbon</span>
          <span className="stat-value">Trigonal Planar</span>
          <span className="stat-desc">Hibridisasi sp² dengan sudut bidang 120°</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Sebutan Khusus</span>
          <span className="stat-value">Olefin</span>
          <span className="stat-desc">Dari 'olefiant gas' (pembentuk minyak saat dihalogenasi)</span>
        </div>
      </div>

      {/* Deret Homolog */}
      <div className="modul-section-block">
        <h4 className="modul-section-title">
          <BookOpen size={18} />
          <span>Deret Homolog Alkena (C₂ – C₆)</span>
        </h4>
        <p className="modul-note">
          Deret alkena dimulai dari <strong>n = 2</strong> karena diperlukan setidaknya 2 atom karbon untuk membentuk ikatan rangkap dua. Oleh karena itu, <em>tidak ada senyawa metena</em>. Perhatikan penulisan nama IUPAC menggunakan huruf kecil dengan akhiran <strong>-ena</strong>.
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
              {alkeneHomologs.map((item) => (
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
          <FlaskConical size={18} />
          <span>Reaksi Karakteristik: Adisi (Penjenuhan)</span>
        </h4>

        <div className="reaction-box">
          <div className="reaction-header">1. Reaksi Adisi Hidrogen (Hidrogenasi)</div>
          <div className="reaction-equation text-mono">
            CH₂=CH₂ + H₂ —(katalis Ni / Pt)→ CH₃–CH₃ &nbsp; (ΔH &lt; 0)
          </div>
          <p className="reaction-explanation">
            Ikatan rangkap dua C=C terbuka dan mengikat dua atom hidrogen tambahan, mengubah <strong>etena</strong> (tak jenuh) menjadi <strong>etana</strong> (jenuh). Reaksi ini diterapkan dalam industri pembuatan margarin dari minyak nabati.
          </p>
        </div>

        <div className="reaction-box" style={{ marginTop: '12px' }}>
          <div className="reaction-header">2. Uji Bromin Uji Ketakjenuhan di Laboratorium</div>
          <div className="reaction-equation text-mono">
            CH₂=CH₂ + Br₂ (cokelat kemerahan) → CH₂Br–CH₂Br (larutan tidak berwarna)
          </div>
          <p className="reaction-explanation">
            Ketika gas alkena dialirkan ke dalam air bromin berwarna cokelat, ikatan rangkap segera bereaksi dengan Br₂. Warna cokelat seketika memudar menjadi jernih. Reaksi ini digunakan untuk membuktikan keberadaan ikatan rangkap secara kualitatif.
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
          Bila menemukan nama senyawa berakhiran <strong>-ena</strong>, pastikan kamu selalu mencantumkan nomor letak ikatan rangkapnya bila rantai memiliki 4 atom karbon atau lebih, contohnya <strong>1-butena</strong> atau <strong>2-butena</strong>.
        </p>
      </div>
    </div>
  );
}

