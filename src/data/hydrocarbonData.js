// Data komprehensif materi, rumus, 3D molekul, dan kuis HydrocarbonEdu

export const ALKANA_DATA = {
  title: "Alkana (Hidrokarbon Jenuh)",
  formula: "C_n H_{2n+2}",
  suffix: "-ana",
  description: "Alkana merupakan senyawa hidrokarbon alifatik jenuh, yang artinya seluruh ikatan antar atom karbon merupakan ikatan kovalen tunggal (C-C). Setiap atom karbon berhibridisasi sp³ dengan sudut ikatan ideal 109,5°.",
  characteristics: [
    "Bersifat jenuh (hanya memiliki ikatan tunggal C-C dan C-H)",
    "Hibridisasi karbon: sp³ dengan geometri tetrahedral",
    "Kurang reaktif pada suhu kamar (disebut juga parafin = afinitas kecil)",
    "Titik didih meningkat seiring bertambahnya massa molekul (panjang rantai)",
    "Reaksi utama: Reaksi Substitusi (penggantian atom H) dan Pembakaran (oksidasi)"
  ],
  homologSeries: [
    { name: "Metana", formula: "CH₄", cCount: 1, boilingPoint: "-161.5°C", state: "Gas" },
    { name: "Etana", formula: "C₂H₆", cCount: 2, boilingPoint: "-88.6°C", state: "Gas" },
    { name: "Propana", formula: "C₃H₈", cCount: 3, boilingPoint: "-42.1°C", state: "Gas" },
    { name: "Butana", formula: "C₄H₁₀", cCount: 4, boilingPoint: "-0.5°C", state: "Gas" },
    { name: "Pentana", formula: "C₅H₁₂", cCount: 5, boilingPoint: "36.1°C", state: "Cair" },
    { name: "Heksana", formula: "C₆H₁₄", cCount: 6, boilingPoint: "68.7°C", state: "Cair" },
    { name: "Heptana", formula: "C₇H₁₆", cCount: 7, boilingPoint: "98.4°C", state: "Cair" },
    { name: "Oktana", formula: "C₈H₁₈", cCount: 8, boilingPoint: "125.7°C", state: "Cair" }
  ],
  iupacRules: [
    {
      step: 1,
      title: "Tentukan Rantai Induk Terpanjang",
      detail: "Cari rantai atom karbon terpanjang yang tidak terputus. Rantai ini menjadi nama dasar alkana (misal 5 karbon = pentana)."
    },
    {
      step: 2,
      title: "Penomoran Atom Karbon",
      detail: "Beri nomor pada rantai induk mulai dari ujung yang paling dekat dengan cabang (substituen/alkil) sehingga cabang mendapat nomor sekecil mungkin."
    },
    {
      step: 3,
      title: "Identifikasi Cabang (Gugus Alkil)",
      detail: "Gugus cabang dinamai dengan akhiran '-il' (misal: -CH₃ metil, -C₂H₅ etil). Jika ada cabang sejenis lebih dari satu, gunakan awalan di- (2), tri- (3), tetra- (4)."
    },
    {
      step: 4,
      title: "Penulisan Berurutan Menurut Abjad",
      detail: "Jika ada cabang berbeda (contoh: etil dan metil), tuliskan nama cabang sesuai urutan abjad latin (etil ditulis sebelum metil, awalan di-/tri- diabaikan dalam alfabetisasi)."
    }
  ],
  example: {
    name: "2,2,4-Trimetilpentana",
    commonName: "Isooktana (Bahan Standar Bilangan Oktan)",
    condensed: "CH₃-C(CH₃)₂-CH₂-CH(CH₃)-CH₃",
    breakdown: "Rantai utama 5 karbon (pentana) dengan 3 gugus metil di atom C nomor 2, 2, dan 4."
  }
};

