import React, { useState } from 'react';
import ParticleModelSim from './simulations/ParticleModelSim';
import ClassificationMixtureSim from './simulations/ClassificationMixtureSim';
import MeasurementLabSim from './simulations/MeasurementLabSim';
import DataAnalysisSim from './simulations/DataAnalysisSim';
import StateChangesSim from './simulations/StateChangesSim';
import ChemicalBiologicalSim from './simulations/ChemicalBiologicalSim';
import HazardB3SafetySim from './simulations/HazardB3SafetySim';
import { FlaskConical, Boxes, Ruler, Flame, ShieldAlert, Calculator, RefreshCw } from 'lucide-react';

export default function LabSimulationsHub() {
  const [activeLab, setActiveLab] = useState<
    'partikel' | 'klasifikasi' | 'alat-ukur' | 'analisis-data' | 'perubahan-wujud' | 'korosi' | 'b3'
  >('partikel');

  const labList = [
    { id: 'partikel', title: '1. Model Partikel Zat', icon: Boxes, desc: 'Kisi kristal padat, fluida cair, dan gerak acak gas' },
    { id: 'klasifikasi', title: '2. Klasifikasi & Pemisahan', icon: FlaskConical, desc: 'Zat tunggal, campuran, dan 6 metode pemisahan fisis' },
    { id: 'alat-ukur', title: '3. Alat Ukur Presisi', icon: Ruler, desc: 'Jangka sorong 0,1 mm, mikrometer 0,01 mm, paralaks mistar' },
    { id: 'analisis-data', title: '4. Pengolahan Data & Sx̄', icon: Calculator, desc: 'Pengukuran berulang, ketidakpastian mutlak & angka penting' },
    { id: 'perubahan-wujud', title: '5. Termal & Perubahan Wujud', icon: RefreshCw, desc: 'Segitiga 6 wujud kalor, pelarutan jenuh & ekstraksi' },
    { id: 'korosi', title: '6. Reaksi Kimia & Biologi', icon: Flame, desc: '5 faktor laju korosi, pembakaran, fotosintesis & fermentasi' },
    { id: 'b3', title: '7. Keselamatan & Limbah B3', icon: ShieldAlert, desc: 'Simbol GHS, kabinet penyimpanan, 7 prosedur & prinsip 5R' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200 mb-2">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Laboratorium Interaktif Terpadu</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Pusat Eksperimen Sains &amp; Laboratorium Virtual
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Seluruh 7 simulator interaktif berjalan secara real-time di peramban tanpa memerlukan koneksi server khusus atau akun berbayar.
        </p>
      </div>

      {/* Lab Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
        {labList.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveLab(item.id as any)}
              className={`p-3 rounded-xl border text-left transition-all ${
                activeLab === item.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4 mb-1.5" />
              <div className="font-bold text-xs">{item.title}</div>
            </button>
          );
        })}
      </div>

      {/* Lab Viewer */}
      <div className="transition-all">
        {activeLab === 'partikel' && <ParticleModelSim />}
        {activeLab === 'klasifikasi' && <ClassificationMixtureSim />}
        {activeLab === 'alat-ukur' && <MeasurementLabSim initialTool="jangka-sorong" />}
        {activeLab === 'analisis-data' && <DataAnalysisSim />}
        {activeLab === 'perubahan-wujud' && <StateChangesSim />}
        {activeLab === 'korosi' && <ChemicalBiologicalSim />}
        {activeLab === 'b3' && <HazardB3SafetySim />}
      </div>
    </div>
  );
}
