export function renderHero(containerId, onNavigate) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="hero-section">
      <!-- Glow ambient background -->
      <div class="hero-glow-blob blob-1"></div>
      <div class="hero-glow-blob blob-2"></div>

      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          Media Pembelajaran Kimia Organik Interaktif
        </div>

        <h1 class="hero-title">
          Kuasai Konsep <span class="gradient-text">Hidrokarbon</span> & Tata Nama Senyawa Organik
        </h1>

        <p class="hero-lead">
          Pelajari secara komprehensif deret homolog <strong>Alkana</strong>, <strong>Alkena</strong>, <strong>Alkuna</strong>, analisis fenomena <strong>Isomeri</strong>, dan taklukkan aturan resmi penamaan <strong>IUPAC</strong> melalui visualisasi interaktif.
        </p>

        <div class="hero-cta-group">
          <button class="btn btn-primary btn-lg" id="startHomologBtn">
            Jelajahi Deret Homolog 🚀
          </button>
          <button class="btn btn-outline btn-lg" id="startIupacBtn">
            Pelajari Aturan IUPAC 📘
          </button>
        </div>
      </div>

      <!-- Quick 3 Pillars Cards -->
      <div class="quick-pillars-grid">
        <div class="pillar-card alkane-card">
          <div class="pillar-top">
            <span class="pill-badge alkane">Jenuh (Saturated)</span>
            <span class="formula-tag">C<sub>n</sub>H<sub>2n+2</sub></span>
          </div>
          <h4>Alkana</h4>
          <p>Semua ikatan karbon adalah ikatan tunggal (C–C). Bersifat stabil dan menjadi fondasi bahan bakar utama dunia (LPG, Bensin, Solar).</p>
          <div class="pillar-meta">
            <span>Hibridisasi: <strong>sp³</strong></span>
            <span>Sudut: <strong>109,5°</strong></span>
          </div>
        </div>

        <div class="pillar-card alkene-card">
          <div class="pillar-top">
            <span class="pill-badge alkene">Tak Jenuh (Unsaturated)</span>
            <span class="formula-tag">C<sub>n</sub>H<sub>2n</sub></span>
          </div>
          <h4>Alkena</h4>
          <p>Memiliki minimal satu ikatan rangkap dua (C=C). Sangat reaktif terhadap reaksi adisi dan bahan baku industri plastik sintetis.</p>
          <div class="pillar-meta">
            <span>Hibridisasi: <strong>sp²</strong></span>
            <span>Sudut: <strong>120°</strong></span>
          </div>
        </div>

        <div class="pillar-card alkyne-card">
          <div class="pillar-top">
            <span class="pill-badge alkyne">Tak Jenuh (Unsaturated)</span>
            <span class="formula-tag">C<sub>n</sub>H<sub>2n-2</sub></span>
          </div>
          <h4>Alkuna</h4>
          <p>Memiliki minimal satu ikatan rangkap tiga (C≡C). Menghasilkan suhu nyala api luar biasa panas (~3.300 °C) pada gas las asetilena.</p>
          <div class="pillar-meta">
            <span>Hibridisasi: <strong>sp</strong></span>
            <span>Sudut: <strong>180°</strong></span>
          </div>
        </div>
      </div>

      <!-- Carbon Uniqueness Section (Kekhasan Atom Karbon) -->
      <div class="carbon-uniqueness-card">
        <div class="uniqueness-header">
          <span class="badge-accent">Konsep Fundamental Kimia</span>
          <h3>4 Kekhasan Istimewa Atom Karbon (C)</h3>
          <p>Mengapa terdapat jutaan senyawa organik di bumi yang berbasis pada atom karbon?</p>
        </div>

        <div class="uniqueness-features-grid">
          <div class="feature-item">
            <div class="feat-icon">4️⃣</div>
            <h5>Memiliki 4 Elektron Valensi</h5>
            <p>Atom karbon (nomor atom 6) memiliki 4 elektron pada kulit terluarnya, memungkinkannya membentuk 4 ikatan kovalen yang sangat stabil dengan atom lain.</p>
          </div>

          <div class="feature-item">
            <div class="feat-icon">📏</div>
            <h5>Jari-jari Atom Relatif Kecil</h5>
            <p>Terletak pada periode 2 sistem periodik, membuat jari-jarinya kecil sehingga ikatan kovalen yang dibentuk sangat kuat dan berjarak rapat.</p>
          </div>

          <div class="feature-item">
            <div class="feat-icon">🔗</div>
            <h5>Kemampuan Katenasi Rantai</h5>
            <p>Karbon mampu berikatan sesama atom karbon membentuk rantai karbon tak terhingga: lurus, bercabang, hingga cincin siklik melingkar.</p>
          </div>

          <div class="feature-item">
            <div class="feat-icon">🔀</div>
            <h5>Membentuk Beragam Jenis Ikatan</h5>
            <p>Karbon dapat membentuk ikatan kovalen tunggal (C–C), ikatan rangkap dua (C=C), maupun ikatan rangkap tiga (C≡C).</p>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('startHomologBtn')?.addEventListener('click', () => onNavigate('homolog'));
  document.getElementById('startIupacBtn')?.addEventListener('click', () => onNavigate('iupac'));
}
