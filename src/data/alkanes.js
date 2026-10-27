/**
 * Data lengkap deret homolog Alkana (C1 - C10)
 * Rumus Umum: CnH2n+2
 * Ciri: Hidrokarbon jenuh, ikatan kovalen tunggal (C-C), geometri tetrahedral (109.5°)
 */
export const ALKANE_INFO = {
  name: "Alkana",
  generalFormula: "CnH2n+2",
  hybridization: "sp³",
  geometry: "Tetrahedral (109,5°)",
  type: "Hidrokarbon Jenuh (Saturated Hydrocarbon)",
  description: "Alkana adalah hidrokarbon alifatik jenuh dengan rumus umum CnH2n+2, di mana semua ikatan antar atom karbon berupa ikatan tunggal (C–C). Alkana bersifat relatif tidak reaktif (parafin = sedikit daya gabung), namun mudah mengalami reaksi pembakaran dan substitusi.",
  keyReactions: [
    {
      title: "Reaksi Pembakaran Sempurna",
      equation: "CH₄ + 2O₂ → CO₂ + 2H₂O + Energi (Kalor)",
      explanation: "Pembakaran sempurna alkana menghasilkan karbon dioksida dan uap air disertai pelepasan energi kalor yang besar (eksoterm)."
    },
    {
      title: "Reaksi Pembakaran Tidak Sempurna",
      equation: "2CH₄ + 3O₂ → 2CO + 4H₂O (atau pembentukan jelaga C)",
      explanation: "Terjadi saat pasokan oksigen terbatas, menghasilkan gas karbon monoksida (CO) beracun atau partikel jelaga karbon (C)."
    },
    {
      title: "Reaksi Substitusi (Halogenasi)",
      equation: "CH₄ + Cl₂ —(sinar UV)→ CH₃Cl + HCl",
      explanation: "Penggantian satu atau lebih atom hidrogen oleh atom halogen dengan bantuan sinar ultraviolet atau suhu tinggi."
    }
  ],
  series: [
    {
      c: 1,
      name: "Metana",
      formula: "CH₄",
      condensed: "CH₄",
      molarMass: 16.04,
      boilingPoint: -161.5,
      meltingPoint: -182.5,
      state: "Gas",
      stateColor: "#38bdf8",
      uses: "Komponen utama gas alam (LNG/CNG), bahan bakar kompor gas, pembangkit listrik.",
      structure: {
        carbons: 1,
        bonds: "single",
        formulaHtml: "CH<sub>4</sub>"
      }
    },
    {
      c: 2,
      name: "Etana",
      formula: "C₂H₆",
      condensed: "CH₃–CH₃",
      molarMass: 30.07,
      boilingPoint: -88.6,
      meltingPoint: -182.8,
      state: "Gas",
      stateColor: "#38bdf8",
      uses: "Bahan baku petrokimia untuk memproduksi etilena (plastik).",
      structure: {
        carbons: 2,
        bonds: "single",
        formulaHtml: "C<sub>2</sub>H<sub>6</sub>"
      }
    },
    {
      c: 3,
      name: "Propana",
      formula: "C₃H₈",
      condensed: "CH₃–CH₂–CH₃",
      molarMass: 44.1,
      boilingPoint: -42.1,
      meltingPoint: -187.7,
      state: "Gas",
      stateColor: "#38bdf8",
      uses: "Komponen utama gas elpiji (LPG) untuk memasak dan pemanas rumah tangga.",
      structure: {
        carbons: 3,
        bonds: "single",
        formulaHtml: "C<sub>3</sub>H<sub>8</sub>"
      }
    },
    {
      c: 4,
      name: "Butana",
      formula: "C₄H₁₀",
      condensed: "CH₃–CH₂–CH₂–CH₃",
      molarMass: 58.12,
      boilingPoint: -0.5,
      meltingPoint: -138.4,
      state: "Gas",
      stateColor: "#38bdf8",
      uses: "Bahan bakar pemantik korek api gas, campuran tabung gas portabel camping.",
      structure: {
        carbons: 4,
        bonds: "single",
        formulaHtml: "C<sub>4</sub>H<sub>10</sub>"
      }
    },
    {
      c: 5,
      name: "Pentana",
      formula: "C₅H₁₂",
      condensed: "CH₃–(CH₂)₃–CH₃",
      molarMass: 72.15,
      boilingPoint: 36.1,
      meltingPoint: -129.8,
      state: "Cair",
      stateColor: "#10b981",
      uses: "Pelarut non-polar di laboratorium kimia dan industri polistirena.",
      structure: {
        carbons: 5,
        bonds: "single",
        formulaHtml: "C<sub>5</sub>H<sub>12</sub>"
      }
    },
    {
      c: 6,
      name: "Heksana",
      formula: "C₆H₁₄",
      condensed: "CH₃–(CH₂)₄–CH₃",
      molarMass: 86.18,
      boilingPoint: 68.7,
      meltingPoint: -95.3,
      state: "Cair",
      stateColor: "#10b981",
      uses: "Pelarut ekstraksi minyak nabati (seperti kedelai) dan lem industri.",
      structure: {
        carbons: 6,
        bonds: "single",
        formulaHtml: "C<sub>6</sub>H<sub>14</sub>"
      }
    },
    {
      c: 7,
      name: "Heptana",
      formula: "C₇H₁₆",
      condensed: "CH₃–(CH₂)₅–CH₃",
      molarMass: 100.21,
      boilingPoint: 98.4,
      meltingPoint: -90.6,
      state: "Cair",
      stateColor: "#10b981",
      uses: "Standar nol (0) pada penentuan angka oktan bahan bakar mesin bensin.",
      structure: {
        carbons: 7,
        bonds: "single",
        formulaHtml: "C<sub>7</sub>H<sub>16</sub>"
      }
    },
    {
      c: 8,
      name: "Oktana",
      formula: "C₈H₁₈",
      condensed: "CH₃–(CH₂)₆–CH₃",
      molarMass: 114.23,
      boilingPoint: 125.7,
      meltingPoint: -56.8,
      state: "Cair",
      stateColor: "#10b981",
      uses: "Komponen utama bensin; senyawa isooktana dipakai sebagai standar 100 nilai oktan.",
      structure: {
        carbons: 8,
        bonds: "single",
        formulaHtml: "C<sub>8</sub>H<sub>18</sub>"
      }
    },
    {
      c: 9,
      name: "Nonana",
      formula: "C₉H₂₀",
      condensed: "CH₃–(CH₂)₇–CH₃",
      molarMass: 128.26,
      boilingPoint: 150.8,
      meltingPoint: -53.5,
      state: "Cair",
      stateColor: "#10b981",
      uses: "Fraksi kerosin (minyak tanah) dan bahan bakar jet.",
      structure: {
        carbons: 9,
        bonds: "single",
        formulaHtml: "C<sub>9</sub>H<sub>20</sub>"
      }
    },
    {
      c: 10,
      name: "Dekana",
      formula: "C₁₀H₂₂",
      condensed: "CH₃–(CH₂)₈–CH₃",
      molarMass: 142.29,
      boilingPoint: 174.1,
      meltingPoint: -29.7,
      state: "Cair",
      stateColor: "#10b981",
      uses: "Komponen bahan bakar solar (diesel) dan minyak pemanas.",
      structure: {
        carbons: 10,
        bonds: "single",
        formulaHtml: "C<sub>10</sub>H<sub>22</sub>"
      }
    }
  ]
};
