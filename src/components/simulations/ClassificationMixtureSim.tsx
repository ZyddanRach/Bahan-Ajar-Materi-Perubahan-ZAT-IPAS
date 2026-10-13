import React, { useState } from 'react';
import { Layers, CheckCircle2, XCircle, ArrowRight, Sparkles, Filter, Droplets, Flame } from 'lucide-react';

interface SubstanceSample {
  name: string;
  category: 'logam' | 'nonlogam' | 'semilogam' | 'senyawa' | 'larutan' | 'koloid' | 'suspensi';
  desc: string;
  scientificReason: string;
}

const SAMPLES: SubstanceSample[] = [
  {
    name: 'Garam Dapur (NaCl)',
    category: 'senyawa',
    desc: 'Bumbu kristal putih yang tersusun atas unsur Natrium dan Klorida.',
    scientificReason: 'Senyawa: Gabungan dari unsur Natrium (Na) dan Klorin (Cl) yang saling berikatan melalui reaksi kimia dalam perbandingan massa tetap.'
  },
  {
    name: 'Tembaga Kabel Listrik',
    category: 'logam',
    desc: 'Logam kemerahan penghantar listrik dan panas yang baik, padat dan dapat ditempa.',
    scientificReason: 'Unsur Logam: Mengkilap, padat pada suhu kamar, memiliki kepadatan tinggi, dapat ditempa/direnggangkan, dan konduktor listrik ulung.'
  },
  {
    name: 'Silikon (Bahan Semikonduktor)',
    category: 'semilogam',
    desc: 'Unsur yang memiliki sifat peralihan antara logam dan nonlogam.',
    scientificReason: 'Unsur Semilogam: Memiliki sifat peralihan antara logam dan nonlogam, dimanfaatkan sebagai bahan dasar pembuatan komponen kelistrikan dan chip.'
  },
  {
    name: 'Air Gula (Sirup Bening)',
    category: 'larutan',
    desc: 'Campuran air dan gula yang tercampur rata tanpa meninggalkan endapan.',
    scientificReason: 'Larutan (Campuran Homogen): Komposisi zat penyusun tidak dapat dibedakan lagi, tidak ada endapan, dan tidak dapat dipisahkan dengan saringan kertas biasa.'
  },
  {
    name: 'Susu Segar Sapi',
    category: 'koloid',
    desc: 'Cairan putih keruh yang tampak merata jika dilihat sekilas dengan mata telanjang.',
    scientificReason: 'Koloid (Campuran Heterogen): Terbentuk akibat terdispersinya lemak/protein (fase terdispersi) ke dalam air (medium pendispersi). Jika diamati dengan mikroskop tampak dua fase.'
  },
  {
    name: 'Kopi Tubruk Mengendap',
    category: 'suspensi',
    desc: 'Seduhan bubuk kopi yang jika didiamkan menghasilkan endapan tebal di dasar.',
    scientificReason: 'Suspensi (Campuran Heterogen): Zat penyusunnya tidak tercampur sempurna, tidak stabil, mudah mengendap, dan dapat dipisahkan dengan penyaringan.'
  },
  {
    name: 'Raksa (Merkuri Termometer)',
    category: 'logam',
    desc: 'Unsur logam unik berwarna perak yang berwujud cair pada suhu kamar.',
    scientificReason: 'Unsur Logam Pengecualian: Pada suhu kamar logam umumnya berwujud padat kecuali raksa dan sesium yang berwujud cair.'
  },
  {
    name: 'Grafit / Isi Pensil Karbon',
    category: 'nonlogam',
    desc: 'Bahan karbon hitam rapuh yang dapat menghantarkan arus listrik.',
    scientificReason: 'Unsur Nonlogam Pengecualian: Nonlogam umumnya isolator rapuh, namun grafit karbon merupakan pengecualian yang dapat menghantarkan panas/listrik.'
  }
];

