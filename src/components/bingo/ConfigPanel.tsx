import { memo } from 'react';
import { GameConfig } from '../../types/bingo';

interface ConfigPanelProps {
  config: GameConfig;
  onConfigChange: (config: GameConfig) => void;
  onApply: () => void;
  totalPlayers: number;
}

export const ConfigPanel = ({ config, onConfigChange, onApply, totalPlayers }: ConfigPanelProps) => {
  return (
    <div className="bg-gradient-to-br from-[#0a1f44] via-[#1e3a8a] to-[#0a1f44] rounded-3xl p-6 shadow-[0_8px_40px_rgba(251,191,36,0.4)] border border-[#fbbf24]/30">
      <div className="flex items-center gap-3 mb-5">
        <i className="ri-settings-3-line text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]"></i>
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] uppercase tracking-wider">
          Panel del Sorteo
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-bold text-[#fbbf24] mb-2 uppercase tracking-wider">
            Premio Total
          </label>
          <input
            type="text"
            value={config.montoSorteo}
            onChange={(e) => onConfigChange({ ...config, montoSorteo: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border-2 border-[#fbbf24]/30 rounded-xl text-white font-bold focus:outline-none focus:border-[#f59e0b] focus:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all"
            placeholder="S/ 500"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#fbbf24] mb-2 uppercase tracking-wider">
            Costo de Estrellita
          </label>
          <input
            type="text"
            value={config.costoTicket}
            onChange={(e) => onConfigChange({ ...config, costoTicket: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border-2 border-[#fbbf24]/30 rounded-xl text-white font-bold focus:outline-none focus:border-[#f59e0b] focus:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all"
            placeholder="S/ 30"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#fbbf24] mb-2 uppercase tracking-wider">
            Números a Jugar
          </label>
          <input
            type="number"
            value={config.cantidadNumeros}
            onChange={(e) => onConfigChange({ ...config, cantidadNumeros: parseInt(e.target.value) || 50 })}
            className="w-full px-4 py-3 bg-white/10 border-2 border-[#fbbf24]/30 rounded-xl text-white font-bold focus:outline-none focus:border-[#f59e0b] focus:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all"
            min="1"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#fbbf24] mb-2 uppercase tracking-wider">
            Cantidad de Ganadores
          </label>
          <input
            type="number"
            value={config.cantidadGanadores}
            onChange={(e) => {
              const newCantidad = parseInt(e.target.value) || 2;
              const newPremios = Array.from({ length: newCantidad }, (_, i) => 
                config.premios[i] || { posicion: i + 1, descripcion: `Premio ${i + 1}` }
              );
              onConfigChange({ 
                ...config, 
                cantidadGanadores: newCantidad,
                premios: newPremios
              });
            }}
            className="w-full px-4 py-3 bg-white/10 border-2 border-[#fbbf24]/30 rounded-xl text-white font-bold focus:outline-none focus:border-[#f59e0b] focus:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all"
            min="1"
            max="10"
          />
        </div>
      </div>

      {/* Premios - Mostrar solo los primeros 3 */}
      <div className="mb-5">
        <label className="block text-sm font-bold text-[#fbbf24] mb-3 uppercase tracking-wider">
          Premios (mostrando {Math.min(3, config.premios.length)} de {config.premios.length})
        </label>
        <div className="space-y-2">
          {config.premios.slice(0, 3).map((premio, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] rounded-lg flex items-center justify-center font-black text-white shadow-lg">
                {premio.posicion}
              </div>
              <input
                type="text"
                value={premio.descripcion}
                onChange={(e) => {
                  const newPremios = [...config.premios];
                  newPremios[index] = { ...premio, descripcion: e.target.value };
                  onConfigChange({ ...config, premios: newPremios });
                }}
                className="flex-1 px-4 py-2 bg-white/10 border-2 border-[#fbbf24]/30 rounded-lg text-white font-bold focus:outline-none focus:border-[#f59e0b] focus:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all"
                placeholder={`Premio ${premio.posicion}`}
              />
            </div>
          ))}
          {config.premios.length > 3 && (
            <p className="text-xs text-[#fbbf24]/70 text-center font-semibold">
              + {config.premios.length - 3} premios más configurados
            </p>
          )}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="bg-white/5 rounded-xl p-4 mb-5 border border-[#fbbf24]/20">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs text-[#fbbf24] uppercase mb-1 font-bold">Jugadores Registrados</p>
            <p className="text-2xl font-black text-white">{totalPlayers}</p>
          </div>
          <div>
            <p className="text-xs text-[#fbbf24] uppercase mb-1 font-bold">Números Disponibles</p>
            <p className="text-2xl font-black text-white">{config.cantidadNumeros}</p>
          </div>
        </div>
      </div>

      <button
        onClick={onApply}
        className="w-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#fbbf24] text-white font-black py-3 px-6 rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] flex items-center justify-center gap-2"
      >
        <i className="ri-check-line text-xl"></i>
        Aplicar Configuración
      </button>
    </div>
  );
};

ConfigPanel.displayName = 'ConfigPanel';
