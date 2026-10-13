import React, { useState } from 'react';
import { Flame, Snowflake, ArrowRight, Droplets, Coffee, Sparkles, CheckCircle2 } from 'lucide-react';

export default function StateChangesSim() {
  const [activeTab, setActiveTab] = useState<'segitiga' | 'suhu-transisi' | 'pelarutan-ekstraksi'>('segitiga');

  // Triangle filter: all, menyerap (merah), melepas (biru)
  const [heatFilter, setHeatFilter] = useState<'all' | 'menyerap' | 'melepas'>('all');
  const [selectedProcess, setSelectedProcess] = useState<string>('mencair');

  // Transition slider
  const [suhu, setSuhu] = useState<number>(25);

  // Dissolution spoons
  const [spoons, setSpoons] = useState<number>(1);

  const PROCESS_DETAILS: Record<string, { nama: string; dari: string; ke: string; kalor: 'serap' | 'lepas'; contoh: string }> = {
    mencair: { nama: 'Mencair (Melebur)', dari: 'Padat', ke: 'Cair', kalor: 'serap', contoh: 'Mentega padat meleleh di suhu ruang, es batu mencair.' },
    membeku: { nama: 'Membeku', dari: 'Cair', ke: 'Padat', kalor: 'lepas', contoh: 'Air membeku menjadi es di dalam freezer kulkas.' },
    menguap: { nama: 'Menguap', dari: 'Cair', ke: 'Gas', kalor: 'serap', contoh: 'Air mendidih menghasilkan uap panas saat dimasak.' },
    mengembun: { nama: 'Mengembun', dari: 'Gas', ke: 'Cair', kalor: 'lepas', contoh: 'Titik-titik air di dinding luar gelas berisi air dingin.' },
    menyublim: { nama: 'Menyublim', dari: 'Padat', ke: 'Gas', kalor: 'serap', contoh: 'Kapur barus (kamper) di lemari mengecil menjadi gas tanpa basah.' },
    deposisi: { nama: 'Deposisi (Mengkristal)', dari: 'Gas', ke: 'Padat', kalor: 'lepas', contoh: 'Terbentuknya kristal salju di awan atau jelaga di cerobong asap.' },
  };

  const currentProc = PROCESS_DETAILS[selectedProcess];

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Top Header & Sub-Tabs */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-base">Laboratorium Termal & Perubahan Wujud Zat</h3>
          <p className="text-xs text-slate-300">
            Segitiga 6 aksi-reaksi wujud zat, penyerapan vs pelepasan kalor, pelarutan dan ekstraksi
          </p>
        </div>
        <div className="flex flex-wrap gap-1 p-1 bg-slate-800 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveTab('segitiga')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'segitiga' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Segitiga 6 Perubahan Wujud
          </button>
          <button
            onClick={() => setActiveTab('suhu-transisi')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'suhu-transisi' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Simulasi Termal H₂O
          </button>
          <button
            onClick={() => setActiveTab('pelarutan-ekstraksi')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'pelarutan-ekstraksi' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Pelarutan & Ekstraksi
          </button>
        </div>
      </div>

      <div className="p-5">
        {/* TAB 1: SEGITIGA 6 PERUBAHAN WUJUD */}
        {activeTab === 'segitiga' && (
          <div className="space-y-6">
            {/* Kalor filter controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700">Filter Aliran Kalor Sesuai PDF:</span>
              <div className="flex gap-2 text-xs font-semibold">
                <button
                  onClick={() => setHeatFilter('all')}
                  className={`px-3 py-1 rounded-lg border transition-all ${
                    heatFilter === 'all' ? 'bg-slate-800 text-white' : 'bg-white text-slate-700'
                  }`}
                >
                  Semua (6 Proses)
                </button>
                <button
                  onClick={() => setHeatFilter('menyerap')}
                  className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
                    heatFilter === 'menyerap'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white text-rose-700 border-rose-200'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" /> Panah Merah (Menerima Kalor)
                </button>
                <button
                  onClick={() => setHeatFilter('melepas')}
                  className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
                    heatFilter === 'melepas'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-blue-700 border-blue-200'
                  }`}
                >
                  <Snowflake className="w-3.5 h-3.5" /> Panah Biru (Melepas Kalor)
                </button>
              </div>
            </div>

            {/* Interactive Process Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {Object.keys(PROCESS_DETAILS).map((k) => {
                const item = PROCESS_DETAILS[k];
                const isHidden =
                  (heatFilter === 'menyerap' && item.kalor !== 'serap') ||
                  (heatFilter === 'melepas' && item.kalor !== 'lepas');
                return (
                  <button
                    key={k}
                    disabled={isHidden}
                    onClick={() => setSelectedProcess(k)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                      isHidden ? 'opacity-30 cursor-not-allowed bg-slate-100' : ''
                    } ${
                      selectedProcess === k
                        ? item.kalor === 'serap'
                          ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                          : 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : item.kalor === 'serap'
                        ? 'bg-rose-50/60 text-rose-900 border-rose-200 hover:bg-rose-100'
                        : 'bg-blue-50/60 text-blue-900 border-blue-200 hover:bg-blue-100'
                    }`}
                  >
                    <div>{item.nama}</div>
                    <span className="text-[10px] block opacity-80 mt-0.5">
                      {item.kalor === 'serap' ? 'Menerima Kalor' : 'Melepas Kalor'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Triangle Diagram Visual Representation */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Triangular Node Visualization */}
              <div className="md:col-span-7 bg-white rounded-xl border border-slate-300 p-6 flex flex-col items-center justify-center relative min-h-[260px]">
                {/* Gas Node */}
                <div className="px-5 py-2.5 bg-red-100 text-red-900 font-bold text-xs rounded-xl border-2 border-red-400 shadow-xs mb-8">
                  GAS (Uap)
                </div>

                {/* Padat & Cair Nodes */}
                <div className="w-full flex justify-between px-6">
                  <div className="px-5 py-2.5 bg-blue-100 text-blue-900 font-bold text-xs rounded-xl border-2 border-blue-400 shadow-xs">
                    PADAT (Es)
                  </div>
                  <div className="px-5 py-2.5 bg-sky-100 text-sky-900 font-bold text-xs rounded-xl border-2 border-sky-400 shadow-xs">
                    CAIR (Air)
                  </div>
                </div>

                {/* Active connection callout in center */}
                <div className="mt-6 p-2 bg-slate-900 text-white rounded-lg text-xs font-mono text-center">
                  Proses Terpilih: <strong className="text-amber-400">{currentProc.nama}</strong> ({currentProc.dari} → {currentProc.ke})
                </div>
              </div>

              {/* Explanation Card */}
              <div className="md:col-span-5 space-y-3 text-xs">
                <div
                  className={`p-4 rounded-xl border ${
                    currentProc.kalor === 'serap'
                      ? 'bg-rose-50 border-rose-200 text-rose-950'
                      : 'bg-blue-50 border-blue-200 text-blue-950'
                  }`}
                >
                  <span className="font-bold text-sm block mb-1">{currentProc.nama}</span>
                  <div className="space-y-1 mb-2">
                    <div>Perubahan: <strong>{currentProc.dari}</strong> menjadi <strong>{currentProc.ke}</strong></div>
                    <div>
                      Aliran Kalor:{' '}
                      <strong className={currentProc.kalor === 'serap' ? 'text-rose-700' : 'text-blue-700'}>
                        {currentProc.kalor === 'serap' ? 'Menerima / Membutuhkan Kalor (Endoterm)' : 'Melepaskan Kalor (Eksoterm)'}
                      </strong>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="font-semibold block mb-0.5">Contoh Sehari-Hari:</span>
                    <p className="italic">{currentProc.contoh}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SIMULASI TERMAL H2O */}
        {activeTab === 'suhu-transisi' && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Ubah Suhu Zat (H₂O) Melalui Slider Termal:
                </span>
                <span className="font-mono text-base font-bold text-blue-700 bg-white px-3 py-1 rounded-lg border border-slate-200">
                  {suhu} °C
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="130"
                value={suhu}
                onChange={(e) => setSuhu(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>-30°C (Padat Es)</span>
                <span>0°C (Titik Lebur)</span>
                <span>100°C (Titik Didih)</span>
                <span>130°C (Uap Gas)</span>
              </div>
            </div>

            {/* Visual transition display */}
            <div className="bg-white border border-slate-300 rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div
                className={`p-5 rounded-xl border transition-all ${
                  suhu < 0 ? 'bg-blue-50 border-blue-400 shadow-md' : 'bg-slate-50 border-slate-200 opacity-50'
                }`}
              >
                <Snowflake className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-bold text-sm text-slate-900">Fase Padat (Es Batu)</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Suhu &lt; 0°C. Partikel kaku dalam kisi kristal, bentuk & volume tetap.
                </p>
              </div>

              <div
                className={`p-5 rounded-xl border transition-all ${
                  suhu >= 0 && suhu <= 100
                    ? 'bg-sky-50 border-sky-400 shadow-md'
                    : 'bg-slate-50 border-slate-200 opacity-50'
                }`}
              >
                <Droplets className="w-8 h-8 text-sky-600 mx-auto mb-2" />
                <h4 className="font-bold text-sm text-slate-900">Fase Cair (Air Minum)</h4>
                <p className="text-xs text-slate-600 mt-1">
                  0°C s.d. 100°C. Partikel menggelincir mengikuti wadah, volume tetap.
                </p>
              </div>

              <div
                className={`p-5 rounded-xl border transition-all ${
                  suhu > 100 ? 'bg-rose-50 border-rose-400 shadow-md' : 'bg-slate-50 border-slate-200 opacity-50'
                }`}
              >
                <Flame className="w-8 h-8 text-rose-600 mx-auto mb-2" />
                <h4 className="font-bold text-sm text-slate-900">Fase Gas (Uap Air)</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Suhu &gt; 100°C. Partikel berenergi kinetik tinggi menyebar mengisi seluruh ruang.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PELARUTAN & EKSTRAKSI */}
        {activeTab === 'pelarutan-ekstraksi' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Dissolution Simulator */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-blue-600" />
                Simulasi Pelarutan: Encer, Pekat, & Jenuh
              </span>
              <p className="text-xs text-slate-600">
                Tambahkan sendok gula ke dalam 100 mL air untuk mengamati perubahan konsentrasi larutan:
              </p>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-700">Jumlah Gula Terlarut:</span>
                <div className="flex gap-1.5">
                  {[1, 4, 8].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpoons(s)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
                        spoons === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700'
                      }`}
                    >
                      {s === 1 ? '1 Sendok (Encer)' : s === 4 ? '4 Sendok (Pekat)' : '8 Sendok (Jenuh)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Beaker visual */}
              <div className="w-44 h-52 mx-auto border-4 border-t-0 border-slate-400 rounded-b-2xl relative bg-blue-50/40 p-2 flex flex-col justify-end">
                <div
                  className="w-full rounded-b transition-all duration-300 flex flex-col justify-end p-2"
                  style={{
                    height: '80%',
                    backgroundColor:
                      spoons === 1
                        ? 'rgba(186, 230, 253, 0.4)'
                        : spoons === 4
                        ? 'rgba(254, 215, 170, 0.6)'
                        : 'rgba(251, 191, 36, 0.75)',
                  }}
                >
                  {spoons === 8 && (
                    <div className="bg-amber-700 text-white text-[9px] font-bold p-1 rounded text-center">
                      Kristal Gula Mengendap (Tak Larut Lagi)
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs space-y-1 text-slate-700">
                <div className="font-bold text-slate-900">
                  {spoons === 1 && '1. Larutan Encer (Dilute Solution)'}
                  {spoons === 4 && '2. Larutan Pekat (Concentrated Solution)'}
                  {spoons === 8 && '3. Larutan Jenuh (Saturated Solution)'}
                </div>
                <p>
                  {spoons === 1 && 'Zat terlarut (solute) yang terdapat lebih sedikit dibanding pelarutnya.'}
                  {spoons === 4 && 'Zat terlarut relatif lebih banyak dibanding pelarutnya.'}
                  {spoons === 8 && 'Larutan memiliki kondisi yang tidak mampu lagi melarutkan zat terlarut pada suhu tertentu sehingga terbentuk endapan.'}
                </p>
              </div>
            </div>

            {/* Extraction Simulator */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-amber-700" />
                Simulasi Ekstraksi (Penyeduhan Kopi)
              </span>
              <p className="text-xs text-slate-600">
                Sesuai materi PDF: Ekstraksi adalah pengeluaran senyawa-senyawa (analit) dari sebuah sampel yang umumnya menggunakan media pelarut yang sesuai.
              </p>

              <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-900 text-amber-100 flex items-center justify-center font-bold text-sm">
                    Kopi
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Sampel: Serbuk Biji Kopi</span>
                    <span className="text-slate-500">Mengandung analit kafein, minyak atsiri, dan senyawa asam</span>
                  </div>
                </div>

                <div className="flex items-center justify-center text-slate-400">
                  <ArrowRight className="w-4 h-4" /> Disiram Pelarut Air Panas (Solvent) <ArrowRight className="w-4 h-4" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-700 text-white flex items-center justify-center font-bold text-sm">
                    Ekstrak
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Hasil: Minuman Kopi Siap Minum</span>
                    <span className="text-slate-500">Analit berhasil terekstraksi ke dalam air; ampas kasar tertinggal</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs">
                <strong>Catatan Reversibilitas:</strong> Baik pelarutan maupun ekstraksi tergolong ke dalam perubahan fisika karena komponen analitnya tidak bereaksi kimia dan dapat dipisahkan kembali secara fisik.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
