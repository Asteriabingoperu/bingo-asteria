import { memo } from 'react';

interface ControlPanelProps {
  isDrawing: boolean;
  speed: number;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export const ControlPanel = memo(({
  isDrawing,
  speed,
  onStart,
  onStop,
  onReset,
  onSpeedChange
}: ControlPanelProps) => {
  return (
    <div className="bg-gradient-to-br from-[#0a1f44] via-[#1e3a8a] to-[#0a1f44] rounded-2xl p-5 shadow-[0_8px_30px_rgba(251,191,36,0.3)] border border-[#fbbf24]/30">
      <div className="flex items-center gap-2 mb-4">
        <i className="ri-remote-control-line text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]"></i>
        <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] uppercase tracking-wider">
          Controles
        </h3>
      </div>

      <div className="space-y-3">
        {!isDrawing ? (
          <button
            onClick={onStart}
            className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#10b981] text-white font-black py-3 px-4 rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] flex items-center justify-center gap-2"
          >
            <i className="ri-play-fill text-xl"></i>
            INICIAR SORTEO
          </button>
        ) : (
          <button
            onClick={onStop}
            className="w-full bg-gradient-to-r from-[#ef4444] to-[#dc2626] hover:from-[#dc2626] hover:to-[#ef4444] text-white font-black py-3 px-4 rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] flex items-center justify-center gap-2"
          >
            <i className="ri-pause-fill text-xl"></i>
            PAUSAR
          </button>
        )}

        <button
          onClick={onReset}
          className="w-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#fbbf24] text-white font-black py-3 px-4 rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] flex items-center justify-center gap-2"
        >
          <i className="ri-restart-line text-xl"></i>
          REINICIAR
        </button>

        <div className="bg-white/5 rounded-xl p-4 border border-[#fbbf24]/20">
          <label className="block text-sm font-bold text-[#fbbf24] mb-3 uppercase tracking-wider">
            Velocidad: {speed}x
          </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#fbbf24]"
          />
          <div className="flex justify-between text-xs text-[#fbbf24]/70 mt-2 font-semibold">
            <span>Lento</span>
            <span>Rápido</span>
          </div>
        </div>
      </div>
    </div>
  );
});

ControlPanel.displayName = 'ControlPanel';
