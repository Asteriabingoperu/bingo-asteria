import { useState, useEffect } from 'react';
import { Header } from '../../components/bingo/Header';
import { BingoBall } from '../../components/bingo/BingoBall';
import { ConfigPanel } from '../../components/bingo/ConfigPanel';
import { NumberGrid } from '../../components/bingo/NumberGrid';
import { PlayerForm } from '../../components/bingo/PlayerForm';
import { ControlPanel } from '../../components/bingo/ControlPanel';
import { History } from '../../components/bingo/History';
import { WinnersPanel } from '../../components/bingo/WinnersPanel';
import { PlayersTable } from '../../components/bingo/PlayersTable';
import { useBingoGame } from '../../hooks/useBingoGame';
import { Player } from '../../types/bingo';

export default function HomePage() {
  const {
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
  } = useBingoGame();

  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<{ numero: number; player: Player } | null>(null);
  const [currentScreen, setCurrentScreen] = useState<'main' | 'players'>('main');
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showPlayerInfo, setShowPlayerInfo] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordError, setShowPasswordError] = useState(false);

  // Contraseña de administrador
  const ADMIN_PASSWORD = 'M140923v';

  // Inicializar números al cargar la página
  useEffect(() => {
    initializeNumbers(50);
  }, [initializeNumbers]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setShowPasswordError(false);
    } else {
      setShowPasswordError(true);
      setTimeout(() => setShowPasswordError(false), 3000);
    }
  };

  // Si no está autenticado, mostrar pantalla de contraseña
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1f44] via-[#1e3a8a] to-[#0a1f44] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Bolas de Bingo flotantes con letras B-I-N-G-O */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Bola B - Roja */}
          <div 
            className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#e74c3c] to-[#c0392b] shadow-[0_0_30px_rgba(231,76,60,0.6)] flex items-center justify-center animate-float"
            style={{ top: '10%', left: '5%', animationDelay: '0s', animationDuration: '6s' }}
          >
            <span className="text-4xl font-black text-white">B</span>
          </div>
          
          {/* Bola I - Azul */}
          <div 
            className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#3498db] to-[#2980b9] shadow-[0_0_25px_rgba(52,152,219,0.6)] flex items-center justify-center animate-float"
            style={{ top: '20%', right: '8%', animationDelay: '1s', animationDuration: '7s' }}
          >
            <span className="text-3xl font-black text-white">I</span>
          </div>
          
          {/* Bola N - Verde */}
          <div 
            className="absolute w-28 h-28 rounded-full bg-gradient-to-br from-[#2ecc71] to-[#27ae60] shadow-[0_0_35px_rgba(46,204,113,0.6)] flex items-center justify-center animate-float"
            style={{ top: '60%', left: '10%', animationDelay: '2s', animationDuration: '8s' }}
          >
            <span className="text-4xl font-black text-white">N</span>
          </div>
          
          {/* Bola G - Naranja */}
          <div 
            className="absolute w-22 h-22 rounded-full bg-gradient-to-br from-[#f39c12] to-[#e67e22] shadow-[0_0_28px_rgba(243,156,18,0.6)] flex items-center justify-center animate-float"
            style={{ bottom: '15%', right: '12%', animationDelay: '3s', animationDuration: '7.5s' }}
          >
            <span className="text-3xl font-black text-white">G</span>
          </div>
          
          {/* Bola O - Morada */}
          <div 
            className="absolute w-26 h-26 rounded-full bg-gradient-to-br from-[#9b59b6] to-[#8e44ad] shadow-[0_0_32px_rgba(155,89,182,0.6)] flex items-center justify-center animate-float"
            style={{ top: '40%', right: '5%', animationDelay: '4s', animationDuration: '6.5s' }}
          >
            <span className="text-4xl font-black text-white">O</span>
          </div>

          {/* Bolas adicionales pequeñas con números */}
          <div 
            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] shadow-[0_0_20px_rgba(251,191,36,0.5)] flex items-center justify-center animate-float"
            style={{ top: '30%', left: '15%', animationDelay: '1.5s', animationDuration: '9s' }}
          >
            <span className="text-2xl font-black text-white">7</span>
          </div>
          
          <div 
            className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-[#e74c3c] to-[#c0392b] shadow-[0_0_18px_rgba(231,76,60,0.5)] flex items-center justify-center animate-float"
            style={{ bottom: '25%', left: '20%', animationDelay: '2.5s', animationDuration: '8.5s' }}
          >
            <span className="text-xl font-black text-white">13</span>
          </div>
          
          <div 
            className="absolute w-18 h-18 rounded-full bg-gradient-to-br from-[#3498db] to-[#2980b9] shadow-[0_0_22px_rgba(52,152,219,0.5)] flex items-center justify-center animate-float"
            style={{ top: '70%', right: '18%', animationDelay: '3.5s', animationDuration: '7s' }}
          >
            <span className="text-2xl font-black text-white">21</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#0a1f44]/95 via-[#1e3a8a]/95 to-[#0a1f44]/95 backdrop-blur-xl rounded-3xl p-10 max-w-md w-full border-2 border-[#fbbf24] shadow-[0_0_60px_rgba(251,191,36,0.6)] relative z-10">
          <div className="text-center mb-8">
            <div className="w-28 h-28 bg-gradient-to-br from-[#fbbf24] via-[#f59e0b] to-[#fbbf24] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(251,191,36,0.8)] animate-pulse">
              <i className="ri-lock-password-line text-6xl text-white"></i>
            </div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#fbbf24] mb-3 animate-pulse">
              🎰 BINGO
            </h1>
            <p className="text-[#fbbf24] text-lg font-bold">Acceso de Administrador</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-[#fbbf24] mb-3 uppercase tracking-wider">
                Contraseña de Acceso
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-5 py-4 bg-white/10 border-2 border-[#fbbf24]/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#f59e0b] focus:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all text-lg"
                placeholder="Ingresa la contraseña"
                autoFocus
              />
            </div>

            {showPasswordError && (
              <div className="bg-red-500/30 border-2 border-red-500 rounded-xl p-4 text-red-300 text-sm flex items-center gap-3 animate-shake">
                <i className="ri-error-warning-line text-2xl"></i>
                <span className="font-bold">Contraseña incorrecta. Intenta nuevamente.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#fbbf24] hover:from-[#f59e0b] hover:via-[#fbbf24] hover:to-[#f59e0b] text-white font-black py-4 px-6 rounded-xl transition-all whitespace-nowrap cursor-pointer text-xl shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:shadow-[0_0_50px_rgba(251,191,36,0.9)] transform hover:scale-105"
            >
              <i className="ri-login-box-line mr-2"></i>
              INGRESAR AL SORTEO
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-[#fbbf24]/70 font-semibold">
            🔒 Solo el administrador puede acceder a los controles del sorteo
          </div>
        </div>
      </div>
    );
  }

  const handleNumberClick = (numero: number) => {
    const numberData = numbers.find(n => n.numero === numero);
    if (!numberData) return;

    // Si el número tiene jugador, mostrar información
    if (numberData.jugadores.length > 0) {
      setShowPlayerInfo(numero);
      return;
    }

    // Si el número está libre, permitir agregar jugador
    if (numberData.jugadores.length >= 1) {
      alert('Este número ya está ocupado. Solo se permite 1 jugador por número.');
      return;
    }

    setSelectedNumber(numero);
  };

  const handlePlayerSubmit = (player: Player) => {
    if (selectedNumber) {
      addPlayer(selectedNumber, player);
      setSelectedNumber(null);
    }
  };

  const handlePlayerUpdate = (player: Player) => {
    if (editingPlayer) {
      updatePlayer(editingPlayer.numero, editingPlayer.player.id, player);
      setEditingPlayer(null);
    }
  };

  const handleEditPlayer = (numero: number, player: Player) => {
    setEditingPlayer({ numero, player });
  };

  const handleConfigApply = () => {
    initializeNumbers(config.cantidadNumeros);
  };

  const totalPlayers = numbers.reduce((sum, num) => sum + num.jugadores.length, 0);

  const playerInfoData = showPlayerInfo ? numbers.find(n => n.numero === showPlayerInfo) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1f44] via-[#1e3a8a] to-[#0a1f44] relative overflow-hidden">
      {/* Bolas de Bingo flotantes de fondo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Bola B */}
        <div 
          className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#e74c3c]/30 to-[#c0392b]/30 shadow-[0_0_25px_rgba(231,76,60,0.3)] flex items-center justify-center animate-float"
          style={{ top: '8%', left: '3%', animationDelay: '0s', animationDuration: '10s' }}
        >
          <span className="text-3xl font-black text-white/50">B</span>
        </div>
        
        {/* Bola I */}
        <div 
          className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#3498db]/30 to-[#2980b9]/30 shadow-[0_0_20px_rgba(52,152,219,0.3)] flex items-center justify-center animate-float"
          style={{ top: '15%', right: '5%', animationDelay: '2s', animationDuration: '12s' }}
        >
          <span className="text-2xl font-black text-white/50">I</span>
        </div>
        
        {/* Bola N */}
        <div 
          className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#2ecc71]/30 to-[#27ae60]/30 shadow-[0_0_30px_rgba(46,204,113,0.3)] flex items-center justify-center animate-float"
          style={{ top: '50%', left: '5%', animationDelay: '4s', animationDuration: '14s' }}
        >
          <span className="text-4xl font-black text-white/50">N</span>
        </div>
        
        {/* Bola G */}
        <div 
          className="absolute w-18 h-18 rounded-full bg-gradient-to-br from-[#f39c12]/30 to-[#e67e22]/30 shadow-[0_0_22px_rgba(243,156,18,0.3)] flex items-center justify-center animate-float"
          style={{ bottom: '20%', right: '8%', animationDelay: '6s', animationDuration: '11s' }}
        >
          <span className="text-3xl font-black text-white/50">G</span>
        </div>
        
        {/* Bola O */}
        <div 
          className="absolute w-22 h-22 rounded-full bg-gradient-to-br from-[#9b59b6]/30 to-[#8e44ad]/30 shadow-[0_0_26px_rgba(155,89,182,0.3)] flex items-center justify-center animate-float"
          style={{ top: '35%', right: '3%', animationDelay: '8s', animationDuration: '13s' }}
        >
          <span className="text-3xl font-black text-white/50">O</span>
        </div>

        {/* Bolas con números */}
        <div 
          className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-[#fbbf24]/30 to-[#f59e0b]/30 shadow-[0_0_18px_rgba(251,191,36,0.3)] flex items-center justify-center animate-float"
          style={{ top: '25%', left: '12%', animationDelay: '3s', animationDuration: '15s' }}
        >
          <span className="text-xl font-black text-white/50">5</span>
        </div>
        
        <div 
          className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#e74c3c]/30 to-[#c0392b]/30 shadow-[0_0_20px_rgba(231,76,60,0.3)] flex items-center justify-center animate-float"
          style={{ bottom: '30%', left: '15%', animationDelay: '5s', animationDuration: '16s' }}
        >
          <span className="text-2xl font-black text-white/50">17</span>
        </div>
        
        <div 
          className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-[#3498db]/30 to-[#2980b9]/30 shadow-[0_0_16px_rgba(52,152,219,0.3)] flex items-center justify-center animate-float"
          style={{ top: '60%', right: '15%', animationDelay: '7s', animationDuration: '14s' }}
        >
          <span className="text-lg font-black text-white/50">28</span>
        </div>
      </div>

      <div className="relative z-10">
        <Header 
          montoSorteo={config.montoSorteo} 
          cantidadJugadores={totalPlayers}
          onNavigate={setCurrentScreen}
          currentScreen={currentScreen}
        />

        {currentScreen === 'main' ? (
          <div className="max-w-[1600px] mx-auto px-5 py-6">
            {/* Barra de estadísticas superior */}
            <div className="bg-gradient-to-r from-[#0a1f44] via-[#1e3a8a] to-[#0a1f44] rounded-2xl p-6 mb-5 shadow-[0_8px_30px_rgba(251,191,36,0.3)] border border-[#fbbf24]/30">
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-xs text-[#fbbf24] uppercase mb-2 tracking-wider font-bold">
                    💳 Número para Comprar Estrellas
                  </div>
                  <button
                    onClick={() => setShowPaymentPopup(true)}
                    className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#fbbf24] transition-all cursor-pointer whitespace-nowrap"
                  >
                    905888379
                  </button>
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#fbbf24] uppercase mb-2 tracking-wider flex items-center justify-center gap-2 font-bold">
                    <span className="w-3 h-3 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] rounded-full animate-pulse"></span>
                    Números a Jugar
                  </div>
                  <div className="text-2xl font-black text-white">{config.cantidadNumeros}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#fbbf24] uppercase mb-2 tracking-wider font-bold">⭐ Costo de Estrellita</div>
                  <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#059669]">{config.costoTicket || 'S/ 30'}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#fbbf24] uppercase mb-2 tracking-wider font-bold">📅 Fecha y Hora</div>
                  <div className="text-lg font-black text-white">
                    {new Date().toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </div>
                  <div className="text-sm text-[#fbbf24] mt-1 font-bold">
                    {new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>

            {/* Layout principal: Izquierda (Bola + Grilla) | Derecha (Controles) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
              {/* Columna Izquierda */}
              <div className="space-y-5">
                {/* Panel de la Bola - Solo se muestra cuando está sorteando */}
                {isDrawing && (
                  <div className="bg-gradient-to-br from-[#0a1f44] via-[#1e3a8a] to-[#0a1f44] rounded-3xl p-8 shadow-[0_8px_40px_rgba(251,191,36,0.4)] border border-[#fbbf24]/30">
                    <BingoBall currentNumber={currentNumber} isActive={isDrawing} />
                  </div>
                )}

                {/* Panel de Configuración - Solo se muestra cuando NO está sorteando */}
                {!isDrawing && (
                  <ConfigPanel 
                    config={config} 
                    onConfigChange={setConfig}
                    onApply={handleConfigApply}
                    totalPlayers={totalPlayers}
                  />
                )}

                {/* Grilla de Números */}
                <NumberGrid 
                  numbers={numbers}
                  onNumberClick={handleNumberClick}
                  currentNumber={currentNumber}
                  historial={historial}
                />
              </div>

              {/* Columna Derecha - Controles */}
              <div className="space-y-4">
                <ControlPanel
                  isDrawing={isDrawing}
                  speed={speed}
                  onStart={startDrawing}
                  onStop={stopDrawing}
                  onReset={resetGame}
                  onSpeedChange={setSpeed}
                />

                <History historial={historial} />

                <WinnersPanel winners={winners} />
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-[1400px] mx-auto px-5 py-6">
            <div className="bg-gradient-to-br from-[#0a1f44] via-[#1e3a8a] to-[#0a1f44] rounded-3xl p-8 shadow-[0_8px_40px_rgba(251,191,36,0.4)] border border-[#fbbf24]/30">
              <div className="flex items-center gap-4 mb-6">
                <i className="ri-table-line text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#00ffff]"></i>
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#00ffff] uppercase tracking-wider">Tabla Completa de Jugadores</h2>
              </div>
              <PlayersTable 
                numbers={numbers}
                onRemovePlayer={removePlayer}
                onEditPlayer={handleEditPlayer}
              />
            </div>
          </div>
        )}

        {selectedNumber && !editingPlayer && (
          <PlayerForm
            numero={selectedNumber}
            onSubmit={handlePlayerSubmit}
            onClose={() => setSelectedNumber(null)}
            currentPlayers={numbers.find(n => n.numero === selectedNumber)?.jugadores.length || 0}
          />
        )}

        {editingPlayer && (
          <PlayerForm
            numero={editingPlayer.numero}
            onSubmit={handlePlayerUpdate}
            onClose={() => setEditingPlayer(null)}
            currentPlayers={0}
            isEditing={true}
            initialData={editingPlayer.player}
          />
        )}

        {/* Popup de Información del Jugador */}
        {showPlayerInfo && playerInfoData && playerInfoData.jugadores.length > 0 && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#051636] rounded-2xl p-8 max-w-md w-full border-2 border-[#ffc107] shadow-[0_0_30px_rgba(255,193,7,0.3)]">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-[#ffc107] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-[#002366]">{showPlayerInfo}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{playerInfoData.jugadores[0].nombre}</h3>
                <p className="text-gray-400">Información del Jugador</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <i className="ri-phone-line text-2xl text-[#ffc107]"></i>
                      <div>
                        <p className="text-gray-400 text-sm">Teléfono</p>
                        <p className="text-white font-bold">{playerInfoData.jugadores[0].telefono}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <i className="ri-money-dollar-circle-line text-2xl text-[#ffc107]"></i>
                      <div>
                        <p className="text-gray-400 text-sm">Estado de Pago</p>
                        <p className={`font-bold ${playerInfoData.jugadores[0].pagado ? 'text-green-500' : 'text-red-500'}`}>
                          {playerInfoData.jugadores[0].pagado ? '✅ PAGADO' : '❌ PENDIENTE'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <i className="ri-star-line text-2xl text-[#ffc107]"></i>
                      <div>
                        <p className="text-gray-400 text-sm">Estrellas Acumuladas</p>
                        <div className="flex gap-1 mt-1">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <i
                              key={index}
                              className={`ri-star-fill text-lg ${
                                index < playerInfoData.repeticiones
                                  ? 'text-[#ffc107]'
                                  : 'text-white/20'
                              }`}
                            ></i>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowPlayerInfo(null);
                    handleEditPlayer(showPlayerInfo, playerInfoData.jugadores[0]);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
                >
                  <i className="ri-edit-line"></i>
                  Editar
                </button>
                <button
                  onClick={() => setShowPlayerInfo(null)}
                  className="flex-1 bg-[#ffc107] hover:bg-[#ffb300] text-[#002366] font-bold py-3 px-4 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Popup de Métodos de Pago */}
        {showPaymentPopup && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#051636] rounded-2xl p-8 max-w-md w-full border-2 border-[#ffc107] shadow-[0_0_30px_rgba(255,193,7,0.3)]">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#ffc107] mb-2">¡Compra tus Estrellas!</h3>
                <p className="text-white text-lg">Transferir a: <span className="font-bold text-[#ffc107]">Maria Cusicah</span></p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#6a1b9a] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">Y</span>
                    </div>
                    <div>
                      <p className="text-white font-bold">Yape</p>
                      <p className="text-gray-400 text-sm">905888379 - Maria Cusicah</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#00a651] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">D</span>
                    </div>
                    <div>
                      <p className="text-white font-bold">DALE</p>
                      <p className="text-gray-400 text-sm">En otros bancos - Maria Cusicah</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#002c8c] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">P</span>
                    </div>
                    <div>
                      <p className="text-white font-bold">Plin</p>
                      <p className="text-gray-400 text-sm">977192218 - Maria Cusicah</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowPaymentPopup(false)}
                className="w-full bg-[#ffc107] hover:bg-[#ffb300] text-[#002366] font-bold py-3 px-4 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
