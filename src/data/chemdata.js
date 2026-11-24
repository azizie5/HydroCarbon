
export const chemData = [
  {
    id: "m1-q1",
    konsep: "rumus-umum-alkena",
    pertanyaan: "Rumus umum alkena adalah ...",
    opsi: [
      { id: "A", teks: "CₙH₂ₙ₊₂", feedback: "Hati-hati, rumus ini adalah untuk alkana. Ingat kembali bagaimana adanya ikatan rangkap memengaruhi jumlah atom hidrogen." },
      { id: "B", teks: "CₙH₂ₙ", feedback: "Tepat! Alkena memiliki satu ikatan rangkap dua (C=C), sehingga kehilangan 2 atom H dibandingkan alkana, menjadikannya CₙH₂ₙ." },
      { id: "C", teks: "CₙH₂ₙ₋₂", feedback: "Rumus ini berlaku untuk alkuna yang memiliki ikatan rangkap tiga. Alkena hanya memiliki ikatan rangkap dua." },
      { id: "D", teks: "CₙHₙ", feedback: "Ini bukan pola deret homolog hidrokarbon alifatik yang tepat. Periksa kembali pola 2n." }
    ],
    jawabanBenar: "B",
    miskonsepsiUtama: "Mencampur rumus umum alkana, alkena, dan alkuna"
  },
  {
    id: "m1-q2",
    konsep: "tata-nama-alkena",
    pertanyaan: "Nama senyawa CH₃-CH₂-CH=CH₂ adalah ...",
    opsi: [
      { id: "A", teks: "Butana", feedback: "Akhiran -ana digunakan untuk alkana (ikatan tunggal seluruhnya). Perhatikan ada ikatan C=C pada struktur tersebut." },
      { id: "B", teks: "1-butena", feedback: "Benar! Penyelesaian: Rantai utama memiliki 4 karbon (but-), terdapat ikatan rangkap dua (-ena), dan penomoran dimulai dari kanan agar ikatan rangkap mendapat nomor terkecil (1). Jadi, namanya 1-butena." },
      { id: "C", teks: "2-butena", feedback: "Posisi ikatan rangkap pada senyawa ini berada di ujung (dimulai dari atom C nomor 1), bukan di tengah (C nomor 2)." },
      { id: "D", teks: "1-butuna", feedback: "Akhiran -una menandakan ikatan rangkap tiga. Senyawa pada soal ini memiliki ikatan rangkap dua." }
    ],
    jawabanBenar: "B",
    miskonsepsiUtama: "Mengabaikan posisi ikatan rangkap dan salah membedakan akhiran -ana, -ena, -una"
  },
  {
    id: "m1-q3",
    konsep: "massa-molekul-relatif",
    pertanyaan: "Mr C₄H₁₀ adalah ... (Ar C = 12, H = 1)",
    opsi: [
      { id: "A", teks: "54", feedback: "Coba hitung kembali. Pastikan kamu mengalikan jumlah atom C dengan Ar C (4x12), lalu menjumlahkannya dengan total Ar H." },
      { id: "B", teks: "56", feedback: "Hasil 56 adalah Mr untuk butena (C₄H₈). Senyawa pada soal adalah butana (C₄H₁₀), pastikan jumlah atom H dikalikan dengan benar." },
      { id: "C", teks: "58", feedback: "Tepat! Penyelesaian: Mr = (4 × Ar C) + (10 × Ar H) = (4 × 12) + (10 × 1) = 48 + 10 = 58." },
      { id: "D", teks: "60", feedback: "Periksa kembali hasil penjumlahanmu. Total atom karbon ada 4 dan hidrogen ada 10." }
    ],
    jawabanBenar: "C",
    miskonsepsiUtama: "Salah menghitung jumlah H atau lupa mengalikan Ar dengan jumlah atom"
  },
  {
    id: "m1-q4",
    konsep: "isomer-struktur",
    pertanyaan: "Jumlah isomer struktur C₄H₁₀ adalah ...",
    opsi: [
      { id: "A", teks: "1", feedback: "Ingat bahwa rantai lurus bukan satu-satunya kemungkinan. Coba potong satu atom karbon di ujung dan jadikan cabang." },
      { id: "B", teks: "2", feedback: "Benar! Penyelesaian: C₄H₁₀ hanya memiliki 2 isomer struktur, yaitu rantai lurus (n-butana) dan rantai utama 3 karbon dengan 1 cabang (2-metilpropana/isobutana)." },
      { id: "C", teks: "3", feedback: "Jika kamu menemukan 3 struktur, pastikan rantai yang sekadar dibengkokkan ke bawah tidak kamu hitung sebagai isomer baru. Coba beri nama IUPAC pada gambarmu." },
      { id: "D", teks: "4", feedback: "Jumlah ini terlalu banyak. Pastikan kamu tidak menganggap struktur yang diputar balik atau dibengkokkan sebagai isomer yang berbeda." }
    ],
    jawabanBenar: "B",
    miskonsepsiUtama: "Menganggap rantai yang dibengkokkan atau diputar sebagai isomer berbeda"
  },
  {
    id: "m1-q5",
    konsep: "hidrokarbon-jenuh",
    pertanyaan: "Alkana disebut hidrokarbon jenuh karena ...",
    opsi: [
      { id: "A", teks: "Tidak dapat terbakar", feedback: "Sifat mudah terbakar adalah sifat kimia umum hidrokarbon, namun ini bukan alasan penamaan istilah 'jenuh'." },
      { id: "B", teks: "Hanya memiliki ikatan tunggal C-C", feedback: "Tepat! Istilah 'jenuh' berarti setiap atom karbon sudah mengikat jumlah atom hidrogen maksimum karena tidak ada ikatan rangkap yang menggunakan elektron valensinya." },
      { id: "C", teks: "Memiliki ikatan rangkap sehingga stabil", feedback: "Kebalikannya, hidrokarbon yang memiliki ikatan rangkap (seperti alkena dan alkuna) justru disebut sebagai hidrokarbon 'tak jenuh'." },
      { id: "D", teks: "Tidak mengandung atom H", feedback: "Senyawa hidrokarbon pasti mengandung atom karbon dan hidrogen. Coba kaitkan kata 'jenuh' dengan jenis ikatan antar atom karbonnya." }
    ],
    jawabanBenar: "B",
    miskonsepsiUtama: "Menafsirkan 'jenuh' secara harfiah dalam bahasa sehari-hari"
  }
];
