import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MOLECULES_3D } from '../data/hydrocarbonData';
import { 
  RotateCw, 
  Eye, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  ExternalLink, 
  Info,
  Compass
} from 'lucide-react';

export default function MoleculeLab() {
  const mountRef = useRef(null);
  const [selectedMoleculeId, setSelectedMoleculeId] = useState("methane");
  const [viewMode, setViewMode] = useState("3d-native"); // "3d-native" | "molview"
  const [renderStyle, setRenderStyle] = useState("ball-and-stick"); // "ball-and-stick" | "spacefill" | "wireframe"
  const [isRotating, setIsRotating] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const selectedMolecule = MOLECULES_3D.find(m => m.id === selectedMoleculeId) || MOLECULES_3D[0];

  // Three.js scene refs
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const moleculeGroupRef = useRef(null);
  const isMouseDownRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const reqAnimationIdRef = useRef(null);

  // Helper text canvas for atom symbols
  const createTextCanvas = (text, bgCol = "#334155") => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(64, 64, 52, 0, 2 * Math.PI);
    ctx.fillStyle = bgCol;
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();

    ctx.font = "bold 56px Quicksand, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 64, 66);
    return canvas;
  };

  // Reusable builder for atoms and bonds
  const buildMoleculeModel = (mol, style, withLabels) => {
    const group = moleculeGroupRef.current;
    if (!group) return;

    // Reset group position to origin before clearing and recalculating
    group.position.set(0, 0, 0);

    // Clear previous children
    while (group.children.length > 0) {
      const child = group.children[0];
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
        else child.material.dispose();
      }
      group.remove(child);
    }

    // Material definitions
    const isWire = style === "wireframe";
    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x2d3748,
      roughness: 0.25,
      metalness: 0.2,
      wireframe: isWire
    });

    const hydrogenMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.15,
      metalness: 0.1,
      wireframe: isWire
    });

    const bondMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.4,
      metalness: 0.1,
      wireframe: isWire
    });

    // Sphere radius configuration
    let cRadius = 0.48;
    let hRadius = 0.3;
    let bondRadius = 0.09;

    if (style === "spacefill") {
      cRadius = 0.85;
      hRadius = 0.55;
    }

    // Add Atoms
    mol.atoms.forEach((atom) => {
      const isC = atom.element === "C";
      const radius = isC ? cRadius : hRadius;
      const sphereGeo = new THREE.SphereGeometry(radius, 32, 32);
      const sphereMesh = new THREE.Mesh(sphereGeo, isC ? carbonMat : hydrogenMat);
      sphereMesh.position.set(atom.x, atom.y, atom.z);
      group.add(sphereMesh);

      // Element Label Sprite
      if (withLabels && style !== "spacefill") {
        const textCanvas = createTextCanvas(atom.element, isC ? "#1E293B" : "#475569");
        const texture = new THREE.CanvasTexture(textCanvas);
        const spriteMat = new THREE.SpriteMaterial({ map: texture, depthTest: false });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.scale.set(0.42, 0.42, 1);
        sprite.position.set(atom.x, atom.y + (isC ? 0.52 : 0.4), atom.z);
        group.add(sprite);
      }
    });

    // Add Bonds (Only in ball-and-stick or wireframe)
    if (style !== "spacefill" && mol.bonds) {
      mol.bonds.forEach((bond) => {
        const a1 = mol.atoms[bond.from];
        const a2 = mol.atoms[bond.to];
        if (!a1 || !a2) return;

        const start = new THREE.Vector3(a1.x, a1.y, a1.z);
        const end = new THREE.Vector3(a2.x, a2.y, a2.z);
        const distance = start.distanceTo(end);
        const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

        const orientation = new THREE.Matrix4();
        orientation.lookAt(start, end, new THREE.Vector3(0, 1, 0));

        const order = bond.order || 1;

        if (order === 1) {
          const cylinderGeo = new THREE.CylinderGeometry(bondRadius, bondRadius, distance, 16);
          const cylinder = new THREE.Mesh(cylinderGeo, bondMat);
          cylinder.position.copy(midpoint);
          cylinder.quaternion.setFromRotationMatrix(orientation);
          cylinder.rotateX(Math.PI / 2);
          group.add(cylinder);
        } else if (order === 2) {
          const offsetDist = 0.12;
          [-offsetDist, offsetDist].forEach((off) => {
            const cylinderGeo = new THREE.CylinderGeometry(bondRadius * 0.8, bondRadius * 0.8, distance, 16);
            const cylinder = new THREE.Mesh(cylinderGeo, bondMat);
            cylinder.position.copy(midpoint);
            cylinder.quaternion.setFromRotationMatrix(orientation);
            cylinder.rotateX(Math.PI / 2);
            cylinder.translateX(off);
            group.add(cylinder);
          });
        } else if (order === 3) {
          const offsetDist = 0.14;
          [0, -offsetDist, offsetDist].forEach((off, idx) => {
            const cylinderGeo = new THREE.CylinderGeometry(bondRadius * 0.75, bondRadius * 0.75, distance, 16);
            const cylinder = new THREE.Mesh(cylinderGeo, bondMat);
            cylinder.position.copy(midpoint);
            cylinder.quaternion.setFromRotationMatrix(orientation);
            cylinder.rotateX(Math.PI / 2);
            if (idx === 1) cylinder.translateX(-offsetDist * 0.8);
            if (idx === 2) cylinder.translateX(offsetDist * 0.8);
            group.add(cylinder);
          });
        }
      });
    }

    // Perfectly center the geometry around (0, 0, 0)
    const box = new THREE.Box3().setFromObject(group);
    const center = new THREE.Vector3();
    box.getCenter(center);
    group.position.set(-center.x, -center.y, -center.z);
  };

  // Setup Three.js scene
  useEffect(() => {
    if (viewMode !== "3d-native" || !mountRef.current) return;

    const container = mountRef.current;
    const initialWidth = container.clientWidth || 600;
    const initialHeight = container.clientHeight || 480;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xfbfaf7);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, initialWidth / initialHeight, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(initialWidth, initialHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.1);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd1eae0, 0.5);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // Group for molecule
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);
    moleculeGroupRef.current = moleculeGroup;

    // Initial build
    buildMoleculeModel(selectedMolecule, renderStyle, showLabels);

    // Animation Loop
    const animate = () => {
      reqAnimationIdRef.current = requestAnimationFrame(animate);
      if (moleculeGroupRef.current && isRotating && !isMouseDownRef.current) {
        moleculeGroupRef.current.rotation.y += 0.008;
        moleculeGroupRef.current.rotation.x += 0.0028;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize Observer for robust responsive layout
    const updateSize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 480;
      if (w > 0 && h > 0) {
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    // Mouse drag interactions
    const handleMouseDown = (e) => {
      isMouseDownRef.current = true;
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isMouseDownRef.current || !moleculeGroupRef.current) return;
      const deltaX = e.clientX - mousePosRef.current.x;
      const deltaY = e.clientY - mousePosRef.current.y;

      moleculeGroupRef.current.rotation.y += deltaX * 0.01;
      moleculeGroupRef.current.rotation.x += deltaY * 0.01;

      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      cameraRef.current.position.z = Math.min(Math.max(cameraRef.current.position.z + e.deltaY * 0.005, 3), 16);
    };

    // Touch events for mobile phones
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isMouseDownRef.current = true;
        mousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (!isMouseDownRef.current || !moleculeGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - mousePosRef.current.x;
      const deltaY = e.touches[0].clientY - mousePosRef.current.y;

      moleculeGroupRef.current.rotation.y += deltaX * 0.012;
      moleculeGroupRef.current.rotation.x += deltaY * 0.012;

      mousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isMouseDownRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('wheel', handleWheel, { passive: false });
    domElement.addEventListener('touchstart', handleTouchStart);
    domElement.addEventListener('touchmove', handleTouchMove);
    domElement.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', updateSize);

    return () => {
      cancelAnimationFrame(reqAnimationIdRef.current);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('mousedown', handleMouseDown);
      domElement.removeEventListener('wheel', handleWheel);
      domElement.removeEventListener('touchstart', handleTouchStart);
      domElement.removeEventListener('touchmove', handleTouchMove);
      domElement.removeEventListener('touchend', handleTouchEnd);
      renderer.dispose();
    };
  }, [viewMode]);

  // Re-build molecule geometry whenever molecule or renderStyle changes
  useEffect(() => {
    if (viewMode === "3d-native" && moleculeGroupRef.current) {
      buildMoleculeModel(selectedMolecule, renderStyle, showLabels);
    }
  }, [selectedMoleculeId, renderStyle, showLabels, viewMode]);

  const handleResetCamera = () => {
    if (cameraRef.current && moleculeGroupRef.current) {
      cameraRef.current.position.set(0, 0, 7.5);
      moleculeGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  const handleZoom = (inOut) => {
    if (!cameraRef.current) return;
    const currentZ = cameraRef.current.position.z;
    const delta = inOut === 'in' ? -1.2 : 1.2;
    cameraRef.current.position.z = Math.min(Math.max(currentZ + delta, 3.5), 14);
  };

  return (
    <section id="lab" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Laboratorium Virtual 3D
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-800 tracking-tight font-heading">
          Visualisasi 3D Geometri Atom Karbon
        </h2>
        <p className="mt-3 text-base sm:text-lg text-stone-600">
          Amati bentuk ruang, sudut ikatan kovalen, dan hibridisasi orbital atom karbon secara realtime. Putar, perbesar, dan ubah model molekul sesuai kebutuhan belajarmu.
        </p>
      </div>

      {/* Lab Container Card */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-stone-200/80 shadow-xl overflow-hidden">
        
        {/* Top Control Bar: Molecule Selector & Mode Switching */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-[#FAF7F2] flex flex-wrap items-center justify-between gap-4">
          
          {/* Molecule Selection Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 w-full lg:w-auto scrollbar-none">
            {MOLECULES_3D.map((m) => {
              const isActive = m.id === selectedMoleculeId;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMoleculeId(m.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20" 
                      : "bg-white text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 border border-stone-200/70"
                  }`}
                >
                  {m.name} <span className="opacity-80 font-normal">({m.formula})</span>
                </button>
              );
            })}
          </div>

          {/* Engine Selector (3D Canvas vs MolView Embed) */}
          <div className="flex items-center gap-1.5 bg-stone-200/60 p-1 rounded-xl text-xs font-medium ml-auto">
            <button
              onClick={() => setViewMode("3d-native")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "3d-native"
                  ? "bg-white text-emerald-800 shadow-sm font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              WebGL 3D Studio
            </button>
            <button
              onClick={() => setViewMode("molview")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === "molview"
                  ? "bg-white text-emerald-800 shadow-sm font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              MolView Embed
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </button>
          </div>
        </div>

        {/* Main Work Area: 3D Canvas / MolView Viewport + Sidebar Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          
          {/* 3D Visualizer Viewport (8 Columns) */}
          <div className="lg:col-span-8 relative bg-gradient-to-b from-[#FAF8F5] to-[#F3EFE6] border-b lg:border-b-0 lg:border-r border-stone-200 flex flex-col justify-between">
            
            {/* Viewport Top Overlay: Legend and Status */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 pointer-events-none">
              <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-200/70 shadow-sm text-xs font-medium text-stone-700 flex items-center gap-3 pointer-events-auto">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-800 inline-block shadow-inner"></span>
                  Karbon (C)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-100 border border-stone-400 inline-block shadow-sm"></span>
                  Hidrogen (H)
                </span>
              </div>

              <div className="bg-emerald-500/10 backdrop-blur-md text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-semibold border border-emerald-500/20 flex items-center gap-1">
                <span>{selectedMolecule.category}</span>
                <span>•</span>
                <span>{selectedMolecule.bondAngle}</span>
              </div>
            </div>

            {/* Quick Action Float Tools in 3D Viewport */}
            {viewMode === "3d-native" && (
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-stone-200/80 shadow-md">
                {/* Auto Rotate Toggle */}
                <button
                  onClick={() => setIsRotating(!isRotating)}
                  title={isRotating ? "Jeda Rotasi Otomatis" : "Mulai Rotasi Otomatis"}
                  className={`p-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isRotating 
                      ? "bg-emerald-100 text-emerald-800" 
                      : "text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  <RotateCw className={`w-4 h-4 ${isRotating ? "animate-spin" : ""}`} />
                </button>

                {/* Reset View */}
                <button
                  onClick={handleResetCamera}
                  title="Reset Posisi Kamera"
                  className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-medium transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                </button>

                <div className="w-[1px] h-5 bg-stone-200"></div>

                {/* Zoom In */}
                <button
                  onClick={() => handleZoom('in')}
                  title="Perbesar"
                  className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-all cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                {/* Zoom Out */}
                <button
                  onClick={() => handleZoom('out')}
                  title="Perkecil"
                  className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-all cursor-pointer"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <div className="w-[1px] h-5 bg-stone-200"></div>

                {/* Toggle Atom Labels */}
                <button
                  onClick={() => setShowLabels(!showLabels)}
                  title={showLabels ? "Sembunyikan Label Atom" : "Tampilkan Label Atom"}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                    showLabels
                      ? "bg-emerald-600 text-white"
                      : "text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Label</span>
                </button>
              </div>
            )}

            {/* Viewport Render Container */}
            {viewMode === "3d-native" ? (
              <div 
                ref={mountRef} 
                className="w-full h-[450px] sm:h-[520px] cursor-grab active:cursor-grabbing outline-none flex items-center justify-center"
              />
            ) : (
              <div className="w-full h-[450px] sm:h-[520px] bg-stone-100 flex flex-col relative">
                <iframe
                  title={`MolView ${selectedMolecule.name}`}
                  src={`https://molview.org/?cid=${selectedMolecule.molviewCid}&bg=fbfaf7`}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  loading="lazy"
                />
                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[11px] text-stone-500 shadow border border-stone-200">
                  Didukung oleh MolView Open Chemistry
                </div>
              </div>
            )}

            {/* Instruction Tip below viewport */}
            <div className="px-4 py-2 bg-stone-100/60 border-t border-stone-200/50 text-[11px] sm:text-xs text-stone-500 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-600" />
                Klik & seret untuk memutar ruang 3D • Gulir mouse untuk zoom
              </span>
              <span className="hidden sm:inline text-stone-400">
                Rendering WebGL 60FPS
              </span>
            </div>
          </div>

          {/* Molecule Inspector & Control Panel (4 Columns) */}
          <div className="lg:col-span-4 p-5 sm:p-6 bg-white flex flex-col justify-between">
            <div className="space-y-5">
              
              {/* Molecule Heading & Formula */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-lg">
                    {selectedMolecule.category}
                  </span>
                  <span className="font-mono text-sm font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                    CID #{selectedMolecule.molviewCid}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mt-2 font-heading">
                  {selectedMolecule.name}
                </h3>
                <div className="text-3xl font-extrabold text-emerald-700 font-mono tracking-tight mt-0.5">
                  {selectedMolecule.formula}
                </div>
              </div>

              {/* Chemical Spec Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/70">
                  <div className="text-[11px] text-stone-500 font-medium">Bentuk Geometri</div>
                  <div className="text-xs sm:text-sm font-bold text-stone-800 mt-0.5">
                    {selectedMolecule.geometry}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/70">
                  <div className="text-[11px] text-stone-500 font-medium">Hibridisasi Karbon</div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-700 mt-0.5">
                    {selectedMolecule.hybridization}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/70">
                  <div className="text-[11px] text-stone-500 font-medium">Sudut Ikatan Ideal</div>
                  <div className="text-xs sm:text-sm font-bold text-stone-800 mt-0.5">
                    {selectedMolecule.bondAngle}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/70">
                  <div className="text-[11px] text-stone-500 font-medium">Jumlah Atom</div>
                  <div className="text-xs sm:text-sm font-bold text-stone-800 mt-0.5">
                    {selectedMolecule.atoms.length} Atom Total
                  </div>
                </div>
              </div>

              {/* Molecule Description */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-stone-700 text-xs sm:text-sm leading-relaxed">
                <div className="font-semibold text-emerald-900 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Karakteristik Kimia:
                </div>
                {selectedMolecule.description}
              </div>

              {/* Representation Model Style Toggles */}
              {viewMode === "3d-native" && (
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-2">
                    Model Representasi:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "ball-and-stick", label: "Bola & Tongkat" },
                      { id: "spacefill", label: "Space-fill (VDW)" },
                      { id: "wireframe", label: "Wireframe" }
                    ].map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setRenderStyle(style.id)}
                        className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                          renderStyle === style.id
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                            : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                        }`}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Quick Test Prompt */}
            <div className="mt-6 pt-4 border-t border-stone-100">
              <a
                href="#quiz"
                className="w-full py-2.5 px-4 bg-stone-900 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-200 shadow cursor-pointer"
              >
                <span>Uji Pengetahuan Bentuk Geometri Ini di Kuis</span>
                <span>→</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
