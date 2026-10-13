import React, { useState } from 'react';
import { MODULES_METADATA, SUBTOPICS } from '../data/learningContent';
import { UserProgress, ModuleId } from '../types';
import { CheckCircle2, ChevronRight, BookOpen, Layers, Award, Sparkles } from 'lucide-react';

interface CakupanMateriSectionProps {
  progress: UserProgress;
  onSelectSubtopic: (slug: string) => void;
}

export default function CakupanMateriSection({
  progress,
  onSelectSubtopic,
}: CakupanMateriSectionProps) {
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<ModuleId | 'all'>('all');

  const filteredModules =
    selectedModuleFilter === 'all'
      ? MODULES_METADATA
      : MODULES_METADATA.filter((m) => m.id === selectedModuleFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Kurikulum Sains &amp; Fisika Lengkap
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Cakupan Materi Pembelajaran Terstruktur
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Tersedia 4 modul komprehensif dengan 15 subhalaman interaktif berbasis siklus Experiential Learning. Klik kartu materi untuk membuka ruang laboratorium virtual terkait.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setSelectedModuleFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              selectedModuleFilter === 'all'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua Modul (15)
          </button>
          {MODULES_METADATA.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setSelectedModuleFilter(mod.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedModuleFilter === mod.id
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Modul {mod.number}
            </button>
          ))}
        </div>
      </div>

      {/* Modules listing */}
      <div className="space-y-10">
        {filteredModules.map((module) => {
          const subtopicsInModule = SUBTOPICS.filter((s) => s.moduleId === module.id);
          const completedInMod = subtopicsInModule.filter((s) =>
            progress.completedSubtopics.includes(s.id)
          ).length;

          return (
            <div
              key={module.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs space-y-4 p-6 sm:p-8"
            >
              {/* Module header info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold mb-1">
                    <span className="font-mono text-blue-600 uppercase">Modul {module.number}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500">{module.badge}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{module.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
                    {module.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block font-medium">Progres Modul</span>
                    <span className="font-mono text-xs font-bold text-slate-800">
                      {completedInMod} / {subtopicsInModule.length} Selesai
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center font-mono text-xs font-bold text-blue-600 bg-blue-50/50">
                    {Math.round((completedInMod / subtopicsInModule.length) * 100)}%
                  </div>
                </div>
              </div>

              {/* Grid of subtopic cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {subtopicsInModule.map((sub, idx) => {
                  const isDone = progress.completedSubtopics.includes(sub.id);
                  const quizScore = progress.quizScores[sub.id];

                  return (
                    <div
                      key={sub.id}
                      onClick={() => onSelectSubtopic(sub.slug)}
                      className={`p-5 rounded-xl border text-left transition-all cursor-pointer group flex flex-col justify-between ${
                        isDone
                          ? 'bg-slate-50/60 border-slate-200 hover:border-blue-400 hover:shadow-xs'
                          : 'bg-white border-slate-200 hover:border-blue-500 hover:shadow-sm'
                      }`}
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-[11px] text-slate-400 font-semibold">
                            Submateri {module.number}.{idx + 1}
                          </span>
                          {isDone ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-400">Belum dibaca</span>
                          )}
                        </div>

                        <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                          {sub.title}
                        </h4>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {sub.shortDesc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        {quizScore ? (
                          <span className="font-mono text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                            <Award className="w-3 h-3" /> Skor: {quizScore.score}/{quizScore.total}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Ada Lab &amp; Evaluasi</span>
                        )}

                        <span className="text-blue-600 font-semibold flex items-center gap-1 text-xs group-hover:translate-x-1 transition-transform">
                          Buka Halaman <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
