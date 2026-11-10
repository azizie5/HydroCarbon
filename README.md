# 🧪 HydrocarbonEdu - Platform Pembelajaran Kimia Interaktif

Aplikasi web edukasi kimia modern bertema **Hidrokarbon (Alkana, Alkena, Alkuna, Isomer, dan Tata Nama IUPAC)** yang dirancang dengan prinsip UI/UX ramah mata, estetis, dan sangat responsif.

---

## 🎨 Design System

- **Palet Warna**:
  - Dominasi: Pastel Mint & Sage Green (`#4B9F84`, `#6DBDA3`, `#D1EAE0`, `#F0F8F5`) yang menenangkan.
  - Latar Belakang: Pastel Cream & Ivory (`#FAF8F5`, `#FAF6EF`, `#F4EEDF`) untuk mengurangi kelelahan mata (*eye fatigue*).
  - Aksen Tambahan: Warm Amber & Slate untuk status dan kontras elemen.
- **Tipografi**:
  - Heading: `'Quicksand'` & `'Nunito'` (ramah, modern, dan menyenangkan).
  - Paragraf / Body: `'Inter'` (keterbacaan optimal pada layar ponsel maupun desktop).
- **Gaya Visual**:
  - Modern minimalis, clean spatial layout.
  - Sudut membulat lembut (*rounded-2xl* dan *rounded-3xl*).
  - Glassmorphism lembut (*blurred frosted glass effects*).

---

## 🚀 Fitur Utama

1. **Header Navigasi Sticky**:
   - Logo interaktif beranimasi molekul.
   - Navigasi pintar dengan indikator scroll aktif ke 4 section utama (*Beranda*, *Materi*, *Lab Molekul 3D*, *Kuis*).
   - Menu drawer responsif untuk perangkat mobile / smartphone.

2. **Hero Section (Beranda)**:
   - Sapaan visual ramah dengan badge kurikulum.
   - Headline atraktif mengenai kemudahan mempelajari hidrokarbon.
   - Kartu pratinjau instan (*Alkana $CH_4$*, *Alkena $C_2H_4$*, *Alkuna $C_2H_2$*) yang dapat diklik langsung.
   - Call-to-Action (CTA) mulus untuk langsung menuju materi atau laboratorium 3D.

3. **Materi & Modul Interaktif**:
   - **Tab Alkana ($C_n H_{2n+2}$)**: Karakteristik, ikatan jenuh sp³, deret homolog, dan 4 aturan IUPAC terstruktur.
   - **Tab Alkena ($C_n H_{2n}$)**: Ikatan rangkap dua (ikatan $\sigma$ + $\pi$), sp², planar, deret homolog & tata nama.
   - **Tab Alkuna ($C_n H_{2n-2}$)**: Ikatan rangkap tiga, sp, linear 180°, reaktivitas & aplikasi pengelasan karbit.
   - **Modul Isomerisme Komparatif**: Perbandingan visual interaktif untuk *Isomer Kerangka*, *Isomer Posisi*, *Isomer Fungsi*, dan *Isomer Geometri (cis/trans)*.
   - **IUPAC Builder & Explorer**: Simulator interaktif untuk memilih awalan karbon (Met- hingga Okt-) dan akhiran (-ana, -ena, -una) dengan keluaran rumus dan nama otomatis.

4. **Lab Molekul 3D Virtual**:
   - **Mesin 3D Native WebGL (Three.js)**:
     - Render bola & tongkat (*Ball and Stick*), *Space-filling (Van der Waals)*, dan *Wireframe*.
     - Pewarnaan atom standar CPK (Karbon = Charcoal Gray, Hidrogen = White/Silver).
     - Ikatan rangkap dua digambar dengan 2 silinder paralel; ikatan rangkap tiga dengan 3 silinder paralel.
     - Kontrol rotasi 3D mouse/touch, zoom in/out, tombol reset kamera, dan toggle putar otomatis.
     - Toggle label atom (C dan H).
     - Pemilih molekul: Metana, Etana, Etena, Etuna, Propana, Isobutana (2-metilpropana), dan Benzena.
   - **MolView Live Embed**: Tab alternatif yang menghubungkan simulator ke basis data MolView Open Chemistry.

5. **Kuis Interaktif Tergamifikasi**:
   - 8 soal komprehensif berstandar kurikulum kimia SMA Fase F.
   - Poin skor (+100 poin) dan penghitung **Streak beruntun (🔥)**.
   - Efek suara sintetis instan (*Web Audio API*) tanpa perlu unduhan file eksternal.
   - Ledakan konfeti selebrasi (*Canvas Confetti*) saat menjawab benar dan menyelesaikan kuis.
   - Pembahasan konsep ilmiah langsung di setiap nomor soal.
   - Kartu rekapitulasi skor akhir lengkap dengan lencana pencapaian (*Master Hidrokarbon*, *Peneliti Berbakat*, dll.) dan tombol ulangi kuis.

---

## 💻 Cara Menjalankan Aplikasi

Aplikasi dibangun menggunakan **React 19**, **Vite**, dan **Tailwind CSS v4**.

```bash
# Masuk ke direktori proyek
cd "d:\Fatichatun Nazlah Kumala\HydrocarbEdu"

# Menjalankan server pengembangan (development mode)
npm run dev

# Buka browser pada alamat:
# http://localhost:5173
```