export const ALKENA_DATA = {
  title: "Alkena (Hidrokarbon Tak Jenuh)",
  formula: "C_n H_{2n}",
  suffix: "-ena",
  description: "Alkena merupakan senyawa hidrokarbon alifatik tak jenuh yang memiliki setidaknya satu ikatan rangkap dua karbon-karbon (C=C). Atom karbon yang berikatan rangkap berhibridisasi sp² dengan bentuk trigonal planar (sudut 120°).",
  characteristics: [
    "Memiliki satu ikatan rangkap dua C=C (terdiri dari 1 ikatan σ dan 1 ikatan π)",
    "Hibridisasi karbon rangkap: sp² dengan geometri trigonal planar",
    "Lebih reaktif dibandingkan alkana karena kerapatan elektron ikatan π",
    "Reaksi karakteristik: Reaksi Adisi (pemutusan ikatan rangkap)",
    "Dapat membentuk isomer posisi dan isomer geometri (cis-trans)"
  ],
  homologSeries: [
    { name: "Etena (Etilena)", formula: "C₂H₄", cCount: 2, boilingPoint: "-103.7°C", state: "Gas" },
    { name: "Propena", formula: "C₃H₆", cCount: 3, boilingPoint: "-47.6°C", state: "Gas" },
    { name: "1-Butena", formula: "C₄H₈", cCount: 4, boilingPoint: "-6.3°C", state: "Gas" },
    { name: "1-Pentena", formula: "C₅H₁₀", cCount: 5, boilingPoint: "30.0°C", state: "Cair" },
    { name: "1-Heksena", formula: "C₆H₁₂", cCount: 6, boilingPoint: "63.4°C", state: "Cair" }
  ],
  iupacRules: [
    {
      step: 1,
      title: "Rantai Utama Wajib Memuat Ikatan Rangkap",
      detail: "Pilih rantai karbon terpanjang yang MENGANDUNG ikatan rangkap dua (C=C), meskipun ada rantai lain yang lebih panjang tanpa ikatan rangkap."
    },
    {
      step: 2,
      title: "Penomoran Memprioritaskan Ikatan Rangkap",
      detail: "Nomor rantai utama dimulai dari ujung terdekat dengan ikatan rangkap dua, bukan terdekat dengan cabang."
    },
    {
      step: 3,
      title: "Penyebutan Posisi Ikatan Rangkap",
      detail: "Tulis posisi atom karbon berikatan rangkap (nomor terendah) tepat sebelum nama rantai utama atau akhiran '-ena' (misal: but-1-ena atau 1-butena)."
    }
  ],
  example: {
    name: "3-Metil-1-butena",
    condensed: "CH₂=CH-CH(CH₃)-CH₃",
    breakdown: "Rantai induk 4 karbon dengan ikatan rangkap di C-1 dan gugus metil di C-3."
  }
};

