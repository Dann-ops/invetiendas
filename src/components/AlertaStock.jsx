import { useState } from 'react';

export default function AlertaStock() {
  const [abierto, setAbierto] = useState(true);

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100]">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-red-100">
        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Alerta de Stock Crítico</h3>
        <p className="text-gray-500 mb-6">Hay 5 productos que necesitan reposición inmediata para evitar quiebres.</p>
        <div className="flex flex-col gap-2">
          <button onClick={() => setAbierto(false)} className="bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600">Revisar Productos</button>
          <button onClick={() => setAbierto(false)} className="text-gray-400 text-sm hover:underline">Cerrar</button>
        </div>
      </div>
    </div>
  );
}