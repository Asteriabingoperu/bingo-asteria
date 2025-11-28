import { useState, useEffect } from 'react';
import { Player } from '../../types/bingo';

interface PlayerFormProps {
  numero: number;
  onSubmit: (player: Player) => void;
  onClose: () => void;
  currentPlayers: number;
  isEditing?: boolean;
  initialData?: Player;
}

export const PlayerForm = ({ numero, onSubmit, onClose, currentPlayers, isEditing = false, initialData }: PlayerFormProps) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [pagado, setPagado] = useState(false);

  useEffect(() => {
    if (isEditing && initialData) {
      setNombre(initialData.nombre);
      setTelefono(initialData.telefono);
      setPagado(initialData.pagado || false);
    }
  }, [isEditing, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nombre.trim() || !telefono.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    const player: Player = {
      id: initialData?.id || `${Date.now()}-${Math.random()}`,
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      pagado
    };

    onSubmit(player);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#051636] rounded-2xl p-6 max-w-md w-full border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <i className={`${isEditing ? 'ri-edit-line' : 'ri-user-add-line'} text-[#ffc107]`}></i>
            {isEditing ? 'Editar Jugador' : 'Registrar Jugador'}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="bg-[#ffc107]/10 border border-[#ffc107]/30 rounded-lg p-4 mb-6">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">Número seleccionado</div>
            <div className="text-4xl font-bold text-[#ffc107]">{numero}</div>
            {!isEditing && currentPlayers > 0 && (
              <div className="text-sm text-red-400 mt-2">
                ⚠️ Este número ya está ocupado
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <i className="ri-user-line mr-1"></i>
              Nombre Completo
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ffc107] transition-all"
              placeholder="Ingresa el nombre"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <i className="ri-phone-line mr-1"></i>
              Teléfono
            </label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ffc107] transition-all"
              placeholder="Ingresa el teléfono"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 cursor-pointer hover:bg-white/10 transition-all">
              <input
                type="checkbox"
                checked={pagado}
                onChange={(e) => setPagado(e.target.checked)}
                className="w-5 h-5 rounded border-white/20 text-[#ffc107] focus:ring-[#ffc107] focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-white font-medium flex items-center gap-2">
                <i className="ri-money-dollar-circle-line text-[#ffc107]"></i>
                PAGADO
              </span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#ffc107] hover:bg-[#ffb300] text-[#002366] px-6 py-3 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer"
            >
              <i className="ri-check-line mr-1"></i>
              {isEditing ? 'Guardar Cambios' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
