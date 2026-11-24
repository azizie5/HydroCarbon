import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  RotateCw, 
  Eye, 
  Maximize2, 
  Layers, 
  ExternalLink, 
  Sparkles, 
  Info,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';

const MOLECULES = [
  {
    id: 'ch4',
    nama: 'metana',
    rumus: 'CH₄',
    golongan: 'Alkana',
    geometri: 'Tetrahedral',
    hibridisasi: 'sp³',
    sudut: '109,5°',
    smiles: 'C',
    penjelasan: 'Atom karbon memiliki 4 elektron valensi yang membentuk 4 ikatan kovalen tunggal dengan hidrogen. Keempat ikatan saling menolak secara simetris membentuk sudut 109,5° dalam ruang tiga dimensi.',
    // 3D coordinates (x, y, z, element, label)
    atoms: [
      { x: 0, y: 0, z: 0, el: 'C', r: 24, label: 'C' },
      { x: 0, y: -65, z: 45, el: 'H', r: 14, label: 'H' },
      { x: 62, y: 40, z: 45, el: 'H', r: 14, label: 'H' },
      { x: -62, y: 40, z: 45, el: 'H', r: 14, label: 'H' },
      { x: 0, y: 0, z: -80, el: 'H', r: 14, label: 'H' }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 }
    ]
  },
  {
    id: 'c2h6',
    nama: 'etana',
    rumus: 'C₂H₆',
    golongan: 'Alkana',
    geometri: 'Tetrahedral ganda',
    hibridisasi: 'sp³',
    sudut: '109,5°',
    smiles: 'CC',
    penjelasan: 'Dua atom karbon sp³ dihubungkan oleh ikatan kovalen tunggal C–C yang dapat berotasi bebas. Masing-masing atom C mengikat 3 atom H dengan bentuk tetrahedral.',
    atoms: [
      { x: -45, y: 0, z: 0, el: 'C', r: 24, label: 'C1' },
      { x: 45, y: 0, z: 0, el: 'C', r: 24, label: 'C2' },
      { x: -75, y: -50, z: 30, el: 'H', r: 13, label: 'H' },
      { x: -75, y: 50, z: 30, el: 'H', r: 13, label: 'H' },
      { x: -75, y: 0, z: -60, el: 'H', r: 13, label: 'H' },
      { x: 75, y: -50, z: -30, el: 'H', r: 13, label: 'H' },
      { x: 75, y: 50, z: -30, el: 'H', r: 13, label: 'H' },
      { x: 75, y: 0, z: 60, el: 'H', r: 13, label: 'H' }
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
    id: 'c2h4',
    nama: 'etena',
    rumus: 'C₂H₄',
    golongan: 'Alkena',
    geometri: 'Trigonal Planar',
    hibridisasi: 'sp²',
    sudut: '120°',
    smiles: 'C=C',
    penjelasan: 'Ikatan rangkap dua C=C terdiri dari 1 ikatan σ dan 1 ikatan π. Seluruh 6 atom (2 C dan 4 H) berada pada satu bidang datar (planar) dengan sudut ikatan 120°. Rotasi ikatan C=C terkunci kaku.',
    atoms: [
      { x: -45, y: 0, z: 0, el: 'C', r: 24, label: 'C1' },
      { x: 45, y: 0, z: 0, el: 'C', r: 24, label: 'C2' },
      { x: -90, y: -45, z: 0, el: 'H', r: 13, label: 'H' },
      { x: -90, y: 45, z: 0, el: 'H', r: 13, label: 'H' },
      { x: 90, y: -45, z: 0, el: 'H', r: 13, label: 'H' },
      { x: 90, y: 45, z: 0, el: 'H', r: 13, label: 'H' }
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
    id: 'c2h2',
    nama: 'etuna',
    rumus: 'C₂H₂',
    golongan: 'Alkuna',
    geometri: 'Linear (Garis Lurus)',
    hibridisasi: 'sp',
    sudut: '180°',
    smiles: 'C%23C',
    penjelasan: 'Ikatan rangkap tiga C≡C terdiri dari 1 ikatan σ kuat dan 2 ikatan π tegak lurus. Bentuk molekul berupa garis lurus sempurna dengan sudut 180°.',
    atoms: [
      { x: -35, y: 0, z: 0, el: 'C', r: 24, label: 'C1' },
      { x: 35, y: 0, z: 0, el: 'C', r: 24, label: 'C2' },
      { x: -100, y: 0, z: 0, el: 'H', r: 13, label: 'H' },
      { x: 100, y: 0, z: 0, el: 'H', r: 13, label: 'H' }
    ],
    bonds: [
      { from: 0, to: 1, order: 3 },
      { from: 0, to: 2, order: 1 },
      { from: 1, to: 3, order: 1 }
    ]
  },
  {
    id: 'c3h8',
    nama: 'propana',
    rumus: 'C₃H₈',
    golongan: 'Alkana',
    geometri: 'Rantai Zigzag (sp³)',
    hibridisasi: 'sp³',
    sudut: '109,5°',
    smiles: 'CCC',
    penjelasan: 'Rantai 3 karbon alkana tidak lurus melainkan membentuk pola tekukan zigzag karena masing-masing karbon sp³ mempertahankan sudut tetrahedral 109,5°.',
    atoms: [
      { x: -70, y: 20, z: 0, el: 'C', r: 22, label: 'C1' },
      { x: 0, y: -25, z: 0, el: 'C', r: 22, label: 'C2' },
      { x: 70, y: 20, z: 0, el: 'C', r: 22, label: 'C3' },
      { x: -105, y: 55, z: 35, el: 'H', r: 12, label: 'H' },
      { x: -105, y: 55, z: -35, el: 'H', r: 12, label: 'H' },
      { x: -85, y: -35, z: 0, el: 'H', r: 12, label: 'H' },
      { x: 0, y: -65, z: 45, el: 'H', r: 12, label: 'H' },
      { x: 0, y: -65, z: -45, el: 'H', r: 12, label: 'H' },
      { x: 105, y: 55, z: 35, el: 'H', r: 12, label: 'H' },
      { x: 105, y: 55, z: -35, el: 'H', r: 12, label: 'H' },
      { x: 85, y: -35, z: 0, el: 'H', r: 12, label: 'H' }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 0, to: 5, order: 1 },
      { from: 1, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 2, to: 8, order: 1 },
      { from: 2, to: 9, order: 1 },
      { from: 2, to: 10, order: 1 }
    ]
  }
];

