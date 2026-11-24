import React, { useState } from 'react';
import { GitCompare, Sparkles, Layers, Info } from 'lucide-react';

export default function ModulIsomer() {
  const [selectedType, setSelectedType] = useState('rangka');

  const isomerData = {
    rangka: {
      judul: '1. Isomer Rangka / Rantai',
      deskripsi: 'Senyawa dengan rumus molekul sama, tetapi perbedaan terletak pada kerangka rantai atom karbonnya (lurus vs bercabang).',
      rumus: 'C₄H₁₀ (Butana)',
      prinsip: 'Semakin banyak cabang, molekul semakin bulat (sferis) sehingga luas permukaan kontak antarmolekul mengecil. Akibatnya, gaya van der Waals (London) melemah dan titik didihnya menjadi lebih rendah.',
      pasangan: [
        {
          nama: 'butana (n-butana)',
          struktur: 'CH₃–CH₂–CH₂–CH₃',
          bentuk: 'Rantai Lurus Silindris',
          titikDidih: '-0,5 °C',
          keterangan: 'Molekul memanjang, bidang kontak luas, titik didih lebih tinggi mendekati 0 °C.'
        },
        {
          nama: '2-metilpropana (isobutana)',
          struktur: 'CH₃–CH(CH₃)–CH₃',
          bentuk: 'Rantai Bercabang',
          titikDidih: '-11,7 °C',
          keterangan: 'Molekul lebih sferis (membulat), bidang kontak menyempit, titik didih turun tajam menjadi -11,7 °C.'
        }
      ]
    },
    posisi: {
      judul: '2. Isomer Posisi',
      deskripsi: 'Senyawa dengan rumus molekul dan kerangka karbon sama, namun posisi ikatan rangkap (atau gugus fungsi) berbeda pada rantai karbon.',
      rumus: 'C₄H₈ (Butena)',
      prinsip: 'Mulai terjadi pada alkena dan alkuna dengan jumlah atom karbon C ≥ 4.',
      pasangan: [
        {
          nama: '1-butena',
          struktur: 'CH₂=CH–CH₂–CH₃',
          bentuk: 'Ikatan Rangkap di Ujung (C-1)',
          titikDidih: '-6,3 °C',
          keterangan: 'Ikatan rangkap dua terletak antara atom karbon nomor 1 dan 2.'
        },
        {
          nama: '2-butena',
          struktur: 'CH₃–CH=CH–CH₃',
          bentuk: 'Ikatan Rangkap di Tengah (C-2)',
          titikDidih: '+0,9 °C',
          keterangan: 'Ikatan rangkap dua terletak di antara atom karbon nomor 2 dan 3, lebih simetris.'
        }
      ]
    },
    geometri: {
      judul: '3. Isomer Geometri (Cis-Trans)',
      deskripsi: 'Terjadi karena keterbatasan rotasi bebas di sekitar ikatan rangkap dua (C=C). Gugus sejenis dapat terletak pada sisi yang sama (cis) atau sisi berseberangan (trans).',
      rumus: 'C₄H₈ (2-Butena)',
      prinsip: 'Syarat mutlak: Setiap atom karbon ikatan rangkap mengikat dua gugus atom yang berbeda.',
      pasangan: [
        {
          nama: 'cis-2-butena',
          struktur: 'H₃C–CH=CH–CH₃ (Gugus –CH₃ sepihak)',
          bentuk: 'Bentuk Cis (U-Shape)',
          titikDidih: '+3,7 °C',
          keterangan: 'Kedua gugus metil (–CH₃) berada pada sisi yang sama di atas bidang ikatan rangkap. Bersifat sedikit polar.'
        },
        {
          nama: 'trans-2-butena',
          struktur: 'H₃C–CH=CH–CH₃ (Gugus –CH₃ berseberangan)',
          bentuk: 'Bentuk Trans (Diagonal)',
          titikDidih: '+0,9 °C',
          keterangan: 'Gugus metil terletak berseberangan diagonal. Momen dipol saling meniadakan sehingga molekul bersifat nonpolar.'
        }
      ]
    }
  };

  const activeCategory = isomerData[selectedType];

  return (
    <div className="modul-detail-card">
      <div className="modul-card-header">
        <div className="modul-title-box">
          <div className="modul-icon-wrap">
            <GitCompare size={28} />
          </div>
          <div>
            <div className="modul-tag">Struktur & Stereokimia</div>
            <h3 className="modul-title">Isomerisme Hidrokarbon</h3>
          </div>
        </div>
      </div>

      <p className="modul-lead">
        <strong>Isomer</strong> adalah kumpulan senyawa yang memiliki <em>rumus molekul sama persis</em>, namun susunan ikatan atom atau orientasi ruangnya berbeda. Perbedaan struktur ini menghasilkan sifat fisik (seperti titik didih) dan sifat kimia yang berbeda nyata.
      </p>

      {/* Selector Kategori Isomer */}
      <div className="isomer-type-nav">
        <button
          type="button"
          onClick={() => setSelectedType('rangka')}
          className={`btn-isomer-type ${selectedType === 'rangka' ? 'active' : ''}`}
        >
          Isomer Rangka (Alkana)
        </button>
        <button
          type="button"
          onClick={() => setSelectedType('posisi')}
          className={`btn-isomer-type ${selectedType === 'posisi' ? 'active' : ''}`}
        >
          Isomer Posisi (Alkena & Alkuna)
        </button>
        <button
          type="button"
          onClick={() => setSelectedType('geometri')}
          className={`btn-isomer-type ${selectedType === 'geometri' ? 'active' : ''}`}
        >
          Isomer Geometri (Cis-Trans)
        </button>
      </div>

      {/* Komparasi Interaktif Dua Isomer */}
      <div className="isomer-compare-box">
        <div className="compare-header">
          <div>
            <h4 className="compare-title">{activeCategory.judul}</h4>
            <p className="compare-desc">{activeCategory.deskripsi}</p>
          </div>
          <div className="formula-badge">
            Rumus Molekul: <span className="text-mono"><strong>{activeCategory.rumus}</strong></span>
          </div>
        </div>

        <div className="compare-grid">
          {activeCategory.pasangan.map((item, idx) => (
            <div key={idx} className="compare-card">
              <div className="compare-card-badge">Bentuk {idx + 1}: {item.bentuk}</div>
              <h5 className="compare-name text-mono">{item.nama}</h5>
              <div className="compare-formula text-mono">{item.struktur}</div>
              <div className="compare-stat">
                <span className="stat-bp-label">Titik Didih:</span>
                <span className="stat-bp-val">{item.titikDidih}</span>
              </div>
              <p className="compare-note">{item.keterangan}</p>
            </div>
          ))}
        </div>

        {/* Kotak Prinsip Kimiawi */}
        <div className="isomer-principle-box">
          <Info size={18} />
          <div>
            <strong>Prinsip Penting: </strong>
            <span>{activeCategory.prinsip}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

