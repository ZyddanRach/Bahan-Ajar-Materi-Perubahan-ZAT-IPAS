import React, { useState, useEffect } from 'react';
import { ObservationRow } from '../../types';
import { Plus, Trash2, RotateCcw, Save, CheckCircle2, ClipboardList } from 'lucide-react';

interface ObservationSheetProps {
  subtopicId: string;
  defaultRows: ObservationRow[];
  savedRows?: ObservationRow[];
  onSave: (subtopicId: string, rows: ObservationRow[]) => void;
}

export default function ObservationSheet({
  subtopicId,
  defaultRows,
  savedRows,
  onSave,
}: ObservationSheetProps) {
  const [rows, setRows] = useState<ObservationRow[]>(savedRows && savedRows.length > 0 ? savedRows : defaultRows);
  const [showSavedNotification, setShowSavedNotification] = useState<boolean>(false);

  useEffect(() => {
    if (savedRows && savedRows.length > 0) {
      setRows(savedRows);
    } else {
      setRows(defaultRows);
    }
  }, [subtopicId, savedRows, defaultRows]);

  const handleCellChange = (id: string, field: keyof ObservationRow, val: string) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: val } : r))
    );
  };

  const handleAddRow = () => {
    const newId = String(Date.now());
    setRows([
      ...rows,
      {
        id: newId,
        percobaan: `Percobaan #${rows.length + 1}`,
        variabel: 'Variabel baru...',
        hasil: 'Hasil teramati...',
        kesimpulan: 'Kesimpulan...',
      },
    ]);
  };

  const handleDeleteRow = (id: string) => {
    if (rows.length <= 1) return;
    setRows(rows.filter((r) => r.id !== id));
  };

  const handleReset = () => {
    setRows(defaultRows);
    onSave(subtopicId, defaultRows);
  };

  const handleSave = () => {
    onSave(subtopicId, rows);
    setShowSavedNotification(true);
    setTimeout(() => setShowSavedNotification(false), 2500);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-blue-600" />
          <h4 className="font-bold text-sm text-slate-900">
            Lembar Pengamatan Interaktif (Reflective Observation)
          </h4>
        </div>
        <div className="flex items-center gap-2">
          {showSavedNotification && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 animate-fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" /> Tersimpan ke Perangkat
            </span>
          )}
          <button
            onClick={handleAddRow}
            className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Baris
          </button>
          <button
            onClick={handleReset}
            className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg flex items-center gap-1 transition-colors"
            title="Kembalikan data awal"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            onClick={handleSave}
            className="px-3.5 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Save className="w-3.5 h-3.5" /> Simpan Data
          </button>
        </div>
      </div>

      <div className="p-4 overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
              <th className="py-2.5 px-3 w-12 text-center">No</th>
              <th className="py-2.5 px-3 w-1/4">Aktivitas / Percobaan</th>
              <th className="py-2.5 px-3 w-1/4">Variabel yang Diubah</th>
              <th className="py-2.5 px-3 w-1/3">Hasil Pengamatan</th>
              <th className="py-2.5 px-3 w-1/3">Kesimpulan Sementara</th>
              <th className="py-2.5 px-2 w-10 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, idx) => (
              <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-2.5 px-3 text-center font-mono text-slate-400 font-semibold">
                  {idx + 1}
                </td>
                <td className="py-2 px-2">
                  <input
                    type="text"
                    value={row.percobaan}
                    onChange={(e) => handleCellChange(row.id, 'percobaan', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/60 border border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded font-medium text-slate-800 transition-colors"
                  />
                </td>
                <td className="py-2 px-2">
                  <input
                    type="text"
                    value={row.variabel}
                    onChange={(e) => handleCellChange(row.id, 'variabel', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/60 border border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded text-slate-700 transition-colors"
                  />
                </td>
                <td className="py-2 px-2">
                  <textarea
                    rows={2}
                    value={row.hasil}
                    onChange={(e) => handleCellChange(row.id, 'hasil', e.target.value)}
                    className="w-full px-2.5 py-1 text-xs bg-slate-50/60 border border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded text-slate-700 transition-colors resize-none"
                  />
                </td>
                <td className="py-2 px-2">
                  <textarea
                    rows={2}
                    value={row.kesimpulan}
                    onChange={(e) => handleCellChange(row.id, 'kesimpulan', e.target.value)}
                    className="w-full px-2.5 py-1 text-xs bg-slate-50/60 border border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded text-slate-700 transition-colors resize-none"
                  />
                </td>
                <td className="py-2 px-2 text-center">
                  <button
                    onClick={() => handleDeleteRow(row.id)}
                    disabled={rows.length <= 1}
                    className="text-slate-300 hover:text-rose-600 disabled:opacity-20 transition-colors p-1"
                    title="Hapus baris"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between items-center">
        <span>Ketik langsung di dalam kolom untuk memperbarui catatan laboratoriummu.</span>
        <span>Data disimpan di browser lokal (localStorage).</span>
      </div>
    </div>
  );
}
