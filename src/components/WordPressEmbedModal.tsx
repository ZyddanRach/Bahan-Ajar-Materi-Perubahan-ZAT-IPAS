import React, { useState } from 'react';
import { X, Copy, Check, Code, Globe, Shield, Terminal } from 'lucide-react';

interface WordPressEmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WordPressEmbedModal({ isOpen, onClose }: WordPressEmbedModalProps) {
  const [copiedMode, setCopiedMode] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.href : 'https://example.com/sains';

  const embedCodeIframe = `<!-- ========================================================
     KODE INTEGRASI WORDPRESS: BAHAN AJAR EKSPORASI SAINS
     Gunakan blok "Custom HTML" pada Gutenberg / Elementor / Beaver Builder
     Kontainer ID: #experiential-learning-app
     ======================================================== -->
<div id="experiential-learning-app" style="width: 100%; max-width: 1200px; margin: 0 auto; overflow: hidden; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); background: #ffffff;">
  <iframe 
    src="${currentOrigin}" 
    title="Bahan Ajar Interaktif Eksplorasi Sains"
    width="100%" 
    height="850" 
    style="border: none; display: block; width: 100%; min-height: 800px;" 
    allow="fullscreen"
    loading="lazy">
  </iframe>
</div>
<style>
  /* Menjaga isolasi tampilan agar tidak terpengaruh CSS tema WordPress */
  #experiential-learning-app {
    box-sizing: border-box;
    font-family: system-ui, -apple-system, sans-serif;
  }
  #experiential-learning-app iframe {
    transition: height 0.3s ease;
  }
</style>`;

  const copyToClipboard = (text: string, mode: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMode(mode);
    setTimeout(() => setCopiedMode(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Panduan Integrasi &amp; Kode Embed WordPress
              </h3>
              <p className="text-xs text-slate-500">
                Langkah memasang aplikasi ke WordPress, LMS (Moodle/Canvas), atau HTML mandiri
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-xs text-slate-600">
          {/* Section 1: WordPress Gutenberg / Elementor */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                Metode 1: Blok &quot;Custom HTML&quot; WordPress
              </h4>
              <button
                onClick={() => copyToClipboard(embedCodeIframe, 'iframe')}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1.5 font-semibold transition-colors"
              >
                {copiedMode === 'iframe' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" /> Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Salin Kode Snippet
                  </>
                )}
              </button>
            </div>

            <p className="leading-relaxed">
              Buka editor halaman WordPress Anda (Gutenberg), tambahkan blok <strong>Custom HTML</strong>, dan tempelkan kode berikut. Kontainer menggunakan namespace unik <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600 font-mono">#experiential-learning-app</code> sehingga aman dari benturan CSS tema WordPress.
            </p>

            <pre className="p-4 bg-slate-950 text-slate-200 font-mono text-[11px] rounded-xl overflow-x-auto border border-slate-800 leading-relaxed max-h-48">
              {embedCodeIframe}
            </pre>
          </div>

          {/* Section 2: Standalone HTML */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-2">
              <Terminal className="w-4 h-4 text-teal-600" />
              Metode 2: Menjalankan Sebagai Website Mandiri (Standalone HTML5)
            </h4>
            <p className="leading-relaxed">
              Website ini dibangun dengan struktur modern Vite + React + Tailwind CSS dengan output file statis. Jika ingin menjalankan secara mandiri:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-slate-700">
              <li>Jalankan perintah <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono">npm run build</code> untuk menghasilkan folder <code className="font-mono">dist/</code>.</li>
              <li>Unggah seluruh isi folder <code className="font-mono">dist/</code> ke server hosting mana pun (cPanel, Netlify, Vercel, GitHub Pages, atau web server sekolah).</li>
              <li>Buka <code className="font-mono">index.html</code> di peramban dan seluruh simulasi langsung berjalan tanpa memerlukan basis data atau API luar berbayar.</li>
            </ol>
          </div>

          {/* Section 3: Safety & Non-Conflict Guarantees */}
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2 text-blue-950">
            <h4 className="font-bold text-xs flex items-center gap-2 text-blue-900">
              <Shield className="w-4 h-4 text-blue-600" />
              Jaminan Kompatibilitas WordPress (Tanpa Benturan Gaya)
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>Zero Global Selector Pollution:</strong> Tidak ada modifikasi selector global body atau button yang merusak tema WordPress induk.</li>
              <li><strong>Zero Premium Plugin Requirement:</strong> Bekerja di semua instalasi WordPress standar tanpa mewajibkan plugin berbayar apa pun.</li>
              <li><strong>Local Storage Resilience:</strong> Seluruh progres belajar siswa disimpan di peramban lokal perangkat tanpa pengumpulan privasi pribadi atau server backend eksternal.</li>
            </ul>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
}
