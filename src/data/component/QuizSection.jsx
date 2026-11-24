import React, { useState } from 'react';
import { chemData } from '../data/chemData';


export default function QuizSection() {
  const [jawabanSiswa, setJawabanSiswa] = useState({});
  const [isSelesai, setIsSelesai] = useState(false);
  const [skor, setSkor] = useState(0);
  const [pesanError, setPesanError] = useState('');


  // Menangani saat siswa mengklik opsi jawaban
  const handlePilihOpsi = (idSoal, idOpsi) => {
    if (isSelesai) return; // Membekukan jawaban jika mode kuis sudah selesai
   
    setJawabanSiswa(prev => ({
      ...prev,
      [idSoal]: idOpsi
    }));
    setPesanError(''); // Hapus pesan error jika siswa mulai menjawab
   
    // TODO: Tambahkan pemanggilan fungsi ke localStore.js di sini untuk menyimpan draf
  };


  // Menghitung poin dan mengunci kuis
  const kumpulkanJawaban = () => {
    const totalSoal = chemData.length;
   
    // Validasi: pastikan semua soal sudah dijawab
    if (Object.keys(jawabanSiswa).length < totalSoal) {
      setPesanError('Harap jawab semua soal sebelum mengumpulkan bukti belajar.');
      return;
    }


    // Hitung jumlah jawaban yang benar
    let jumlahBenar = 0;
    chemData.forEach(soal => {
      if (jawabanSiswa[soal.id] === soal.jawabanBenar) {
        jumlahBenar++;
      }
    });


    // Kalkulasi skor (skala 100)
    const nilaiAkhir = (jumlahBenar / totalSoal) * 100;
    setSkor(nilaiAkhir);
    setIsSelesai(true);
   
    // TODO: Tambahkan pemanggilan fungsi ke localStore.js di sini untuk menyimpan skor dan status "selesai"
  };


  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Modul 1: Kuis Diagnostik Hidrokarbon</h2>
     
      {chemData.map((soal, index) => {
        const jawabanTerpilih = jawabanSiswa[soal.id];
       
        return (
          <div key={soal.id} style={{ marginBottom: '24px', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
              {index + 1}. {soal.pertanyaan}
            </p>
           
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
              {soal.opsi.map(opsi => {
                const isDipilih = jawabanTerpilih === opsi.id;
                const isBenar = opsi.id === soal.jawabanBenar;
               
                // Logika warna penanda
                let bgColor = '#f8fafc';
                let borderColor = '#cbd5e1';
               
                if (isDipilih) {
                  bgColor = '#e0f2fe';
                  borderColor = '#38bdf8';
                }
               
                // Menampilkan warna benar/salah HANYA setelah dikumpulkan
                if (isSelesai) {
                  if (isBenar) {
                    bgColor = '#dcfce7'; // Hijau untuk jawaban benar
                    borderColor = '#4ade80';
                  } else if (isDipilih && !isBenar) {
                    bgColor = '#fee2e2'; // Merah untuk pilihan salah
                    borderColor = '#f87171';
                  }
                }


                return (
                  <button
                    key={opsi.id}
                    onClick={() => handlePilihOpsi(soal.id, opsi.id)}
                    disabled={isSelesai}
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      backgroundColor: bgColor,
                      border: `1px solid ${borderColor}`,
                      borderRadius: '6px',
                      cursor: isSelesai ? 'default' : 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <strong>{opsi.id}.</strong> {opsi.teks}
                  </button>
                );
              })}
            </div>


            {/* Menampilkan Scaffolding / Feedback spesifik setelah kuis dikumpulkan */}
            {isSelesai && jawabanTerpilih && (
              <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#fef3c7', borderLeft: '4px solid #f59e0b', borderRadius: '4px' }}>
                <p style={{ margin: 0, fontSize: '14px' }}>
                  <strong>Umpan Balik: </strong>
                  {soal.opsi.find(o => o.id === jawabanTerpilih)?.feedback}
                </p>
                {jawabanTerpilih === soal.jawabanBenar && soal.pembahasan && (
                  <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#166534' }}>
                    <strong>Pembahasan: </strong> {soal.pembahasan}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}


      {pesanError && (
        <div style={{ color: '#dc2626', marginBottom: '16px', fontWeight: 'bold' }}>
          {pesanError}
        </div>
      )}


      {/* Bagian Bawah: Tombol Submit atau Penampil Skor */}
      {!isSelesai ? (
        <button
          onClick={kumpulkanJawaban}
          style={{ width: '100%', padding: '12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Kumpulkan Jawaban
        </button>
      ) : (
        <div style={{ padding: '20px', backgroundColor: '#f1f5f9', borderRadius: '8px', textAlign: 'center', marginTop: '20px' }}>
          <h3 style={{ margin: '0 0 8px 0' }}>Bukti Belajar Tersimpan</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: skor >= 80 ? '#16a34a' : '#ea580c', margin: 0 }}>
            Skor Anda: {skor} / 100
          </p>
        </div>
      )}
    </div>
  );
}
