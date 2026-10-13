import React, { useState, useEffect } from 'react';
import { SUBTOPICS, MODULES_METADATA } from './data/learningContent';
import { UserProgress, ObservationRow } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import CakupanMateriSection from './components/CakupanMateriSection';
import LabSimulationsHub from './components/LabSimulationsHub';
import PetunjukBelajar from './components/PetunjukBelajar';
import AboutSection from './components/AboutSection';
import SubtopicPageView from './components/subpages/SubtopicPageView';
import WordPressEmbedModal from './components/WordPressEmbedModal';

const STORAGE_KEY = 'eksplorasi_sains_progress_v1';

export default function App() {
  const [activeView, setActiveView] = useState<string>('beranda');
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState<boolean>(false);

  // User progress state loaded from localStorage
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('LocalStorage not available, running in-memory mode:', e);
    }
    return {
      completedSubtopics: [],
      quizScores: {},
      savedObservations: {},
    };
  });

  // Save progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Could not save progress to localStorage:', e);
    }
  }, [progress]);

  // URL Hash routing listener for direct links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveView(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: string) => {
    setActiveView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleComplete = (subtopicId: string) => {
    setProgress((prev) => {
      const isAlready = prev.completedSubtopics.includes(subtopicId);
      const updated = isAlready
        ? prev.completedSubtopics.filter((id) => id !== subtopicId)
        : [...prev.completedSubtopics, subtopicId];
      return {
        ...prev,
        completedSubtopics: updated,
      };
    });
  };

  const handleSaveObservations = (subtopicId: string, rows: ObservationRow[]) => {
    setProgress((prev) => ({
      ...prev,
      savedObservations: {
        ...prev.savedObservations,
        [subtopicId]: rows,
      },
    }));
  };

  const handleSaveQuizScore = (subtopicId: string, score: number, total: number) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [subtopicId]: {
          score,
          total,
          timestamp: new Date().toISOString(),
        },
      },
      completedSubtopics: prev.completedSubtopics.includes(subtopicId)
        ? prev.completedSubtopics
        : [...prev.completedSubtopics, subtopicId],
    }));
  };

  const handleResetAllProgress = () => {
    if (window.confirm('Apakah Anda yakin ingin mengatur ulang seluruh riwayat skor kuis dan lembar pengamatan?')) {
      const fresh: UserProgress = {
        completedSubtopics: [],
        quizScores: {},
        savedObservations: {},
      };
      setProgress(fresh);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Find if current view matches a subtopic
  const currentSubtopic = SUBTOPICS.find((s) => s.slug === activeView || s.id === activeView);

  let prevSubtopic = null;
  let nextSubtopic = null;
  if (currentSubtopic) {
    const currentIndex = SUBTOPICS.findIndex((s) => s.id === currentSubtopic.id);
    if (currentIndex > 0) prevSubtopic = SUBTOPICS[currentIndex - 1];
    if (currentIndex < SUBTOPICS.length - 1) nextSubtopic = SUBTOPICS[currentIndex + 1];
  }

  return (
    <div id="experiential-learning-app" className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Header */}
      <Header
        activeView={activeView}
        onNavigate={handleNavigate}
        completedCount={progress.completedSubtopics.length}
        totalCount={SUBTOPICS.length}
        onOpenEmbedModal={() => setIsEmbedModalOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentSubtopic ? (
          <SubtopicPageView
            subtopic={currentSubtopic}
            progress={progress}
            prevSubtopic={prevSubtopic}
            nextSubtopic={nextSubtopic}
            onNavigate={handleNavigate}
            onBackToOverview={() => handleNavigate('cakupan-materi')}
            onToggleComplete={handleToggleComplete}
            onSaveObservations={handleSaveObservations}
            onSaveQuizScore={handleSaveQuizScore}
          />
        ) : activeView === 'cakupan-materi' ? (
          <CakupanMateriSection
            progress={progress}
            onSelectSubtopic={handleNavigate}
          />
        ) : activeView === 'laboratorium' ? (
          <LabSimulationsHub />
        ) : activeView === 'petunjuk-belajar' ? (
          <PetunjukBelajar onStartLearning={() => handleNavigate('cakupan-materi')} />
        ) : activeView === 'tentang' ? (
          <AboutSection />
        ) : (
          <Homepage
            progress={progress}
            onNavigate={handleNavigate}
            onOpenEmbedModal={() => setIsEmbedModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onResetAllProgress={handleResetAllProgress}
      />

      {/* WordPress & Standalone HTML Embed Modal */}
      <WordPressEmbedModal
        isOpen={isEmbedModalOpen}
        onClose={() => setIsEmbedModalOpen(false)}
      />
    </div>
  );
}
