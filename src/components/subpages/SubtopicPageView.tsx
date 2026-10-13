import React, { useState } from 'react';
import { SubtopicData, UserProgress, ObservationRow } from '../../types';
import ObservationSheet from './ObservationSheet';
import EvaluationQuiz from './EvaluationQuiz';
import ParticleModelSim from '../simulations/ParticleModelSim';
import ClassificationMixtureSim from '../simulations/ClassificationMixtureSim';
import MeasurementLabSim from '../simulations/MeasurementLabSim';
import DataAnalysisSim from '../simulations/DataAnalysisSim';
import StateChangesSim from '../simulations/StateChangesSim';
import ChemicalBiologicalSim from '../simulations/ChemicalBiologicalSim';
import HazardB3SafetySim from '../simulations/HazardB3SafetySim';
import {
  Compass,
  Target,
  FlaskConical,
  HelpCircle,
  BookOpen,
  Lightbulb,
  Award,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Share2,
} from 'lucide-react';

interface SubtopicPageViewProps {
  subtopic: SubtopicData;
  progress: UserProgress;
  prevSubtopic: SubtopicData | null;
  nextSubtopic: SubtopicData | null;
  onNavigate: (slug: string) => void;
  onBackToOverview: () => void;
  onToggleComplete: (id: string) => void;
  onSaveObservations: (id: string, rows: ObservationRow[]) => void;
  onSaveQuizScore: (id: string, score: number, total: number) => void;
}

