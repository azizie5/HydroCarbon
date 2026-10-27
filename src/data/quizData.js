/**
 * Bank Soal Kuis Pemahaman Hidrokarbon
 * Kategori: Alkana, Alkena, Alkuna, Isomeri, dan Tata Nama IUPAC
 */
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: "Alkana",
    question: "Manakah rumus molekul berikut yang tergolong ke dalam deret homolog alkana?",
    options: ["C₅H₁₀", "C₆H₁₄", "C₄H₆", "C₇H₁₂"],
    answerIndex: 1,
    explanation: "Rumus umum alkana adalah CnH2n+2. Untuk n = 6, jumlah H = 2(6) + 2 = 14, sehingga C₆H₁₄ (heksana) merupakan alkana."
  },
  {
    id: 2,
    category: "Isomeri",
    question: "Di antara senyawa isomer butana berikut, mengapa 2-metilpropana (isobutana) memiliki titik didih lebih rendah (-11,7 °C) dibanding n-butana (-0,5 °C)?",
    options: [
      "2-metilpropana memiliki massa molar yang jauh lebih kecil",
      "Struktur bercabang 2-metilpropana berbentuk lebih sferis sehingga memperkecil luas kontak gaya London",
      "n-butana memiliki ikatan rangkap dua tersembunyi",
      "2-metilpropana memiliki ikatan hidrogen yang kuat"
    ],
    answerIndex: 1,
    explanation: "Percabangan rantai karbon menyebabkan bentuk molekul lebih sferis (membulat), sehingga luas bidang kontak antarmolekul mengecil dan gaya tarik-menarik London melemah."
  },
  {
    id: 3,
    category: "Alkena",
    question: "Uji kimia untuk mendeteksi ketakjenuhan ikatan rangkap dua pada alkena di laboratorium biasanya menggunakan reagen...",
    options: [
      "Air kapur Ca(OH)₂ yang menjadi keruh",
      "Air bromin (Br₂) yang warna cokelat kemerahannya memudar menjadi tidak berwarna",
      "Kertas lakmus merah yang berubah menjadi biru",
      "Uji nyala bunsen warna hijau"
    ],
    answerIndex: 1,
    explanation: "Alkena bereaksi adisi dengan air bromin (Br₂). Ikatan rangkap terputus mengikat atom Br sehingga larutan cokelat Br₂ seketika menjadi jernih tak berwarna."
  },
  {
    id: 4,
    category: "Tata Nama IUPAC",
    question: "Nama IUPAC yang benar untuk senyawa dengan struktur CH₃–CH(CH₃)–CH₂–CH(CH₃)₂ adalah...",
    options: [
      "2,4-dimetilpentana",
      "2,4-dimetilbutana",
      "2,3-dimetilpentana",
      "4-metilpentana"
    ],
    answerIndex: 0,
    explanation: "Rantai terpanjang terdiri dari 5 atom karbon (pentana) dengan dua cabang metil pada atom C nomor 2 dan 4. Jadi namanya adalah 2,4-dimetilpentana."
  },
  {
    id: 5,
    category: "Alkuna",
    question: "Gas etuna (asetilena, C₂H₂) dalam kehidupan sehari-hari banyak digunakan untuk pengelasan logam karena...",
    options: [
      "Memiliki massa jenis yang lebih berat daripada udara",
      "Pembakarannya dengan oksigen murni menghasilkan suhu nyala api sangat tinggi (mencapai ~3.300 °C)",
      "Merupakan gas mulia yang tidak mudah terbakar",
      "Dapat berubah menjadi es kering pada suhu ruang"
    ],
    answerIndex: 1,
    explanation: "Nyala api oksiasetilena menghasilkan temperatur sangat tinggi hingga 3.300 °C yang cukup untuk melelehkan baja dan memotong plat besi tebal."
  },
  {
    id: 6,
    category: "Isomeri Geometri",
    question: "Manakah pasangan senyawa di bawah ini yang merupakan isomer geometri cis-trans?",
    options: [
      "1-butena dan 2-butena",
      "cis-2-butena dan trans-2-butena",
      "n-pentana dan 2-metilbutana",
      "propena dan siklopropana"
    ],
    answerIndex: 1,
    explanation: "cis-2-butena dan trans-2-butena merupakan isomer geometri (stereoisomer) yang timbul karena rotasi terbatas pada ikatan rangkap C=C."
  }
];
