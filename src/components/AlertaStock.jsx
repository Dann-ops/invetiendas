import { useState, useEffect } from 'react';

export default function AlertaStock({ usuario }) {
  const [bajoStockCount, setBajoStockCount] = useState(0);
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    const verificarStock = async () => {
      if (!usuario?.id_negocio) return;

      try {
        const respuesta = await fetch(`http://127.0.0.1:5000/stats/${usuario.id_negocio}`);
        const datos = await respuesta.json();
        
        // Solo mostramos la alerta si el conteo de bajo stock es mayor a 0
        if (datos.bajo_stock > 0) {
          setBajoStockCount(datos.bajo_stock);
          setMostrar(true);
        } else {
          setMostrar(false);
        }
      } catch (error) {
        console.error("Error verificando alertas:", error);
      }
    };

    verificarStock();
    // Se puede agregar un intervalo para que revise cada 5 minutos si quieres
  }, [usuario]);

  // Si no hay productos bajos o el usuario cerró la alerta, no renderizamos nada
  if (!mostrar) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-300">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-red-100 transform animate-in zoom-in duration-300">
        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-[#263238] mb-2">Alerta de Stock Crítico</h3>
        <p className="text-gray-500 mb-6">
          Tienes <span className="text-red-600 font-bold">{bajoStockCount}</span> {bajoStockCount === 1 ? 'producto que necesita' : 'productos que necesitan'} reposición inmediata.
        </p>
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => setMostrar(false)} 
            className="bg-[#FF7043] text-white py-3 rounded-xl font-bold hover:bg-[#ff8661] transition-all shadow-lg shadow-[#FF7043]/30"
          >
            Revisar Inventario
          </button>
          <button 
            onClick={() => setMostrar(false)} 
            className="text-gray-400 text-sm hover:text-gray-600 transition-colors"
          >
            Cerrar aviso
          </button>
        </div>
      </div>
    </div>
  );
}