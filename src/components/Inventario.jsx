import { useState, useEffect, useCallback } from 'react';
import ModalProducto from './ModalProducto';

export default function Inventario({ usuario }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoParaEditar, setProductoParaEditar] = useState(null);
  const [busquedaInterna, setBusquedaInterna] = useState('');
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarProductos = useCallback(async () => {
    if (!usuario?.id_negocio) return;
    try {
      setCargando(true);
      const respuesta = await fetch(`http://127.0.0.1:5000/productos/${usuario.id_negocio}`);
      const datos = await respuesta.json();
      setProductos(Array.isArray(datos) ? datos : []);
    } catch (error) {
      console.error("Error al cargar inventario:", error);
    } finally {
      setCargando(false);
    }
  }, [usuario?.id_negocio]);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  const eliminarProducto = async (id_producto) => {
    if (!window.confirm("¿Deseas eliminar este producto?")) return;
    try {
      const res = await fetch(`http://127.0.0.1:5000/productos/eliminar/${id_producto}`, { method: 'DELETE' });
      if (res.ok) {
        cargarProductos();
      }
    } catch (error) { 
      console.error("Error al eliminar:", error); 
    }
  };

  const abrirModal = (producto = null) => {
    setProductoParaEditar(producto);
    setModalAbierto(true);
  };

  const productosFiltrados = productos.filter(p => {
    const termino = busquedaInterna.toLowerCase();
    return p.nombre?.toLowerCase().includes(termino) || p.id_producto?.toString().includes(termino);
  });

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      
      {/* BARRA DE HERRAMIENTAS */}
      <div className="flex flex-wrap justify-between items-center gap-4 px-2">
        <div className="relative max-w-md flex-1">
          <input 
            type="text" 
            placeholder="Buscar en tu inventario..." 
            value={busquedaInterna}
            onChange={(e) => setBusquedaInterna(e.target.value)}
            className="w-full bg-white border-none rounded-full py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-[#FF7043]/20 outline-none text-sm"
          />
          <img src="/Iconos/buscar.png" className="absolute left-4 top-4 w-5 h-5 opacity-30" alt="Buscar" />
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-[#E7F4EE] text-[#2DCDBA] px-5 py-3 rounded-2xl text-xs font-bold hover:bg-[#d5ece1] transition-all flex items-center gap-2 border border-[#2DCDBA]/10">
            <img src="/Iconos/export.png" className="w-4 h-4" alt="Exportar" />
            Exportar
          </button>
          
          <button className="bg-[#263238] text-white px-5 py-3 rounded-2xl text-xs font-bold hover:bg-[#1a2327] transition-all flex items-center gap-2 shadow-lg shadow-black/10">
            <img src="/Iconos/escaner.png" className="w-4 h-4 brightness-0 invert" alt="Escáner" />
            Escáner Producto
          </button>
          
          <button 
            onClick={() => abrirModal(null)}
            className="bg-[#FF7043] text-white px-6 py-3 rounded-2xl text-xs font-bold hover:bg-[#f4511e] transition-all flex items-center gap-2 shadow-lg shadow-[#FF7043]/20"
          >
            <img src="/Iconos/añadir.png" className="w-4 h-4 brightness-0 invert" alt="Añadir" />
            Añadir Producto
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 min-h-[600px]">
        
        {/* FILTROS CON ICONOS NUEVOS */}
        <div className="flex justify-between items-center mb-8">
           <div className="flex bg-gray-50 p-1 rounded-2xl">
              {['All Time', '12 Months', '30 Days', '7 Days', '24 Hour'].map((tab, idx) => (
                <button key={tab} className={`px-5 py-2.5 text-[11px] font-black rounded-xl transition-all ${idx === 0 ? 'bg-[#2DCDBA] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                  {tab}
                </button>
              ))}
           </div>

           <div className="flex gap-3">
              {/* Icono de filtrar.png */}
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all">
                <img src="/Iconos/filtrar.png" className="w-4 h-4" alt="Filtrar" />
                Seleccionar Fecha
              </button>

              {/* Icono de stock.png */}
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all">
                <img src="/Iconos/stock.png" className="w-4 h-4" alt="Stock" />
                Stock Bajo
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          {cargando ? (
            <div className="text-center p-10 font-bold text-[#FF7043]">Cargando inventario...</div>
          ) : (
            <table className="w-full text-left">
              <thead className="text-gray-400 text-[10px] font-black uppercase tracking-[0.15em] border-b border-gray-50">
                <tr>
                  <th className="pb-4 px-4 text-center w-10">
                    <input type="checkbox" className="rounded border-gray-300 text-[#FF7043] focus:ring-[#FF7043]" />
                  </th>
                  <th className="pb-4 px-4">ID producto</th>
                  <th className="pb-4 px-4">Producto</th>
                  <th className="pb-4 px-4">Ultima Venta</th>
                  <th className="pb-4 px-4">Precio unitario</th>
                  <th className="pb-4 px-4">Total estimado</th>
                  <th className="pb-4 px-4">Estado</th>
                  <th className="pb-4 px-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {productosFiltrados.map((p) => (
                  <tr key={p.id_producto} className="border-b border-gray-50/50 hover:bg-gray-50/30 transition-colors">
                    <td className="py-5 px-4 text-center">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="py-5 px-4 font-bold text-[#2DCDBA]">#{p.id_producto}</td>
                    <td className="py-5 px-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-xl opacity-60">📦</div>
                      <span className="font-bold text-[#263238]">{p.nombre}</span>
                    </td>
                    <td className="py-5 px-4 text-gray-400 font-bold text-[11px]">3 SEMANAS</td>
                    <td className="py-5 px-4 font-black text-[#263238]">${p.precio_venta}</td>
                    <td className="py-5 px-4 font-black text-[#263238]">${(p.precio_venta * p.stock).toLocaleString()}</td>
                    <td className="py-5 px-4">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        p.stock <= p.stock_minimo ? 'bg-[#FFF3E0] text-[#FF7043]' : 'bg-[#E7F4EE] text-[#2DCDBA]'
                      }`}>
                        {p.stock <= p.stock_minimo ? 'Bajo Stock' : 'OK'}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-right">
                      <div className="flex justify-end gap-1">
                        {/* Icono editar.png */}
                        <button onClick={() => abrirModal(p)} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
                          <img src="/Iconos/editar.png" className="w-5 h-5" alt="Editar" />
                        </button>
                        {/* Icono borrar.png */}
                        <button onClick={() => eliminarProducto(p.id_producto)} className="p-2 hover:bg-red-50 rounded-xl transition-all">
                          <img src="/Iconos/borrar.png" className="w-5 h-5" alt="Borrar" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
      {modalAbierto && (
        <ModalProducto 
          cerrar={() => setModalAbierto(false)} 
          producto={productoParaEditar} 
          idNegocio={usuario?.id_negocio}
          recargar={cargarProductos}
        />
      )}
    </div>
  );
}