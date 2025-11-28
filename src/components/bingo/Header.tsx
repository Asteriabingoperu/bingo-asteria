import { memo } from 'react';

interface HeaderProps {
  montoSorteo: string;
  cantidadJugadores: number;
  onNavigate: (screen: 'main' | 'players') => void;
  currentScreen: 'main' | 'players';
}

export const Header = ({ montoSorteo, cantidadJugadores, onNavigate, currentScreen }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-[#0a1f44] via-[#1e3a8a] to-[#0a1f44] shadow-[0_4px_20px_rgba(251,191,36,0.3)] border-b-2 border-[#fbbf24]/30">
      <div className="max-w-[1600px] mx-auto px-5 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y Título */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#fbbf24] via-[#f59e0b] to-[#fbbf24] rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(251,191,36,0.6)] animate-pulse">
              <i className="ri-trophy-line text-3xl text-white"></i>
            </div>
            <div>
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#fbbf24] uppercase tracking-wider">
                🎰 SORTEO DE BINGO
              </h1>
              <p className="text-[#fbbf24] text-sm font-bold">Sistema de Sorteo Profesional</p>
            </div>
          </div>

          {/* Información del Sorteo */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-[#fbbf24] uppercase tracking-wider font-bold">Premio Total</p>
              <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#059669]">{montoSorteo}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#fbbf24] uppercase tracking-wider font-bold">Jugadores</p>
              <p className="text-2xl font-black text-white">{cantidadJugadores}</p>
            </div>
            
            {/* Botón de navegación */}
            <button
              onClick={() => onNavigate(currentScreen === 'main' ? 'players' : 'main')}
              className="bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#fbbf24] text-white font-bold py-3 px-6 rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] flex items-center gap-2"
            >
              <i className={`${currentScreen === 'main' ? 'ri-table-line' : 'ri-home-line'} text-xl`}></i>
              {currentScreen === 'main' ? 'Ver Tabla' : 'Volver'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
