import { useState } from 'react';

export default function ModalProducto({ cerrar, producto, idNegocio, recargar }) {
  const esEdicion = !!producto;
  
  const [formData, setFormData] = useState({
    nombre: producto?.nombre || '',
    codigo_barra: producto?.codigo_barra || '',
    categoria: producto?.categoria || '',
    precio_compra: producto?.precio_compra || 0,
    precio_venta: producto?.precio_venta || 0,
    stock: producto?.stock || 0,
    stock_minimo: producto?.stock_minimo || 5,
    id_negocio: idNegocio 
  });

  const manejarCambio = (e, key) => {
    // Si el campo es numérico, lo convertimos de una vez
    const valor = e.target.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
    setFormData({ ...formData, [key]: valor });
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    
    // Verificación de seguridad: si no hay idNegocio, no disparamos
    if (!formData.id_negocio) {
      alert("Error: No se detectó el ID del negocio. Intenta reingresar.");
      return;
    }

    const url = esEdicion 
      ? `http://127.0.0.1:5000/productos/editar/${producto.id_producto}`
      : 'http://127.0.0.1:5000/productos/agregar';

    try {
      const res = await fetch(url, {
        method: esEdicion ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json(); // Leemos la respuesta del servidor

      if (res.ok) {
        alert(esEdicion ? "Actualizado correctamente" : "Registrado con éxito");
        recargar();
        cerrar();
      } else {
        // Si hay error 400, Python nos dirá por qué en el JSON
        alert("Error del servidor: " + (data.error || "Datos inválidos"));
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Error al conectar con el servidor");
    }
  }; 

  return (
    <div className="fixed inset-0 bg-[#263238]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 relative flex flex-col max-h-[90vh]">
        <div className="p-8 pb-4">
          <h2 className="text-2xl font-bold text-[#263238]">
            {esEdicion ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <p className="text-xs text-gray-400">ID Negocio: {idNegocio}</p>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-4">
          <form id="form-producto" onSubmit={guardarProducto} className="space-y-3">
            {[
              { label: 'Nombre', key: 'nombre', type: 'text' },
              { label: 'Código Barras', key: 'codigo_barra', type: 'text' },
              { label: 'Categoría', key: 'categoria', type: 'text' },
              { label: 'Precio Compra', key: 'precio_compra', type: 'number' },
              { label: 'Precio Venta', key: 'precio_venta', type: 'number' },
              { label: 'Stock Actual', key: 'stock', type: 'number' },
              { label: 'Stock Mínimo', key: 'stock_minimo', type: 'number' },
            ].map((campo) => (
              <div key={campo.key} className="flex items-center justify-between gap-4">
                <label className="text-[#263238] font-bold text-xs w-1/3">{campo.label}</label>
                <input 
                  type={campo.type}
                  step="any" // Permite decimales en precios
                  value={formData[campo.key]}
                  onChange={(e) => manejarCambio(e, campo.key)}
                  className="flex-1 bg-white border border-gray-100 rounded-xl py-2 px-4 text-xs focus:ring-2 focus:ring-[#2DCDBA]/20 outline-none shadow-sm"
                  required
                />
              </div>
            ))}
          </form>
        </div>

        <div className="p-8 pt-4 bg-gray-50/50 border-t border-gray-100 flex flex-col items-center gap-2">
          <button 
            form="form-producto"
            type="submit"
            className="bg-[#FF7043] text-white w-full py-3 rounded-xl font-bold shadow-lg hover:bg-[#ff8661] transition-all text-sm"
          >
            {esEdicion ? 'Guardar Cambios' : 'Registrar Producto'}
          </button>
          <button onClick={cerrar} type="button" className="text-gray-400 text-xs hover:text-red-500">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}