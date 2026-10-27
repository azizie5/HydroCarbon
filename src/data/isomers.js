/**
 * Data komprehensif tentang Isomeri Hidrokarbon
 * Meliputi Isomer Rangka, Isomer Posisi, Isomer Gugus Fungsi, dan Isomer Geometri (Cis-Trans)
 */
export const ISOMER_INFO = {
  definition: "Isomer adalah senyawa-senyawa yang memiliki rumus molekul yang sama, tetapi memiliki susunan struktur atom (konektivitas) atau penataan ruang (stereokimia) yang berbeda.",
  importanceNote: "Perbedaan struktur menyebabkan perbedaan sifat fisika (seperti titik didih, titik leleh, kelarutan) dan sifat kimia (reaktivitas), meskipun jumlah atom penyusunnya sama persis.",
  categories: [
    {
      id: "rangka",
      title: "1. Isomer Rangka / Rantai (Chain Isomers)",
      description: "Senyawa dengan rumus molekul sama, rumus gugus fungsi sama, tetapi kerangka rantai karbon berbeda (rantai lurus vs bercabang).",
      principle: "Semakin banyak cabang pada isomer alkana, luas permukaan kontak antarmolekul semakin kecil sehingga gaya van der Waals (London) melemah dan titik didihnya menjadi lebih rendah.",
      examplePair: {
        formula: "C₄H₁₀ (Butana)",
        compounds: [
          {
            name: "n-Butana",
            condensed: "CH₃–CH₂–CH₂–CH₃",
            type: "Rantai Lurus",
            boilingPoint: -0.5,
            meltingPoint: -138.4,
            density: "0.579 g/cm³",
            structureDrawing: "linear",
            description: "Molekul memanjang silindris, area kontak dispersi London besar, titik didih mendekati 0 °C."
          },
          {
            name: "2-Metilpropana (Isobutana)",
            condensed: "CH₃–CH(CH₃)–CH₃",
            type: "Rantai Bercabang",
            boilingPoint: -11.7,
            meltingPoint: -159.6,
            density: "0.557 g/cm³",
            structureDrawing: "branched",
            description: "Bentuk molekul lebih membulat (sferis), kontak permukaan berkurang, titik didih turun drastis menjadi -11,7 °C."
          }
        ]
      },
      secondExample: {
        formula: "C₅H₁₂ (Pentana - Memiliki 3 Isomer Rangka)",
        items: [
          { name: "n-Pentana", formula: "CH₃–(CH₂)₃–CH₃", bp: "36,1 °C", shape: "Lurus (5 atom C)" },
          { name: "2-Metilbutana (Isopentana)", formula: "CH₃–CH(CH₃)–CH₂–CH₃", bp: "27,8 °C", shape: "1 Cabang metil" },
          { name: "2,2-Dimetilpropana (Neopentana)", formula: "C(CH₃)₄", bp: "9,5 °C", shape: "2 Cabang metil (Sangat sferis)" }
        ]
      }
    },
    {
      id: "posisi",
      title: "2. Isomer Posisi (Positional Isomers)",
      description: "Senyawa dengan rumus molekul dan kerangka karbon sama, tetapi letak ikatan rangkap atau posisi gugus fungsi berbeda pada rantai karbon.",
      principle: "Mulai terjadi pada alkena dan alkuna dengan jumlah atom karbon C ≥ 4.",
      examplePair: {
        formula: "C₄H₈ (Butena)",
        compounds: [
          {
            name: "1-Butena",
            condensed: "CH₂=CH–CH₂–CH₃",
            type: "Ikatan Rangkap di C-1",
            boilingPoint: -6.3,
            structureDrawing: "alkene-1",
            description: "Ikatan rangkap dua terletak di antara atom karbon nomor 1 dan 2."
          },
          {
            name: "2-Butena",
            condensed: "CH₃–CH=CH–CH₃",
            type: "Ikatan Rangkap di C-2",
            boilingPoint: 3.7,
            structureDrawing: "alkene-2",
            description: "Ikatan rangkap dua terletak di tengah rantai (antara atom karbon nomor 2 dan 3), lebih stabil secara termodinamika."
          }
        ]
      }
    },
    {
      id: "fungsi",
      title: "3. Isomer Gugus Fungsi (Functional Group Isomers)",
      description: "Senyawa dengan rumus molekul sama persis, tetapi memiliki jenis gugus fungsi / homolog yang berbeda secara fundamental.",
      principle: "Alkena (CnH2n) berisomer gugus fungsi dengan Sikloalkana (siklik jenuh).",
      examplePair: {
        formula: "C₃H₆",
        compounds: [
          {
            name: "Propena (Alkena)",
            condensed: "CH₂=CH–CH₃",
            type: "Alifatik Tak Jenuh (Ada Ikatan Rangkap C=C)",
            reagentBromine: "Menghilangkan warna cokelat air bromin (bereaksi adisi)",
            description: "Rantai terbuka dengan ikatan rangkap dua yang mudah bereaksi adisi."
          },
          {
            name: "Siklopropana (Sikloalkana)",
            condensed: "Segitiga cincin C₃H₆",
            type: "Alisiklik Jenuh (Cincin tertutup)",
            reagentBromine: "Tidak mudah bereaksi dengan bromin pada kondisi ruang",
            description: "Molekul cincin segitiga tiga karbon jenuh dengan regangan cincin tinggi (ring strain)."
          }
        ]
      }
    },
    {
      id: "geometri",
      title: "4. Isomer Geometri Cis-Trans (Stereoisomers)",
      description: "Isomer ruang yang terjadi akibat ketidakmampuan ikatan rangkap dua (C=C) untuk berputar secara bebas (rotasi terbatas / hindered rotation).",
      condition: "Syarat: Setiap atom karbon ikatan rangkap harus mengikat dua gugus atom yang berbeda satu sama lain (A ≠ B pada >C=C<).",
      examplePair: {
        formula: "C₄H₈ (2-Butena)",
        compounds: [
          {
            name: "cis-2-Butena",
            condensed: "Gugus –CH₃ berada pada sisi yang SAMA",
            dipole: "Memiliki Momen Dipol (Polar, μ ≈ 0.33 D)",
            boilingPoint: 3.7,
            meltingPoint: -138.9,
            stability: "Kurang stabil karena tolakan sterik antara dua gugus metil besar pada satu sisi",
            description: "Karena kedua gugus metil berada di sisi yang sama, molekul bersifat sedikit polar sehingga titik didihnya lebih tinggi (+3.7 °C)."
          },
          {
            name: "trans-2-Butena",
            condensed: "Gugus –CH₃ berada pada sisi BERSEBERANGAN",
            dipole: "Non-polar (Momen Dipol μ = 0 D, saling meniadakan)",
            boilingPoint: 0.9,
            meltingPoint: -105.6,
            stability: "Lebih stabil secara termodinamika karena minim tolakan sterik",
            description: "Dipol saling meniadakan (simetris). Pengemasan kisi kristal padatnya lebih rapat sehingga titik lelehnya jauh lebih tinggi (-105.6 °C)."
          }
        ]
      }
    }
  ]
};
