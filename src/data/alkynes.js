/**
 * Data lengkap deret homolog Alkuna (C2 - C10)
 * Rumus Umum: CnH2n-2
 * Ciri: Hidrokarbon tak jenuh, memiliki ikatan rangkap tiga (C≡C), geometri linear (180°), hibridisasi sp
 */
export const ALKYNE_INFO = {
  name: "Alkuna",
  generalFormula: "CnH2n-2",
  hybridization: "sp",
  geometry: "Linear (180°)",
  type: "Hidrokarbon Tak Jenuh (Unsaturated Hydrocarbon)",
  description: "Alkuna adalah hidrokarbon alifatik tak jenuh yang memiliki sekurang-kurangnya satu ikatan rangkap tiga karbon-karbon (–C≡C–). Ikatan rangkap tiga terdiri dari satu ikatan sigma (σ) dan dua ikatan pi (π) yang tegak lurus satu sama lain, menjadikannya sangat kaya elektron dan sangat reaktif.",
  keyReactions: [
    {
      title: "Sintesis Gas Asetilena (Reaksi Karbit)",
      equation: "CaC₂ (Kalsium Karbida) + 2H₂O → C₂H₂ (Etuna) + Ca(OH)₂",
      explanation: "Reaksi pembuatan gas etuna di laboratorium atau industri las karbit dengan meneteskan air ke batu karbit."
    },
    {
      title: "Reaksi Adisi Bertahap (Dua Tahap)",
      equation: "CH≡CH + H₂ → CH₂=CH₂ (Etena) + H₂ → CH₃–CH₃ (Etana)",
      explanation: "Karena memiliki 2 ikatan pi, alkuna dapat mengadisi dua mol pereaksi (seperti H₂ atau X₂) secara bertahap hingga menjadi alkana jenuh."
    },
    {
      title: "Sifat Asam Alkuna Terminal",
      equation: "R–C≡C–H + NaNH₂ → R–C≡C⁻ Na⁺ + NH₃",
      explanation: "Atom hidrogen yang terikat langsung pada karbon sp berikatan rangkap tiga bersifat asam lemah (pKa ~ 25) dan dapat dilepaskan oleh basa kuat membentuk ion asetilida."
    },
    {
      title: "Nyala Api Oksiasetilena (Pengelasan)",
      equation: "2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O (Suhu api hingga 3.300 °C)",
      explanation: "Pembakaran etuna murni dalam oksigen murni menghasilkan suhu ekstrem yang mampu melelehkan baja dan logam tebal."
    }
  ],
  series: [
    {
      c: 2,
      name: "Etuna (Asetilena)",
      formula: "C₂H₂",
      condensed: "CH≡CH",
      molarMass: 26.04,
      boilingPoint: -84.0,
      state: "Gas",
      stateColor: "#38bdf8",
      uses: "Gas pengelasan logam (las karbit), pemotongan baja, bahan baku sintesis PVC.",
      structure: {
        carbons: 2,
        bonds: "triple",
        formulaHtml: "C<sub>2</sub>H<sub>2</sub>"
      }
    },
    {
      c: 3,
      name: "Propuna (Metilasetilena)",
      formula: "C₃H₄",
      condensed: "CH≡C–CH₃",
      molarMass: 40.06,
      boilingPoint: -23.2,
      state: "Gas",
      stateColor: "#38bdf8",
      uses: "Campuran gas MAPP untuk pekerjaan pematrian dan pengelasan suhu tinggi.",
      structure: {
        carbons: 3,
        bonds: "triple",
        formulaHtml: "C<sub>3</sub>H<sub>4</sub>"
      }
    },
    {
      c: 4,
      name: "1-Butuna",
      formula: "C₄H₆",
      condensed: "CH≡C–CH₂–CH₃",
      molarMass: 54.09,
      boilingPoint: 8.1,
      state: "Gas",
      stateColor: "#38bdf8",
      uses: "Intermediat sintesis kimia organik dan produksi alkilena.",
      structure: {
        carbons: 4,
        bonds: "triple",
        formulaHtml: "C<sub>4</sub>H<sub>6</sub>"
      }
    },
    {
      c: 5,
      name: "1-Pentuna",
      formula: "C₅H₈",
      condensed: "CH≡C–(CH₂)₂–CH₃",
      molarMass: 68.12,
      boilingPoint: 40.2,
      state: "Cair",
      stateColor: "#10b981",
      uses: "Reagen sintesis stereospesifik dalam riset kimia obat / farmasi.",
      structure: {
        carbons: 5,
        bonds: "triple",
        formulaHtml: "C<sub>5</sub>H<sub>8</sub>"
      }
    },
    {
      c: 6,
      name: "1-Heksuna",
      formula: "C₆H₁₀",
      condensed: "CH≡C–(CH₂)₃–CH₃",
      molarMass: 82.14,
      boilingPoint: 71.3,
      state: "Cair",
      stateColor: "#10b981",
      uses: "Blok pembangun kimia sintesis untuk senyawa siklik.",
      structure: {
        carbons: 6,
        bonds: "triple",
        formulaHtml: "C<sub>6</sub>H<sub>10</sub>"
      }
    },
    {
      c: 7,
      name: "1-Heptuna",
      formula: "C₇H₁₂",
      condensed: "CH≡C–(CH₂)₄–CH₃",
      molarMass: 96.17,
      boilingPoint: 99.7,
      state: "Cair",
      stateColor: "#10b981",
      uses: "Senyawa intermediat untuk wewangian dan feromon sintetis.",
      structure: {
        carbons: 7,
        bonds: "triple",
        formulaHtml: "C<sub>7</sub>H<sub>12</sub>"
      }
    },
    {
      c: 8,
      name: "1-Oktuna",
      formula: "C₈H₁₄",
      condensed: "CH≡C–(CH₂)₅–CH₃",
      molarMass: 110.20,
      boilingPoint: 126.3,
      state: "Cair",
      stateColor: "#10b981",
      uses: "Reagen dalam reaksi coupling Sonogashira.",
      structure: {
        carbons: 8,
        bonds: "triple",
        formulaHtml: "C<sub>8</sub>H<sub>14</sub>"
      }
    },
    {
      c: 9,
      name: "1-Nonuna",
      formula: "C₉H₁₆",
      condensed: "CH≡C–(CH₂)₆–CH₃",
      molarMass: 124.22,
      boilingPoint: 150.8,
      state: "Cair",
      stateColor: "#10b981",
      uses: "Sintesis senyawa bioaktif dan riset polimer konduktif.",
      structure: {
        carbons: 9,
        bonds: "triple",
        formulaHtml: "C<sub>9</sub>H<sub>16</sub>"
      }
    },
    {
      c: 10,
      name: "1-Dekuna",
      formula: "C₁₀H₁₈",
      condensed: "CH≡C–(CH₂)₇–CH₃",
      molarMass: 138.25,
      boilingPoint: 174.0,
      state: "Cair",
      stateColor: "#10b981",
      uses: "Bahan kajian membran biokimia dan monolayer organik.",
      structure: {
        carbons: 10,
        bonds: "triple",
        formulaHtml: "C<sub>10</sub>H<sub>18</sub>"
      }
    }
  ]
};
