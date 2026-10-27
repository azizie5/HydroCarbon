# AGENTS.md — Aturan Kerja Web Pembelajaran Kimia: Hidrokarbon

## 1. Teknologi
- Gunakan React + Vite.
- Tulis semua komponen sebagai komponen fungsional (function component) dengan hooks.
- Jangan memakai backend luar, API eksternal, atau database server.

## 2. Penyimpanan
- Simpan data hanya di localStorage.
- Data yang disimpan: skor kuis dan modul yang sudah selesai (Alkana, Alkena, Alkuna).
- Data bersifat anonim: jangan meminta nama, email, atau login.

## 3. Struktur
- Letakkan semua komponen di src/components/.
- Satu komponen satu file, misalnya ModulAlkana.jsx, ModulAlkena.jsx, ModulAlkuna.jsx, dan Kuis.jsx.

## 4. Bahasa
- Gunakan bahasa Indonesia baku dan komunikatif untuk semua teks di tampilan.
- Sapaan ke siswa memakai "kamu"; hindari bahasa gaul dan singkatan tidak baku.

## 5. Notasi
- Tulis rumus kimia dengan subskrip dan superskrip yang benar, misalnya CH₄, C₂H₄, C₂H₂, dan CₙH₂ₙ₊₂.
- Tulis nama senyawa sesuai aturan IUPAC dengan huruf kecil, misalnya etana, propena, 1-butuna.
- Tulis perubahan entalpi sebagai ΔH.

## 6. Warna
- Pakai hanya 4 warna ini lewat CSS variables di :root (src/index.css):
  --parchment: #F7EFDA;  /* latar halaman dan kartu */
  --pistachio: #BADD7F;  /* aksen: tombol sekunder, highlight, progres */
  --melon: #EFACA5;      /* aksen: umpan balik, penanda penting */
  --fern: #3E8440;       /* warna utama: judul, tombol utama, tautan */
- Jangan menulis kode warna langsung di komponen; selalu pakai var(--nama).
- Latar halaman memakai --parchment; tombol utama memakai --fern dengan teks --parchment.
- Jangan menaruh teks --melon atau --pistachio di atas --parchment (kontrasnya rendah).
