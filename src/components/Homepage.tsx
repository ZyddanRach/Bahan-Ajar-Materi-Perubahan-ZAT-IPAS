import React from 'react';
import { MODULES_METADATA } from '../data/learningContent';
import { UserProgress } from '../types';
import {
  Compass,
  ArrowRight,
  FlaskConical,
  Ruler,
  Flame,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Code,
  BookOpen,
} from 'lucide-react';

interface HomepageProps {
  progress: UserProgress;
  onNavigate: (view: string) => void;
  onOpenEmbedModal: () => void;
}

export default function Homepage({ progress, onNavigate, onOpenEmbedModal }: HomepageProps) {
  const heroImageSrc = '/src/assets/images/hero_science_laboratory_1791886373320.jpg';
  const bannerParticles = '/src/assets/images/banner_matter_particles_1791886373735.jpg';
  const bannerMeasurement = '/src/assets/images/banner_precision_measurement_1791886375145.jpg';
  const bannerB3 = '/src/assets/images/banner_b3_hazards_1791886374214.jpg';

  return (
    <div className="space-y-16 py-6">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
              <Compass className="w-3.5 h-3.5" />
              <span>Media Pembelajaran Berbasis Experiential Learning</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
              Eksplorasi Sains: Materi, Pengukuran, dan Perubahannya
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Alami pembelajaran sains melalui pengamatan fenomena dunia nyata, eksperimen laboratorium virtual, pencatatan data pengamatan langsung, serta analisis konsep yang komprehensif.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('cakupan-materi')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 group"
              >
                <span>Mulai Eksplorasi Materi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('laboratorium')}
                className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl border border-slate-300 transition-all flex items-center gap-2"
              >
                <FlaskConical className="w-4 h-4 text-blue-600" />
                <span>Buka Laboratorium Virtual</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>4 Modul Pembelajaran</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>7 Simulator Interaktif Real-Time</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>15 Subhalaman Berbasis Kolb</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group">
              <img
                src={heroImageSrc}
                alt="Laboratorium Eksplorasi Sains"
                className="w-full h-auto aspect-16/9 sm:aspect-4/3 object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback container
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="font-mono text-[10px] text-teal-300 uppercase tracking-widest font-semibold">
                  Laboratorium Sains Digital
                </span>
                <span className="font-bold text-sm sm:text-base">
                  Eksplorasi Interaktif Tingkat SMA/SMK
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PETUNJUK SIKLUS EXPERIENTIAL LEARNING */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Siklus Belajar Berbasis Pengalaman (David Kolb)
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Bagaimana Kamu Akan Belajar di Website Ini?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Setiap subhalaman memandu proses belajarmu melalui 4 siklus berkesinambungan:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                1
              </div>
              <h3 className="font-bold text-sm text-slate-900">1. Pengalaman Konkret</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mengamati fenomena sehari-hari dan langsung berinteraksi dengan simulasi virtual (alat ukur, partikel, reaksi).
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-xs">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-900">2. Observasi Reflektif</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mencatat data hasil pengamatan ke tabel lembar kerja interaktif dan menganalisis pola yang muncul.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-xs">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-900">3. Konseptualisasi Abstrak</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Menghubungkan hasil eksperimen dengan teori ilmiah, hukum fisika, rumus baku, dan kartu konsep resmi.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs">
                4
              </div>
              <h3 className="font-bold text-sm text-slate-900">4. Eksperimen Aktif</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Menguji pemahaman baru pada tantangan kondisi baru, refleksi industri, serta evaluasi adaptif dengan umpan balik langsung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAKUPAN 4 MODUL UTAMA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Struktur Kurikulum Sumber
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              4 Modul Pembelajaran Unggulan
            </h2>
          </div>
          <button
            onClick={() => onNavigate('cakupan-materi')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Lihat Rincian Seluruh 15 Submateri <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Modul 1 */}
          <div
            onClick={() => onNavigate('klasifikasi-wujud')}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="h-44 overflow-hidden relative bg-slate-900">
                <img
                  src={bannerParticles}
                  alt="Modul 1: Zat dan Perubahannya"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-teal-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                  Modul 1
                </div>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Zat dan Perubahannya
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Klasifikasi wujud padat, cair, gas; zat tunggal (unsur logam, nonlogam, semilogam &amp; senyawa); campuran homogen (larutan), koloid, dan suspensi; serta 6 metode pemisahan fisis.
                </p>
              </div>
            </div>
            <div className="px-6 pb-5 pt-2 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>Buka Modul 1 (4 Submateri)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card Modul 2 */}
          <div
            onClick={() => onNavigate('alat-ukur-ketelitian')}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="h-44 overflow-hidden relative bg-slate-900">
                <img
                  src={bannerMeasurement}
                  alt="Modul 2: Pengukuran"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                  Modul 2
                </div>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Pengukuran &amp; Metrologi Presisi
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ketelitian mistar (1 mm), jangka sorong (0,1 mm), mikrometer sekrup (0,01 mm), stopwatch, termometer, kesalahan paralaks, pengukuran tunggal &amp; berulang (Sx̄), toleransi, dan angka penting.
                </p>
              </div>
            </div>
            <div className="px-6 pb-5 pt-2 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>Buka Modul 2 (6 Submateri)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card Modul 3 */}
          <div
            onClick={() => onNavigate('perubahan-fisika')}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="h-44 overflow-hidden relative bg-gradient-to-tr from-amber-600 via-orange-500 to-rose-600 p-6 flex flex-col justify-end text-white">
                <Flame className="w-10 h-10 mb-2 text-amber-200" />
                <div className="absolute top-3 left-3 bg-amber-800 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                  Modul 3
                </div>
                <span className="font-mono text-xs text-amber-100">Termodinamika &amp; Reaksi</span>
                <span className="font-bold text-lg">Perubahan Fisika, Kimia, &amp; Biologi</span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Perubahan Materi
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Perubahan fisika (siklus 6 wujud kalor, pemuaian, pelarutan encer/pekat/jenuh, ekstraksi kopi), perubahan kimia (pembakaran, korosi 5 faktor), serta perubahan biologi (fotosintesis, fermentasi, pembusukan).
                </p>
              </div>
            </div>
            <div className="px-6 pb-5 pt-2 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>Buka Modul 3 (3 Submateri)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card Modul 4 */}
          <div
            onClick={() => onNavigate('klasifikasi-b3')}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="h-44 overflow-hidden relative bg-slate-900">
                <img
                  src={bannerB3}
                  alt="Modul 4: Keselamatan B3"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-rose-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                  Modul 4
                </div>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Bahan Berbahaya dan Beracun (B3)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pengertian regulasi PP No. 101/2014, potensi bahaya 0–4, simbol GHS, tata letak kabinet penyimpanan, 7 prosedur pengolahan limbah (manifes KLHK), dan prinsip 5R.
                </p>
              </div>
            </div>
            <div className="px-6 pb-5 pt-2 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>Buka Modul 4 (2 Submateri)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. FITUR UNGGULAN LABORATORIUM VIRTUAL */}
      <section className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold">
              Eksperimen Interaktif Bebas
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              4 Laboratorium Simulasi Utama
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Jelajahi simulasi tanpa harus menunggu giliran alat laboratorium sekolah:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => onNavigate('laboratorium')}
              className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-teal-400 transition-colors cursor-pointer space-y-2"
            >
              <FlaskConical className="w-6 h-6 text-teal-400" />
              <h4 className="font-bold text-sm text-white">Laboratorium Partikel</h4>
              <p className="text-xs text-slate-300">
                Atur suhu untuk mengamati getaran kisi kristal padat hingga gerak bebas molekul gas.
              </p>
            </div>

            <div
              onClick={() => onNavigate('laboratorium')}
              className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-blue-400 transition-colors cursor-pointer space-y-2"
            >
              <Ruler className="w-6 h-6 text-blue-400" />
              <h4 className="font-bold text-sm text-white">Laboratorium Pengukuran</h4>
              <p className="text-xs text-slate-300">
                Geser rahang jangka sorong (0,1 mm) &amp; putar thimble mikrometer (0,01 mm) secara presisi.
              </p>
            </div>

            <div
              onClick={() => onNavigate('laboratorium')}
              className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-amber-400 transition-colors cursor-pointer space-y-2"
            >
              <Flame className="w-6 h-6 text-amber-400" />
              <h4 className="font-bold text-sm text-white">Laboratorium Perubahan</h4>
              <p className="text-xs text-slate-300">
                Uji 5 faktor laju korosi paku besi dan amati fotosintesis serta pembakaran.
              </p>
            </div>

            <div
              onClick={() => onNavigate('laboratorium')}
              className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-rose-400 transition-colors cursor-pointer space-y-2"
            >
              <ShieldAlert className="w-6 h-6 text-rose-400" />
              <h4 className="font-bold text-sm text-white">Laboratorium Keselamatan</h4>
              <p className="text-xs text-slate-300">
                Tata reagen ke kabinet B3 aman dan urutkan 7 alur penanganan limbah berizin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WORDPRESS & LMS EMBED CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <span className="font-mono text-xs text-blue-300 font-semibold uppercase tracking-wider">
              Kemudahan Integrasi Pendidik
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              Ingin Memasang Media Ini ke Website Sekolah atau WordPress?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Disediakan kode snippet Custom HTML dengan namespace khusus <code className="bg-blue-800/80 px-1.5 py-0.5 rounded font-mono text-xs">#experiential-learning-app</code> yang aman disisipkan ke halaman WordPress tanpa merusak tema.
            </p>
          </div>

          <button
            onClick={onOpenEmbedModal}
            className="px-5 py-3 bg-white text-slate-900 hover:bg-blue-50 font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0 whitespace-nowrap"
          >
            <Code className="w-4 h-4 text-blue-600" />
            <span>Lihat Panduan &amp; Salin Kode</span>
          </button>
        </div>
      </section>
    </div>
  );
}
