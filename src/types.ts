export type ModuleId = 'modul-1' | 'modul-2' | 'modul-3' | 'modul-4';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ObservationRow {
  id: string;
  percobaan: string;
  variabel: string;
  hasil: string;
  kesimpulan: string;
}

export interface SubtopicData {
  id: string;
  slug: string;
  moduleId: ModuleId;
  moduleTitle: string;
  title: string;
  shortDesc: string;
  iconName: string;
  fenomena: {
    cerita: string;
    pertanyaan: string;
    pilihanPrediksi: string[];
    pembahasanPrediksi: string;
  };
  tujuan: string[];
  simulasiType: 
    | 'partikel' 
    | 'klasifikasi' 
    | 'pemisahan' 
    | 'alat-ukur' 
    | 'jangka-sorong' 
    | 'mikrometer' 
    | 'analisis-data' 
    | 'toleransi' 
    | 'angka-penting' 
    | 'perubahan-wujud' 
    | 'pelarutan' 
    | 'korosi-reaksi' 
    | 'perubahan-biologi' 
    | 'keselamatan-b3' 
    | 'limbah-b3';
  defaultObservationRows: ObservationRow[];
  analisisPemandu: {
    pertanyaan: string;
    clue: string;
  }[];
  materiInti: {
    ringkasan: string;
    poinPenting: { judul: string; isi: string }[];
    rumusAtauKonsep?: string;
    miskonsepsi: string;
  };
  refleksi: {
    pertanyaan1: string;
    pertanyaan2: string;
    penerapanDuniaNyata: string;
  };
  evaluasi: QuizQuestion[];
}

export interface UserProgress {
  completedSubtopics: string[];
  quizScores: Record<string, { score: number; total: number; timestamp: string }>;
  savedObservations: Record<string, ObservationRow[]>;
}