export const ALKUNA_DATA = {
  title: "Alkuna (Ikatan Rangkap Tiga)",
  formula: "C_n H_{2n-2}",
  suffix: "-una",
  description: "Alkuna adalah senyawa hidrokarbon alifatik tak jenuh yang memiliki setidaknya satu ikatan kovalen rangkap tiga (C≡C). Atom karbon berhibridisasi sp dengan sudut ikatan 180° menghasilkan geometri molekul linear.",
  characteristics: [
    "Memiliki satu ikatan rangkap tiga C≡C (terdiri dari 1 ikatan σ dan 2 ikatan π)",
    "Hibridisasi karbon: sp dengan geometri molekul linear (180°)",
    "Sangat reaktif terhadap reaksi adisi elektrofilik",
    "Etuna (gas asetilena) digunakan luas untuk gas las karbit karena menghasilkan nyala api bersuhu >3000°C",
    "Mengalami reaksi adisi bertahap (menjadi alkena lalu alkana)"
  ],
  homologSeries: [
    { name: "Etuna (Asetilena)", formula: "C₂H₂", cCount: 2, boilingPoint: "-84.0°C", state: "Gas" },
    { name: "Propuna", formula: "C₃H₄", cCount: 3, boilingPoint: "-23.2°C", state: "Gas" },
    { name: "1-Butuna", formula: "C₄H₆", cCount: 4, boilingPoint: "8.1°C", state: "Gas" },
    { name: "1-Pentuna", formula: "C₅H₈", cCount: 5, boilingPoint: "40.2°C", state: "Cair" },
    { name: "1-Heksuna", formula: "C₆H₁₀", cCount: 6, boilingPoint: "71.3°C", state: "Cair" }
  ],
  iupacRules: [
    {
      step: 1,
      title: "Rantai Pokok Memuat Ikatan Rangkap Tiga",
      detail: "Pilih rantai karbon terpanjang yang memuat ikatan rangkap tiga C≡C, kemudian ganti akhiran '-ana' menjadi '-una'."
    },
    {
      step: 2,
      title: "Prioritas Penomoran",
      detail: "Penomoran dimulai dari ujung terdekat dengan ikatan rangkap tiga agar karbon berikatan rangkap tiga memiliki nomor terkecil."
    },
    {
      step: 3,
      title: "Format Nama",
      detail: "[Nomor Cabang]-[Nama Cabang]-[Nomor Posisi Rangkap][Nama Rantai Pokok]-una (Contoh: 4-metil-2-heksuna)."
    }
  ],
  example: {
    name: "4-Metil-2-pentuna",
    condensed: "CH₃-C≡C-CH(CH₃)-CH₃",
    breakdown: "Rantai pokok 5 karbon (pentuna) dengan ikatan rangkap tiga di C-2 dan cabang metil di C-4."
  }
};

export const ISOMER_DATA = [
  {
    id: "kerangka",
    type: "Isomer Rantai / Kerangka",
    definition: "Senyawa dengan rumus molekul sama, namun kerangka atau susunan rantai atom karbonnya berbeda (rantai lurus vs bercabang).",
    examplePair: {
      formula: "C₄H₁₀",
      compoundA: {
        name: "n-Butana",
        structure: "CH₃—CH₂—CH₂—CH₃",
        type: "Rantai Lurus",
        bp: "-0.5°C"
      },
      compoundB: {
        name: "2-Metilpropana (Isobutana)",
        structure: "CH₃—CH(CH₃)—CH₃",
        type: "Rantai Bercabang",
        bp: "-11.7°C"
      }
    },
    explanation: "Karena percabangan mengurangi luas permukaan sentuh molekul, gaya Van der Waals pada isobutana lebih lemah sehingga titik didihnya lebih rendah dari n-butana."
  },
  {
    id: "posisi",
    type: "Isomer Posisi",
    definition: "Senyawa dengan rumus molekul dan kerangka karbon yang sama, tetapi letak/posisi ikatan rangkap atau gugus fungsi berbeda.",
    examplePair: {
      formula: "C₄H₈ (Alkena)",
      compoundA: {
        name: "1-Butena",
        structure: "CH₂=CH—CH₂—CH₃",
        type: "Rangkap di C-1",
        bp: "-6.3°C"
      },
      compoundB: {
        name: "2-Butena",
        structure: "CH₃—CH=CH—CH₃",
        type: "Rangkap di C-2",
        bp: "3.7°C (trans) / 0.9°C (cis)"
      }
    },
    explanation: "Kedua senyawa memiliki 4 karbon berantai lurus, namun posisi ikatan rangkap dua berpindah dari nomor 1 ke nomor 2."
  },
  {
    id: "fungsi",
    type: "Isomer Fungsi",
    definition: "Senyawa dengan rumus molekul sama, tetapi memiliki gugus fungsi yang berbeda golongannya (contoh: alkena dengan sikloalkana).",
    examplePair: {
      formula: "C₃H₆",
      compoundA: {
        name: "Propena",
        structure: "CH₂=CH—CH₃",
        type: "Alkena (Rantai Terbuka)",
        bp: "-47.6°C"
      },
      compoundB: {
        name: "Siklopropana",
        structure: "Cincin segitiga C₃H₆",
        type: "Sikloalkana (Cincin)",
        bp: "-32.8°C"
      }
    },
    explanation: "Keduanya sama-sama memiliki rumus C₃H₆, tetapi propena memiliki ikatan rangkap alifatik sedangkan siklopropana berbentuk cincin jenuh."
  },
  {
    id: "geometri",
    type: "Isomer Geometri (Cis-Trans)",
    definition: "Isomer yang terjadi akibat keterbatasan rotasi bebas pada ikatan rangkap dua (C=C), di mana gugus substituen dapat berada pada sisi yang sama (cis) atau berlawanan (trans).",
    examplePair: {
      formula: "C₄H₈ (2-Butena)",
      compoundA: {
        name: "cis-2-Butena",
        structure: "Kedua gugus -CH₃ berada di sisi yang sama",
        type: "Bentuk CIS",
        bp: "3.7°C (Momen dipol > 0)"
      },
      compoundB: {
        name: "trans-2-Butena",
        structure: "Gugus -CH₃ berada di sisi berseberangan",
        type: "Bentuk TRANS",
        bp: "0.9°C (Momen dipol ≈ 0)"
      }
    },
    explanation: "Ikatan π mengunci rotasi atom karbon. Bentuk cis lebih polar daripada trans yang simetris, menghasilkan perbedaan sifat fisika yang terukur."
  }
];

