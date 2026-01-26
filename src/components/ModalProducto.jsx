export default function ModalProducto({ cerrar, producto }) {
  const esEdicion = !!producto;

  return (
    <div className="fixed inset-0 bg-[#263238]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Ajustamos el alto con max-h-[90vh] y permitimos scroll con overflow-y-auto */}
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 relative flex flex-col max-h-[90vh]">
        
        {/* Cabecera Fija */}
        <div className="p-8 pb-4">
          <h2 className="text-2xl font-bold text-[#263238]">
            {esEdicion ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
        </div>

        {/* Cuerpo con Scroll para que no se salga de la pantalla */}
        <div className="flex-1 overflow-y-auto px-8 pb-4 custom-scrollbar">
          {/* Sección de Imagen */}
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center bg-gray-50 flex-shrink-0">
               {/* Placeholder */}
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#2DCDBA] text-xs font-medium">Agrega una imagen</span>
              <button className="bg-[#FF7043] text-white px-4 py-2 rounded-xl text-[10px] font-bold flex items-center gap-2 hover:bg-[#ff8661] transition-all">
                <img src="/Iconos/añadir.png" className="w-3 h-3 brightness-0 invert" alt="" />
                Ingresar Imagen
              </button>
            </div>
          </div>

          {/* Formulario */}
          <form className="space-y-3">
            {[
              { label: 'Nombre', key: 'nombre', placeholder: 'Ingresar Nombre...' },
              { label: 'ID Producto', key: 'id', placeholder: 'Ingresa ID Producto...' },
              { label: 'Categoria', key: 'categoria', placeholder: 'Categoria...' },
              { label: 'Precio de compra', key: 'precio', placeholder: 'Precio....' },
              { label: 'Cantidad Actual', key: 'cantidad', placeholder: 'C/Actual...' },
              { label: 'Unidad', key: 'unidad', placeholder: 'Unidad....' },
              { label: 'Fecha de Expiracion', key: 'exp', placeholder: 'Fecha de E/P...' },
              { label: 'Valor Umbral', key: 'umbral', placeholder: 'V/Umbral...' },
            ].map((campo) => (
              <div key={campo.key} className="flex items-center justify-between gap-4">
                <label className="text-[#263238] font-bold text-xs w-1/3">{campo.label}</label>
                <input 
                  type="text" 
                  placeholder={campo.placeholder}
                  defaultValue={producto ? producto[campo.key] : ''}
                  className="flex-1 bg-white border border-gray-100 rounded-xl py-2 px-4 text-xs focus:ring-2 focus:ring-[#2DCDBA]/20 outline-none transition-all shadow-sm"
                />
              </div>
            ))}
          </form>
        </div>

        {/* Pie de página Fijo con los botones */}
        <div className="p-8 pt-4 bg-gray-50/50 border-t border-gray-100 flex flex-col items-center gap-2">
          <button 
            type="submit"
            className="bg-[#FF7043] text-white w-full py-3 rounded-xl font-bold shadow-lg shadow-[#FF7043]/30 hover:bg-[#ff8661] transition-all transform active:scale-95 text-sm"
          >
            {esEdicion ? 'Guardar Cambios' : 'Registrar Producto'}
          </button>
          <button 
            onClick={cerrar}
            type="button"
            className="text-gray-400 text-xs font-medium hover:text-red-500 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}