export default function LabMolekul() {
  const [selectedMoleculeId, setSelectedMoleculeId] = useState('ch4');
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'molview'
  const [styleMode, setStyleMode] = useState('ballstick'); // 'ballstick' | 'spacefill' | 'wireframe'
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [showHydrogens, setShowHydrogens] = useState(true);
  const [showAngles, setShowAngles] = useState(true);

  const canvasRef = useRef(null);
  const rotRef = useRef({ x: 0.35, y: 0.45 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  const activeMolecule = MOLECULES.find((m) => m.id === selectedMoleculeId) || MOLECULES[0];

  // Mouse drag handlers for 3D rotation
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    rotRef.current.y += dx * 0.01;
    rotRef.current.x += dy * 0.01;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch handlers for mobile devices
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMousePosRef.current.x;
    const dy = e.touches[0].clientY - lastMousePosRef.current.y;
    rotRef.current.y += dx * 0.012;
    rotRef.current.x += dy * 0.012;
    lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const resetView = () => {
    rotRef.current = { x: 0.35, y: 0.45 };
  };

  // 3D Canvas Rendering Loop
  useEffect(() => {
    if (activeTab !== 'simulator') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      // Auto-rotation update
      if (isAutoRotating && !isDraggingRef.current) {
        rotRef.current.y += 0.008;
      }

      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Subtle background grid circle
      ctx.strokeStyle = 'rgba(62, 132, 64, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(cx, cy) * 0.85, 0, Math.PI * 2);
      ctx.stroke();

      const rx = rotRef.current.x;
      const ry = rotRef.current.y;
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      // Transform 3D coordinates
      const fov = 380;
      const transformedAtoms = activeMolecule.atoms.map((atom, idx) => {
        // Y-axis rotation
        let x1 = atom.x * cosY + atom.z * sinY;
        let z1 = -atom.x * sinY + atom.z * cosY;
        // X-axis rotation
        let y2 = atom.y * cosX - z1 * sinX;
        let z2 = atom.y * sinX + z1 * cosX;

        const scale = fov / (fov + z2 + 200);
        const px = cx + x1 * scale * 1.6;
        const py = cy + y2 * scale * 1.6;
        const radiusMultiplier = styleMode === 'spacefill' ? 2.1 : styleMode === 'wireframe' ? 0.4 : 1;
        const currentR = atom.r * scale * 1.6 * radiusMultiplier;

        return {
          idx,
          atom,
          x: px,
          y: py,
          z: z2,
          scale,
          currentR,
          visible: atom.el === 'C' || showHydrogens
        };
      });

      // Filter and depth sort
      // Draw bonds first (bonds sorted by average z of both atoms)
      const sortedBonds = activeMolecule.bonds
        .map((b) => {
          const a1 = transformedAtoms[b.from];
          const a2 = transformedAtoms[b.to];
          const avgZ = (a1.z + a2.z) / 2;
          const visible = a1.visible && a2.visible;
          return { bond: b, a1, a2, avgZ, visible };
        })
        .filter((b) => b.visible)
        .sort((a, b) => b.avgZ - a.avgZ);

      // Render Bonds
      sortedBonds.forEach(({ bond, a1, a2 }) => {
        const dx = a2.x - a1.x;
        const dy = a2.y - a1.y;
        const len = Math.hypot(dx, dy);
        if (len < 1) return;

        const nx = -dy / len;
        const ny = dx / len;

        ctx.strokeStyle = '#3E8440'; // --fern
        ctx.lineCap = 'round';

        if (bond.order === 1) {
          ctx.lineWidth = styleMode === 'wireframe' ? 2 : 6 * Math.min(a1.scale, a2.scale);
          ctx.beginPath();
          ctx.moveTo(a1.x, a1.y);
          ctx.lineTo(a2.x, a2.y);
          ctx.stroke();
        } else if (bond.order === 2) {
          // Double bond: 2 parallel lines
          const offset = 5 * Math.min(a1.scale, a2.scale);
          ctx.lineWidth = styleMode === 'wireframe' ? 2 : 4 * Math.min(a1.scale, a2.scale);

          ctx.beginPath();
          ctx.moveTo(a1.x + nx * offset, a1.y + ny * offset);
          ctx.lineTo(a2.x + nx * offset, a2.y + ny * offset);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(a1.x - nx * offset, a1.y - ny * offset);
          ctx.lineTo(a2.x - nx * offset, a2.y - ny * offset);
          ctx.stroke();
        } else if (bond.order === 3) {
          // Triple bond: 3 parallel lines
          const offset = 7 * Math.min(a1.scale, a2.scale);
          ctx.lineWidth = styleMode === 'wireframe' ? 2 : 3.5 * Math.min(a1.scale, a2.scale);

          ctx.beginPath();
          ctx.moveTo(a1.x, a1.y);
          ctx.lineTo(a2.x, a2.y);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(a1.x + nx * offset, a1.y + ny * offset);
          ctx.lineTo(a2.x + nx * offset, a2.y + ny * offset);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(a1.x - nx * offset, a1.y - ny * offset);
          ctx.lineTo(a2.x - nx * offset, a2.y - ny * offset);
          ctx.stroke();
        }
      });

      // Sort atoms by Z (back to front)
      const sortedAtoms = [...transformedAtoms]
        .filter((a) => a.visible)
        .sort((a, b) => b.z - a.z);

      // Render Atoms
      sortedAtoms.forEach(({ atom, x, y, currentR }) => {
        ctx.beginPath();
        ctx.arc(x, y, Math.max(currentR, 3), 0, Math.PI * 2);

        if (atom.el === 'C') {
          // Carbon atom: fern green with highlight
          ctx.fillStyle = '#3E8440'; // var(--fern)
          ctx.fill();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#F7EFDA'; // var(--parchment)
          ctx.stroke();

          // Highlight sphere reflection
          ctx.beginPath();
          ctx.arc(x - currentR * 0.3, y - currentR * 0.3, currentR * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(186, 221, 127, 0.45)'; // var(--pistachio)
          ctx.fill();

          // Label
          if (styleMode !== 'wireframe') {
            ctx.fillStyle = '#F7EFDA'; // var(--parchment)
            ctx.font = `bold ${Math.max(12, Math.round(currentR * 0.8))}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(atom.label, x, y);
          }
        } else {
          // Hydrogen atom: pistachio/parchment with fern border
          ctx.fillStyle = '#BADD7F'; // var(--pistachio)
          ctx.fill();
          ctx.lineWidth = 1.8;
          ctx.strokeStyle = '#3E8440'; // var(--fern)
          ctx.stroke();

          // Label
          if (styleMode !== 'wireframe') {
            ctx.fillStyle = '#3E8440'; // var(--fern)
            ctx.font = `bold ${Math.max(10, Math.round(currentR * 0.8))}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('H', x, y);
          }
        }
      });

      // Render Angle Badge Overlay on Canvas if enabled
      if (showAngles && transformedAtoms.length > 1) {
        ctx.save();
        ctx.fillStyle = '#3E8440';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Sudut: ${activeMolecule.sudut}`, cx, height - 20);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab, activeMolecule, styleMode, isAutoRotating, showHydrogens, showAngles]);

  return (
    <section className="lab-section-container" id="lab" aria-labelledby="lab-heading">
      <div className="section-head text-center">
        <span className="section-pill">Laboratorium Virtual 3D</span>
        <h2 className="section-title" id="lab-heading">
          Lab Visualisasi Molekul Karbon
        </h2>
        <p className="section-subtitle">
          Eksplorasi bentuk ruang tiga dimensi atom karbon secara langsung. Putar struktur 360°, amati sudut ikatan, dan bandingkan bentuk tetrahedral, trigonal planar, serta linear!
        </p>
      </div>

      {/* Selector Molekul Pembelajaran */}
      <div className="molecule-selector-bar">
        {MOLECULES.map((mol) => (
          <button
            key={mol.id}
            type="button"
            onClick={() => setSelectedMoleculeId(mol.id)}
            className={`mol-select-btn ${selectedMoleculeId === mol.id ? 'active' : ''}`}
          >
            <span className="mol-name">{mol.nama}</span>
            <span className="mol-formula text-mono">({mol.rumus})</span>
          </button>
        ))}
      </div>

      {/* Main Lab Workspace Box */}
      <div className="lab-workspace-grid">
        {/* Left / Center: Interactive 3D Canvas or MolView Frame */}
        <div className="lab-viewport-card">
          <div className="viewport-header">
            <div className="viewport-title-group">
              <span className="vp-tag">{activeMolecule.golongan}</span>
              <h3 className="vp-name">{activeMolecule.nama} ({activeMolecule.rumus})</h3>
            </div>

            {/* Switch Mode: 3D Interaktif Lokal vs MolView */}
            <div className="view-mode-toggle">
              <button
                type="button"
                onClick={() => setActiveTab('simulator')}
                className={`btn-mode ${activeTab === 'simulator' ? 'active' : ''}`}
              >
                Simulasi 3D Interaktif
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('molview')}
                className={`btn-mode ${activeTab === 'molview' ? 'active' : ''}`}
              >
                MolView Explorer
              </button>
            </div>
          </div>

          {activeTab === 'simulator' ? (
            <div className="canvas-wrapper">
              <canvas
                ref={canvasRef}
                width={520}
                height={380}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="interactive-3d-canvas"
                title="Tahan klik kiri dan geser untuk memutar molekul secara 3D"
              />

              <div className="canvas-hint">
                <Compass size={14} />
                <span>Geser mouse atau sentuh layar untuk memutar molekul 3D</span>
              </div>

              {/* Floating Quick Controls on Canvas */}
              <div className="canvas-float-bar">
                <button
                  type="button"
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  className={`btn-canvas-tool ${isAutoRotating ? 'active' : ''}`}
                  title={isAutoRotating ? 'Jeda Putaran Otomatis' : 'Mulai Putaran Otomatis'}
                >
                  {isAutoRotating ? <Pause size={16} /> : <Play size={16} />}
                </button>

                <button
                  type="button"
                  onClick={resetView}
                  className="btn-canvas-tool"
                  title="Kembalikan Orientasi Semula"
                >
                  <RefreshCw size={16} />
                </button>

                <div className="tool-divider"></div>

                {/* Style Mode Selector */}
                <button
                  type="button"
                  onClick={() => setStyleMode('ballstick')}
                  className={`btn-canvas-tool text-btn ${styleMode === 'ballstick' ? 'active' : ''}`}
                  title="Model Bola & Batang"
                >
                  Bola-Batang
                </button>
                <button
                  type="button"
                  onClick={() => setStyleMode('spacefill')}
                  className={`btn-canvas-tool text-btn ${styleMode === 'spacefill' ? 'active' : ''}`}
                  title="Model Pengisian Ruang (CPK)"
                >
                  Ruang
                </button>
                <button
                  type="button"
                  onClick={() => setStyleMode('wireframe')}
                  className={`btn-canvas-tool text-btn ${styleMode === 'wireframe' ? 'active' : ''}`}
                  title="Model Kerangka Kawat"
                >
                  Kerangka
                </button>
              </div>
            </div>
          ) : (
            <div className="molview-iframe-container">
              <iframe
                title={`MolView 3D - ${activeMolecule.nama}`}
                src={`https://molview.org/?smiles=${activeMolecule.smiles}&bg=F7EFDA`}
                className="molview-frame"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
              <div className="molview-footer-note">
                <span>Ditenagai oleh MolView Interactive 3D</span>
                <a
                  href={`https://molview.org/?smiles=${activeMolecule.smiles}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-molview-external"
                >
                  <span>Buka di MolView Penuh</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Right: Simulation Control & Molecular Analysis Panel */}
        <div className="lab-info-panel">
          <div className="panel-box">
            <h4 className="panel-title">
              <Info size={18} />
              <span>Analisis Geometri Karbon</span>
            </h4>

            <div className="geom-stats-grid">
              <div className="geom-item">
                <span className="geom-lbl">Golongan</span>
                <strong className="geom-val">{activeMolecule.golongan}</strong>
              </div>
              <div className="geom-item">
                <span className="geom-lbl">Rumus Molekul</span>
                <strong className="geom-val text-mono">{activeMolecule.rumus}</strong>
              </div>
              <div className="geom-item">
                <span className="geom-lbl">Geometri Ruang</span>
                <strong className="geom-val">{activeMolecule.geometri}</strong>
              </div>
              <div className="geom-item">
                <span className="geom-lbl">Hibridisasi</span>
                <strong className="geom-val text-mono">{activeMolecule.hibridisasi}</strong>
              </div>
              <div className="geom-item full-span">
                <span className="geom-lbl">Sudut Ikatan Karakteristik</span>
                <strong className="geom-val text-mono">{activeMolecule.sudut}</strong>
              </div>
            </div>

            <p className="geom-explanation">{activeMolecule.penjelasan}</p>
          </div>

          {/* Panel Kontrol Pengamatan */}
          <div className="panel-box">
            <h4 className="panel-title">
              <Layers size={18} />
              <span>Pengaturan Observasi</span>
            </h4>

            <div className="controls-list">
              <label className="checkbox-control">
                <input
                  type="checkbox"
                  checked={showHydrogens}
                  onChange={(e) => setShowHydrogens(e.target.checked)}
                />
                <span className="control-text">Tampilkan Atom Hidrogen (H)</span>
              </label>

              <label className="checkbox-control">
                <input
                  type="checkbox"
                  checked={showAngles}
                  onChange={(e) => setShowAngles(e.target.checked)}
                />
                <span className="control-text">Tampilkan Label Sudut Ikatan ({activeMolecule.sudut})</span>
              </label>
            </div>

            {/* Legenda Warna Atom Baku Sesuai AGENTS.md */}
            <div className="atom-legend-box">
              <div className="legend-label">Legenda Warna Atom:</div>
              <div className="legend-items">
                <div className="legend-chip">
                  <span className="legend-dot dot-carbon"></span>
                  <span>Atom Karbon (C)</span>
                </div>
                <div className="legend-chip">
                  <span className="legend-dot dot-hydrogen"></span>
                  <span>Atom Hidrogen (H)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