// Data molekul untuk visualisasi 3D Three.js
// Posisi atom dalam koordinat 3D Angstrom relatif
export const MOLECULES_3D = [
  {
    id: "methane",
    name: "Metana",
    formula: "CH₄",
    category: "Alkana",
    geometry: "Tetrahedral",
    hybridization: "sp³",
    bondAngle: "109.5°",
    description: "Komponen utama gas alam (LNG/CNG). Memiliki 4 ikatan kovalen tunggal C-H identik dengan geometri tetrahedral sempurna.",
    molviewCid: "297",
    atoms: [
      { element: "C", x: 0, y: 0, z: 0 },
      { element: "H", x: 0, y: 1.09, z: 0 },
      { element: "H", x: 1.026, y: -0.363, z: 0 },
      { element: "H", x: -0.513, y: -0.363, z: 0.889 },
      { element: "H", x: -0.513, y: -0.363, z: -0.889 }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 }
    ]
  },
  {
    id: "ethane",
    name: "Etana",
    formula: "C₂H₆",
    category: "Alkana",
    geometry: "Tetrahedral di tiap C",
    hybridization: "sp³",
    bondAngle: "109.5°",
    description: "Alkana dengan rantai dua karbon. Ikatan tunggal C-C memungkinkan rotasi bebas antar gugus metil (konformasi staggered & eclipsed).",
    molviewCid: "6324",
    atoms: [
      { element: "C", x: -0.77, y: 0, z: 0 },
      { element: "C", x: 0.77, y: 0, z: 0 },
      { element: "H", x: -1.16, y: 1.02, z: 0 },
      { element: "H", x: -1.16, y: -0.51, z: 0.89 },
      { element: "H", x: -1.16, y: -0.51, z: -0.89 },
      { element: "H", x: 1.16, y: -1.02, z: 0 },
      { element: "H", x: 1.16, y: 0.51, z: 0.89 },
      { element: "H", x: 1.16, y: 0.51, z: -0.89 }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 1, to: 5, order: 1 },
      { from: 1, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 }
    ]
  },
  {
    id: "ethene",
    name: "Etena (Etilena)",
    formula: "C₂H₄",
    category: "Alkena",
    geometry: "Trigonal Planar",
    hybridization: "sp²",
    bondAngle: "120° (H-C-H 117.4°)",
    description: "Alkena paling sederhana. Memiliki ikatan rangkap dua (1 sigma + 1 pi) yang planar dan tidak dapat berotasi bebas.",
    molviewCid: "6325",
    atoms: [
      { element: "C", x: -0.67, y: 0, z: 0 },
      { element: "C", x: 0.67, y: 0, z: 0 },
      { element: "H", x: -1.23, y: 0.92, z: 0 },
      { element: "H", x: -1.23, y: -0.92, z: 0 },
      { element: "H", x: 1.23, y: 0.92, z: 0 },
      { element: "H", x: 1.23, y: -0.92, z: 0 }
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 1, to: 4, order: 1 },
      { from: 1, to: 5, order: 1 }
    ]
  },
  {
    id: "ethyne",
    name: "Etuna (Asetilena)",
    formula: "C₂H₂",
    category: "Alkuna",
    geometry: "Linear",
    hybridization: "sp",
    bondAngle: "180°",
    description: "Alkuna paling sederhana dengan ikatan rangkap tiga C≡C (1 sigma + 2 pi). Struktur seluruh molekul berada dalam satu garis lurus.",
    molviewCid: "6326",
    atoms: [
      { element: "C", x: -0.6, y: 0, z: 0 },
      { element: "C", x: 0.6, y: 0, z: 0 },
      { element: "H", x: -1.66, y: 0, z: 0 },
      { element: "H", x: 1.66, y: 0, z: 0 }
    ],
    bonds: [
      { from: 0, to: 1, order: 3 },
      { from: 0, to: 2, order: 1 },
      { from: 1, to: 3, order: 1 }
    ]
  },
  {
    id: "propane",
    name: "Propana",
    formula: "C₃H₈",
    category: "Alkana",
    geometry: "Sudut C-C-C ~112° (Tetrahedral)",
    hybridization: "sp³",
    bondAngle: "109.5°",
    description: "Bahan bakar tabung LPG cair. Rantai tiga atom karbon membentuk sudut zigzag alami khas alkana rantai terbuka.",
    molviewCid: "6334",
    atoms: [
      { element: "C", x: 0, y: 0.45, z: 0 },
      { element: "C", x: -1.25, y: -0.4, z: 0 },
      { element: "C", x: 1.25, y: -0.4, z: 0 },
      { element: "H", x: 0, y: 1.1, z: 0.88 },
      { element: "H", x: 0, y: 1.1, z: -0.88 },
      { element: "H", x: -1.25, y: -1.05, z: 0.88 },
      { element: "H", x: -1.25, y: -1.05, z: -0.88 },
      { element: "H", x: -2.15, y: 0.22, z: 0 },
      { element: "H", x: 1.25, y: -1.05, z: 0.88 },
      { element: "H", x: 1.25, y: -1.05, z: -0.88 },
      { element: "H", x: 2.15, y: 0.22, z: 0 }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 1, to: 5, order: 1 },
      { from: 1, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 2, to: 8, order: 1 },
      { from: 2, to: 9, order: 1 },
      { from: 2, to: 10, order: 1 }
    ]
  },
  {
    id: "isobutane",
    name: "2-Metilpropana (Isobutana)",
    formula: "C₄H₁₀",
    category: "Isomer Kerangka Butana",
    geometry: "Tetrahedral bercabang",
    hybridization: "sp³",
    bondAngle: "109.5°",
    description: "Isomer rantai bercabang dari n-butana. Memiliki satu atom karbon tersier yang mengikat 3 gugus metil.",
    molviewCid: "6360",
    atoms: [
      { element: "C", x: 0, y: 0, z: 0 },
      { element: "C", x: 0, y: 1.5, z: 0 },
      { element: "C", x: 1.3, y: -0.75, z: 0 },
      { element: "C", x: -1.3, y: -0.75, z: 0 },
      { element: "H", x: 0, y: 0, z: 1.09 },
      { element: "H", x: 0, y: 2.1, z: 0.88 },
      { element: "H", x: 0.88, y: 1.8, z: -0.5 },
      { element: "H", x: -0.88, y: 1.8, z: -0.5 },
      { element: "H", x: 1.3, y: -1.4, z: 0.88 },
      { element: "H", x: 2.2, y: -0.15, z: 0 },
      { element: "H", x: 1.3, y: -1.4, z: -0.88 },
      { element: "H", x: -1.3, y: -1.4, z: 0.88 },
      { element: "H", x: -2.2, y: -0.15, z: 0 },
      { element: "H", x: -1.3, y: -1.4, z: -0.88 }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 1, to: 5, order: 1 },
      { from: 1, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 2, to: 8, order: 1 },
      { from: 2, to: 9, order: 1 },
      { from: 2, to: 10, order: 1 },
      { from: 3, to: 11, order: 1 },
      { from: 3, to: 12, order: 1 },
      { from: 3, to: 13, order: 1 }
    ]
  },
  {
    id: "benzene",
    name: "Benzena",
    formula: "C₆H₆",
    category: "Aromatik",
    geometry: "Planar Heksagonal",
    hybridization: "sp²",
    bondAngle: "120°",
    description: "Cincin hidrokarbon aromatik 6 karbon dengan elektron pi terdelokalisasi secara simetris di atas dan di bawah bidang cincin.",
    molviewCid: "241",
    atoms: [
      { element: "C", x: 1.4, y: 0, z: 0 },
      { element: "C", x: 0.7, y: 1.21, z: 0 },
      { element: "C", x: -0.7, y: 1.21, z: 0 },
      { element: "C", x: -1.4, y: 0, z: 0 },
      { element: "C", x: -0.7, y: -1.21, z: 0 },
      { element: "C", x: 0.7, y: -1.21, z: 0 },
      { element: "H", x: 2.48, y: 0, z: 0 },
      { element: "H", x: 1.24, y: 2.15, z: 0 },
      { element: "H", x: -1.24, y: 2.15, z: 0 },
      { element: "H", x: -2.48, y: 0, z: 0 },
      { element: "H", x: -1.24, y: -2.15, z: 0 },
      { element: "H", x: 1.24, y: -2.15, z: 0 }
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 2 },
      { from: 3, to: 4, order: 1 },
      { from: 4, to: 5, order: 2 },
      { from: 5, to: 0, order: 1 },
      { from: 0, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 2, to: 8, order: 1 },
      { from: 3, to: 9, order: 1 },
      { from: 4, to: 10, order: 1 },
      { from: 5, to: 11, order: 1 }
    ]
  }
];

