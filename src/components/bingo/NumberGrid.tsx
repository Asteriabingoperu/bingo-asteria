import { memo } from 'react';
import { BingoNumber } from '../../types/bingo';

interface NumberGridProps {
  numbers: BingoNumber[];
  onNumberClick: (numero: number) => void;
  currentNumber: number | null;
  historial: number[];
}

export const NumberGrid = ({ numbers, currentNumber }: NumberGridProps) => {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-3">
      {numbers.map((num) => {
        const isCurrentNumber = num.numero === currentNumber;
        const hasPlayers = num.jugadores.length > 0;
        const isPaid = hasPlayers && num.jugadores[0].pagado;
        const isWinner = num.repeticiones === 5;
        
        return (
          <div
            key={num.numero}
            className={`
              relative rounded-xl p-3 sm:p-4 transition-all duration-300 border-2
              ${isCurrentNumber 
                ? 'bg-gradient-to-br from-pink-500 to-rose-600 border-pink-300 scale-110 shadow-2xl shadow-pink-500/50 animate-pulse' 
                : isWinner
                ? 'bg-gradient-to-br from-yellow-400 to-amber-500 border-yellow-300 shadow-xl shadow-yellow-500/50'
                : isPaid
                ? 'bg-white border-blue-300 shadow-lg hover:shadow-xl'
                : 'bg-white/50 border-gray-300 opacity-60'
              }
            `}
          >
            {/* Número */}
            <div className={`text-2xl sm:text-3xl font-bold text-center mb-2 ${
              isCurrentNumber || isWinner ? 'text-white' : 'text-gray-800'
            }`}>
              {num.numero}
            </div>

            {/* Nombre del jugador o LIBRE */}
            <div className={`text-xs sm:text-sm text-center mb-2 font-semibold truncate ${
              isCurrentNumber || isWinner ? 'text-white' : hasPlayers ? 'text-blue-600' : 'text-gray-400'
            }`}>
              {hasPlayers ? num.jugadores[0].nombre : 'LIBRE'}
            </div>

            {/* 5 Estrellas */}
            {hasPlayers && (
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`ri-star-fill text-base sm:text-lg ${
                      star <= num.repeticiones
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  ></i>
                ))}
              </div>
            )}

            {/* Corona para ganadores */}
            {isWinner && (
              <div className="absolute -top-3 -right-3 bg-yellow-400 rounded-full p-2 shadow-lg animate-bounce">
                <i className="ri-vip-crown-fill text-2xl text-yellow-900"></i>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

NumberGrid.displayName = 'NumberGrid';
