import { memo, useEffect, useState } from 'react';

interface BingoBallProps {
  currentNumber: number | null;
  isDrawing: boolean;
}

export const BingoBall = memo(({ currentNumber, isDrawing }: BingoBallProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (currentNumber !== null) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentNumber]);

  return (
    <div className="relative flex items-center justify-center h-72">
      {/* Anillos de energía giratorios */}
      {isDrawing && (
        <>
          <div className="absolute w-64 h-64 border-4 border-[#fbbf24]/30 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
          <div className="absolute w-72 h-72 border-4 border-[#f59e0b]/20 rounded-full animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}></div>
        </>
      )}

      {/* Bola de Bingo con diseño futurista */}
      <div
        className={`relative w-56 h-56 rounded-full bg-gradient-to-br from-[#fbbf24] via-[#f59e0b] to-[#fbbf24] shadow-[0_0_60px_rgba(251,191,36,0.8)] flex items-center justify-center transition-all duration-500 ${
          isAnimating
            ? 'animate-[bounce_0.8s_ease-in-out,spin_1s_ease-in-out] scale-125'
            : isDrawing
            ? 'animate-[wiggle_2s_ease-in-out_infinite] scale-110'
            : 'scale-100'
        }`}
        style={{
          boxShadow: isAnimating
            ? '0 0 80px rgba(255,0,255,1), 0 0 120px rgba(0,255,255,0.8), inset 0 0 40px rgba(255,255,255,0.4)'
            : '0 0 60px rgba(255,0,255,0.8), 0 0 100px rgba(0,255,255,0.5), inset 0 0 30px rgba(255,255,255,0.3)',
        }}
      >
        {/* Brillo superior mejorado */}
        <div className="absolute top-8 left-14 w-20 h-20 bg-white/50 rounded-full blur-2xl"></div>
        
        {/* Círculo interior con gradiente */}
        <div className="absolute inset-5 rounded-full bg-gradient-to-br from-white via-white to-gray-100 shadow-inner flex items-center justify-center border-4 border-white/50">
          {currentNumber !== null ? (
            <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#fbbf24] via-[#f59e0b] to-[#fbbf24] drop-shadow-2xl animate-pulse">
              {currentNumber}
            </span>
          ) : (
            <i className="ri-question-line text-8xl text-gray-300"></i>
          )}
        </div>

        {/* Partículas de energía flotantes */}
        {isAnimating && (
          <>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 rounded-full animate-ping"
                style={{
                  background: i % 2 === 0 ? '#fbbf24' : '#f59e0b',
                  top: `${50 + 45 * Math.sin((i * Math.PI) / 6)}%`,
                  left: `${50 + 45 * Math.cos((i * Math.PI) / 6)}%`,
                  animationDelay: `${i * 0.08}s`,
                  animationDuration: '0.8s',
                }}
              ></div>
            ))}
          </>
        )}

        {/* Rayos de luz */}
        {isAnimating && (
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-50"
                style={{
                  left: '50%',
                  transformOrigin: 'center',
                  transform: `rotate(${i * 45}deg)`,
                  animation: 'pulse 1s ease-in-out infinite',
                  animationDelay: `${i * 0.1}s`,
                }}
              ></div>
            ))}
          </div>
        )}
      </div>

      {/* Texto de estado mejorado */}
      {isDrawing && !currentNumber && (
        <div className="absolute bottom-0 text-center">
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#fbbf24] text-2xl font-black animate-pulse">
            ⚡ Preparando sorteo...
          </p>
        </div>
      )}
    </div>
  );
});

BingoBall.displayName = 'BingoBall';
