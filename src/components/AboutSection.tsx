import React from 'react';
import { BookOpen, Award, CheckCircle2, Shield, Heart } from 'lucide-react';

export default function AboutSection() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-wider text-blue-600 font-semibold">
          Tentang Media Pembelajaran
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Bahan Ajar Interaktif Eksplorasi Sains
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm">
          Media pembelajaran digital mandiri berbasis siklus Experiential Learning David Kolb untuk mata pelajaran Ilmu Pengetahuan Alam (IPA) dan Fisika tingkat SMA/SMK.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-slate-900">
          Landasan Filosofi &amp; Sumber Rujukan Materi
        </h3>
        <p>
          Website ini dikembangkan dengan rujukan mutlak pada dokumen kurikulum <strong>&quot;Ringkasan Materi.pdf&quot;</strong>, yang mencakup 4 modul terpadu:
        </p>
        <ul className="pl-5 list-disc space-y-1">
          <li><strong>Modul 1: Zat dan Perubahannya</strong> — Klasifikasi wujud zat (padat, cair, gas), komposisi zat tunggal (unsur logam/nonlogam/semilogam, senyawa), campuran (larutan, koloid, suspensi), dan 6 teknik pemisahan fisis.</li>
          <li><strong>Modul 2: Pengukuran</strong> — Metrologi mistar (1 mm), jangka sorong (0,1 mm), mikrometer sekrup (0,01 mm), stopwatch (0,01 s), termometer (0,1 °C), analisis kesalahan paralaks, pengukuran berulang, ketidakpastian mutlak (Sx̄) &amp; relatif (KR), toleransi industri farmasi, aturan angka penting, dan notasi ilmiah.</li>
          <li><strong>Modul 3: Perubahan Materi</strong> — Perubahan fisika (siklus 6 wujud termal menerima/melepas kalor, pelarutan encer/pekat/jenuh, ekstraksi kopi), perubahan kimia (pembakaran, korosi dan 5 faktor percepatan), serta perubahan biologi (fotosintesis, fermentasi, pembusukan autolisis, dan 3 jenis pelapukan).</li>
          <li><strong>Modul 4: Bahan Berbahaya dan Beracun (B3)</strong> — Regulasi PP No. 101 Tahun 2014, potensi bahaya skala 0–4, simbol GHS, standar ruang penyimpanan, 7 tahap tata kelola limbah, dan prinsip 5R (Reduce, Reuse, Recycle, Recovery, Replace).</li>
        </ul>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-slate-900">
          Koreksi &amp; Presisi Matematis Ilmiah
        </h3>
        <p>
          Dalam pengembangan materi digital ini, tim instruksional menelaah rumus dan contoh hitungan secara cermat:
        </p>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2 text-amber-950 text-xs">
          <strong>Perbaikan Rumus Ketidakpastian Mutlak Berulang:</strong>
          <p>
            Pada dokumen sumber cetak terdapat contoh hitungan kuadrat yang menghasilkan nilai negatif di bawah tanda akar lalu dinyatakan &quot;dimutlakkan&quot;. Secara matematika murni dan fisika metrologi resmi (Teorema Cauchy-Schwarz), kuantitas <code className="font-mono font-bold bg-amber-100 px-1 py-0.5 rounded">[n·Σx² - (Σx)²]</code> selalu bernilai non-negatif (&ge; 0). Di simulator ini, seluruh perhitungan matematis dikalkulasi dengan presisi tinggi dan formula deviasi standar yang sah.
          </p>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-2">
        <span className="font-bold text-slate-900 block text-xs sm:text-sm">
          Aksesibilitas &amp; Kemudahan Guru / Siswa
        </span>
        <p className="text-slate-600 text-xs max-w-xl mx-auto">
          Website ini 100% responsif di laptop, tablet, dan smartphone tanpa iklan, tanpa pelacak telemetri, dan tanpa meminta data pribadi siswa. Dapat digunakan secara offline maupun disematkan ke WordPress sekolah.
        </p>
      </div>
    </div>
  );
}
