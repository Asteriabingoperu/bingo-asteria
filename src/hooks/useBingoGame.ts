import { useState, useCallback, useRef, useEffect } from 'react';
import { BingoNumber, Player, GameConfig, Winner } from '../types/bingo';

export const useBingoGame = () => {
  const [config, setConfig] = useState<GameConfig>({
    cantidadJugadores: 100,
    montoSorteo: 'S/ 500',
    cantidadNumeros: 50,
    cantidadGanadores: 2,
    costoTicket: 'S/ 30',
    premios: [
      { posicion: 1, descripcion: 'S/ 20' },
      { posicion: 2, descripcion: 'S/ 15' }
    ]
  });

  const [numbers, setNumbers] = useState<BingoNumber[]>([]);
  const [historial, setHistorial] = useState<number[]>([]);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [speed, setSpeed] = useState(1);
  const drawIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [backgroundMusic, setBackgroundMusic] = useState<HTMLAudioElement | null>(null);
  const [celebrationMusic, setCelebrationMusic] = useState<HTMLAudioElement | null>(null);

  // Inicializar música con URLs corregidas
  useEffect(() => {
    const bgMusic = new Audio('https://readdy.ai/api/search-audio?query=upbeat happy party celebration festive energetic background music&duration=medium&seq=bingo-bg-v3');
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    setBackgroundMusic(bgMusic);

    const celebMusic = new Audio('https://readdy.ai/api/search-audio?query=victory fanfare celebration winner champion triumph&duration=short&seq=bingo-win-v3');
    celebMusic.volume = 0.8;
    setCelebrationMusic(celebMusic);

    return () => {
      bgMusic.pause();
      celebMusic.pause();
    };
  }, []);

  const initializeNumbers = useCallback((cantidad: number) => {
    const colors = ['#bde6ff70', '#ffc7ef70', '#caffd670'];
    const nums: BingoNumber[] = [];
    for (let i = 1; i <= cantidad; i++) {
      nums.push({
        numero: i,
        jugadores: [],
        repeticiones: 0,
        color: colors[i % 3]
      });
    }
    setNumbers(nums);
  }, []);

  const addPlayer = useCallback((numero: number, player: Player) => {
    setNumbers(prev => prev.map(num => {
      if (num.numero === numero) {
        return {
          ...num,
          jugadores: [...num.jugadores, player]
        };
      }
      return num;
    }));
  }, []);

  const removePlayer = useCallback((numero: number, playerId: string) => {
    setNumbers(prev => prev.map(num => {
      if (num.numero === numero) {
        const newJugadores = num.jugadores.filter(p => p.id !== playerId);
        return {
          ...num,
          jugadores: newJugadores
        };
      }
      return num;
    }));
  }, []);

  const updatePlayer = useCallback((numero: number, playerId: string, updatedPlayer: Player) => {
    setNumbers(prev => prev.map(num => {
      if (num.numero === numero) {
        return {
          ...num,
          jugadores: num.jugadores.map(p => 
            p.id === playerId ? { ...updatedPlayer, id: playerId } : p
          )
        };
      }
      return num;
    }));
  }, []);

  const speakNumber = useCallback((numero: number) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancelar cualquier anuncio anterior
      
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(`Número ${numero}`);
        utterance.lang = 'es-ES';
        utterance.rate = 0.9;
        utterance.pitch = 1.5;
        utterance.volume = 1.0;
        
        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(voice => 
          voice.lang.includes('es') && (
            voice.name.toLowerCase().includes('female') ||
            voice.name.toLowerCase().includes('mujer') ||
            voice.name.toLowerCase().includes('woman') ||
            voice.name.toLowerCase().includes('paulina') ||
            voice.name.toLowerCase().includes('monica') ||
            voice.name.toLowerCase().includes('lucia')
          )
        ) || voices.find(voice => voice.lang.includes('es'));
        
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
        
        window.speechSynthesis.speak(utterance);
      }, 100);
    }
  }, []);

  const speakWinner = useCallback((nombreGanador: string, premio: string, posicion: number) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      setTimeout(() => {
        const mensaje = `¡Felicidades ${nombreGanador}! Ganador número ${posicion}. Has ganado ${premio}`;
        
        const utterance = new SpeechSynthesisUtterance(mensaje);
        utterance.lang = 'es-ES';
        utterance.rate = 0.9;
        utterance.pitch = 1.5;
        utterance.volume = 1.0;
        
        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(voice => 
          voice.lang.includes('es') && (
            voice.name.toLowerCase().includes('female') ||
            voice.name.toLowerCase().includes('mujer') ||
            voice.name.toLowerCase().includes('woman') ||
            voice.name.toLowerCase().includes('paulina') ||
            voice.name.toLowerCase().includes('monica') ||
            voice.name.toLowerCase().includes('lucia')
          )
        ) || voices.find(voice => voice.lang.includes('es'));
        
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
        
        window.speechSynthesis.speak(utterance);
      }, 500);
    }
  }, []);

  const drawNumber = useCallback(() => {
    if (winners.length >= config.cantidadGanadores) {
      setIsDrawing(false);
      if (drawIntervalRef.current) {
        clearInterval(drawIntervalRef.current);
        drawIntervalRef.current = null;
      }
      if (backgroundMusic) backgroundMusic.pause();
      return null;
    }

    const availableNumbers = numbers.filter(n => n.jugadores.length > 0 && n.repeticiones < 5);
    
    if (availableNumbers.length === 0) {
      setIsDrawing(false);
      if (drawIntervalRef.current) {
        clearInterval(drawIntervalRef.current);
      }
      if (backgroundMusic) backgroundMusic.pause();
      return null;
    }

    const randomBytes = new Uint32Array(1);
    crypto.getRandomValues(randomBytes);
    const randomIndex = randomBytes[0] % availableNumbers.length;
    const drawnNumber = availableNumbers[randomIndex].numero;
    
    setCurrentNumber(drawnNumber);
    speakNumber(drawnNumber);

    setNumbers(prev => prev.map(num => {
      if (num.numero === drawnNumber) {
        const newRepeticiones = num.repeticiones + 1;
        
        setHistorial(prevHistorial => [drawnNumber, ...prevHistorial]);
        
        if (newRepeticiones === 5) {
          const posicionGanador = winners.length + 1;
          const premioGanador = config.premios[posicionGanador - 1]?.descripcion || `Premio ${posicionGanador}`;
          
          const jugadorGanador = num.jugadores[0];
          
          const winner: Winner = {
            numero: drawnNumber,
            jugador: jugadorGanador,
            premio: premioGanador,
            timestamp: new Date(),
            posicion: posicionGanador
          };
          
          // Detener música de fondo
          if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
          }
          
          // Reproducir música de celebración
          if (celebrationMusic) {
            celebrationMusic.currentTime = 0;
            celebrationMusic.play().catch(console.error);
          }

          // Mostrar confeti
          triggerConfetti();

          // Anunciar al ganador
          setTimeout(() => {
            speakWinner(jugadorGanador.nombre, premioGanador, posicionGanador);
          }, 1000);
          
          setWinners(prevWinners => {
            const newWinners = [...prevWinners, winner];
            
            if (newWinners.length >= config.cantidadGanadores) {
              setTimeout(() => {
                setIsDrawing(false);
                if (drawIntervalRef.current) {
                  clearInterval(drawIntervalRef.current);
                  drawIntervalRef.current = null;
                }
              }, 100);
            } else {
              // Reanudar música de fondo después de la celebración
              setTimeout(() => {
                if (celebrationMusic) celebrationMusic.pause();
                if (backgroundMusic && newWinners.length < config.cantidadGanadores) {
                  backgroundMusic.currentTime = 0;
                  backgroundMusic.play().catch(console.error);
                }
              }, 10000);
            }
            
            return newWinners;
          });
        }
        
        return {
          ...num,
          repeticiones: newRepeticiones
        };
      }
      return num;
    }));

    return drawnNumber;
  }, [numbers, speakNumber, speakWinner, config.premios, config.cantidadGanadores, winners.length, backgroundMusic, celebrationMusic]);

  const startDrawing = useCallback(() => {
    if (isDrawing) return;
    
    const availableNumbers = numbers.filter(n => n.jugadores.length > 0);
    if (availableNumbers.length === 0) {
      alert('No hay jugadores registrados. Por favor, registra jugadores antes de iniciar el sorteo.');
      return;
    }
    
    setIsDrawing(true);
    
    // Reproducir música de fondo
    if (backgroundMusic) {
      backgroundMusic.currentTime = 0;
      backgroundMusic.play().catch(err => {
        console.log('Música requiere interacción del usuario:', err);
      });
    }

    const interval = 3000 / speed;
    const newInterval = setInterval(() => {
      drawNumber();
    }, interval);
    
    drawIntervalRef.current = newInterval;
  }, [numbers, speed, drawNumber, backgroundMusic, isDrawing]);

  const stopDrawing = useCallback(() => {
    if (drawIntervalRef.current) {
      clearInterval(drawIntervalRef.current);
      drawIntervalRef.current = null;
    }
    setIsDrawing(false);
    
    // Detener música
    if (backgroundMusic) backgroundMusic.pause();
  }, [backgroundMusic]);

  useEffect(() => {
    if (isDrawing && drawIntervalRef.current) {
      clearInterval(drawIntervalRef.current);
      const interval = 3000 / speed;
      const newInterval = setInterval(() => {
        drawNumber();
      }, interval);
      drawIntervalRef.current = newInterval;
    }
  }, [speed, isDrawing, drawNumber]);

  useEffect(() => {
    return () => {
      if (drawIntervalRef.current) {
        clearInterval(drawIntervalRef.current);
      }
    };
  }, []);

  const resetGame = useCallback(() => {
    stopDrawing();
    setHistorial([]);
    setCurrentNumber(null);
    setWinners([]);
    setNumbers(prev => prev.map(num => ({
      ...num,
      repeticiones: 0
    })));
  }, [stopDrawing]);

  return {
    config,
    setConfig,
    numbers,
    historial,
    winners,
    isDrawing,
    currentNumber,
    speed,
    setSpeed,
    initializeNumbers,
    addPlayer,
    removePlayer,
    updatePlayer,
    startDrawing,
    stopDrawing,
    resetGame
  };
};

