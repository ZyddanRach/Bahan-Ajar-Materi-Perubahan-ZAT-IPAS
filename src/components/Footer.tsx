import React from 'react';
import { BookOpen, RefreshCw, Printer } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onResetAllProgress: () => void;
}

export default function Footer({ onNavigate, onResetAllProgress }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <h4 className="text-white font-bold text-sm">Eksplorasi Sains</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Media bahan ajar IPA/Fisika interaktif berbasis <em>Experiential Learning</em> yang mengintegrasikan fenomena nyata, eksperimen laboratorium virtual, dan analisis data ilmiah.
            </p>
            <div className="text-[11px] text-slate-500">
              Berdasarkan acuan kurikulum dokumen &quot;Ringkasan Materi.pdf&quot;.
            </div>
          </div>

          {/* 4 Modul links */}
          <div className="space-y-2">
            <span className="text-white font-semibold block text-xs uppercase tracking-wider">
              Modul Pembelajaran
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('klasifikasi-wujud')}
                  className="hover:text-white transition-colors text-left"
                >
                  Modul 1: Zat &amp; Perubahannya
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('alat-ukur-ketelitian')}
                  className="hover:text-white transition-colors text-left"
                >
                  Modul 2: Pengukuran &amp; Metrologi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('perubahan-fisika')}
                  className="hover:text-white transition-colors text-left"
                >
                  Modul 3: Perubahan Fisika &amp; Kimia
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('klasifikasi-b3')}
                  className="hover:text-white transition-colors text-left"
                >
                  Modul 4: Keselamatan B3 (PP 101/2014)
                </button>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="space-y-2">
            <span className="text-white font-semibold block text-xs uppercase tracking-wider">
              Pusat Eksplorasi
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('laboratorium')} className="hover:text-white transition-colors">
                  Laboratorium Virtual Terpadu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('petunjuk-belajar')} className="hover:text-white transition-colors">
                  Siklus Experiential Learning Kolb
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tentang')} className="hover:text-white transition-colors">
                  Tentang Bahan Ajar &amp; Pengembang
                </button>
              </li>
            </ul>
          </div>

          {/* Student Progress Management */}
          <div className="space-y-3">
            <span className="text-white font-semibold block text-xs uppercase tracking-wider">
              Kelola Progres Siswa
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Catatan pengamatan dan nilai evaluasimu tersimpan aman di peramban lokal perangkat ini.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium w-fit"
              >
                <Printer className="w-3.5 h-3.5" /> Cetak / Simpan PDF
              </button>
              <button
                onClick={onResetAllProgress}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors w-fit pt-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Seluruh Progres Belajar
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; 2026 Eksplorasi Sains · Bahan Ajar Interaktif IPA/Fisika Berbasis Experiential Learning.
          </div>
          <div className="flex items-center gap-4">
            <span>Standar Kurikulum SMA/SMK</span>
            <span aria-hidden="true">·</span>
            <span>Kompatibel HTML5 &amp; WordPress</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
