import { useMemo } from 'react';

interface HistoryProps {
  historial: number[];
}

export const History = ({ historial }: HistoryProps) => {
  // Contar cuántas veces salió cada número
  const numerosConConteo = useMemo(() => {
    const conteo: { [key: number]: number } = {};
    historial.forEach(num => {
      conteo[num] = (conteo[num] || 0) + 1;
    });
    
    // Crear array único con conteo
    const numerosUnicos = Array.from(new Set(historial));
    return numerosUnicos.map(num => ({
      numero: num,
      veces: conteo[num]
    }));
  }, [historial]);

  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-2xl p-6 shadow-2xl border-4 border-yellow-400">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
        <i className="ri-history-line"></i>
        Números Salidos
      </h2>
      
      {numerosConConteo.length === 0 ? (
        <p className="text-gray-300 text-center py-8">
          Aún no han salido números
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {numerosConConteo.map(({ numero, veces }) => (
            <div
              key={numero}
              className="relative bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-xl px-4 py-3 font-bold text-xl shadow-lg border-2 border-green-300 hover:scale-110 transition-transform"
            >
              <span className="text-2xl">{numero}</span>
              
              {/* Contador de veces */}
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white">
                {veces}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};