// Pertanyaan Kuis Kimia Hidrokarbon yang Edukatif & Gamified
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Manakah rumus umum yang tepat untuk senyawa hidrokarbon golongan Alkana?",
    options: [
      "CₙH₂ₙ₊₂",
      "CₙH₂ₙ",
      "CₙH₂ₙ₋₂",
      "CₙH₂ₙ₋₆"
    ],
    correctIndex: 0,
    explanation: "Rumus umum Alkana adalah CₙH₂ₙ₊₂ karena setiap atom karbon berikatan kovalen tunggal dan mengikat jumlah hidrogen maksimal (hidrokarbon jenuh). Contoh: n=3 maka C₃H₈ (Propana)."
  },
  {
    id: 2,
    question: "Senyawa etena (C₂H₄) termasuk dalam kelompok alkena. Ciri khas ikatan kovalen antar atom karbon pada alkena adalah...",
    options: [
      "Semua ikatan kovalen tunggal (C-C)",
      "Memiliki setidaknya satu ikatan rangkap dua (C=C)",
      "Memiliki ikatan rangkap tiga (C≡C)",
      "Membentuk cincin dengan elektron aromatik"
    ],
    correctIndex: 1,
    explanation: "Alkena adalah hidrokarbon alifatik tak jenuh yang dicirikan oleh adanya setidaknya satu ikatan kovalen rangkap dua (C=C), yang terdiri dari 1 ikatan sigma (σ) dan 1 ikatan pi (π)."
  },
  {
    id: 3,
    question: "Nama IUPAC yang benar untuk senyawa dengan struktur CH₃—CH(CH₃)—CH₂—CH₃ adalah...",
    options: [
      "3-Metilbutana",
      "2-Metilbutana",
      "Pentana",
      "Dimetilpropana"
    ],
    correctIndex: 1,
    explanation: "Rantai induk terpanjang terdiri dari 4 atom karbon (butana). Penomoran dimulai dari sisi kiri yang paling dekat dengan cabang metil, sehingga cabang berada di atom C nomor 2 (2-Metilbutana)."
  },
  {
    id: 4,
    question: "Berapakah sudut ikatan dan geometri ruang di sekitar atom karbon pada molekul gas metana (CH₄)?",
    options: [
      "90° dan Segiempat Datar",
      "109.5° dan Tetrahedral",
      "120° dan Trigonal Planar",
      "180° dan Linear"
    ],
    correctIndex: 1,
    explanation: "Atom karbon pada CH₄ mengalami hibridisasi sp³ dengan 4 domain elektron ikatan tunggal yang saling tolak-menolak secara seimbang, membentuk sudut 109,5° dengan bentuk tetrahedral."
  },
  {
    id: 5,
    question: "Pasangan senyawa berikut yang merupakan contoh isomer rantai/kerangka adalah...",
    options: [
      "n-Butana dan 2-Metilpropana (Isobutana)",
      "1-Butena dan 2-Butena",
      "cis-2-Butena dan trans-2-Butena",
      "Propena dan Propana"
    ],
    correctIndex: 0,
    explanation: "n-Butana dan isobutana keduanya memiliki rumus molekul sama (C₄H₁₀), tetapi berbeda kerangka rantainya: n-butana berupa rantai lurus sedangkan isobutana memiliki rantai bercabang."
  },
  {
    id: 6,
    question: "Molekul gas etuna (asetilena, C₂H₂) memiliki ikatan rangkap tiga C≡C. Hibridisasi atom karbon dan bentuk molekulnya adalah...",
    options: [
      "sp³ dan Bentuk V",
      "sp² dan Trigonal Planar",
      "sp dan Linear (180°)",
      "dsp² dan Piramida Segitiga"
    ],
    correctIndex: 2,
    explanation: "Pada ikatan rangkap tiga C≡C, atom karbon berhibridisasi sp dengan 2 domain elektron, menghasilkan geometri molekul lurus (linear) dengan sudut 180°."
  },
  {
    id: 7,
    question: "Mengapa senyawa alkena dan alkuna lebih reaktif dibandingkan dengan alkana?",
    options: [
      "Karena massa molekul relatifnya jauh lebih ringan",
      "Karena adanya ikatan pi (π) yang lebih lemah dan mudah mengalami reaksi adisi",
      "Karena atom hidrogennya bersifat sangat asam",
      "Karena memiliki titik didih yang jauh lebih tinggi"
    ],
    correctIndex: 1,
    explanation: "Ikatan rangkap pada alkena dan alkuna mengandung ikatan pi (π) dengan kerapatan awan elektron yang longgar sehingga mudah diserang oleh spesi elektrofilik melalui reaksi adisi."
  },
  {
    id: 8,
    question: "Peristiwa isomer geometri (cis-trans) dapat terjadi pada alkena karena adanya syarat utama yaitu...",
    options: [
      "Jumlah atom karbon selalu ganjil",
      "Keterbatasan rotasi bebas pada ikatan rangkap C=C dan kedua atom C mengikat dua gugus yang berbeda",
      "Senyawa harus dapat dilarutkan dalam air murni",
      "Atom hidrogen harus berikatan hidrogen kuat"
    ],
    correctIndex: 1,
    explanation: "Ikatan rangkap dua C=C terkunci dan tidak dapat berotasi bebas tanpa memutuskan ikatan pi. Jika kedua atom C rangkap mengikat dua gugus yang berbeda, timbullah bentuk cis (sepihak) atau trans (berseberangan)."
  }
];

