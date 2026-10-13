import React, { useState } from 'react';
import { Flame, ShieldAlert, Zap, Sun, Bug, Wind, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export default function ChemicalBiologicalSim() {
  const [activeTab, setActiveTab] = useState<'korosi' | 'pembakaran' | 'biologi'>('korosi');

  // Corrosion lab tube selection
  const [selectedTube, setSelectedTube] = useState<'kering' | 'air' | 'garam' | 'asam'>('garam');
  const [galvanicCoupled, setGalvanicCoupled] = useState<boolean>(false);

  // Combustion state
  const [oxygenLevel, setOxygenLevel] = useState<number>(21); // %
  const [isBurning, setIsBurning] = useState<boolean>(true);

  // Biology state
  const [bioMode, setBioMode] = useState<'fotosintesis' | 'fermentasi' | 'pembusukan' | 'pelapukan'>('fotosintesis');

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Top Header & Sub-Tabs */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-base">Laboratorium Perubahan Kimia & Biologi</h3>
          <p className="text-xs text-slate-300">
            Eksperimen korosi (5 faktor percepatan), reaksi pembakaran, fotosintesis, fermentasi, dan pelapukan
          </p>
        </div>
        <div className="flex flex-wrap gap-1 p-1 bg-slate-800 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveTab('korosi')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'korosi' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Pengkaratan (Korosi)
          </button>
          <button
            onClick={() => setActiveTab('pembakaran')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'pembakaran' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Reaksi Pembakaran
          </button>
          <button
            onClick={() => setActiveTab('biologi')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'biologi' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Perubahan Biologi
          </button>
        </div>
      </div>

      <div className="p-5">
        {/* TAB 1: KOROSI */}
        {activeTab === 'korosi' && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Pilih Tabung Reaksi Eksperimen Korosi Paku Besi:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'kering', label: 'Tabung 1: Udara Kering + Silika' },
                  { id: 'air', label: 'Tabung 2: Air Suling Murni' },
                  { id: 'garam', label: 'Tabung 3: Air Garam (Elektrolit)' },
                  { id: 'asam', label: 'Tabung 4: Larutan Asam (pH < 7)' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTube(t.id as any)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                      selectedTube === t.id
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={galvanicCoupled}
                    onChange={(e) => setGalvanicCoupled(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Aktifkan Kontak Galvanik (Galvanic Coupling dengan besi berkarat lain)</span>
                </label>
                <span className="text-slate-500">Memicu aliran elektron percepatan</span>
              </div>
            </div>

            {/* Visual Tube Graphic */}
            <div className="bg-slate-900 rounded-xl p-6 text-white grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 flex justify-center">
                <div className="w-24 h-60 border-4 border-t-0 border-slate-400 rounded-b-3xl relative bg-slate-800/80 p-2 flex flex-col justify-end">
                  {/* Liquid fill */}
                  {selectedTube !== 'kering' && (
                    <div
                      className={`w-full rounded-b-2xl transition-all duration-300 relative ${
                        selectedTube === 'garam'
                          ? 'h-36 bg-cyan-900/60'
                          : selectedTube === 'asam'
                          ? 'h-36 bg-amber-900/60'
                          : 'h-36 bg-sky-900/40'
                      }`}
                    >
                      <div className="absolute top-1 inset-x-0 text-[9px] text-center font-mono opacity-80">
                        {selectedTube === 'garam' ? 'Air Garam NaCl' : selectedTube === 'asam' ? 'Larutan Asam' : 'Air H₂O'}
                      </div>
                    </div>
                  )}

                  {/* Nail representation */}
                  <div
                    className={`w-4 h-36 mx-auto border-2 rounded-b-sm -mt-24 transition-all duration-300 flex flex-col justify-end ${
                      selectedTube === 'kering'
                        ? 'bg-slate-300 border-slate-400'
                        : selectedTube === 'air'
                        ? 'bg-amber-600/70 border-amber-700'
                        : 'bg-amber-700 border-amber-900'
                    }`}
                  >
                    {/* Rust spots */}
                    {selectedTube !== 'kering' && (
                      <div className="w-full h-24 bg-amber-800/90 rounded-b text-[8px] text-amber-200 text-center font-mono py-1">
                        Karat Oksida
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Scientific Explanation of the 5 Factors */}
              <div className="md:col-span-7 space-y-3 text-xs">
                <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700 space-y-2">
                  <span className="font-bold text-amber-400 text-sm block">
                    Hasil Pengamatan Laju Korosi:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedTube === 'kering' &&
                      'Paku besi tetap bersih mengkilap tanpa karat. Tanpa adanya kelembapan (uap air), reaksi oksidasi logam tidak dapat berlangsung.'}
                    {selectedTube === 'air' &&
                      'Paku besi mulai teroksidasi secara lambat membentuk sedikit karat cokelat kemerah-merahan di permukaannya.'}
                    {selectedTube === 'garam' &&
                      'Laju korosi sangat cepat! Keberadaan elektrolit (garam) menghantarkan elektron bebas dari anode ke katode sehingga mempercepat proses pengkaratan.'}
                    {selectedTube === 'asam' &&
                      'Korosi berlangsung sangat agresif! Nilai pH yang kurang dari 7 (pH asam) melarutkan lapisan pelindung logam dan mempercepat pembentukan oksida besi.'}
                  </p>
                  {galvanicCoupled && (
                    <div className="p-2 bg-amber-950/80 border border-amber-600 rounded text-amber-300">
                      <strong>Galvanic Coupling Aktif:</strong> Kontak langsung antara besi bersih dengan besi berkarat memicu transfer elektron bebas, melipatgandakan kecepatan pengkaratan!
                    </div>
                  )}
                </div>

                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700 text-slate-300">
                  <span className="font-bold text-slate-100 block mb-1">5 Faktor Percepatan Korosi Sesuai PDF:</span>
                  <ol className="list-decimal pl-4 space-y-0.5 text-[11px]">
                    <li>Kelembapan (konsentrasi uap air tinggi).</li>
                    <li>Keasaman (nilai pH &lt; 7).</li>
                    <li>Keberadaan elektrolit (menghantarkan elektron bebas anode-katode).</li>
                    <li>Suhu tinggi (mempercepat kinetika reaksi oksidasi).</li>
                    <li>Galvanic coupling (kontak dengan logam lain/sudah berkarat).</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PEMBAKARAN */}
        {activeTab === 'pembakaran' && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Simulasi Reaksi Pembakaran dengan Oksidan
              </span>
              <p className="text-xs text-slate-600">
                Sesuai definisi PDF: Pembakaran adalah reaksi kimia pada zat yang mudah terbakar dengan suatu oksidan (gas oksigen) yang menghasilkan panas dan zat baru.
              </p>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-700">Kadar Gas O₂ di Ruangan:</span>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={oxygenLevel}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setOxygenLevel(val);
                    setIsBurning(val > 5);
                  }}
                  className="w-48 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
                <span className="font-mono text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {oxygenLevel}% O₂
                </span>
              </div>

              {/* Flame stage */}
              <div className="w-full bg-slate-950 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                {isBurning ? (
                  <div className="space-y-2">
                    <Flame
                      className="w-16 h-16 text-rose-500 mx-auto animate-bounce"
                      style={{ filter: `drop-shadow(0 0 ${oxygenLevel * 0.8}px #f97316)` }}
                    />
                    <div className="font-bold text-sm text-white">Reaksi Kimia Eksotermik Berlangsung</div>
                    <div className="text-xs text-slate-300 font-mono">
                      Bahan Bakar + O₂ → CO₂ + H₂O + Energi Panas & Cahaya
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-slate-400">
                    <div className="w-8 h-8 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-xs">
                      X
                    </div>
                    <div className="font-bold text-sm text-slate-300">Api Padam! (Kadar O₂ &lt; 5%)</div>
                    <div className="text-xs text-slate-500">
                      Reaksi pembakaran berhenti total saat suplai oksidan ditiadakan (Prinsip APAR).
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BIOLOGI */}
        {activeTab === 'biologi' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'fotosintesis', label: '1. Fotosintesis' },
                { id: 'fermentasi', label: '2. Peragian (Fermentasi)' },
                { id: 'pembusukan', label: '3. Pembusukan (Dekomposisi)' },
                { id: 'pelapukan', label: '4. Pelapukan Material' },
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBioMode(b.id as any)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                    bioMode === b.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 text-xs">
              {bioMode === 'fotosintesis' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-500" />
                    Fotosintesis Tumbuhan Autotrof
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Tumbuhan membuat makanan dengan cara fotosintesis, yaitu mengubah air dan gas karbon (CO₂) menjadi glukosa dengan bantuan energi cahaya matahari dan klorofil.
                  </p>
                  <div className="p-3 bg-white border border-slate-200 rounded-lg font-mono text-center text-emerald-800 font-bold">
                    6CO₂ (Gas Karbon) + 6H₂O (Air) + Cahaya → C₆H₁₂O₆ (Glukosa) + 6O₂ (Oksigen)
                  </div>
                </div>
              )}

              {bioMode === 'fermentasi' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Peragian (Fermentasi)</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Fermentasi adalah proses penguraian zat kompleks menjadi komponen yang lebih sederhana dengan melibatkan enzim pengurai dari mikroorganisme (misal: ragi Saccharomyces cerevisiae pada pembuatan tape dan roti).
                  </p>
                  <div className="p-3 bg-white border border-slate-200 rounded-lg font-mono text-center text-slate-800">
                    Glukosa kompleks → Etanol / Asam + Gas CO₂ (membuat adonan mengembang)
                  </div>
                </div>
              )}

              {bioMode === 'pembusukan' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Pembusukan (Dekomposisi Sisa Zat Organik)</h4>
                  <p className="text-slate-600">
                    Sesuai dokumen PDF, proses pembusukan sisa zat organik disebabkan oleh 3 faktor:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-white border border-slate-200 rounded-lg">
                      <strong className="block text-slate-900 mb-1">a. Autolisis</strong>
                      Pelunakan dan pencairan sel yang disebabkan oleh enzim intraseluler yang dilepaskan oleh sel yang telah mati. Makin cepat pada suhu & kelembapan tinggi.
                    </div>
                    <div className="p-3 bg-white border border-slate-200 rounded-lg">
                      <strong className="block text-slate-900 mb-1">b. Reaksi Reduksi-Oksidasi</strong>
                      Interaksi oksigen di udara dengan molekul penyusun zat organik menyebabkan penguraian dan perubahan struktur molekul.
                    </div>
                    <div className="p-3 bg-white border border-slate-200 rounded-lg">
                      <strong className="block text-slate-900 mb-1">c. Bakteri Pengurai</strong>
                      Aktivitas bakteri memperoleh makanan dari sisa kehidupan organisme hingga seluruh sisa habis terurai.
                    </div>
                  </div>
                </div>
              )}

              {bioMode === 'pelapukan' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Pelapukan Material (Biotik & Benda Mati)</h4>
                  <p className="text-slate-600">
                    Peristiwa biologi yang berhubungan dengan fisika dan kimia berupa penghancuran material akibat waktu, iklim, cuaca, dan suhu. Terbagi menjadi 3 penyebab:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-white border border-slate-200 rounded-lg">
                      <strong className="block text-slate-900 mb-1">1. Pelapukan Biologis</strong>
                      Sebagian besar diakibatkan oleh aktivitas makhluk hidup (akar tanaman memecah batu, lumut kerak/lichen).
                    </div>
                    <div className="p-3 bg-white border border-slate-200 rounded-lg">
                      <strong className="block text-slate-900 mb-1">2. Pelapukan Fisis</strong>
                      Disebabkan oleh perubahan fisik seperti pemuaian-penyusutan akibat perbedaan suhu siang-malam yang ekstrem dan terpaan angin/air.
                    </div>
                    <div className="p-3 bg-white border border-slate-200 rounded-lg">
                      <strong className="block text-slate-900 mb-1">3. Pelapukan Kimia</strong>
                      Diakibatkan dari zat kimia (seperti hujan asam atau air berkarbonat) yang melarutkan dan menguraikan struktur benda.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
