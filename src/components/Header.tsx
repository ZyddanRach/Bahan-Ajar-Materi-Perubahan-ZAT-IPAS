import React, { useState } from 'react';
import { Sparkles, Menu, X, BookOpen, Code, Layers } from 'lucide-react';

interface HeaderProps {
  activeView: string;
  onNavigate: (view: string) => void;
  completedCount: number;
  totalCount: number;
  onOpenEmbedModal: () => void;
}

export default function Header({
  activeView,
  onNavigate,
  completedCount,
  totalCount,
  onOpenEmbedModal,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'cakupan-materi', label: 'Cakupan Materi' },
    { id: 'laboratorium', label: 'Laboratorium Virtual' },
    { id: 'petunjuk-belajar', label: 'Petunjuk Belajar' },
    { id: 'tentang', label: 'Tentang' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => handleNavClick('beranda')}
            className="text-left whitespace-nowrap shrink-0 group"
          >
            <div className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              Eksplorasi Sains
            </div>
            <div className="text-[10px] text-slate-400 font-medium -mt-1 hidden sm:block">
              Materi, Pengukuran, &amp; Perubahannya
            </div>
          </button>

          {/* Zone 2: 4-5 Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                  activeView === item.id
                    ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                    : 'hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + WordPress Embed Button */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenEmbedModal}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
              title="Panduan penyematan ke WordPress atau LMS"
            >
              <Code className="w-3.5 h-3.5 text-slate-500" />
              <span>Embed WordPress</span>
            </button>

            <button
              onClick={() => handleNavClick('cakupan-materi')}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shadow-2xs flex items-center gap-2"
            >
              <span>Mulai Belajar</span>
              <span className="font-mono text-[11px] bg-blue-700 px-1.5 py-0.5 rounded">
                {completedCount}/{totalCount}
              </span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                activeView === item.id ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenEmbedModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg flex items-center justify-center gap-1.5"
            >
              <Code className="w-3.5 h-3.5" /> Panduan Embed WordPress
            </button>
            <button
              onClick={() => handleNavClick('cakupan-materi')}
              className="w-full py-2 px-3 text-xs font-semibold text-white bg-blue-600 rounded-lg flex items-center justify-center gap-2"
            >
              <span>Buka Cakupan Materi</span>
              <span className="font-mono text-[11px] bg-blue-700 px-1.5 py-0.5 rounded">
                {completedCount}/{totalCount}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
