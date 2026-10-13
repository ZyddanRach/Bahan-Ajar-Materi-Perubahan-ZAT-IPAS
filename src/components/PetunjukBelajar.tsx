import React from 'react';
import { Compass, Eye, BookOpen, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';

interface PetunjukBelajarProps {
  onStartLearning: () => void;
}

export default function PetunjukBelajar({ onStartLearning }: PetunjukBelajarProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Title Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
          <Compass className="w-3.5 h-3.5" />
          <span>Kerangka Pedagogis Experiential Learning (David Kolb)</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Petunjuk Belajar &amp; Alur Pembelajaran Melalui Pengalaman
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Website ini dirancang bukan sekadar untuk membaca teori pasif, melainkan mengajakmu aktif menjadi ilmuwan muda yang mengalami, mengamati, menganalisis, dan menyimpulkan sains secara mandiri.
        </p>
      </div>

      {/* 4 Kolb Stages Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stage 1 */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
            1
          </div>
          <h3 className="font-bold text-base text-slate-900">
            Tahap 1: Concrete Experience (Pengalaman Konkret)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Kamu akan dihadapkan pada fenomena nyata kehidupan sehari-hari (seperti es meleleh, korosi paku, kesalahan membaca mistar) dan langsung berinteraksi dengan <strong>simulasi laboratorium virtual</strong>. Kamu dapat menggeser slider, menekan tombol, dan menguji variabel.
          </p>
          <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-lg text-xs text-blue-900 font-medium">
            Aktivitasmu: Amati fenomena &amp; lakukan eksperimen simulasi langsung.
          </div>
        </div>

        {/* Stage 2 */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-sm">
            2
          </div>
          <h3 className="font-bold text-base text-slate-900">
            Tahap 2: Reflective Observation (Observasi Reflektif)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Setelah mencoba eksperimen, catat data yang kamu peroleh pada <strong>Lembar Pengamatan Interaktif</strong>. Perhatikan apa yang berubah saat suhu dinaikkan, bagaimana skala nonius bergeser, dan apa pola data yang muncul.
          </p>
          <div className="p-3 bg-teal-50/70 border border-teal-100 rounded-lg text-xs text-teal-900 font-medium">
            Aktivitasmu: Catat hasil pengamatan pada tabel &amp; temukan pola keteraturan.
          </div>
        </div>

        {/* Stage 3 */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-sm">
            3
          </div>
          <h3 className="font-bold text-base text-slate-900">
            Tahap 3: Abstract Conceptualization (Konseptualisasi Abstrak)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Hubungkan pola data pengamatanmu dengan <strong>materi inti dan penjelasan ilmiah</strong> yang bersumber dari dokumen resmi. Pelajari rumus matematika, istilah baku, kartu konsep, dan waspadai miskonsepsi yang sering mengecoh.
          </p>
          <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-lg text-xs text-amber-900 font-medium">
            Aktivitasmu: Konstruksi konsep ilmiah, rumus baku, dan pembuktian teoritis.
          </div>
        </div>

        {/* Stage 4 */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-sm">
            4
          </div>
          <h3 className="font-bold text-base text-slate-900">
            Tahap 4: Active Experimentation (Eksperimen Aktif &amp; Penerapan)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Gunakan pemahaman barumu untuk menyelesaikan masalah pada kondisi baru, menjawab <strong>pertanyaan refleksi kontekstual dunia industri</strong>, serta mengerjakan <strong>evaluasi kuis adaptif mandiri</strong> untuk menguji tingkat penguasaanmu.
          </p>
          <div className="p-3 bg-rose-50/70 border border-rose-100 rounded-lg text-xs text-rose-900 font-medium">
            Aktivitasmu: Uji pemahaman dengan studi kasus nyata &amp; evaluasi kuis mandiri.
          </div>
        </div>
      </div>

      {/* Practical step-by-step instructions */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="font-bold text-lg text-slate-900">
          6 Langkah Praktis Menyelesaikan Setiap Submateri:
        </h3>
        <ol className="space-y-3 text-xs sm:text-sm text-slate-700 pl-5 list-decimal leading-relaxed">
          <li><strong>Baca Orientasi Fenomena:</strong> Renungkan cerita pembuka dan pilih prediksimu pada pertanyaan pemantik sebelum membaca teori.</li>
          <li><strong>Pahami Tujuan Pembelajaran:</strong> Pastikan kamu mengetahui kompetensi spesifik yang ditargetkan pada halaman tersebut.</li>
          <li><strong>Operasikan Simulasi Virtual:</strong> Coba semua kontrol, ubah variabel, dan perhatikan perubahan angka atau animasi partikel secara seksama.</li>
          <li><strong>Isi Lembar Pengamatan:</strong> Ketik hasil eksperimenmu pada tabel pengamatan interaktif dan klik tombol &quot;Simpan Data&quot;.</li>
          <li><strong>Pelajari Materi Inti:</strong> Baca ringkasan teori, perhatikan contoh perhitungan, dan hindari miskonsepsi sains yang dicantumkan.</li>
          <li><strong>Kerjakan Evaluasi:</strong> Jawab 3–5 butir soal latihan untuk mendapatkan skor otomatis dan pembahasan ilmiah instan.</li>
        </ol>

        <div className="pt-4 flex justify-center">
          <button
            onClick={onStartLearning}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
          >
            <span>Mulai Eksplorasi Materi Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
