import { useState } from 'react';
import ModalProducto from './ModalProducto';

export default function Inventario() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoParaEditar, setProductoParaEditar] = useState(null);
  
  // NUEVO: El estado de búsqueda ahora es interno de Inventario
  const [busquedaInterna, setBusquedaInterna] = useState('');

  const productos = [
    { id: '#302012', nombre: 'Mermelada de guayaba', ultimaVenta: '3 semanas', precio: '$2.400', total: '$7.200', estado: 'Bajo Stock' },
    { id: '#302011', nombre: 'Salsa de tomate 400g', ultimaVenta: '1 mes', precio: '$1.800', total: '$5.400', estado: 'Bajo Stock' },
    { id: '#302002', nombre: 'Mayonesa frasco grande', ultimaVenta: '15 días', precio: '$3.200', total: '$2.700', estado: 'Bajo Stock' },
    { id: '#301901', nombre: 'Jabon en barra neutro', ultimaVenta: '1 Mes', precio: '$900', total: '$2.700', estado: 'Bajo Stock' },
    { id: '#301900', nombre: 'Papel aluminio', ultimaVenta: '3 semanas', precio: '$2.000', total: '$4.000', estado: 'Bajo Stock' }
  ];

  // Lógica de filtrado usando el estado local
  const productosFiltrados = productos.filter(p => {
    const termino = busquedaInterna.toLowerCase();
    return p.nombre.toLowerCase().includes(termino) || p.id.toLowerCase().includes(termino);
  });

  const abrirModal = (producto = null) => {
    setProductoParaEditar(producto);
    setModalAbierto(true);
  };

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[600px]">
        
        {/* NUEVA BARRA DE BÚSQUEDA LOCAL */}
        <div className="mb-6 relative max-w-md">
          <input 
            type="text" 
            placeholder="Buscar producto por nombre o ID..." 
            value={busquedaInterna}
            onChange={(e) => setBusquedaInterna(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-[#2DCDBA]/20 outline-none transition-all text-sm"
          />
          <img src="/Iconos/buscar.png" className="absolute left-4 top-3.5 w-5 h-5 opacity-30" alt="Buscar" />
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div className="flex bg-[#E7F4EE] p-1 rounded-xl border border-[#2DCDBA]/20">
            {['All Time', '12 Months', '30 Days', '7 Days', '24 Hour'].map((t) => (
              <button 
                key={t} 
                className={`px-4 py-2 text-xs font-bold transition-all ${
                  t === 'All Time' ? 'bg-[#2DCDBA] text-white rounded-lg' : 'text-[#2DCDBA]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button className="bg-[#E7F4EE] text-[#2DCDBA] px-4 py-2 rounded-xl text-sm font-bold border border-[#2DCDBA]/20 flex items-center gap-2 hover:bg-[#d8ece2] transition-colors">
              <img src="/Iconos/export.png" className="w-5 h-5 object-contain" alt="Exportar" />
              Exportar
            </button>
            
            <button className="bg-[#FF7043] text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-[#FF7043]/20 flex items-center gap-2 hover:bg-[#ff8661] transition-all">
              <img src="/Iconos/escaner.png" className="w-5 h-5 object-contain brightness-0 invert" alt="Escaner" />
              Añadir con ESCANER
            </button>
            
            <button 
              onClick={() => abrirModal(null)}
              className="bg-[#FF7043] text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-[#FF7043]/20 flex items-center gap-2 hover:bg-[#ff8661] transition-all"
            >
              <img src="/Iconos/añadir.png" className="w-4 h-4 object-contain brightness-0 invert" alt="Añadir" />
              Añadir Producto
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-gray-400 text-[10px] uppercase tracking-widest border-b border-gray-50">
              <tr>
                <th className="p-4"><input type="checkbox" className="accent-[#2DCDBA]" /></th>
                <th className="p-4">ID producto</th>
                <th className="p-4">Producto</th>
                <th className="p-4">Ultima Venta</th>
                <th className="p-4">Precio unitario</th>
                <th className="p-4">Total estimado</th>
                <th className="p-4">Estado</th>
                <th className="p-4">Acción</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {productosFiltrados.map((p, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4"><input type="checkbox" className="accent-[#2DCDBA]" /></td>
                  <td className="p-4 font-bold text-[#2DCDBA]">{p.id}</td>
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl"></div>
                    <span className="font-bold text-[#263238]">{p.nombre}</span>
                  </td>
                  <td className="p-4 text-gray-500">{p.ultimaVenta}</td>
                  <td className="p-4 font-semibold text-[#263238]">{p.precio}</td>
                  <td className="p-4 font-semibold text-[#263238]">{p.total}</td>
                  <td className="p-4">
                    <span className="bg-[#FEEDEC] text-[#FF7043] px-3 py-1 rounded-full text-[10px] font-bold">
                      {p.estado}
                    </span>
                  </td>
                  <td className="p-4 text-xl flex items-center gap-2 mt-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors grayscale hover:grayscale-0">🗑️</button>
                    <button 
                      onClick={() => abrirModal(p)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors grayscale hover:grayscale-0"
                    >
                      ✏️
                    </button>
                  </td>
                </tr>
              ))}
              {productosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-10 text-center text-gray-400 italic">
                    No se encontraron productos que coincidan con su búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {modalAbierto && (
        <ModalProducto 
          cerrar={() => setModalAbierto(false)} 
          producto={productoParaEditar} 
        />
      )}
    </div>
  );
}