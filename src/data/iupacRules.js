/**
 * Panduan Lengkap Tata Nama Senyawa Hidrokarbon menurut IUPAC
 * Dilengkapi dengan 5 Aturan Emas dan Latihan Interaktif
 */
export const IUPAC_DATA = {
  title: "Aturan Resmi Tata Nama IUPAC (International Union of Pure and Applied Chemistry)",
  subtitle: "Sistem penamaan sistematis internasional agar setiap senyawa hidrokarbon memiliki nama unik di seluruh dunia.",
  
  goldenRules: [
    {
      step: 1,
      name: "Tentukan Rantai Utama / Induk",
      badge: "Langkah 1",
      detail: "Cari rantai atom karbon kontinu TERPANJANG. Untuk alkena dan alkuna, rantai utama WAJIB mengikutsertakan ikatan rangkap (C=C atau C≡C) meskipun bukan merupakan rantai karbon paling panjang.",
      example: "Rantai 5 karbon = Pentana; Rantai 6 karbon berikatan rangkap dua = Heksena.",
      tip: "Hati-hati: Rantai karbon terpanjang tidak selalu tergambar lurus mendatar, bisa berkelok ke atas atau ke bawah!"
    },
    {
      step: 2,
      name: "Beri Nomor Atom Karbon Rantai Utama",
      badge: "Langkah 2",
      detail: "Penomoran dimulai dari ujung rantai yang memberikan nomor serendah mungkin:\n• Untuk ALKANA: dimulai dari ujung yang paling dekat dengan cabang alkil pertama.\n• Untuk ALKENA & ALKUNA: dimulai dari ujung yang paling dekat dengan IKATAN RANGKAP (ikatan rangkap lebih diprioritaskan daripada cabang).",
      example: "Jika cabang ada di atom C nomor 2 dari kiri dan C nomor 3 dari kanan, maka beri nomor dari kiri.",
      tip: "Prioritas nomor terendah: Ikatan rangkap > Cabang alkil."
    },
    {
      step: 3,
      name: "Identifikasi & Beri Nama Cabang Alkil",
      badge: "Langkah 3",
      detail: "Atom karbon di luar rantai utama disebut cabang alkil (rumus CnH2n+1).",
      alkylTable: [
        { formula: "–CH₃", name: "Metil", origin: "Dari metana kehilangan 1H" },
        { formula: "–CH₂–CH₃ (–C₂H₅)", name: "Etil", origin: "Dari etana kehilangan 1H" },
        { formula: "–CH₂–CH₂–CH₃", name: "Propil (n-propil)", origin: "Dari propana rantai lurus" },
        { formula: "–CH(CH₃)₂", name: "Isopropil", origin: "Cabang terikat pada atom C sekunder" },
        { formula: "–CH₂–CH₂–CH₂–CH₃", name: "Butil", origin: "Dari butana rantai lurus" }
      ]
    },
    {
      step: 4,
      name: "Gunakan Awalan Jumlah Jika Ada Cabang Sejenis",
      badge: "Langkah 4",
      detail: "Bila terdapat dua atau lebih cabang yang sama, gunakan awalan Yunani di depan nama cabang:",
      prefixes: [
        { count: 2, prefix: "di-", example: "2,2-dimetil..." },
        { count: 3, prefix: "tri-", example: "2,3,4-trimetil..." },
        { count: 4, prefix: "tetra-", example: "2,2,3,3-tetrametil..." },
        { count: 5, prefix: "penta-", example: "dst." }
      ],
      tip: "Setiap cabang harus tetap disebutkan nomor posisinya, dipisahkan dengan tanda koma (misal: 2,4-dimetil, bukan 2-dimetil)."
    },
    {
      step: 5,
      name: "Susun Nama Senyawa Berdasarkan Urutan Abjad",
      badge: "Langkah 5",
      detail: "Cabang yang berbeda disusun menurut urutan ALFABET huruf pertama nama cabang (Etil ditulis sebelum Metil).",
      formatPattern: "[Nomor Cabang]-[Nama Cabang][Nomor Ikatan Rangkap jika ada][Nama Rantai Induk]",
      punctuationRules: [
        "Antara angka dengan angka dipisahkan tanda koma ( , ) contoh: 2,3-",
        "Antara angka dengan huruf dipisahkan tanda hubung / strip ( - ) contoh: -dimetil",
        "Antara nama cabang terakhir dan nama rantai utama ditulis bersambung tanpa spasi contoh: pentana"
      ]
    }
  ],

  interactivePractices: [
    {
      id: "p1",
      compoundType: "Alkana",
      title: "Kasus 1: Alkana Bercabang Dua",
      structureDisplay: `
          CH₃
          |
    CH₃ – CH – CH₂ – CH₃
      `,
      condensed: "CH₃–CH(CH₃)–CH₂–CH₃",
      steps: [
        { title: "Rantai Utama", result: "4 atom C = Butana" },
        { title: "Penomoran", result: "Dari kiri ke kanan, agar cabang metil dapat nomor terendah (nomor 2)" },
        { title: "Cabang", result: "Gugus metil (–CH₃) di C-2" },
        { title: "Nama Lengkap", result: "2-metilbutana" }
      ],
      correctName: "2-metilbutana",
      options: ["2-metilbutana", "3-metilbutana", "dimetilpropana", "pentana"],
      explanation: "Rantai terpanjang terdiri atas 4 atom C (butana). Penomoran dimulai dari ujung kiri agar cabang metil terletak pada atom C nomor 2 (bukan nomor 3)."
    },
    {
      id: "p2",
      compoundType: "Alkana",
      title: "Kasus 2: Dua Cabang Berbeda (Etil dan Metil)",
      structureDisplay: `
          CH₃   C₂H₅
          |     |
    CH₃ – CH – CH – CH₂ – CH₂ – CH₃
      `,
      condensed: "CH₃–CH(CH₃)–CH(C₂H₅)–(CH₂)₂–CH₃",
      steps: [
        { title: "Rantai Utama", result: "6 atom C = Heksana" },
        { title: "Penomoran", result: "Dari kiri: C2 (metil) & C3 (etil)" },
        { title: "Urutan Abjad", result: "Etil (E) ditulis sebelum Metil (M)" },
        { title: "Nama Lengkap", result: "3-etil-2-metilheksana" }
      ],
      correctName: "3-etil-2-metilheksana",
      options: ["3-etil-2-metilheksana", "2-metil-3-etilheksana", "4-etil-5-metilheksana", "3-isopropilheksana"],
      explanation: "Etil berawalan huruf 'e' dan metil berawalan 'm'. Menurut aturan abjad, 3-etil ditulis terlebih dahulu sebelum 2-metil."
    },
    {
      id: "p3",
      compoundType: "Alkena",
      title: "Kasus 3: Alkena dengan Cabang",
      structureDisplay: `
                CH₃
                |
    CH₃ – CH = C – CH₂ – CH₃
      `,
      condensed: "CH₃–CH=C(CH₃)–CH₂–CH₃",
      steps: [
        { title: "Rantai Utama", result: "5 atom C memuat ikatan rangkap dua = Pentena" },
        { title: "Penomoran", result: "Dari kiri karena ikatan rangkap ada di C-2 (lebih dekat dibanding dari kanan di C-3)" },
        { title: "Posisi Rangkap & Cabang", result: "Ikatan rangkap di C-2, cabang metil di C-3" },
        { title: "Nama Lengkap", result: "3-metil-2-pentena" }
      ],
      correctName: "3-metil-2-pentena",
      options: ["3-metil-2-pentena", "3-metil-3-pentena", "2-metil-2-pentena", "3-etil-2-butena"],
      explanation: "Ikatan rangkap dua mendapatkan prioritas nomor terendah dibanding cabang. Penomoran dari kiri menghasilkan 2-pentena dengan cabang metil di atom nomor 3."
    },
    {
      id: "p4",
      compoundType: "Alkuna",
      title: "Kasus 4: Alkuna Bercabang",
      structureDisplay: `
          CH₃
          |
    CH₃ – CH – C ≡ CH
      `,
      condensed: "CH₃–CH(CH₃)–C≡CH",
      steps: [
        { title: "Rantai Utama", result: "4 atom C memuat ikatan rangkap tiga = Butuna" },
        { title: "Penomoran", result: "Dari kanan, ikatan rangkap tiga di C-1" },
        { title: "Cabang", result: "Cabang metil berada di C-3" },
        { title: "Nama Lengkap", result: "3-metil-1-butuna" }
      ],
      correctName: "3-metil-1-butuna",
      options: ["3-metil-1-butuna", "2-metil-3-butuna", "isopentuna", "2-metil-4-butuna"],
      explanation: "Penomoran dimulai dari ujung kanan yang paling dekat dengan ikatan rangkap tiga (C-1), sehingga cabang metil berada pada C-3."
    }
  ]
};
