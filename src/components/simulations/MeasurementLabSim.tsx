import React, { useState, useEffect } from 'react';
import { Eye, CheckCircle2, RotateCcw, AlertTriangle, HelpCircle, Play, Pause, Clock } from 'lucide-react';

interface MeasurementLabSimProps {
  initialTool?: 'mistar' | 'jangka-sorong' | 'mikrometer' | 'stopwatch' | 'termometer';
}

export default function MeasurementLabSim({ initialTool = 'jangka-sorong' }: MeasurementLabSimProps) {
  const [activeTool, setActiveTool] = useState<'mistar' | 'jangka-sorong' | 'mikrometer' | 'stopwatch' | 'termometer'>(initialTool);

  // Synchronize with prop changes if subtopic changes
  useEffect(() => {
    setActiveTool(initialTool);
  }, [initialTool]);

  // 1. Mistar state
  const [mistarLength, setMistarLength] = useState<number>(4.5); // cm
  const [viewAngle, setViewAngle] = useState<'kiri' | 'normal' | 'kanan'>('normal');

  // 2. Jangka Sorong state
  // Distance in mm (e.g. 26.6 mm = 2.66 cm)
  const [vernierPosMm, setVernierPosMm] = useState<number>(26.6);
  const [vernierUserGuess, setVernierUserGuess] = useState<string>('');
  const [vernierFeedback, setVernierFeedback] = useState<string | null>(null);

  // 3. Mikrometer Sekrup state
  // Distance in mm (e.g. 1.80 mm)
  const [microPosMm, setMicroPosMm] = useState<number>(1.80);
  const [microUserGuess, setMicroUserGuess] = useState<string>('');
  const [microFeedback, setMicroFeedback] = useState<string | null>(null);

  // 4. Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState<number>(0); // in ms
  const [stopwatchRunning, setStopwatchRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);

  // 5. Termometer state
  const [tempValue, setTempValue] = useState<number>(28.5); // °C

  // Stopwatch interval
  useEffect(() => {
    let interval: any = null;
    if (stopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [stopwatchRunning]);

  // Math helper for Vernier Caliper Pierre Vernier
  // Ketelitian 0,1 mm (0,01 cm). Skala utama dalam cm, skala nonius desimal kedua
  const getVernierReadings = (mmVal: number) => {
    const cmVal = mmVal / 10;
    const suCm = Math.floor(cmVal * 10) / 10; // e.g. 2.6 cm
    const diffMm = mmVal - suCm * 10; // remainder in mm (0.0 to 0.9 mm)
    const noniusIndex = Math.round(diffMm * 10); // 0 to 9 (garis nonius)
    const snCm = (noniusIndex * 0.01);
    const hpCm = (suCm + snCm).toFixed(2);
    return {
      suCm: suCm.toFixed(1),
      noniusIndex,
      snCm: snCm.toFixed(2),
      hpCm,
      hpMm: (Number(hpCm) * 10).toFixed(1)
    };
  };

  // Math helper for Micrometer Screw Gauge
  // Ketelitian 0,01 mm. Sleeve (skala utama) + Thimble (skala putar 0-50)
  const getMicroReadings = (mmVal: number) => {
    const wholeHalf = Math.floor(mmVal / 0.5) * 0.5; // e.g. 1.5 mm or 5.5 mm
    const remainderMm = mmVal - wholeHalf;
    const thimbleIndex = Math.round(remainderMm / 0.01) % 50;
    const snMm = (thimbleIndex * 0.01).toFixed(2);
    const hpMm = (wholeHalf + Number(snMm)).toFixed(2);
    return {
      suMm: wholeHalf.toFixed(1),
      thimbleIndex,
      snMm,
      hpMm
    };
  };

  const vernierData = getVernierReadings(vernierPosMm);
  const microData = getMicroReadings(microPosMm);

  const checkVernierAnswer = () => {
    const numGuess = parseFloat(vernierUserGuess.replace(',', '.'));
    if (isNaN(numGuess)) {
      setVernierFeedback('Silakan ketikkan angka pembacaan terlebih dahulu!');
      return;
    }
    const expected = parseFloat(vernierData.hpCm);
    if (Math.abs(numGuess - expected) < 0.02) {
      setVernierFeedback(`Tepat sekali! HP = ${vernierData.suCm} cm + (${vernierData.noniusIndex} × 0,01 cm) = ${vernierData.hpCm} cm (${vernierData.hpMm} mm).`);
    } else {
      setVernierFeedback(`Belum tepat. Cek kembali: Skala Utama = ${vernierData.suCm} cm, Garis Nonius berimpit = ke-${vernierData.noniusIndex} (0,0${vernierData.noniusIndex} cm). Total = ${vernierData.hpCm} cm.`);
    }
  };

  const checkMicroAnswer = () => {
    const numGuess = parseFloat(microUserGuess.replace(',', '.'));
    if (isNaN(numGuess)) {
      setMicroFeedback('Silakan ketikkan angka pembacaan terlebih dahulu!');
      return;
    }
    const expected = parseFloat(microData.hpMm);
    if (Math.abs(numGuess - expected) < 0.03) {
      setMicroFeedback(`Tepat sekali! HP = ${microData.suMm} mm + (${microData.thimbleIndex} × 0,01 mm) = ${microData.hpMm} mm.`);
    } else {
      setMicroFeedback(`Belum tepat. Cek kembali: Skala Utama sleeve = ${microData.suMm} mm, Garis putar thimble = ke-${microData.thimbleIndex} (${microData.snMm} mm). Total = ${microData.hpMm} mm.`);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Top Header & Tool Switcher */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-base">Laboratorium Virtual Alat Ukur Presisi</h3>
          <p className="text-xs text-slate-300">
            Jangka sorong (0,1 mm), Mikrometer sekrup (0,01 mm), Mistar (1 mm), Stopwatch (0,01 s), Termometer (0,1 °C)
          </p>
        </div>
        <div className="flex flex-wrap gap-1 p-1 bg-slate-800 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveTool('jangka-sorong')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTool === 'jangka-sorong' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Jangka Sorong
          </button>
          <button
            onClick={() => setActiveTool('mikrometer')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTool === 'mikrometer' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Mikrometer Sekrup
          </button>
          <button
            onClick={() => setActiveTool('mistar')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTool === 'mistar' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Mistar & Paralaks
          </button>
          <button
            onClick={() => setActiveTool('stopwatch')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTool === 'stopwatch' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Stopwatch
          </button>
          <button
            onClick={() => setActiveTool('termometer')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTool === 'termometer' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Termometer
          </button>
        </div>
      </div>

      <div className="p-5">
        {/* 1. JANGKA SORONG */}
        {activeTool === 'jangka-sorong' && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Preset Benda Contoh Sesuai PDF:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => {
                      setVernierPosMm(26.6);
                      setVernierFeedback(null);
                    }}
                    className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md"
                  >
                    Koin Rudi (2,66 cm)
                  </button>
                  <button
                    onClick={() => {
                      setVernierPosMm(24.7);
                      setVernierFeedback(null);
                    }}
                    className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md"
                  >
                    Gambar PDF 1 (2,47 cm)
                  </button>
                  <button
                    onClick={() => {
                      setVernierPosMm(18.3);
                      setVernierFeedback(null);
                    }}
                    className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md"
                  >
                    Cincin Emas (1,83 cm)
                  </button>
                  <button
                    onClick={() => {
                      setVernierPosMm(34.5);
                      setVernierFeedback(null);
                    }}
                    className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md"
                  >
                    Tabung Reaksi (3,45 cm)
                  </button>
                </div>
              </div>

              {/* Slider Geser Rahang */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                  Geser Posisi Rahang:
                </span>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="0.1"
                  value={vernierPosMm}
                  onChange={(e) => {
                    setVernierPosMm(Number(e.target.value));
                    setVernierFeedback(null);
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 whitespace-nowrap">
                  {(vernierPosMm / 10).toFixed(2)} cm
                </span>
              </div>
            </div>

            {/* Visual Vernier Caliper Drawing */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-white overflow-x-auto shadow-inner">
              <div className="min-w-[620px] relative py-4 select-none">
                {/* Anatomy Labels */}
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mb-2">
                  <span>Rahang Tetap (Kiri)</span>
                  <span className="text-amber-400 font-bold">Skala Utama (Batang cm)</span>
                  <span>Rahang Geser + Nonius</span>
                </div>

                {/* Main Scale Ruler */}
                <div className="h-14 bg-slate-800 border-2 border-slate-600 rounded-t relative flex items-end">
                  {/* Ticks 0 to 6 cm */}
                  {Array.from({ length: 61 }).map((_, i) => {
                    const isCm = i % 10 === 0;
                    const isMid = i % 5 === 0;
                    const height = isCm ? 'h-7' : isMid ? 'h-5' : 'h-3';
                    const leftPct = (i / 60) * 88 + 6;
                    return (
                      <div
                        key={i}
                        className={`absolute bottom-0 w-0.5 bg-slate-400 ${height}`}
                        style={{ left: `${leftPct}%` }}
                      >
                        {isCm && (
                          <span className="absolute -top-5 -left-1.5 text-[10px] font-mono text-slate-200 font-bold">
                            {i / 10}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Sliding Vernier Nonius scale */}
                <div
                  className="h-14 bg-blue-900/90 border-2 border-blue-400 rounded-b relative transition-all duration-150"
                  style={{
                    marginLeft: `${(vernierPosMm / 60) * 88}%`,
                    width: '32%',
                  }}
                >
                  <div className="absolute top-0 inset-x-0 flex items-start justify-between px-2 pt-0.5">
                    {/* Nonius 10 divisions */}
                    {Array.from({ length: 11 }).map((_, i) => {
                      const isAlign = i === vernierData.noniusIndex;
                      return (
                        <div key={i} className="flex flex-col items-center">
                          <div
                            className={`w-0.5 ${isAlign ? 'h-5 bg-amber-400' : 'h-3 bg-blue-200'}`}
                          />
                          <span
                            className={`text-[9px] font-mono mt-0.5 ${
                              isAlign ? 'text-amber-300 font-bold' : 'text-blue-200'
                            }`}
                          >
                            {i}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="absolute bottom-1 right-2 text-[9px] font-mono text-blue-300">
                    Nonius (Ketelitian 0,1 mm)
                  </div>
                </div>

                {/* Highlight arrow for alignment */}
                <div className="mt-4 flex items-center gap-2 text-xs font-mono text-amber-300 bg-amber-950/60 p-2.5 rounded border border-amber-800">
                  <span className="font-bold">Analisis Pembacaan Visual:</span>
                  <span>Garis nonius ke-{vernierData.noniusIndex} paling lurus berimpit dengan garis skala utama.</span>
                </div>
              </div>
            </div>

            {/* Reading Breakdown & Quiz Test */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-xs">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  Rincian Rumus Matematis Sesuai PDF
                </h4>
                <div className="space-y-1.5">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-600">1. Nilai Skala Utama:</span>
                    <span className="font-mono font-bold text-slate-900">{vernierData.suCm} cm ({Number(vernierData.suCm) * 10} mm)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-600">2. Garis Nonius Berimpit:</span>
                    <span className="font-mono font-bold text-blue-600">Ke-{vernierData.noniusIndex}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-600">3. Nilai Skala Nonius:</span>
                    <span className="font-mono font-bold text-blue-600">{vernierData.noniusIndex} × 0,01 cm = {vernierData.snCm} cm</span>
                  </div>
                  <div className="flex justify-between py-1.5 font-bold text-slate-900 bg-white px-2 rounded border border-slate-200">
                    <span>Hasil Pengukuran (HP = SU + SN):</span>
                    <span className="font-mono text-blue-700">{vernierData.hpCm} cm ({vernierData.hpMm} mm)</span>
                  </div>
                </div>
              </div>

              {/* Practice Guess Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 text-xs flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-teal-600" />
                    Uji Kemampuan Membaca Mandiri
                  </h4>
                  <p className="text-slate-600 mb-3">
                    Berdasarkan posisi jangka sorong di atas, masukkan hasil tebakanmu dalam satuan <strong>cm</strong>:
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Contoh: 2.66"
                      value={vernierUserGuess}
                      onChange={(e) => setVernierUserGuess(e.target.value)}
                      className="w-36 px-3 py-1.5 border border-slate-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="font-bold text-slate-600">cm</span>
                    <button
                      onClick={checkVernierAnswer}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs"
                    >
                      Periksa Kunci
                    </button>
                  </div>
                </div>

                {vernierFeedback && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 mt-2 font-medium">
                    {vernierFeedback}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. MIKROMETER SEKRUP */}
        {activeTool === 'mikrometer' && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Preset Benda Contoh Sesuai PDF:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => {
                      setMicroPosMm(5.80);
                      setMicroFeedback(null);
                    }}
                    className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md"
                  >
                    Contoh PDF Hal 13-14 (5,80 mm)
                  </button>
                  <button
                    onClick={() => {
                      setMicroPosMm(1.80);
                      setMicroFeedback(null);
                    }}
                    className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md"
                  >
                    Contoh Soal Hal 14 (1,80 mm)
                  </button>
                  <button
                    onClick={() => {
                      setMicroPosMm(0.68);
                      setMicroFeedback(null);
                    }}
                    className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md"
                  >
                    Kawat Tembaga (0,68 mm)
                  </button>
                  <button
                    onClick={() => {
                      setMicroPosMm(3.25);
                      setMicroFeedback(null);
                    }}
                    className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md"
                  >
                    Pelat Aluminium (3,25 mm)
                  </button>
                </div>
              </div>

              {/* Slider Putar Thimble */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                  Putar Posisi Thimble:
                </span>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.01"
                  value={microPosMm}
                  onChange={(e) => {
                    setMicroPosMm(Number(e.target.value));
                    setMicroFeedback(null);
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 whitespace-nowrap">
                  {microPosMm.toFixed(2)} mm
                </span>
              </div>
            </div>

            {/* Visual Micrometer Screw Gauge */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-white overflow-x-auto shadow-inner">
              <div className="min-w-[620px] flex items-center justify-center py-4 select-none">
                {/* Fixed Anvil & Frame (U-Shape) */}
                <div className="flex items-center">
                  <div className="w-10 h-28 border-4 border-r-0 border-slate-500 rounded-l-3xl flex items-center justify-start pl-2">
                    <div className="w-4 h-6 bg-slate-300 rounded" title="Poros Tetap"></div>
                  </div>
                  {/* Spindle Rod (Poros Geser) */}
                  <div
                    className="h-6 bg-slate-300 border-y border-slate-400"
                    style={{ width: `${Math.max(10, microPosMm * 14)}px` }}
                    title="Objek Terjepit"
                  ></div>

                  {/* Sleeve (Skala Utama) */}
                  <div className="w-56 h-20 bg-slate-800 border-2 border-slate-600 rounded-l relative flex flex-col justify-between py-1">
                    {/* Top markings: 0, 1, 2, 3, 4, 5... mm */}
                    <div className="h-6 relative border-b border-slate-400">
                      {Array.from({ length: 11 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute bottom-0 w-0.5 h-3 bg-slate-300"
                          style={{ left: `${i * 18 + 12}px` }}
                        >
                          <span className="absolute -top-4 -left-1 text-[9px] font-mono font-bold text-slate-200">
                            {i}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom markings: 0.5, 1.5, 2.5... mm */}
                    <div className="h-6 relative">
                      {Array.from({ length: 11 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute top-0 w-0.5 h-3 bg-amber-400"
                          style={{ left: `${i * 18 + 21}px` }}
                        >
                          <span className="absolute top-3 -left-1 text-[8px] font-mono text-amber-300">
                            .5
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Thimble (Skala Putar 0-50) */}
                  <div className="w-28 h-28 bg-blue-900 border-2 border-blue-400 rounded-r relative flex flex-col justify-center px-2 shadow-lg">
                    <div className="absolute top-1 left-2 text-[9px] font-mono text-blue-200">
                      Thimble
                    </div>
                    {/* Scale markings around middle datum line */}
                    <div className="space-y-1 font-mono text-[10px] text-center">
                      <div className="text-slate-400">{(microData.thimbleIndex + 2) % 50}</div>
                      <div className="text-slate-300">{(microData.thimbleIndex + 1) % 50}</div>
                      <div className="text-amber-300 font-bold bg-blue-950 py-0.5 border-y border-amber-400">
                        → {microData.thimbleIndex} ←
                      </div>
                      <div className="text-slate-300">{(microData.thimbleIndex - 1 + 50) % 50}</div>
                      <div className="text-slate-400">{(microData.thimbleIndex - 2 + 50) % 50}</div>
                    </div>
                  </div>

                  {/* Ratchet Knob */}
                  <div
                    onClick={() => {
                      setMicroPosMm((prev) => Math.min(10, prev + 0.01));
                    }}
                    className="w-12 h-14 bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded-r-lg flex flex-col items-center justify-center cursor-pointer ml-1 text-center"
                    title="Klik untuk memutar Ratchet presisi"
                  >
                    <span className="text-[9px] font-mono text-slate-300">Ratchet</span>
                    <span className="text-[8px] text-teal-300 font-bold">Klik +</span>
                  </div>
                </div>
              </div>
              <div className="text-xs font-mono text-amber-300 text-center">
                Skala sleeve: Garis atas (mm bulat) + Garis bawah (0,5 mm) | Skala thimble: {microData.thimbleIndex} × 0,01 mm = {microData.snMm} mm
              </div>
            </div>

            {/* Calculations and guess */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-xs">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  Rincian Rumus Mikrometer Sesuai PDF
                </h4>
                <div className="space-y-1.5">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-600">1. Skala Utama Sleeve (Atas + Bawah):</span>
                    <span className="font-mono font-bold text-slate-900">{microData.suMm} mm</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-600">2. Skala Putar Thimble Berimpit:</span>
                    <span className="font-mono font-bold text-blue-600">Garis ke-{microData.thimbleIndex}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-600">3. Nilai Skala Putar (Nonius):</span>
                    <span className="font-mono font-bold text-blue-600">{microData.thimbleIndex} × 0,01 mm = {microData.snMm} mm</span>
                  </div>
                  <div className="flex justify-between py-1.5 font-bold text-slate-900 bg-white px-2 rounded border border-slate-200">
                    <span>Hasil Pengukuran (HP = SU + SN):</span>
                    <span className="font-mono text-blue-700">{microData.hpMm} mm</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 text-xs flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-teal-600" />
                    Uji Kemampuan Membaca Mandiri
                  </h4>
                  <p className="text-slate-600 mb-3">
                    Masukkan hasil pembacaan mikrometer sekrup di atas dalam satuan <strong>mm</strong>:
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Contoh: 1.80"
                      value={microUserGuess}
                      onChange={(e) => setMicroUserGuess(e.target.value)}
                      className="w-36 px-3 py-1.5 border border-slate-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="font-bold text-slate-600">mm</span>
                    <button
                      onClick={checkMicroAnswer}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs"
                    >
                      Periksa Kunci
                    </button>
                  </div>
                </div>

                {microFeedback && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 mt-2 font-medium">
                    {microFeedback}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. MISTAR & PARALAKS */}
        {activeTool === 'mistar' && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Uji Kesalahan Paralaks (Parallax Error)
                </span>
                <p className="text-xs text-slate-600">
                  Ubah posisi sudut pandang mata untuk mengamati bagaimana pembacaan skala bisa melenceng jika tidak tegak lurus!
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewAngle('kiri')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    viewAngle === 'kiri' ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-slate-700'
                  }`}
                >
                  Miring Kiri (45°)
                </button>
                <button
                  onClick={() => setViewAngle('normal')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    viewAngle === 'normal' ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'bg-white text-slate-700'
                  }`}
                >
                  Tegak Lurus (90° Normal)
                </button>
                <button
                  onClick={() => setViewAngle('kanan')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    viewAngle === 'kanan' ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-slate-700'
                  }`}
                >
                  Miring Kanan (135°)
                </button>
              </div>
            </div>

            {/* Visual Ruler & Object */}
            <div className="bg-white border border-slate-300 rounded-xl p-6 flex flex-col items-center">
              <div className="w-full max-w-lg relative py-8">
                {/* Observer Eye Indicator */}
                <div
                  className="absolute -top-1 transition-all duration-300 flex flex-col items-center"
                  style={{
                    left: viewAngle === 'normal' ? '54%' : viewAngle === 'kiri' ? '46%' : '62%',
                  }}
                >
                  <Eye className={`w-5 h-5 ${viewAngle === 'normal' ? 'text-emerald-600' : 'text-amber-600'}`} />
                  <span className="text-[10px] font-bold font-mono">
                    {viewAngle === 'normal' ? '90° (Tepat)' : viewAngle === 'kiri' ? '45° (Miring)' : '135° (Miring)'}
                  </span>
                  <div
                    className={`w-0.5 h-6 border-l-2 border-dashed ${
                      viewAngle === 'normal' ? 'border-emerald-500' : 'border-amber-500'
                    }`}
                  />
                </div>

                {/* Object being measured */}
                <div className="h-10 bg-amber-200 border-2 border-amber-500 rounded-md mb-2 flex items-center justify-center font-bold text-xs text-amber-900 w-[55%]">
                  Objek Balok Kayu (Panjang Nyata = 4,5 cm)
                </div>

                {/* Ruler scale (0 to 10 cm) */}
                <div className="h-14 bg-amber-50 border-2 border-slate-400 rounded relative flex items-start px-2">
                  {Array.from({ length: 81 }).map((_, i) => {
                    const isCm = i % 10 === 0;
                    const isMid = i % 5 === 0;
                    const height = isCm ? 'h-6' : isMid ? 'h-4' : 'h-2.5';
                    const leftPct = (i / 80) * 96 + 2;
                    return (
                      <div
                        key={i}
                        className={`absolute top-0 w-0.5 bg-slate-600 ${height}`}
                        style={{ left: `${leftPct}%` }}
                      >
                        {isCm && (
                          <span className="absolute top-6 -left-1 text-[10px] font-mono text-slate-800 font-bold">
                            {i / 10}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Parallax Result Info */}
              <div
                className={`w-full max-w-lg p-4 rounded-xl border text-xs ${
                  viewAngle === 'normal'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}
              >
                <div className="font-bold text-sm mb-1">
                  {viewAngle === 'normal'
                    ? 'Hasil Pembacaan Akurat: 4,5 cm (45 mm)'
                    : viewAngle === 'kiri'
                    ? 'Terjadi Kesalahan Paralaks: Terbaca 4,3 cm (Lebih Kecil dari Aslinya!)'
                    : 'Terjadi Kesalahan Paralaks: Terbaca 4,7 cm (Lebih Besar dari Aslinya!)'}
                </div>
                <p>
                  Sesuai instruksi PDF halaman 4: Saat membaca skala mistar, letakkan benda sejajar skala nol dan pandang tegak lurus (90°) agar tidak terjadi kesalahan paralaks.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. STOPWATCH DIGITAL */}
        {activeTool === 'stopwatch' && (
          <div className="space-y-6">
            <div className="max-w-md mx-auto bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col items-center">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                Stopwatch Digital (Ketelitian 0,01 s)
              </span>

              {/* Digital display */}
              <div className="font-mono text-5xl font-bold tracking-tight text-teal-300 my-4">
                {String(Math.floor(stopwatchTime / 60000)).padStart(2, '0')}:
                {String(Math.floor((stopwatchTime % 60000) / 1000)).padStart(2, '0')}.
                <span className="text-3xl text-teal-400">
                  {String(Math.floor((stopwatchTime % 1000) / 10)).padStart(2, '0')}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => setStopwatchRunning(!stopwatchRunning)}
                  className={`px-5 py-2 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all ${
                    stopwatchRunning
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                  }`}
                >
                  {stopwatchRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {stopwatchRunning ? 'Stop' : 'Start'}
                </button>
                <button
                  onClick={() => {
                    if (stopwatchRunning) {
                      setLaps((prev) => [...prev, stopwatchTime]);
                    }
                  }}
                  disabled={!stopwatchRunning}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-semibold text-xs rounded-xl"
                >
                  Lap
                </button>
                <button
                  onClick={() => {
                    setStopwatchRunning(false);
                    setStopwatchTime(0);
                    setLaps([]);
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>

              {/* Lap times table */}
              {laps.length > 0 && (
                <div className="w-full mt-6 pt-4 border-t border-slate-800 max-h-36 overflow-y-auto space-y-1 text-xs font-mono">
                  {laps.map((lap, i) => (
                    <div key={i} className="flex justify-between text-slate-300">
                      <span>Lap #{i + 1}</span>
                      <span>{(lap / 1000).toFixed(2)} sekon</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block mb-1">Pedoman Pembacaan Waktu Sesuai PDF:</span>
              Stopwatch digital mengukur waktu dengan ketelitian 0,01 sekon. Tekan tombol mulai dan henti dengan cepat dan tepat waktu untuk meminimalkan jeda waktu reaksi manusia pengamat.
            </div>
          </div>
        )}

        {/* 5. TERMOMETER */}
        {activeTool === 'termometer' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 flex justify-center">
                <div className="w-28 h-72 bg-slate-100 border-2 border-slate-400 rounded-full relative flex flex-col items-center justify-between p-3 shadow-inner">
                  {/* Glass tube stem */}
                  <div className="w-5 h-52 bg-white border border-slate-300 rounded-t-full relative overflow-hidden flex flex-col justify-end">
                    {/* Liquid column */}
                    <div
                      className="w-full bg-red-600 transition-all duration-200 relative"
                      style={{ height: `${((tempValue + 10) / 110) * 100}%` }}
                    >
                      {/* Meniscus surface curve */}
                      <div className="absolute top-0 inset-x-0 h-1 bg-red-400 rounded-b-full"></div>
                    </div>
                  </div>
                  {/* Bulb */}
                  <div className="w-12 h-12 bg-red-600 rounded-full border-2 border-slate-400 -mt-2 shadow-md"></div>
                </div>
              </div>

              <div className="md:col-span-7 space-y-4 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-800">Atur Suhu Cairan:</span>
                    <span className="font-mono text-sm font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      {tempValue.toFixed(1)} °C
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="100"
                    step="0.1"
                    value={tempValue}
                    onChange={(e) => setTempValue(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>-10,0 °C</span>
                    <span>100,0 °C</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-slate-700">
                  <h4 className="font-bold text-slate-900">Pedoman Membaca Termometer Sesuai PDF:</h4>
                  <ul className="pl-4 list-disc space-y-1">
                    <li>Fungsi: Mengukur suhu benda dengan ketelitian 0,1 °C.</li>
                    <li>Pastikan sensor termometer menyentuh sempurna benda yang diukur.</li>
                    <li>Hindari kesalahan pembacaan meniskus: untuk zat cair air yang meniskus cekung, pandangan mata harus tegak lurus sejajar dengan bagian dasar cekungan permukaan cairan.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
