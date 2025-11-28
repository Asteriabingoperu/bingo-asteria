import { BingoNumber, Player } from '../../types/bingo';

interface PlayersTableProps {
  numbers: BingoNumber[];
  onRemovePlayer: (numero: number, playerId: string) => void;
  onEditPlayer: (numero: number, player: Player) => void;
}

export const PlayersTable = ({ numbers, onRemovePlayer, onEditPlayer }: PlayersTableProps) => {
  const playersWithNumbers = numbers
    .filter(num => num.jugadores.length > 0)
    .flatMap(num => 
      num.jugadores.map(player => ({
        numero: num.numero,
        player,
        repeticiones: num.repeticiones
      }))
    );

  if (playersWithNumbers.length === 0) {
    return (
      <div className="text-center py-12">
        <i className="ri-user-unfollow-line text-6xl text-gray-600 mb-4"></i>
        <p className="text-gray-400 text-lg">No hay jugadores registrados aún</p>
        <p className="text-gray-500 text-sm mt-2">Regresa al inicio y haz clic en un número para registrar jugadores</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Número</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Nombre</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Teléfono</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Estado</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {playersWithNumbers.map(({ numero, player, repeticiones }) => (
            <tr 
              key={`${numero}-${player.id}`}
              className="border-b border-white/5 hover:bg-white/5 transition-colors"
            >
              <td className="px-4 py-3">
                <div className="w-10 h-10 rounded-lg bg-[#ffc107] flex items-center justify-center">
                  <span className="text-lg font-bold text-[#002366]">{numero}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-white font-medium">{player.nombre}</td>
              <td className="px-4 py-3 text-gray-300">{player.telefono}</td>
              <td className="px-4 py-3">
                {player.pagado ? (
                  <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                    <i className="ri-check-line"></i>
                    PAGADO
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                    <i className="ri-close-line"></i>
                    PENDIENTE
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onEditPlayer(numero, player)}
                    className="w-8 h-8 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all cursor-pointer"
                    title="Editar jugador"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`¿Estás seguro de eliminar a ${player.nombre}?`)) {
                        onRemovePlayer(numero, player.id);
                      }
                    }}
                    className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all cursor-pointer"
                    title="Eliminar jugador"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
        <div className="flex items-center justify-between">
          <div className="text-gray-400">
            <i className="ri-group-line mr-2"></i>
            Total de jugadores registrados
          </div>
          <div className="text-2xl font-bold text-[#ffc107]">
            {playersWithNumbers.length}
          </div>
        </div>
      </div>
    </div>
  );
};