// Función para crear confeti
function triggerConfetti() {
  const duration = 5000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Confeti desde la izquierda
    createConfettiParticles(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
    );

    // Confeti desde la derecha
    createConfettiParticles(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    );
  }, 250);
}

function createConfettiParticles(options: any) {
  const colors = ['#ffc107', '#ff9800', '#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#00bcd4'];
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  container.style.zIndex = String(options.zIndex || 9999);
  document.body.appendChild(container);

  for (let i = 0; i < options.particleCount; i++) {
    const particle = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 10 + 5;
    
    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    particle.style.left = `${options.origin.x * 100}%`;
    particle.style.top = `${options.origin.y * 100}%`;
    particle.style.opacity = '1';
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = options.startVelocity * (0.5 + Math.random() * 0.5);
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    container.appendChild(particle);
    
    let x = parseFloat(particle.style.left);
    let y = parseFloat(particle.style.top);
    let opacity = 1;
    let rotation = 0;
    
    const animate = () => {
      y += vy * 0.5;
      x += vx * 0.5;
      opacity -= 0.01;
      rotation += 5;
      
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.opacity = String(opacity);
      particle.style.transform = `rotate(${rotation}deg)`;
      
      if (opacity > 0 && y < 100) {
        requestAnimationFrame(animate);
      } else {
        particle.remove();
        if (container.children.length === 0) {
          container.remove();
        }
      }
    };
    
    requestAnimationFrame(animate);
  }
}
