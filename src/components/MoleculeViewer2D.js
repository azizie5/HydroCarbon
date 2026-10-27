/**
 * Dynamic SVG Chemical Molecule Structure Renderer (Lewis & Skeletal/Ball-Stick 2D)
 */
export function createMoleculeSvg(config) {
  const {
    type = 'alkane',
    carbons = 3,
    bondType = 'single', // 'single', 'double', 'triple'
    bondPos = 1, // position of multiple bond
    branched = false, // for isobutane etc.
    isomerType = null // 'cis-2-butene', 'trans-2-butene', 'neopentane'
  } = config;

  const width = 360;
  const height = 180;

  // Handle special isomer cases
  if (isomerType === 'cis-2-butene') {
    return `
      <svg viewBox="0 0 340 160" class="chem-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#334155"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
          <linearGradient id="hGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8"/>
            <stop offset="100%" stop-color="#0284c7"/>
          </linearGradient>
          <linearGradient id="meGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#10b981"/>
            <stop offset="100%" stop-color="#047857"/>
          </linearGradient>
        </defs>

        <!-- Double Bond C=C -->
        <line x1="120" y1="100" x2="220" y2="100" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>
        <line x1="120" y1="110" x2="220" y2="110" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>

        <!-- CIS: Both CH3 groups point UP -->
        <line x1="120" y1="105" x2="70" y2="40" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
        <line x1="220" y1="105" x2="270" y2="40" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>

        <!-- Both H atoms point DOWN -->
        <line x1="120" y1="105" x2="80" y2="145" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
        <line x1="220" y1="105" x2="260" y2="145" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>

        <!-- Carbon 2 & 3 -->
        <circle cx="120" cy="105" r="18" fill="url(#cGrad)" stroke="#38bdf8" stroke-width="2"/>
        <text x="120" y="111" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="700">C2</text>

        <circle cx="220" cy="105" r="18" fill="url(#cGrad)" stroke="#38bdf8" stroke-width="2"/>
        <text x="220" y="111" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="700">C3</text>

        <!-- CH3 nodes (both UP) -->
        <rect x="35" y="22" width="60" height="28" rx="8" fill="url(#meGrad)"/>
        <text x="65" y="41" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700">CH₃</text>

        <rect x="245" y="22" width="60" height="28" rx="8" fill="url(#meGrad)"/>
        <text x="275" y="41" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700">CH₃</text>

        <!-- H nodes (both DOWN) -->
        <circle cx="78" cy="145" r="13" fill="url(#hGrad)"/>
        <text x="78" y="149" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">H</text>

        <circle cx="262" cy="145" r="13" fill="url(#hGrad)"/>
        <text x="262" y="149" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">H</text>

        <text x="170" y="32" text-anchor="middle" fill="#10b981" font-size="12" font-weight="700">Gugus –CH₃ pada sisi sama (CIS)</text>
      </svg>
    `;
  }

  if (isomerType === 'trans-2-butene') {
    return `
      <svg viewBox="0 0 340 160" class="chem-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#334155"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
          <linearGradient id="hGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8"/>
            <stop offset="100%" stop-color="#0284c7"/>
          </linearGradient>
          <linearGradient id="meGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#d97706"/>
          </linearGradient>
        </defs>

        <!-- Double Bond C=C -->
        <line x1="120" y1="80" x2="220" y2="80" stroke="#f59e0b" stroke-width="5" stroke-linecap="round"/>
        <line x1="120" y1="90" x2="220" y2="90" stroke="#f59e0b" stroke-width="5" stroke-linecap="round"/>

        <!-- TRANS: One CH3 UP, One CH3 DOWN -->
        <line x1="120" y1="85" x2="70" y2="25" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
        <line x1="220" y1="85" x2="270" y2="140" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>

        <!-- H atoms: One DOWN, One UP -->
        <line x1="120" y1="85" x2="70" y2="140" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
        <line x1="220" y1="85" x2="270" y2="25" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>

        <!-- Carbon 2 & 3 -->
        <circle cx="120" cy="85" r="18" fill="url(#cGrad2)" stroke="#f59e0b" stroke-width="2"/>
        <text x="120" y="91" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="700">C2</text>

        <circle cx="220" cy="85" r="18" fill="url(#cGrad2)" stroke="#f59e0b" stroke-width="2"/>
        <text x="220" y="91" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="700">C3</text>

        <!-- CH3 nodes (Berseberangan / Opposite) -->
        <rect x="35" y="10" width="60" height="28" rx="8" fill="url(#meGrad2)"/>
        <text x="65" y="29" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700">CH₃</text>

        <rect x="245" y="125" width="60" height="28" rx="8" fill="url(#meGrad2)"/>
        <text x="275" y="144" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700">CH₃</text>

        <!-- H nodes -->
        <circle cx="70" cy="140" r="13" fill="url(#hGrad2)"/>
        <text x="70" y="144" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">H</text>

        <circle cx="270" cy="25" r="13" fill="url(#hGrad2)"/>
        <text x="270" y="29" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">H</text>

        <text x="170" y="25" text-anchor="middle" fill="#f59e0b" font-size="12" font-weight="700">Gugus –CH₃ berseberangan (TRANS)</text>
      </svg>
    `;
  }

  // Generic carbon chain visualization
  const count = Math.min(Math.max(carbons, 1), 6); // visual clamp
  const startX = 40;
  const gap = count > 1 ? (width - 80) / (count - 1) : 0;
  const centerY = height / 2;

  let bondsSvg = '';
  let carbonsSvg = '';

  for (let i = 0; i < count; i++) {
    const x = count === 1 ? width / 2 : startX + i * gap;
    const y = centerY + (i % 2 === 0 ? -12 : 12); // zigzag realistic chemical backbone

    // Draw bonds to next carbon
    if (i < count - 1) {
      const nextX = startX + (i + 1) * gap;
      const nextY = centerY + ((i + 1) % 2 === 0 ? -12 : 12);

      const isSpecial = i + 1 === bondPos;
      if (isSpecial && bondType === 'double') {
        bondsSvg += `
          <line x1="${x}" y1="${y - 4}" x2="${nextX}" y2="${nextY - 4}" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
          <line x1="${x}" y1="${y + 4}" x2="${nextX}" y2="${nextY + 4}" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
        `;
      } else if (isSpecial && bondType === 'triple') {
        bondsSvg += `
          <line x1="${x}" y1="${y - 6}" x2="${nextX}" y2="${nextY - 6}" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
          <line x1="${x}" y1="${y}" x2="${nextX}" y2="${nextY}" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
          <line x1="${x}" y1="${y + 6}" x2="${nextX}" y2="${nextY + 6}" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
        `;
      } else {
        bondsSvg += `
          <line x1="${x}" y1="${y}" x2="${nextX}" y2="${nextY}" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
        `;
      }
    }

    // Hydrogen bonds
    const hDist = 32;
    bondsSvg += `
      <line x1="${x}" y1="${y}" x2="${x}" y2="${y - hDist}" stroke="#475569" stroke-width="2" stroke-dasharray="2,2"/>
      <circle cx="${x}" cy="${y - hDist}" r="8" fill="#0ea5e9"/>
      <text x="${x}" y="${y - hDist + 3}" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="bold">H</text>

      <line x1="${x}" y1="${y}" x2="${x}" y2="${y + hDist}" stroke="#475569" stroke-width="2" stroke-dasharray="2,2"/>
      <circle cx="${x}" cy="${y + hDist}" r="8" fill="#0ea5e9"/>
      <text x="${x}" y="${y + hDist + 3}" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="bold">H</text>
    `;

    // Carbon Atom
    carbonsSvg += `
      <g class="chem-node">
        <circle cx="${x}" cy="${y}" r="17" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
        <text x="${x}" y="${y + 5}" text-anchor="middle" fill="#f8fafc" font-size="12" font-weight="700">C${i + 1}</text>
      </g>
    `;
  }

  return `
    <svg viewBox="0 0 ${width} ${height}" class="chem-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      ${bondsSvg}
      ${carbonsSvg}
    </svg>
  `;
}
