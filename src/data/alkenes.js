/**
 * Data lengkap deret homolog Alkena (C2 - C10)
 * Rumus Umum: CnH2n
 * Ciri: Hidrokarbon tak jenuh, memiliki ikatan rangkap dua (C=C), geometri trigonal planar (120°), hibridisasi sp²
 */
export const ALKENE_INFO = {
  name: "Alkena",
  generalFormula: "CnH2n",
  hybridization: "sp²",
  geometry: "Trigonal Planar (120°)",
  type: "Hidrokarbon Tak Jenuh (Unsaturated Hydrocarbon)",
  description: "Alkena (disebut juga olefin) adalah hidrokarbon alifatik tak jenuh yang memiliki setidaknya satu ikatan rangkap dua karbon-karbon (C=C). Adanya ikatan pi (π) membuat alkena jauh lebih reaktif daripada alkana, terutama mudah mengalami reaksi adisi dan polimerisasi.",
  keyReactions: [
    {
      title: "Reaksi Adisi Hidrogen (Hidrogenasi)",
      equation: "CH₂=CH₂ + H₂ —(katalis Ni/Pt)→ CH₃–CH₃",
      explanation: "Pemutusan ikatan rangkap dua menjadi ikatan tunggal dengan penambahan molekul hidrogen (mengubah alkena menjadi alkana)."
    },
    {
      title: "Reaksi Adisi Halogen (Tes Ketakjenuhan)",
      equation: "CH₂=CH₂ + Br₂ (cokelat kemerahan) → CH₂Br–CH₂Br (tidak berwarna)",
      explanation: "Reaksi dengan air bromin sering digunakan sebagai uji laboratorium untuk mendeteksi ikatan rangkap karena warna cokelat Br₂ memudar seketika."
    },
    {
      title: "Reaksi Adisi Asam Halida (Kaidah Markovnikov)",
      equation: "CH₃–CH=CH₂ + HCl → CH₃–CH(Cl)–CH₃ (2-kloropropana)",
      explanation: "Menurut Aturan Markovnikov: 'Atom H dari asam halida akan terikat pada atom C ikatan rangkap yang mengikat lebih banyak atom H (yang kaya makin kaya).'"
    },
    {
      title: "Reaksi Polimerisasi Adisi",
      equation: "n (CH₂=CH₂) → [—CH₂—CH₂—]n (Polietilena)",
      explanation: "Penggabungan ribuan monomer alkena membentuk rantai makromolekul polimer plastik."
    }
  ],
  series: [
    {
      c: 2,
      name: "Etena (Etilena)",
      formula: "C₂H₄",
      condensed: "CH₂=CH₂",
      molarMass: 28.05,
      boilingPoint: -103.7,
      state: "Gas",
      stateColor: "#38bdf8",
      uses: "Hormon alami pematangan buah, bahan baku pembuatan plastik polietilena (PE).",
      structure: {
        carbons: 2,
        bonds: "double",
        formulaHtml: "C<sub>2</sub>H<sub>4</sub>"
      }
    },
    {
      c: 3,
      name: "Propena (Propilena)",
      formula: "C₃H₆",
      condensed: "CH₂=CH–CH₃",
      molarMass: 42.08,
      boilingPoint: -47.6,
      state: "Gas",
      stateColor: "#38bdf8",
      uses: "Bahan dasar plastik polipropilena (PP) untuk kemasan makanan dan wadah tahan panas.",
      structure: {
        carbons: 3,
        bonds: "double",
        formulaHtml: "C<sub>3</sub>H<sub>6</sub>"
      }
    },
    {
      c: 4,
      name: "1-Butena",
      formula: "C₄H₈",
      condensed: "CH₂=CH–CH₂–CH₃",
      molarMass: 56.11,
      boilingPoint: -6.3,
      state: "Gas",
      stateColor: "#38bdf8",
      uses: "Komonomer dalam produksi plastik LLDPE dan karet butil sintetis.",
      structure: {
        carbons: 4,
        bonds: "double",
        formulaHtml: "C<sub>4</sub>H<sub>8</sub>"
      }
    },
    {
      c: 5,
      name: "1-Pentena",
      formula: "C₅H₁₀",
      condensed: "CH₂=CH–(CH₂)₂–CH₃",
      molarMass: 70.13,
      boilingPoint: 30.0,
      state: "Cair",
      stateColor: "#10b981",
      uses: "Bahan campuran bahan bakar penerbangan dan intermediat sintesis kimia.",
      structure: {
        carbons: 5,
        bonds: "double",
        formulaHtml: "C<sub>5</sub>H<sub>10</sub>"
      }
    },
    {
      c: 6,
      name: "1-Heksena",
      formula: "C₆H₁₂",
      condensed: "CH₂=CH–(CH₂)₃–CH₃",
      molarMass: 84.16,
      boilingPoint: 63.8,
      state: "Cair",
      stateColor: "#10b981",
      uses: "Komonomer esensial pada polietilena densitas tinggi (HDPE).",
      structure: {
        carbons: 6,
        bonds: "double",
        formulaHtml: "C<sub>6</sub>H<sub>12</sub>"
      }
    },
    {
      c: 7,
      name: "1-Heptena",
      formula: "C₇H₁₄",
      condensed: "CH₂=CH–(CH₂)₄–CH₃",
      molarMass: 98.19,
      boilingPoint: 93.6,
      state: "Cair",
      stateColor: "#10b981",
      uses: "Pelarut organik dan agen aditif surfaktan.",
      structure: {
        carbons: 7,
        bonds: "double",
        formulaHtml: "C<sub>7</sub>H<sub>14</sub>"
      }
    },
    {
      c: 8,
      name: "1-Oktena",
      formula: "C₈H₁₆",
      condensed: "CH₂=CH–(CH₂)₅–CH₃",
      molarMass: 112.21,
      boilingPoint: 121.3,
      state: "Cair",
      stateColor: "#10b981",
      uses: "Sintesis linear low-density polyethylene dan pelumas sintetis.",
      structure: {
        carbons: 8,
        bonds: "double",
        formulaHtml: "C<sub>8</sub>H<sub>16</sub>"
      }
    },
    {
      c: 9,
      name: "1-Nonena",
      formula: "C₉H₁₈",
      condensed: "CH₂=CH–(CH₂)₆–CH₃",
      molarMass: 126.24,
      boilingPoint: 146.9,
      state: "Cair",
      stateColor: "#10b981",
      uses: "Bahan intermediate produksi detergen non-ionik dan surfaktan.",
      structure: {
        carbons: 9,
        bonds: "double",
        formulaHtml: "C<sub>9</sub>H<sub>18</sub>"
      }
    },
    {
      c: 10,
      name: "1-Dekena",
      formula: "C₁₀H₂₀",
      condensed: "CH₂=CH–(CH₂)₇–CH₃",
      molarMass: 140.27,
      boilingPoint: 170.6,
      state: "Cair",
      stateColor: "#10b981",
      uses: "Bahan baku oli sintetik polyalphaolefin (PAO) performa tinggi.",
      structure: {
        carbons: 10,
        bonds: "double",
        formulaHtml: "C<sub>10</sub>H<sub>20</sub>"
      }
    }
  ]
};