export default function ClassificationMixtureSim() {
  const [activeTab, setActiveTab] = useState<'klasifikasi' | 'pemisahan'>('klasifikasi');

  // Classification states
  const [selectedSampleIdx, setSelectedSampleIdx] = useState<number>(0);
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Separation method states
  const [activeSeparation, setActiveSeparation] = useState<
    'filtrasi' | 'kristalisasi' | 'dekantasi' | 'sublimasi' | 'distilasi' | 'kromatografi'
  >('filtrasi');
  const [simStep, setSimStep] = useState<number>(1);

  const currentSample = SAMPLES[selectedSampleIdx];

  const handleTestClassification = (cat: string) => {
    setUserChoice(cat);
    const isCorrect = cat === currentSample.category;
    setFeedback({
      isCorrect,
      message: isCorrect
        ? `Benar! ${currentSample.scientificReason}`
        : `Kurang tepat. Pilihanmu bukan klasifikasi yang pas. Alasan ilmiah: ${currentSample.scientificReason}`
    });
  };

  const handleNextSample = () => {
    setUserChoice(null);
    setFeedback(null);
    setSelectedSampleIdx((prev) => (prev + 1) % SAMPLES.length);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Top Header & Tab switcher */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-base">Laboratorium Komposisi & Pemisahan Campuran</h3>
          <p className="text-xs text-slate-300">Uji sifat zat tunggal, koloid, suspensi, serta 6 metode pemisahan mekanik/fisis</p>
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-slate-800 rounded-lg">
          <button
            onClick={() => setActiveTab('klasifikasi')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'klasifikasi' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Uji Klasifikasi Materi
          </button>
          <button
            onClick={() => setActiveTab('pemisahan')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'pemisahan' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            6 Metode Pemisahan
          </button>
        </div>
      </div>

      {activeTab === 'klasifikasi' ? (
        <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sample Card */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
                <span className="font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  Sampel #{selectedSampleIdx + 1} dari {SAMPLES.length}
                </span>
                <button
                  onClick={handleNextSample}
                  className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                >
                  Sampel Berikutnya <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <h4 className="text-xl font-bold text-slate-900 mb-2">{currentSample.name}</h4>
              <p className="text-sm text-slate-600 mb-4">{currentSample.desc}</p>

              <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1.5 text-xs">
                <div className="text-slate-500 font-medium">Petunjuk Pengamatan Praktikan:</div>
                <div className="text-slate-700">
                  Perhatikan apakah zat ini memiliki perbandingan massa tetap kimia (senyawa), sifat fisik logam/semilogam, atau merupakan campuran homogen/heterogen!
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">Pilih kategori di panel kanan</span>
              <button
                onClick={handleNextSample}
                className="px-3 py-1.5 text-xs font-medium bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg transition-colors"
              >
                Ganti Sampel Acak
              </button>
            </div>
          </div>

          {/* Classification Options */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Kelompokkan Sampel Ini ke Kategori yang Tepat:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'logam', label: 'Unsur Logam', color: 'border-slate-300 hover:border-blue-400' },
                  { id: 'nonlogam', label: 'Unsur Nonlogam', color: 'border-slate-300 hover:border-blue-400' },
                  { id: 'semilogam', label: 'Unsur Semilogam', color: 'border-slate-300 hover:border-blue-400' },
                  { id: 'senyawa', label: 'Senyawa Kimia', color: 'border-slate-300 hover:border-blue-400' },
                  { id: 'larutan', label: 'Larutan (Homogen)', color: 'border-slate-300 hover:border-blue-400' },
                  { id: 'koloid', label: 'Koloid (Heterogen)', color: 'border-slate-300 hover:border-blue-400' },
                  { id: 'suspensi', label: 'Suspensi (Mengendap)', color: 'border-slate-300 hover:border-blue-400' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTestClassification(item.id)}
                    className={`p-2.5 text-xs font-semibold rounded-lg border text-left transition-all ${
                      userChoice === item.id
                        ? userChoice === currentSample.category
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs'
                          : 'bg-rose-50 border-rose-500 text-rose-900 shadow-xs'
                        : `bg-white text-slate-700 ${item.color} hover:bg-slate-50`
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Instant Scientific Feedback */}
            {feedback ? (
              <div
                className={`p-4 rounded-xl border text-xs leading-relaxed transition-all ${
                  feedback.isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}
              >
                <div className="flex items-start gap-2">
                  {feedback.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold block mb-1">
                      {feedback.isCorrect ? 'Jawaban Tepat!' : 'Perhatikan Analisis Ilmiah:'}
                    </span>
                    <p>{feedback.message}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500">
                Pilih salah satu tombol di atas untuk melihat pembuktian ilmiah sifat komposisi zat tersebut.
              </div>
            )}
          </div>
        </div>
      ) : (
        /* TAB 2: SEPARATION METHODS */
        <div className="p-5 space-y-6">
          {/* Method selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              { id: 'filtrasi', label: '1. Filtrasi' },
              { id: 'kristalisasi', label: '2. Kristalisasi' },
              { id: 'dekantasi', label: '3. Dekantasi' },
              { id: 'sublimasi', label: '4. Sublimasi' },
              { id: 'distilasi', label: '5. Distilasi' },
              { id: 'kromatografi', label: '6. Kromatografi' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setActiveSeparation(m.id as any);
                  setSimStep(1);
                }}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                  activeSeparation === m.id
                    ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Interactive Visual Stage for Separation */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Visual Canvas Diagram */}
            <div className="md:col-span-6 bg-white border border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center min-h-[220px]">
              {activeSeparation === 'filtrasi' && (
                <div className="text-center space-y-3 w-full">
                  <div className="flex justify-center items-center gap-3">
                    <div className="w-24 h-28 border-2 border-slate-400 border-t-0 rounded-b-xl relative bg-blue-50/50 flex flex-col justify-end p-2 overflow-hidden">
                      <div className="absolute top-0 inset-x-0 h-10 border-b-2 border-dashed border-amber-600 bg-amber-100/70 text-[9px] text-amber-800 font-bold flex items-center justify-center">
                        Kertas Saring
                      </div>
                      <div className="text-[10px] text-slate-600 text-center font-mono">
                        {simStep === 1 ? 'Tuang Campuran' : 'Residu Tertahan'}
                      </div>
                      <div className="h-6 bg-sky-200 rounded-b text-[9px] text-sky-800 flex items-center justify-center font-semibold">
                        Filtrat Bening
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 block">
                    Pemisahan materi padat dari cairannya menggunakan media filter
                  </span>
                </div>
              )}

              {activeSeparation === 'kristalisasi' && (
                <div className="text-center space-y-3 w-full">
                  <div className="w-32 h-20 border-2 border-slate-400 border-t-0 rounded-b-3xl mx-auto relative bg-amber-50/40 p-2 flex flex-col justify-end">
                    <div className="flex justify-center gap-1.5 flex-wrap">
                      <span className="w-3 h-3 rotate-45 bg-amber-400 border border-amber-600 inline-block"></span>
                      <span className="w-3 h-3 rotate-45 bg-amber-400 border border-amber-600 inline-block"></span>
                      <span className="w-3 h-3 rotate-45 bg-amber-400 border border-amber-600 inline-block"></span>
                    </div>
                    <div className="text-[9px] font-bold text-amber-800 mt-1">Kristal Padat Terbentuk</div>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 block">
                    Mengendapkan larutan jenuh sampai membentuk padatan berupa kristal
                  </span>
                </div>
              )}

              {activeSeparation === 'dekantasi' && (
                <div className="text-center space-y-3 w-full">
                  <div className="flex justify-center items-center gap-4">
                    <div className="w-20 h-24 border-2 border-slate-400 border-t-0 rounded-b-lg relative bg-slate-100 p-1 flex flex-col justify-between">
                      <div className="w-1 h-20 bg-slate-600 rotate-12 mx-auto" title="Batang Pengaduk"></div>
                      <div className="h-5 bg-amber-700/60 text-[8px] text-white font-bold rounded-b flex items-center justify-center">
                        Sedimen
                      </div>
                    </div>
                    <div className="w-16 h-20 border-2 border-slate-400 border-t-0 rounded-b-lg bg-sky-100 flex items-center justify-center text-[10px] text-sky-800 font-semibold">
                      Cairan Pisah
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 block">
                    Menuangkan cairan perlahan melalui batang pengaduk agar endapan tertinggal
                  </span>
                </div>
              )}

              {activeSeparation === 'sublimasi' && (
                <div className="text-center space-y-3 w-full">
                  <div className="w-24 h-24 border-2 border-slate-400 rounded-full mx-auto relative flex flex-col justify-between p-2 bg-gradient-to-t from-red-50 to-blue-50">
                    <div className="text-[9px] text-blue-700 font-bold border-b border-blue-200">
                      Tutup Dingin (Es)
                    </div>
                    <div className="text-[9px] text-purple-700 font-mono animate-pulse">
                      Uap Gas Padatan ↑
                    </div>
                    <div className="text-[9px] text-red-700 font-bold border-t border-red-200">
                      Pemanas Bawah
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 block">
                    Pemisahan langsung zat padat menguap tanpa melalui fase cair
                  </span>
                </div>
              )}

              {activeSeparation === 'distilasi' && (
                <div className="text-center space-y-3 w-full">
                  <div className="flex justify-center items-center gap-2">
                    <div className="w-16 h-20 border-2 border-slate-400 rounded-b-full bg-red-50 flex flex-col justify-between p-1 text-[8px]">
                      <span>Labu Didih</span>
                      <span className="font-bold text-red-600">Titik Didih Rendah Menguap</span>
                    </div>
                    <div className="w-14 h-3 bg-cyan-200 border border-cyan-400 text-[7px] font-bold text-cyan-800 flex items-center justify-center">
                      Kondensor
                    </div>
                    <div className="w-14 h-16 border-2 border-slate-400 rounded-b-lg bg-cyan-50 flex items-center justify-center text-[8px] font-bold text-cyan-900">
                      Destilat Murni
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 block">
                    Pemisahan berdasarkan perbedaan titik didih zat penyusun
                  </span>
                </div>
              )}

              {activeSeparation === 'kromatografi' && (
                <div className="text-center space-y-3 w-full">
                  <div className="w-20 h-28 border border-slate-300 bg-amber-50 mx-auto relative p-1 flex flex-col justify-between">
                    <div className="text-[8px] text-slate-500 font-mono">Fase Diam (Kertas)</div>
                    <div className="space-y-1.5 my-auto">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mx-auto" title="Komponen Biru Lebih Cepat"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500 mx-auto" title="Komponen Kuning"></div>
                      <div className="w-3 h-3 rounded-full bg-rose-500 mx-auto" title="Komponen Merah"></div>
                    </div>
                    <div className="h-3 bg-sky-200 text-[7px] text-sky-800 font-bold flex items-center justify-center">
                      Pelarut Naik
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 block">
                    Pemisahan berdasarkan pola pergerakan antara fase gerak dan fase diam
                  </span>
                </div>
              )}
            </div>

            {/* Explanation card */}
            <div className="md:col-span-6 space-y-3 text-xs">
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-sm block capitalize">
                  Metode: {activeSeparation}
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {activeSeparation === 'filtrasi' &&
                    'Proses pemisahan campuran dengan cara memisahkan materi padat dari cairannya dengan melewatkan campuran pada saringan (filter). Contoh: memisahkan pasir dari air.'}
                  {activeSeparation === 'kristalisasi' &&
                    'Proses pemisahan campuran dengan cara mengendapkan larutan sampai membentuk padatan berupa kristal. Contoh: pembuatan garam dapur dari air laut di tambak.'}
                  {activeSeparation === 'dekantasi' &&
                    'Proses pemisahan paling sederhana, dilakukan dengan cara menuangkan cairan secara perlahan melalui batang pengaduk ke dalam gelas kimia sehingga endapan padat tertinggal.'}
                  {activeSeparation === 'sublimasi' &&
                    'Proses pemisahan campuran tanpa melalui fase cair terlebih dahulu, melalui cara menguapkan zat padat sehingga kotoran terpisah. Contoh: pemurnian kapur barus/iodin.'}
                  {activeSeparation === 'distilasi' &&
                    'Atau nama lainnya penyulingan, merupakan proses pemisahan campuran berdasarkan perbedaan titik didihnya, yaitu kecepatan atau kemudahan bahan untuk menguap.'}
                  {activeSeparation === 'kromatografi' &&
                    'Proses pemisahan campuran berdasarkan perbedaan pola pergerakan antara fase gerak dan fase diam suatu molekul pada suatu larutan. Contoh: memisahkan pigmen warna tinta.'}
                </p>
              </div>

              <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-teal-900 flex items-center justify-between">
                <span>Praktikkan simulasi ini dan catat hasilnya pada Lembar Pengamatan di bawah.</span>
                <button
                  onClick={() => setSimStep((prev) => (prev === 1 ? 2 : 1))}
                  className="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded text-[11px]"
                >
                  Ulangi Proses
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
