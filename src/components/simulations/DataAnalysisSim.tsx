import React, { useState } from 'react';
import { Calculator, Plus, Trash2, RotateCcw, CheckCircle, Info, Sparkles, AlertCircle } from 'lucide-react';

export default function DataAnalysisSim() {
  const [activeTab, setActiveTab] = useState<'berulang' | 'angka-penting' | 'notasi-ilmiah' | 'toleransi'>('berulang');

  // 1. Repeated measurement state (default data from PDF Hal 14-16)
  const [dataPoints, setDataPoints] = useState<number[]>([2.2, 2.4, 2.3, 2.5, 2.4]);
  const [unit, setUnit] = useState<string>('m');

  // 2. Significant figures trainer state
  const [sigFigInput, setSigFigInput] = useState<string>('0.0450');

  // 3. Scientific notation trainer state
  const [sciInput, setSciInput] = useState<string>('300000000');

  // 4. Tolerance checker state
  const [nominalLength, setNominalLength] = useState<number>(10.00);
  const [toleranceVal, setToleranceVal] = useState<number>(0.05);
  const [sampleTested, setSampleTested] = useState<number>(10.03);

  // Math for repeated measurements
  const n = dataPoints.length;
  const sumX = dataPoints.reduce((acc, v) => acc + v, 0);
  const meanX = n > 0 ? sumX / n : 0;
  const sumX2 = dataPoints.reduce((acc, v) => acc + v * v, 0);

  // Exact variance according to Cauchy-Schwarz
  // n*sumX2 - (sumX)^2 is always >= 0 for real data
  const numerator = Math.max(0, n * sumX2 - sumX * sumX);
  const sXBar = n > 1 ? (1 / n) * Math.sqrt(numerator / (n - 1)) : 0;
  const krPercent = meanX !== 0 ? (sXBar / meanX) * 100 : 0;

  // Determine AP from KR
  let apRule = '2 Angka Penting';
  if (krPercent < 0.5) apRule = '4 Angka Penting';
  else if (krPercent < 5) apRule = '3 Angka Penting';
  else apRule = '2 Angka Penting';

  // Analysis of significant figures based on 5 rules from PDF
  const analyzeSigFigs = (valStr: string) => {
    const clean = valStr.trim();
    if (!clean || isNaN(Number(clean))) return { count: 0, rules: ['Input bukan bilangan yang valid.'] };

    const rulesApplied: string[] = [];
    const hasDecimal = clean.includes('.') || clean.includes(',');
    const normalized = clean.replace(',', '.');

    // Rule 1: All non-zeros
    rulesApplied.push('Aturan 1: Semua angka bukan nol adalah angka penting.');

    if (normalized.includes('.')) {
      const parts = normalized.split('.');
      const intPart = parts[0];
      const fracPart = parts[1];

      if (Number(intPart) === 0) {
        // e.g. 0.0450
        rulesApplied.push('Aturan 3: Angka nol di depan angka bukan nol TIDAK termasuk angka penting.');
        if (fracPart.match(/0+$/)) {
          rulesApplied.push('Aturan 4: Angka nol di belakang angka bukan nol (setelah koma) ADALAH angka penting.');
        }
      } else {
        if (intPart.match(/0/) || fracPart.match(/0/)) {
          rulesApplied.push('Aturan 2: Angka nol di antara angka bukan nol adalah angka penting.');
        }
        if (fracPart.match(/0+$/)) {
          rulesApplied.push('Aturan 4: Angka nol di belakang koma adalah angka penting.');
        }
      }
    } else {
      // Integer like 1500 or 1500.
      if (normalized.endsWith('.')) {
        rulesApplied.push('Aturan 5: Angka nol di belakang bilangan bulat dengan tanda desimal dianggap penting.');
      } else if (normalized.match(/0+$/)) {
        rulesApplied.push('Aturan 5: Angka nol di belakang bilangan bulat tanpa desimal TIDAK dianggap penting.');
      }
    }

    // Accurate sig fig count logic
    let count = 0;
    if (normalized.includes('.')) {
      const noLeadingZeros = normalized.replace(/^0+\.?0*/, '');
      count = noLeadingZeros.replace('.', '').length;
    } else {
      const noTrailing = normalized.replace(/0+$/, '');
      count = noTrailing.length;
    }

    return { count: Math.max(1, count), rules: rulesApplied };
  };

  const sigFigResult = analyzeSigFigs(sigFigInput);

  // Scientific notation conversion
  const formatSciNotation = (valStr: string) => {
    const num = parseFloat(valStr.replace(',', '.'));
    if (isNaN(num) || num === 0) return { standard: '0', a: 0, n: 0 };
    const expStr = num.toExponential();
    const [coeff, exp] = expStr.split('e');
    const a = parseFloat(parseFloat(coeff).toFixed(4));
    const n = parseInt(exp, 10);
    return {
      standard: `${a} × 10^${n}`,
      a,
      n
    };
  };

  const sciResult = formatSciNotation(sciInput);

  // Tolerance calculations
  const minTolerance = nominalLength - toleranceVal;
  const maxTolerance = nominalLength + toleranceVal;
  const isSampleAccepted = sampleTested >= minTolerance && sampleTested <= maxTolerance;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Top Header & Sub-Tabs */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-base">Laboratorium Pengolahan Data & Ketidakpastian</h3>
          <p className="text-xs text-slate-300">
            Kalkulator pengukuran berulang (Sx̄), aturan angka penting, pembulatan, notasi ilmiah, dan uji toleransi
          </p>
        </div>
        <div className="flex flex-wrap gap-1 p-1 bg-slate-800 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveTab('berulang')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'berulang' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Pengukuran Berulang
          </button>
          <button
            onClick={() => setActiveTab('angka-penting')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'angka-penting' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Aturan Angka Penting
          </button>
          <button
            onClick={() => setActiveTab('notasi-ilmiah')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'notasi-ilmiah' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Notasi Ilmiah
          </button>
          <button
            onClick={() => setActiveTab('toleransi')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'toleransi' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Uji Toleransi QC
          </button>
        </div>
      </div>

      <div className="p-5">
        {/* TAB 1: PENGUKURAN BERULANG */}
        {activeTab === 'berulang' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Input Table */}
              <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Data Pengukuran (n = {n})
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Satuan:</span>
                    <input
                      type="text"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-12 px-2 py-0.5 border border-slate-300 rounded font-mono text-xs text-center"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-200 text-slate-700 font-semibold">
                      <tr>
                        <th className="py-1.5 px-2 w-10 text-center">No</th>
                        <th className="py-1.5 px-2">Hasil Ukur (x)</th>
                        <th className="py-1.5 px-2">Kuadrat (x²)</th>
                        <th className="py-1.5 px-2 w-8">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {dataPoints.map((val, idx) => (
                        <tr key={idx}>
                          <td className="py-1.5 px-2 text-center text-slate-500 font-mono">{idx + 1}</td>
                          <td className="py-1.5 px-2">
                            <input
                              type="number"
                              step="0.01"
                              value={val}
                              onChange={(e) => {
                                const newArr = [...dataPoints];
                                newArr[idx] = parseFloat(e.target.value) || 0;
                                setDataPoints(newArr);
                              }}
                              className="w-24 px-2 py-1 border border-slate-300 rounded font-mono text-xs focus:ring-1 focus:ring-blue-500"
                            />
                          </td>
                          <td className="py-1.5 px-2 font-mono text-slate-700">
                            {(val * val).toFixed(2)}
                          </td>
                          <td className="py-1.5 px-2 text-center">
                            {dataPoints.length > 2 && (
                              <button
                                onClick={() => setDataPoints(dataPoints.filter((_, i) => i !== idx))}
                                className="text-slate-400 hover:text-rose-600"
                                title="Hapus baris"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-100 font-bold text-slate-800">
                      <tr>
                        <td className="py-1.5 px-2 text-center">Σ</td>
                        <td className="py-1.5 px-2 font-mono">{sumX.toFixed(2)}</td>
                        <td className="py-1.5 px-2 font-mono">{sumX2.toFixed(2)}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setDataPoints([...dataPoints, 2.4])}
                    className="flex-1 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Data
                  </button>
                  <button
                    onClick={() => setDataPoints([2.2, 2.4, 2.3, 2.5, 2.4])}
                    className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg text-xs flex items-center gap-1"
                    title="Kembali ke contoh PDF"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset Contoh PDF
                  </button>
                </div>
              </div>

              {/* Step-by-Step Mathematical Calculation Output */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 space-y-4 text-xs">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-blue-600" />
                  Langkah Analisis Perhitungan Sesuai PDF (Hal 15-16)
                </h4>

                <div className="space-y-3 font-mono">
                  {/* Step 1: Mean */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <span className="font-bold text-slate-700 font-sans block text-xs">
                      1. Nilai Rata-Rata (x̄):
                    </span>
                    <div className="text-slate-900">
                      x̄ = Σx / n = {sumX.toFixed(2)} / {n} = <strong className="text-blue-600">{meanX.toFixed(2)} {unit}</strong>
                    </div>
                  </div>

                  {/* Step 2: Absolute uncertainty */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                    <span className="font-bold text-slate-700 font-sans block text-xs">
                      2. Ketidakpastian Mutlak (Sx̄):
                    </span>
                    <div className="text-slate-800 text-[11px] leading-relaxed">
                      Sx̄ = (1/n) × √[ (n·Σx² - (Σx)²) / (n - 1) ]
                      <br />
                      Sx̄ = (1/{n}) × √[ ({n} × {sumX2.toFixed(2)} - ({sumX.toFixed(2)})²) / ({n} - 1) ]
                      <br />
                      Sx̄ = (1/{n}) × √[ ({(n * sumX2).toFixed(2)} - {(sumX * sumX).toFixed(2)}) / {n - 1} ]
                      <br />
                      Sx̄ = (1/{n}) × √[ {numerator.toFixed(2)} / {n - 1} ] = <strong className="text-blue-600">{sXBar.toFixed(3)} {unit}</strong>
                    </div>
                  </div>

                  {/* Step 3: Relative uncertainty & sig figs */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <span className="font-bold text-slate-700 font-sans block text-xs">
                      3. Ketidakpastian Relatif (KR):
                    </span>
                    <div className="text-slate-900">
                      KR = (Sx̄ / x̄) × 100% = ({sXBar.toFixed(3)} / {meanX.toFixed(2)}) × 100% = <strong className="text-amber-600">{krPercent.toFixed(1)}%</strong> ({apRule})
                    </div>
                  </div>

                  {/* Final Scientific Report */}
                  <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl space-y-1">
                    <span className="font-bold text-emerald-900 font-sans block text-sm">
                      Hasil Pelaporan Pengukuran Baku Ilmiah:
                    </span>
                    <div className="text-emerald-950 text-base font-bold">
                      ({meanX.toFixed(2)} ± {sXBar.toFixed(2)}) {unit}
                    </div>
                  </div>
                </div>

                {/* Scientific correction notice */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-[11px] flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Catatan Rekayasa Ilmiah:</strong> Pada halaman 15 PDF terdapat contoh perhitungan yang menghasilkan nilai negatif di dalam akar lalu ditulis &quot;dimutlakkan&quot; karena salah hitung kuadrat. Kalkulator ini telah memperbaiki perhitungan secara matematis akurat sesuai kaidah deviasi standar metrologi resmi.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ATURAN ANGKA PENTING */}
        {activeTab === 'angka-penting' && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Trainer Analisis Angka Penting (5 Aturan PDF)
              </span>
              <p className="text-xs text-slate-600 mb-4">
                Ketikkan angka hasil pengukuran apa saja di bawah ini untuk melihat pembedahan otomatis aturan angka pentingnya!
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <input
                  type="text"
                  value={sigFigInput}
                  onChange={(e) => setSigFigInput(e.target.value)}
                  placeholder="Contoh: 0.0450 atau 1500."
                  className="px-4 py-2 border border-slate-300 rounded-lg font-mono text-base font-bold text-slate-900 w-56 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {['12.34', '205', '0.045', '2.300', '1500', '1500.'].map((sample) => (
                    <button
                      key={sample}
                      onClick={() => setSigFigInput(sample)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded font-mono text-slate-700"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result card */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-600 text-xs">Jumlah Angka Penting Terdeteksi:</span>
                  <span className="font-mono text-xl font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                    {sigFigResult.count} Angka Penting
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-800 block">Aturan yang Berlaku Sesuai PDF:</span>
                  <ul className="space-y-1.5 pl-4 list-disc text-slate-600">
                    {sigFigResult.rules.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Reference Table of 5 Rules */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs space-y-2">
              <h4 className="font-bold text-slate-900">Rangkuman 5 Aturan Penentuan Angka Penting dari PDF:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-600">
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <strong>1. Semua angka bukan nol adalah AP.</strong>
                  <br />Contoh: 12,34 (4 AP); 528 (3 AP).
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <strong>2. Nol di antara angka bukan nol adalah AP.</strong>
                  <br />Contoh: 205 (3 AP); 1002 (4 AP).
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <strong>3. Nol di depan angka bukan nol BUKAN AP.</strong>
                  <br />Contoh: 0,045 (2 AP); 0,0032 (2 AP).
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <strong>4. Nol di belakang koma ADALAH AP.</strong>
                  <br />Contoh: 2,300 (4 AP); 0,0500 (3 AP).
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-slate-600">
                <strong>5. Nol sebelum koma (bilangan bulat) tidak penting kecuali ada tanda desimal.</strong>
                <br />Contoh: 1500 (2 AP); 1500. (4 AP karena ada titik desimal).
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NOTASI ILMIAH */}
        {activeTab === 'notasi-ilmiah' && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Konverter Notasi Ilmiah: a × 10ⁿ (1 ≤ a &lt; 10)
              </span>

              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={sciInput}
                  onChange={(e) => setSciInput(e.target.value)}
                  placeholder="Ketik angka besar atau desimal kecil"
                  className="px-4 py-2 border border-slate-300 rounded-lg font-mono text-base font-bold text-slate-900 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex flex-wrap gap-1.5 text-xs">
                  <button
                    onClick={() => setSciInput('300000000')}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded font-mono text-slate-700"
                  >
                    Kecepatan Cahaya (300.000.000)
                  </button>
                  <button
                    onClick={() => setSciInput('1000000000')}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded font-mono text-slate-700"
                  >
                    Contoh PDF (1.000.000.000)
                  </button>
                  <button
                    onClick={() => setSciInput('0.00651')}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded font-mono text-slate-700"
                  >
                    Contoh PDF (0,00651)
                  </button>
                </div>
              </div>

              {/* Conversion Display */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-400 text-xs block mb-1">Angka Pokok (a)</span>
                  <span className="font-mono text-lg font-bold text-slate-900">{sciResult.a}</span>
                  <span className="text-[10px] text-slate-500 block mt-1">Syarat: 1 ≤ a &lt; 10</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-400 text-xs block mb-1">Pangkat Eksponen (n)</span>
                  <span className="font-mono text-lg font-bold text-blue-600">{sciResult.n}</span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    {sciResult.n >= 0 ? 'Bilangan Besar (n > 0)' : 'Bilangan Kecil (n < 0)'}
                  </span>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-blue-600 text-xs font-semibold block mb-1">Bentuk Baku Notasi Ilmiah</span>
                  <span className="font-mono text-lg font-bold text-blue-900">
                    {sciResult.a} × 10<sup>{sciResult.n}</sup>
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs space-y-2 text-slate-700">
              <h4 className="font-bold text-slate-900">Aturan Penulisan Notasi Ilmiah Menurut PDF:</h4>
              <ul className="pl-4 list-disc space-y-1">
                <li>Angka pokok harus lebih dari atau sama dengan 1 dan kurang dari 10 (1 ≤ a &lt; 10).</li>
                <li>Pangkat positif (n &gt; 0) digunakan untuk bilangan besar. Contoh: 1.000.000.000 = 1 × 10⁹ (9 adalah banyaknya pergeseran koma).</li>
                <li>Pangkat negatif (n &lt; 0) digunakan untuk bilangan kecil. Contoh: 0,00651 = 6,51 × 10⁻³.</li>
                <li>Kecepatan cahaya: 300.000.000 m/s = 3 × 10⁸ m/s.</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 4: UJI TOLERANSI QC */}
        {activeTab === 'toleransi' && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Simulator Toleransi Kontrol Kualitas (Studi Kasus Farmasi PDF)
              </span>
              <p className="text-xs text-slate-600">
                Sesuai contoh PDF Hal 6: Sebuah perusahaan farmasi memproduksi botol cairan dengan panjang standar 10,00 cm ± 0,05 cm. Uji sampel botol cetakan berikut:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Panjang Standar (cm):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={nominalLength}
                    onChange={(e) => setNominalLength(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Batas Toleransi ± (cm):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={toleranceVal}
                    onChange={(e) => setToleranceVal(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Panjang Sampel Terukur (cm):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={sampleTested}
                    onChange={(e) => setSampleTested(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono text-xs"
                  />
                </div>
              </div>

              {/* Status display */}
              <div
                className={`p-4 rounded-xl border text-xs flex items-center justify-between ${
                  isSampleAccepted
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <div>
                  <div className="font-bold text-sm mb-1 flex items-center gap-1.5">
                    {isSampleAccepted ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                    )}
                    Status Sampel: {isSampleAccepted ? 'Lolos Toleransi (Layak Diterima)' : 'Ditolak (Di Luar Ambang Wajar)'}
                  </div>
                  <p>
                    Rentang toleransi yang diizinkan: [{minTolerance.toFixed(2)} cm s.d. {maxTolerance.toFixed(2)} cm]. Sampel berada pada {sampleTested.toFixed(2)} cm.
                  </p>
                </div>
                <div className="text-right font-mono font-bold text-base">
                  {isSampleAccepted ? 'PASS' : 'REJECT'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
