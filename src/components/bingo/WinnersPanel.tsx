import { Winner } from '../../types/bingo';

interface WinnersPanelProps {
  winners: Winner[];
}

export const WinnersPanel = ({ winners }: WinnersPanelProps) => {
  if (winners.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-2xl p-8 shadow-2xl border-4 border-yellow-300 animate-pulse">
      <h2 className="text-4xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
        <i className="ri-trophy-fill text-5xl"></i>
        ¡GANADORES!
        <i className="ri-trophy-fill text-5xl"></i>
      </h2>
      
      <div className="space-y-4">
        {winners.map((winner) => (
          <div
            key={winner.posicion}
            className="bg-white rounded-xl p-6 shadow-xl border-4 border-yellow-400 transform hover:scale-105 transition-all"
          >
            <div className="flex items-center gap-4">
              {/* Corona con número de ganador */}
              <div className="relative">
                <i className="ri-vip-crown-fill text-6xl text-yellow-500"></i>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-yellow-900">
                  {winner.posicion}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-600 mb-1">
                  GANADOR {winner.posicion}
                </div>
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {winner.jugador.nombre}
                </div>
                <div className="text-lg text-gray-700 mb-2">
                  <span className="font-semibold">Número:</span> {winner.numero}
                </div>
                <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-lg font-bold text-center">
                  🎁 {winner.premio}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};