import React, { useState } from 'react';
import { 
  ALKANA_DATA, 
  ALKENA_DATA, 
  ALKUNA_DATA, 
  ISOMER_DATA 
} from '../data/hydrocarbonData';
import { 
  BookOpen, 
  Atom, 
  FlaskConical, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Split, 
  Binary 
} from 'lucide-react';

export default function MateriSection() {
  const [activeTab, setActiveTab] = useState('alkana');
  const [selectedIsomerIndex, setSelectedIsomerIndex] = useState(0);

  // Interactive IUPAC Explorer state
  const [explorerChain, setExplorerChain] = useState(3);
  const [explorerType, setExplorerType] = useState('alkana');

  const prefixes = [
    { n: 1, root: 'Met' },
    { n: 2, root: 'Et' },
    { n: 3, root: 'Prop' },
    { n: 4, root: 'But' },
    { n: 5, root: 'Pent' },
    { n: 6, root: 'Heks' },
    { n: 7, root: 'Hept' },
    { n: 8, root: 'Okt' }
  ];

  const getCompoundInfo = (n, type) => {
    const root = prefixes.find(p => p.n === n)?.root || 'Karbon';
    if (type === 'alkana') {
      const hCount = 2 * n + 2;
      return {
        name: `${root}ana`,
        formula: `C${n === 1 ? '' : n}H${hCount}`,
        bondType: 'Ikatan Tunggal (C-C)',
        hybridization: 'sp³',
        angle: '109.5°',
        saturation: 'Jenuh',
        condensed: n === 1 ? 'CH₄' : n === 2 ? 'CH₃-CH₃' : n === 3 ? 'CH₃-CH₂-CH₃' : `CH₃-(CH₂)${n-2}-CH₃`
      };
    } else if (type === 'alkena') {
      if (n === 1) return { name: 'Tidak Ada (Minimal C=2)', formula: '-', saturation: 'Tak Jenuh', bondType: '-', hybridization: '-', angle: '-', condensed: '-' };
      const hCount = 2 * n;
      return {
        name: `1-${root}ena`,
        formula: `C${n}H${hCount}`,
        bondType: '1 Ikatan Rangkap Dua (C=C)',
        hybridization: 'sp²',
        angle: '120°',
        saturation: 'Tak Jenuh',
        condensed: n === 2 ? 'CH₂=CH₂' : n === 3 ? 'CH₂=CH-CH₃' : `CH₂=CH-(CH₂)${n-3}-CH₃`
      };
    } else {
      if (n === 1) return { name: 'Tidak Ada (Minimal C=2)', formula: '-', saturation: 'Tak Jenuh', bondType: '-', hybridization: '-', angle: '-', condensed: '-' };
      const hCount = 2 * n - 2;
      return {
        name: `1-${root}una`,
        formula: `C${n}H${hCount}`,
        bondType: '1 Ikatan Rangkap Tiga (C≡C)',
        hybridization: 'sp',
        angle: '180°',
        saturation: 'Sangat Tak Jenuh',
        condensed: n === 2 ? 'CH≡CH' : n === 3 ? 'CH≡C-CH₃' : `CH≡C-(CH₂)${n-3}-CH₃`
      };
    }
  };

  const currentCompound = getCompoundInfo(explorerChain, explorerType);

  return (
    <section id="materi" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          Modul Pembelajaran Terpadu
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-800 tracking-tight font-heading">
          Eksplorasi Konsep, Tata Nama IUPAC & Isomer
        </h2>
        <p className="mt-3 text-base sm:text-lg text-stone-600">
          Pelajari tuntas perbedaan karakteristik ikatan kimia, aturan penamaan resmi IUPAC, serta fenomena keunikan isomer pada senyawa hidrokarbon.
        </p>
      </div>

      {/* Main Tab Bar Navigation */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-[#EFECE4] p-1.5 rounded-2xl flex flex-wrap gap-1 shadow-inner max-w-2xl w-full justify-center">
          {[
            { id: 'alkana', label: 'Alkana', badge: 'CₙH₂ₙ₊₂' },
            { id: 'alkena', label: 'Alkena', badge: 'CₙH₂ₙ' },
            { id: 'alkuna', label: 'Alkuna', badge: 'CₙH₂ₙ₋₂' },
            { id: 'isomer', label: 'Isomerisme', badge: 'Struktur' },
            { id: 'explorer', label: 'IUPAC Builder', badge: 'Interaktif' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-white text-emerald-800 shadow-md scale-[1.02]'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                  isActive ? 'bg-emerald-100 text-emerald-800 font-bold' : 'bg-stone-200 text-stone-600'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content for Alkana */}
      {activeTab === 'alkana' && (
        <HydrocarbonFamilyCard data={ALKANA_DATA} />
      )}

      {/* Content for Alkena */}
      {activeTab === 'alkena' && (
        <HydrocarbonFamilyCard data={ALKENA_DATA} />
      )}

      {/* Content for Alkuna */}
      {activeTab === 'alkuna' && (
        <HydrocarbonFamilyCard data={ALKUNA_DATA} />
      )}

      {/* Content for Isomerism */}
      {activeTab === 'isomer' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Overview Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  Konsep Isomerisme
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-stone-800 mt-2 font-heading">
                  Satu Rumus Molekul, Beragam Wajah Struktur
                </h3>
                <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-3xl">
                  Isomer adalah senyawa-senyawa yang memiliki <strong>rumus molekul sama</strong>, namun memiliki susunan kerangka, posisi ikatan rangkap, gugus fungsi, atau penataan ruang yang berbeda sehingga menghasilkan sifat kimia dan fisika yang berbeda.
                </p>
              </div>

              {/* Isomer Category Selector buttons */}
              <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
                {ISOMER_DATA.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedIsomerIndex(index)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-left transition-all cursor-pointer ${
                      selectedIsomerIndex === index
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-700 hover:bg-emerald-50'
                    }`}
                  >
                    {item.type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Isomer Deep Dive Card */}
          {(() => {
            const currentIsomer = ISOMER_DATA[selectedIsomerIndex];
            return (
              <div className="bg-white rounded-3xl border border-stone-200/80 shadow-lg p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Split className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-xl sm:text-2xl font-bold text-stone-900 font-heading">
                    {currentIsomer.type}
                  </h4>
                </div>
                <p className="text-stone-600 text-sm sm:text-base mb-6">
                  {currentIsomer.definition}
                </p>

                {/* Comparison Visual Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  
                  {/* Compound A */}
                  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-emerald-200/70 hover:border-emerald-400 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                        {currentIsomer.examplePair.compoundA.type}
                      </span>
                      <span className="text-xs font-mono text-stone-500">
                        Rumus: {currentIsomer.examplePair.formula}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-stone-800 font-heading">
                      {currentIsomer.examplePair.compoundA.name}
                    </div>
                    <div className="my-4 p-3 bg-white rounded-xl border border-stone-200 font-mono text-sm sm:text-base text-emerald-900 font-semibold text-center tracking-wide">
                      {currentIsomer.examplePair.compoundA.structure}
                    </div>
                    <div className="text-xs text-stone-500 flex items-center justify-between">
                      <span>Titik Didih:</span>
                      <span className="font-semibold text-stone-700">{currentIsomer.examplePair.compoundA.bp}</span>
                    </div>
                  </div>

                  {/* Compound B */}
                  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-amber-200/70 hover:border-amber-400 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
                        {currentIsomer.examplePair.compoundB.type}
                      </span>
                      <span className="text-xs font-mono text-stone-500">
                        Rumus: {currentIsomer.examplePair.formula}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-stone-800 font-heading">
                      {currentIsomer.examplePair.compoundB.name}
                    </div>
                    <div className="my-4 p-3 bg-white rounded-xl border border-stone-200 font-mono text-sm sm:text-base text-amber-900 font-semibold text-center tracking-wide">
                      {currentIsomer.examplePair.compoundB.structure}
                    </div>
                    <div className="text-xs text-stone-500 flex items-center justify-between">
                      <span>Titik Didih:</span>
                      <span className="font-semibold text-stone-700">{currentIsomer.examplePair.compoundB.bp}</span>
                    </div>
                  </div>

                </div>

                {/* Explanation insight box */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-stone-700 text-xs sm:text-sm flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-900">Analisis Ilmiah: </span>
                    {currentIsomer.explanation}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Content for Interactive IUPAC Explorer / Builder */}
      {activeTab === 'explorer' && (
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xl p-6 sm:p-8 animate-fadeIn">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Laboratorium Nomenklatur Interaktif
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-2 font-heading">
              Simulator Rumus & Struktur IUPAC
            </h3>
            <p className="mt-2 text-stone-600 text-sm sm:text-base">
              Pilih jumlah atom karbon (awalan Yunani) dan jenis ikatan hidrokarbon untuk melihat bagaimana nama resmi IUPAC, rumus molekul, dan struktur mampat terbentuk secara dinamis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Interactive Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Step 1: Select Type */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2">
                  1. Pilih Golongan Hidrokarbon:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'alkana', label: 'Alkana (-ana)' },
                    { id: 'alkena', label: 'Alkena (-ena)' },
                    { id: 'alkuna', label: 'Alkuna (-una)' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setExplorerType(t.id)}
                      className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                        explorerType === t.id
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Carbon Count */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    2. Jumlah Atom Karbon (C):
                  </label>
                  <span className="font-mono text-emerald-700 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded">
                    n = {explorerChain} Karbon
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {prefixes.map((p) => {
                    const isDisabled = (explorerType === 'alkena' || explorerType === 'alkuna') && p.n === 1;
                    return (
                      <button
                        key={p.n}
                        disabled={isDisabled}
                        onClick={() => setExplorerChain(p.n)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          isDisabled
                            ? 'opacity-40 cursor-not-allowed bg-stone-100 text-stone-400 border-stone-200'
                            : explorerChain === p.n
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-emerald-50'
                        }`}
                      >
                        <div className="text-[11px] text-stone-400">C{p.n}</div>
                        <div>{p.root}-</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-xs text-stone-600 space-y-1.5">
                <div className="font-bold text-stone-800 flex items-center gap-1.5">
                  <Binary className="w-4 h-4 text-emerald-600" />
                  Kaidah Awalan Jumlah Karbon:
                </div>
                <div>Met- (1), Et- (2), Prop- (3), But- (4), Pent- (5), Heks- (6), Hept- (7), Okt- (8).</div>
              </div>
            </div>

            {/* Live Result Display (7 cols) */}
            <div className="lg:col-span-7 bg-gradient-to-br from-[#FAF8F5] to-[#EAE6DB] rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-inner">
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full">
                  Hasil Penamaan IUPAC
                </span>
                <span className="text-xs font-semibold text-stone-500">
                  {currentCompound.saturation}
                </span>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200/80 mb-6">
                <div className="text-xs text-stone-400 font-medium">Nama Senyawa:</div>
                <h4 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-heading mt-1 text-emerald-800">
                  {currentCompound.name}
                </h4>

                <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-stone-400">Rumus Molekul:</div>
                    <div className="text-2xl font-mono font-bold text-stone-800">
                      {currentCompound.formula}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-stone-400">Hibridisasi & Sudut:</div>
                    <div className="text-sm font-semibold text-stone-700">
                      {currentCompound.hybridization} • {currentCompound.angle}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-stone-400">Tipe Ikatan:</div>
                    <div className="text-sm font-semibold text-stone-700">
                      {currentCompound.bondType}
                    </div>
                  </div>
                </div>
              </div>

              {/* Condensed Structure formula */}
              <div className="bg-white/80 rounded-2xl p-5 border border-stone-200/80 mb-6">
                <div className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                  Rumus Struktur Terkondensasi:
                </div>
                <div className="font-mono text-base sm:text-lg font-bold text-stone-900 bg-stone-50 p-3 rounded-xl border border-stone-200 overflow-x-auto text-center tracking-wider">
                  {currentCompound.condensed}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <a
                  href="#lab"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
                >
                  <Atom className="w-4 h-4 text-emerald-600" />
                  Lihat visualisasi 3D senyawa ini di Lab Molekul
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}

// Reusable component for Alkana, Alkena, and Alkuna details
function HydrocarbonFamilyCard({ data }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Overview & Formula Card */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-md p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Golongan Senyawa
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-2 font-heading">
              {data.title}
            </h3>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              {data.description}
            </p>

            {/* Key characteristics list */}
            <div className="mt-5 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Karakteristik Kunci:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-600">
                {data.characteristics.map((char, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-[#FAF8F5] p-2.5 rounded-xl border border-stone-200/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{char}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Formula Display Box */}
          <div className="lg:col-span-4 bg-gradient-to-br from-emerald-50 to-[#EAE6DB] rounded-3xl p-6 border border-emerald-100/80 text-center shadow-inner">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Rumus Umum Golongan
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-900 font-mono my-3 tracking-tight">
              {data.formula}
            </div>
            <div className="text-xs text-stone-600">
              Akhiran IUPAC resmi: <strong className="text-emerald-800 font-mono text-sm">{data.suffix}</strong>
            </div>

            <div className="mt-4 pt-4 border-t border-emerald-200/60 text-left text-xs text-stone-600 space-y-1">
              <div>• <strong>n</strong> = Jumlah atom karbon</div>
              <div>• <strong>2n+...</strong> = Jumlah atom hidrogen</div>
            </div>
          </div>
        </div>
      </div>

      {/* Homolog Series Table & IUPAC Steps Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Deret Homolog Table (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-stone-200/80 shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-stone-800 font-heading flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-emerald-600" />
              Deret Homolog Utama
            </h4>
            <span className="text-xs font-medium text-stone-400">Selisih tiap anggota: -CH₂-</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-semibold bg-[#FAF8F5]">
                  <th className="py-2.5 px-3 rounded-l-lg">Nama</th>
                  <th className="py-2.5 px-3">Rumus</th>
                  <th className="py-2.5 px-3">Titik Didih</th>
                  <th className="py-2.5 px-3 rounded-r-lg">Fase</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {data.homologSeries.map((item, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-stone-800">{item.name}</td>
                    <td className="py-2.5 px-3 font-mono font-medium text-emerald-800">{item.formula}</td>
                    <td className="py-2.5 px-3 text-stone-600">{item.boilingPoint}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        item.state === 'Gas' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.state}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* IUPAC Nomenclature Rules (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-stone-200/80 shadow-md p-6">
          <h4 className="text-lg font-bold text-stone-800 font-heading mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Langkah Tata Nama IUPAC
          </h4>

          <div className="space-y-3.5 mb-6">
            {data.iupacRules.map((rule) => (
              <div key={rule.step} className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/60">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  {rule.step}
                </span>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-stone-800">
                    {rule.title}
                  </div>
                  <div className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    {rule.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Example Breakdown Box */}
          {data.example && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
              <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                Contoh Penamaan:
              </div>
              <div className="text-base font-extrabold text-stone-900 font-heading">
                {data.example.name}
              </div>
              <div className="font-mono text-xs text-emerald-800 bg-white p-2 rounded-lg border border-emerald-200 mt-2 font-semibold">
                {data.example.condensed}
              </div>
              <div className="text-xs text-stone-600 mt-2 leading-relaxed">
                {data.example.breakdown}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