export default function SubtopicPageView({
  subtopic,
  progress,
  prevSubtopic,
  nextSubtopic,
  onNavigate,
  onBackToOverview,
  onToggleComplete,
  onSaveObservations,
  onSaveQuizScore,
}: SubtopicPageViewProps) {
  // Phenomenon prediction state
  const [selectedPrediction, setSelectedPrediction] = useState<number | null>(null);
  const [showPredictionFeedback, setShowPredictionFeedback] = useState<boolean>(false);

  // Analysis guides reveal state
  const [revealedClues, setRevealedClues] = useState<Record<number, boolean>>({});

  const isCompleted = progress.completedSubtopics.includes(subtopic.id);
  const savedRows = progress.savedObservations[subtopic.id];
  const savedScore = progress.quizScores[subtopic.id];

  const toggleClue = (idx: number) => {
    setRevealedClues((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const renderSimulation = () => {
    switch (subtopic.simulasiType) {
      case 'partikel':
        return <ParticleModelSim />;
      case 'klasifikasi':
      case 'pemisahan':
        return <ClassificationMixtureSim />;
      case 'alat-ukur':
        return <MeasurementLabSim initialTool="mistar" />;
      case 'jangka-sorong':
        return <MeasurementLabSim initialTool="jangka-sorong" />;
      case 'mikrometer':
        return <MeasurementLabSim initialTool="mikrometer" />;
      case 'analisis-data':
      case 'toleransi':
      case 'angka-penting':
        return <DataAnalysisSim />;
      case 'perubahan-wujud':
      case 'pelarutan':
        return <StateChangesSim />;
      case 'korosi-reaksi':
      case 'perubahan-biologi':
        return <ChemicalBiologicalSim />;
      case 'keselamatan-b3':
      case 'limbah-b3':
        return <HazardB3SafetySim />;
      default:
        return <ParticleModelSim />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Top Header Breadcrumb & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <button
            onClick={onBackToOverview}
            className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors mb-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Cakupan Materi
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-blue-600">{subtopic.moduleTitle}</span>
            <span aria-hidden="true">·</span>
            <span>Experiential Learning Cycle</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            {subtopic.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleComplete(subtopic.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
            {isCompleted ? 'Selesai Dipelajari' : 'Tandai Selesai'}
          </button>
        </div>
      </div>

      {/* Experiential Learning 4 Stages Indicator Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-100/70 p-1.5 rounded-xl border border-slate-200 text-xs">
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">1</span>
          <div>
            <span className="font-bold text-slate-800 block text-[11px]">Pengalaman Konkret</span>
            <span className="text-[10px] text-slate-500">Orientasi &amp; Eksperimen</span>
          </div>
        </div>
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-[10px]">2</span>
          <div>
            <span className="font-bold text-slate-800 block text-[11px]">Observasi Reflektif</span>
            <span className="text-[10px] text-slate-500">Lembar Catatan Data</span>
          </div>
        </div>
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-[10px]">3</span>
          <div>
            <span className="font-bold text-slate-800 block text-[11px]">Konseptualisasi</span>
            <span className="text-[10px] text-slate-500">Teori &amp; Analisis Ilmiah</span>
          </div>
        </div>
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-[10px]">4</span>
          <div>
            <span className="font-bold text-slate-800 block text-[11px]">Eksperimen Aktif</span>
            <span className="text-[10px] text-slate-500">Refleksi &amp; Evaluasi Kuis</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          BAGIAN 1: ORIENTASI FENOMENA
          ======================================================== */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
          <Compass className="w-4 h-4" />
          <span>Bagian 1 · Orientasi Fenomena Dunia Nyata</span>
        </div>

        <h2 className="text-lg font-bold text-slate-900">
          Amati Fenomena dan Buat Prediksimu Terlebih Dahulu
        </h2>

        <p className="text-slate-600 text-sm leading-relaxed">
          {subtopic.fenomena.cerita}
        </p>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
          <span className="font-bold text-slate-800 text-xs sm:text-sm block">
            Pertanyaan Pemantik: {subtopic.fenomena.pertanyaan}
          </span>

          <div className="space-y-2">
            {subtopic.fenomena.pilihanPrediksi.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedPrediction(idx);
                  setShowPredictionFeedback(true);
                }}
                className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-start gap-2.5 ${
                  selectedPrediction === idx
                    ? 'bg-blue-50 border-blue-600 text-blue-900 font-semibold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/60'
                }`}
              >
                <span className="font-mono font-bold text-slate-400">({String.fromCharCode(65 + idx)})</span>
                <span className="flex-1 leading-relaxed">{opt}</span>
              </button>
            ))}
          </div>

          {showPredictionFeedback && (
            <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-lg text-xs leading-relaxed text-blue-950 mt-3 animate-fade-in">
              <span className="font-bold block mb-1">Ulasan Prediksi Awal:</span>
              <p>{subtopic.fenomena.pembahasanPrediksi}</p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          BAGIAN 2: TUJUAN PEMBELAJARAN
          ======================================================== */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-600">
          <Target className="w-4 h-4" />
          <span>Bagian 2 · Tujuan Pembelajaran Spesifik</span>
        </div>
        <h2 className="text-base font-bold text-slate-900">
          Kompetensi yang Akan Kamu Kuasai Melalui Aktivitas Ini:
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pl-5 list-disc leading-relaxed">
          {subtopic.tujuan.map((t, idx) => (
            <li key={idx}>{t}</li>
          ))}
        </ul>
      </section>

      {/* ========================================================
          BAGIAN 3: EKSPERIMEN / SIMULASI INTERAKTIF
          ======================================================== */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 px-1">
          <FlaskConical className="w-4 h-4" />
          <span>Bagian 3 · Eksperimen &amp; Simulasi Virtual (Concrete Experience)</span>
        </div>
        {renderSimulation()}
      </section>

      {/* ========================================================
          BAGIAN 4: LEMBAR PENGAMATAN INTERAKTIF
          ======================================================== */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 px-1">
          <Compass className="w-4 h-4" />
          <span>Bagian 4 · Lembar Pengamatan (Reflective Observation)</span>
        </div>
        <ObservationSheet
          subtopicId={subtopic.id}
          defaultRows={subtopic.defaultObservationRows}
          savedRows={savedRows}
          onSave={onSaveObservations}
        />
      </section>

      {/* ========================================================
          BAGIAN 5: ANALISIS HASIL EKSPERIMEN
          ======================================================== */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-600">
          <HelpCircle className="w-4 h-4" />
          <span>Bagian 5 · Analisis Hasil Eksperimen</span>
        </div>
        <h2 className="text-base font-bold text-slate-900">
          Pertanyaan Pemandu Analitis Berdasarkan Data Eksperimenmu
        </h2>
        <div className="space-y-3">
          {subtopic.analisisPemandu.map((item, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <span className="font-semibold text-xs sm:text-sm text-slate-800 block">
                {idx + 1}. {item.pertanyaan}
              </span>
              <div>
                <button
                  onClick={() => toggleClue(idx)}
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                >
                  {revealedClues[idx] ? 'Sembunyikan Petunjuk Ilmiah' : 'Buka Petunjuk & Kunci Jawaban'}
                  {revealedClues[idx] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {revealedClues[idx] && (
                  <p className="mt-2 p-3 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-700 animate-fade-in">
                    {item.clue}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          BAGIAN 6: MATERI INTI & PENJELASAN ILMIAH
          ======================================================== */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-600">
          <BookOpen className="w-4 h-4" />
          <span>Bagian 6 · Materi Inti &amp; Konseptualisasi Abstrak (PDF Ringkasan)</span>
        </div>

        <h2 className="text-lg font-bold text-slate-900">
          Penjelasan Ilmiah Sistematis Sesuai Acuan Dokumen
        </h2>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {subtopic.materiInti.ringkasan}
        </p>

        {/* Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subtopic.materiInti.poinPenting.map((p, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
              <span className="font-bold text-slate-900 text-sm block">{p.judul}</span>
              <p className="text-slate-600 leading-relaxed">{p.isi}</p>
            </div>
          ))}
        </div>

        {/* Formula or Math Box */}
        {subtopic.materiInti.rumusAtauKonsep && (
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1 text-xs">
            <span className="font-bold text-blue-900 block text-xs uppercase tracking-wider font-mono">
              Persamaan &amp; Konsep Kunci
            </span>
            <div className="font-mono text-xs sm:text-sm font-semibold text-blue-950">
              {subtopic.materiInti.rumusAtauKonsep}
            </div>
          </div>
        )}

        {/* Misconception Notice */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-1 text-xs text-amber-950">
          <span className="font-bold block text-xs uppercase tracking-wider text-amber-800">
            Waspada Miskonsepsi Umum yang Sering Terjadi:
          </span>
          <p className="leading-relaxed">{subtopic.materiInti.miskonsepsi}</p>
        </div>
      </section>

      {/* ========================================================
          BAGIAN 7: REFLEKSI & PENERAPAN
          ======================================================== */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
          <Lightbulb className="w-4 h-4" />
          <span>Bagian 7 · Refleksi &amp; Penerapan Kontekstual (Active Experimentation)</span>
        </div>

        <h2 className="text-base font-bold text-slate-900">
          Menghubungkan Pengalaman Laboratorium dengan Dunia Nyata
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-slate-900 block">Pertanyaan Refleksi Diri:</span>
            <ul className="pl-4 list-disc space-y-1 text-slate-600">
              <li>{subtopic.refleksi.pertanyaan1}</li>
              <li>{subtopic.refleksi.pertanyaan2}</li>
            </ul>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-emerald-950">
            <span className="font-bold block text-emerald-900">Penerapan Nyata di Industri &amp; Sains:</span>
            <p className="leading-relaxed">{subtopic.refleksi.penerapanDuniaNyata}</p>
          </div>
        </div>
      </section>

      {/* ========================================================
          BAGIAN 8: EVALUASI PEMBELAJARAN
          ======================================================== */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 px-1">
          <Award className="w-4 h-4" />
          <span>Bagian 8 · Evaluasi Hasil Pembelajaran</span>
        </div>
        <EvaluationQuiz
          subtopicId={subtopic.id}
          questions={subtopic.evaluasi}
          savedScore={savedScore}
          onScoreSubmit={onSaveQuizScore}
        />
      </section>

      {/* ========================================================
          BAGIAN 9: NAVIGASI PEMBELAJARAN
          ======================================================== */}
      <section className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
        {prevSubtopic ? (
          <button
            onClick={() => onNavigate(prevSubtopic.slug)}
            className="px-4 py-2 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 block font-normal">Materi Sebelumnya</span>
              <span>{prevSubtopic.title}</span>
            </div>
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={onBackToOverview}
          className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors"
        >
          Cakupan Materi
        </button>

        {nextSubtopic ? (
          <button
            onClick={() => onNavigate(nextSubtopic.slug)}
            className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors shadow-2xs"
          >
            <div className="text-right">
              <span className="text-[10px] text-blue-200 block font-normal">Materi Selanjutnya</span>
              <span>{nextSubtopic.title}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={onBackToOverview}
            className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            Semua Materi Selesai! Kembali ke Beranda
          </button>
        )}
      </section>
    </div>
  );
}
