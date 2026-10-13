import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Thermometer, Wind, Shield } from 'lucide-react';

export default function ParticleModelSim() {
  const [wujud, setWujud] = useState<'padat' | 'cair' | 'gas'>('padat');
  const [suhu, setSuhu] = useState<number>(25);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  // Particle positions state
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; origX: number; origY: number }>>([]);

  const initParticles = (type: 'padat' | 'cair' | 'gas') => {
    const width = 360;
    const height = 260;
    const particles = [];

    if (type === 'padat') {
      const rows = 6;
      const cols = 8;
      const spacing = 28;
      const startX = (width - (cols - 1) * spacing) / 2;
      const startY = height - 50 - (rows - 1) * spacing;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * spacing;
          const y = startY + r * spacing;
          particles.push({ x, y, origX: x, origY: y, vx: 0, vy: 0 });
        }
      }
    } else if (type === 'cair') {
      const count = 48;
      for (let i = 0; i < count; i++) {
        const x = 40 + Math.random() * (width - 80);
        const y = height - 120 + Math.random() * 95;
        particles.push({
          x,
          y,
          origX: x,
          origY: y,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
        });
      }
    } else {
      // gas
      const count = 28;
      for (let i = 0; i < count; i++) {
        const x = 30 + Math.random() * (width - 60);
        const y = 30 + Math.random() * (height - 60);
        particles.push({
          x,
          y,
          origX: x,
          origY: y,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
        });
      }
    }
    particlesRef.current = particles;
  };

  useEffect(() => {
    initParticles(wujud);
  }, [wujud]);

  // Adjust default suhu when switching state
  const handleWujudChange = (newWujud: 'padat' | 'cair' | 'gas') => {
    setWujud(newWujud);
    if (newWujud === 'padat') setSuhu(-10);
    else if (newWujud === 'cair') setSuhu(35);
    else setSuhu(100);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw container boundary
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(15, 15, canvas.width - 30, canvas.height - 30, 8);
      ctx.stroke();

      // Liquid level line
      if (wujud === 'cair') {
        ctx.fillStyle = 'rgba(224, 242, 254, 0.35)';
        ctx.fillRect(16, canvas.height - 130, canvas.width - 32, 114);
      }

      const speedFactor = Math.max(0.2, (suhu + 60) / 70);

      // Render & update particles
      particlesRef.current.forEach((p, idx) => {
        if (isPlaying) {
          if (wujud === 'padat') {
            // Vibrational jitter around lattice points
            const jitterMag = Math.min(6, 1.2 * speedFactor);
            p.x = p.origX + Math.sin(tick * 0.3 + idx * 1.5) * jitterMag;
            p.y = p.origY + Math.cos(tick * 0.35 + idx * 2.1) * jitterMag;
          } else if (wujud === 'cair') {
            // Fluid gliding bounded at bottom
            p.x += p.vx * speedFactor;
            p.y += p.vy * speedFactor;

            // boundaries inside liquid zone
            if (p.x < 30 || p.x > canvas.width - 30) p.vx *= -1;
            if (p.y < canvas.height - 120) {
              p.y = canvas.height - 120;
              p.vy *= -1;
            }
            if (p.y > canvas.height - 30) {
              p.y = canvas.height - 30;
              p.vy *= -1;
            }
          } else {
            // gas: fast random bouncing all over container
            p.x += p.vx * speedFactor * 1.4;
            p.y += p.vy * speedFactor * 1.4;

            if (p.x < 25 || p.x > canvas.width - 25) p.vx *= -1;
            if (p.y < 25 || p.y > canvas.height - 25) p.vy *= -1;
          }
        }

        // Draw particle
        ctx.beginPath();
        const radius = wujud === 'padat' ? 9 : wujud === 'cair' ? 8 : 7;
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

        // Particle gradient & color
        const gradient = ctx.createRadialGradient(p.x - 2, p.y - 2, 1, p.x, p.y, radius);
        if (wujud === 'padat') {
          gradient.addColorStop(0, '#60a5fa');
          gradient.addColorStop(1, '#2563eb');
        } else if (wujud === 'cair') {
          gradient.addColorStop(0, '#38bdf8');
          gradient.addColorStop(1, '#0284c7');
        } else {
          gradient.addColorStop(0, '#f87171');
          gradient.addColorStop(1, '#dc2626');
        }
        ctx.fillStyle = gradient;
        ctx.fill();

        // Subtle specular highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(p.x - 2, p.y - 2, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [wujud, suhu, isPlaying]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-base">Laboratorium Virtual Model Partikel Zat</h3>
          <p className="text-xs text-slate-300">Amati susunan partikel, keteraturan kristal, dan pengaruh energi kinetik (suhu)</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-md transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? 'Jeda' : 'Lanjut'}
          </button>
          <button
            onClick={() => initParticles(wujud)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-md transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Canvas Stage */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative bg-slate-950 rounded-lg p-2 w-full max-w-[380px] shadow-inner">
            <div className="text-[11px] text-slate-400 flex justify-between px-2 pb-1 font-mono">
              <span>Wadah Partikel 2D</span>
              <span className="text-teal-400">
                {wujud === 'padat' ? 'Struktur Kisi Kristal' : wujud === 'cair' ? 'Fase Fluida Mengalir' : 'Gerak Termal Acak'}
              </span>
            </div>
            <canvas
              ref={canvasRef}
              width={360}
              height={260}
              className="w-full h-auto bg-slate-900 rounded border border-slate-800 block"
            />
          </div>

          <div className="w-full max-w-[380px] mt-3 flex justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Bentuk Fisik</span>
              <span className="font-semibold text-slate-800">
                {wujud === 'padat' ? 'Tetap (Kaku)' : wujud === 'cair' ? 'Menyesuaikan Wadah' : 'Tidak Beraturan'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Volume Fisik</span>
              <span className="font-semibold text-slate-800">
                {wujud === 'gas' ? 'Berubah (Mengisi Ruang)' : 'Tetap Konstan'}
              </span>
            </div>
          </div>
        </div>

        {/* Control and Concept Deck */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
              Pilih Wujud Materi
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleWujudChange('padat')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                  wujud === 'padat'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Padat
              </button>
              <button
                onClick={() => handleWujudChange('cair')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                  wujud === 'cair'
                    ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Cair
              </button>
              <button
                onClick={() => handleWujudChange('gas')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                  wujud === 'gas'
                    ? 'bg-red-600 text-white border-red-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Gas
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                Suhu Konseptual
              </span>
              <span className="font-mono text-xs font-bold text-slate-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {suhu} °C
              </span>
            </div>
            <input
              type="range"
              min={-50}
              max={150}
              value={suhu}
              onChange={(e) => setSuhu(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>-50°C (Dingin/Getaran Redup)</span>
              <span>150°C (Panas/Termal Cepat)</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs space-y-2">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              Karakteristik Mikroskopis Menurut PDF:
            </h4>
            {wujud === 'padat' && (
              <ul className="space-y-1 text-slate-600 pl-4 list-disc">
                <li>Partikel saling berdekatan dan gaya tarik menarik antarpartikel sangat kuat.</li>
                <li>Rata-rata berbentuk kristal yang teratur dan kaku.</li>
                <li>Volumenya tetap dan gerak partikel hanya berupa getaran (vibrasi).</li>
              </ul>
            )}
            {wujud === 'cair' && (
              <ul className="space-y-1 text-slate-600 pl-4 list-disc">
                <li>Bentuk berubah mengikuti wadah karena jarak partikel agak renggang dan gaya tarik lebih lemah.</li>
                <li>Volumenya tetap karena partikel mudah berpindah namun tidak bisa meninggalkan inti kelompok molekulnya.</li>
              </ul>
            )}
            {wujud === 'gas' && (
              <ul className="space-y-1 text-slate-600 pl-4 list-disc">
                <li>Bentuk dan volume tidak tetap karena partikel sangat berjauhan dengan gaya tarik sangat lemah.</li>
                <li>Partikel bergerak secara bebas, acak, dan bisa meninggalkan inti kelompok molekulnya.</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
