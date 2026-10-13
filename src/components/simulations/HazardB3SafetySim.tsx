import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, Flame, Skull, Biohazard, Droplets, CheckCircle2, RotateCcw, Truck, RefreshCw, FileText } from 'lucide-react';

export default function HazardB3SafetySim() {
  const [activeTab, setActiveTab] = useState<'simbol-ghs' | 'kabinet-penyimpanan' | 'alur-prosedur' | 'prinsip-5r'>('simbol-ghs');

  // GHS symbols
  const [selectedSymbol, setSelectedSymbol] = useState<string>('flammable');

  // Cabinet placement state: user can place 4 chemicals into 3 shelves
  const [shelfAllocations, setShelfAllocations] = useState<Record<string, number>>({
    'Asam Klorida (HCl)': 1,
    'Natrium Hidroksida (NaOH - Basa)': 2,
    'Pelarut Organik (Etanol)': 3,
    'Asam Sulfat (H₂SO₄)': 1,
  });

  // 7 Procedures order game
  const initialProcedures = [
    { id: 4, text: '4. Penyimpanan Sementara (ruangan khusus & wadah sekunder)' },
    { id: 1, text: '1. Identifikasi dan Klasifikasi (jenis, sumber, sifat bahaya)' },
    { id: 5, text: '5. Pengangkutan (izin KLHK & dokumen manifest resmi)' },
    { id: 2, text: '2. Pemisahan Limbah sejak sumbernya' },
    { id: 7, text: '7. Penimbunan Akhir (TPA-LB3 berizin lapisan kedap air)' },
    { id: 3, text: '3. Pelabelan Wadah Limbah (simbol GHS & tanggal simpan)' },
    { id: 6, text: '6. Pengolahan (Fisik, Kimia, Biologi/Bioremediasi, Termal)' },
  ];
  const [procedureOrder, setProcedureOrder] = useState(initialProcedures);
  const [procedureFeedback, setProcedureFeedback] = useState<string | null>(null);

  const GHS_LIST = [
    {
      id: 'flammable',
      title: 'Mudah Menyala (Flammable)',
      code: 'Skala Bahaya 3 - 4',
      desc: 'Bahan kimia yang mudah tersulut api oleh percikan, gesekan, atau sumber panas. Contoh: Alkohol, Bensin, Eter.',
      tindakan: 'Jauhkan dari sumber api terbuka dan percikan listrik; simpan di lemari tahan api bersuhu 20–25°C.'
    },
    {
      id: 'corrosive',
      title: 'Korosif (Corrosive)',
      code: 'Skala Bahaya 3',
      desc: 'Dapat mengikis permukaan logam dan merusak jaringan kulit manusia hingga luka bakar kimia parah. Contoh: Asam Klorida pekat, Asam Sulfat, NaOH.',
      tindakan: 'Gunakan sarung tangan nitril/karet tebal dan kacamata goggle; sediakan eye wash station terdekat.'
    },
    {
      id: 'toxic',
      title: 'Beracun / Toksik (Toxic)',
      code: 'Skala Bahaya 4',
      desc: 'Menyebabkan keracunan akut atau kematian jika terhirup, tertelan, atau terserap lewat kulit. Contoh: Kalium Sianida, Raksa (Merkuri).',
      tindakan: 'Wajib gunakan lemari asam (fume hood) dan masker respirator bertabung khusus.'
    },
    {
      id: 'oxidizing',
      title: 'Pengoksidasi (Oxidizing)',
      code: 'Skala Bahaya 3',
      desc: 'Dapat melepaskan oksigen yang mempercepat dan mengobarkan kebakaran bahan lain. Contoh: Kalium Permanganat, Hidrogen Peroksida pekat.',
      tindakan: 'Pisahkan penyimpanan dari bahan organik yang mudah terbakar dan reduktor.'
    },
    {
      id: 'environmental',
      title: 'Bahaya Lingkungan (Aquatic Hazard)',
      code: 'Skala Bahaya 2 - 3',
      desc: 'Beracun bagi kehidupan perairan (ikan, biota laut) dan mencemari tanah jangka panjang. Contoh: Limbah merkuri, pestisida organofosfat.',
      tindakan: 'Jangan sekali-kali membuang ke saluran pembuangan/wastafel lab; kelola sebagai limbah B3 berizin.'
    },
  ];

  const currentGhs = GHS_LIST.find((g) => g.id === selectedSymbol) || GHS_LIST[0];

  const moveProcedure = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= procedureOrder.length) return;
    const copy = [...procedureOrder];
    const temp = copy[index];
    copy[index] = copy[newIdx];
    copy[newIdx] = temp;
    setProcedureOrder(copy);
    setProcedureFeedback(null);
  };

  const verifyProcedureOrder = () => {
    const isCorrect = procedureOrder.every((p, idx) => p.id === idx + 1);
    if (isCorrect) {
      setProcedureFeedback('Luar biasa! Urutan 7 prosedur pengelolaan limbah B3 kamu sudah 100% tepat sesuai PP No. 101 Tahun 2014.');
    } else {
      setProcedureFeedback('Urutan masih belum tepat. Ingat alurnya: 1. Identifikasi → 2. Pemisahan → 3. Pelabelan → 4. Penyimpanan Sementara → 5. Pengangkutan → 6. Pengolahan → 7. Penimbunan Akhir.');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Top Header & Sub-Tabs */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-base">Laboratorium Keselamatan & Pengelolaan Limbah B3</h3>
          <p className="text-xs text-slate-300">
            Simbol bahaya GHS, standar ruang penyimpanan, 7 tahap alur limbah (PP 101/2014), dan prinsip 5R
          </p>
        </div>
        <div className="flex flex-wrap gap-1 p-1 bg-slate-800 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveTab('simbol-ghs')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'simbol-ghs' ? 'bg-rose-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Piktogram GHS
          </button>
          <button
            onClick={() => setActiveTab('kabinet-penyimpanan')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'kabinet-penyimpanan' ? 'bg-rose-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Fasilitas Penyimpanan B3
          </button>
          <button
            onClick={() => setActiveTab('alur-prosedur')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'alur-prosedur' ? 'bg-rose-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            7 Prosedur Limbah
          </button>
          <button
            onClick={() => setActiveTab('prinsip-5r')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'prinsip-5r' ? 'bg-rose-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Prinsip 5R
          </button>
        </div>
      </div>

      <div className="p-5">
        {/* TAB 1: GHS PIKTOGRAM */}
        {activeTab === 'simbol-ghs' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {GHS_LIST.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedSymbol(g.id)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border text-left transition-all ${
                    selectedSymbol === g.id
                      ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {g.title}
                </button>
              ))}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Visual Diamond Symbol */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-slate-300">
                <div className="w-28 h-28 border-4 border-red-600 bg-white rotate-45 flex items-center justify-center shadow-md">
                  <div className="-rotate-45 text-center">
                    {selectedSymbol === 'flammable' && <Flame className="w-12 h-12 text-slate-900 mx-auto" />}
                    {selectedSymbol === 'corrosive' && <Droplets className="w-12 h-12 text-slate-900 mx-auto" />}
                    {selectedSymbol === 'toxic' && <Skull className="w-12 h-12 text-slate-900 mx-auto" />}
                    {selectedSymbol === 'oxidizing' && <Flame className="w-12 h-12 text-amber-600 mx-auto" />}
                    {selectedSymbol === 'environmental' && <AlertTriangle className="w-12 h-12 text-slate-900 mx-auto" />}
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-red-600 mt-8 uppercase tracking-wider">
                  GHS Standar Internasional
                </span>
              </div>

              {/* Symbol Information */}
              <div className="md:col-span-8 space-y-3 text-xs">
                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-slate-900 text-base">{currentGhs.title}</h4>
                    <span className="font-mono text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded">
                      {currentGhs.code}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{currentGhs.desc}</p>
                  <div className="pt-3 border-t border-slate-100">
                    <span className="font-bold text-slate-800 block mb-1">
                      Instruksi Penanganan Aman &amp; Darurat:
                    </span>
                    <p className="text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200">
                      {currentGhs.tindakan}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
                  <strong>Pengkodean Potensi Bahaya B3 PDF:</strong> Dinilai berdasarkan respon bahaya dalam waktu sangat singkat pada rentang skala <strong>0 sampai 4</strong> (0 memiliki potensi rendah, 4 memiliki potensi tinggi).
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FASILITAS PENYIMPANAN */}
        {activeTab === 'kabinet-penyimpanan' && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs">
              <span className="font-bold text-slate-900 text-sm block">
                Atur Penempatan Reagen ke Rak Kabinet Sesuai Kompatibilitas Kimia:
              </span>
              <p className="text-slate-600">
                Pemisahan adalah langkah paling penting dalam penyimpanan B3 untuk mencegah reaksi eksoterm, kebakaran, atau gas beracun. Asam kuat tidak boleh dicampur dengan basa atau pelarut organik pada rak yang sama!
              </p>

              {/* Interactive re-assignment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {Object.keys(shelfAllocations).map((chem) => (
                  <div key={chem} className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="font-semibold text-slate-800">{chem}</span>
                    <select
                      value={shelfAllocations[chem]}
                      onChange={(e) =>
                        setShelfAllocations({
                          ...shelfAllocations,
                          [chem]: Number(e.target.value),
                        })
                      }
                      className="px-2 py-1 border border-slate-300 rounded text-xs bg-slate-50 font-semibold"
                    >
                      <option value={1}>Rak 1 (Asam Khusus)</option>
                      <option value={2}>Rak 2 (Basa Khusus)</option>
                      <option value={3}>Rak 3 (Pelarut Organik Tahan Api)</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist of 6 Physical Standards */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 text-sm">
                6 Standar Wajib Fasilitas Fisik Ruang Penyimpanan B3 Menurut PDF:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>1. Ventilasi Baik:</strong> Mencegah akumulasi uap beracun atau gas mudah menyala.
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>2. APAR Siap Pakai:</strong> Sesuai jenis bahan (CO₂, dry powder, atau foam).
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>3. Lantai Kedap Air:</strong> Menggunakan lantai tahan bahan kimia dan tidak licin.
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>4. Rak / Kabinet Khusus:</strong> Terpisah antar golongan bahan yang tidak kompatibel.
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>5. Bak Penampung (Spill Containment):</strong> Terpasang di bawah rak untuk menahan tumpahan.
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>6. Suhu Ruang Stabil (20–25°C):</strong> Sejuk dan terlindung dari terik matahari langsung.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 7 ALUR PROSEDUR */}
        {activeTab === 'alur-prosedur' && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Tantangan Urutan Prosedur Pengelolaan Limbah B3 (PP 101/2014)
                  </span>
                  <p className="text-xs text-slate-600">
                    Gunakan tombol Naik/Turun untuk menyusun 7 tahapan resmi berikut ke dalam urutan kronologis yang benar!
                  </p>
                </div>
                <button
                  onClick={() => setProcedureOrder(initialProcedures)}
                  className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Acak Ulang
                </button>
              </div>

              {/* Procedure items */}
              <div className="space-y-2">
                {procedureOrder.map((p, idx) => (
                  <div
                    key={p.id}
                    className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs shadow-2xs"
                  >
                    <span className="font-semibold text-slate-800">{p.text}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveProcedure(idx, 'up')}
                        disabled={idx === 0}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 rounded text-slate-700 font-bold"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveProcedure(idx, 'down')}
                        disabled={idx === procedureOrder.length - 1}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 rounded text-slate-700 font-bold"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={verifyProcedureOrder}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg text-xs"
                >
                  Verifikasi Susunan Prosedur
                </button>
              </div>

              {procedureFeedback && (
                <div className="p-3.5 bg-white border border-rose-200 rounded-xl text-xs text-slate-800 font-medium">
                  {procedureFeedback}
                </div>
              )}
            </div>

            {/* Methods Table */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 text-xs space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">
                Tabel 4 Metode Pengolahan Limbah B3 Sesuai PDF (Hal 21):
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left divide-y divide-slate-200">
                  <thead className="bg-slate-100 font-semibold text-slate-700">
                    <tr>
                      <th className="p-2">Metode</th>
                      <th className="p-2">Cara Kerja</th>
                      <th className="p-2">Contoh Nyata</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="p-2 font-bold text-slate-800">Fisik</td>
                      <td className="p-2">Mengubah bentuk atau memisahkan padatan</td>
                      <td className="p-2">Filtrasi, sedimentasi, evaporasi</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-slate-800">Kimia</td>
                      <td className="p-2">Menetralkan atau mengendapkan zat berbahaya</td>
                      <td className="p-2">Netralisasi asam-basa, presipitasi logam berat</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-slate-800">Biologi</td>
                      <td className="p-2">Menguraikan zat berbahaya dengan mikroba pengurai</td>
                      <td className="p-2">Bioremediasi tanah atau air tercemar minyak</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-slate-800">Termal</td>
                      <td className="p-2">Menghancurkan limbah dengan pembakaran bersuhu tinggi</td>
                      <td className="p-2">Insinerasi limbah medis rumah sakit atau zat organik</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PRINSIP 5R */}
        {activeTab === 'prinsip-5r' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                { r: '1. Reduce (Mengurangi)', desc: 'Gunakan bahan kimia seperlunya dan efisien sesuai kebutuhan praktikum/industri.', bg: 'bg-emerald-50 border-emerald-300' },
                { r: '2. Reuse (Gunakan Kembali)', desc: 'Manfaatkan kembali bahan atau pelarut yang masih layak digunakan tanpa reaksi berbahaya.', bg: 'bg-blue-50 border-blue-300' },
                { r: '3. Recycle (Daur Ulang)', desc: 'Olah limbah yang ada menjadi bahan baru yang berguna (misal daur ulang pelarut distilasi).', bg: 'bg-indigo-50 border-indigo-300' },
                { r: '4. Recovery (Pemulihan)', desc: 'Ambil dan pulihkan kembali zat bernilai ekonomis tinggi dari limbah (misal pemulihan logam perak).', bg: 'bg-amber-50 border-amber-300' },
                { r: '5. Replace (Penggantian)', desc: 'Ganti bahan kimia berbahaya dan beracun dengan bahan alternatif yang lebih aman dan ramah lingkungan.', bg: 'bg-rose-50 border-rose-300' },
              ].map((item, idx) => (
                <div key={idx} className={`p-4 rounded-xl border text-xs space-y-1.5 ${item.bg}`}>
                  <strong className="block text-slate-900 text-sm">{item.r}</strong>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2 text-slate-700">
              <span className="font-bold text-slate-900 block">Studi Kasus Penerapan 5R:</span>
              <p>
                Sebuah pabrik percetakan mengganti pelarut beracun toluena dengan pelarut ramah lingkungan berbasis sitrat (<strong>Replace</strong>). Sisa tinta pelarut disaring dan didistilasi ulang untuk digunakan kembali (<strong>Recycle &amp; Reuse</strong>), serta kuantitas pemesanan diatur ketat agar tidak ada botol kedaluwarsa (<strong>Reduce</strong>).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
