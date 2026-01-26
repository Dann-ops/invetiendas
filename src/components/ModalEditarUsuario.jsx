export default function ModalEditarUsuario({ cerrar }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in duration-200 overflow-hidden">
        <div className="p-10">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Editas Usuario</h3>
            <button className="text-gray-400 hover:text-gray-600 text-xl">✏️</button>
          </div>

          <form className="space-y-5">
            {/* Campo Nombre */}
            <div className="flex items-center gap-4">
              <label className="w-24 text-sm font-semibold text-gray-500">Nombre</label>
              <input type="text" defaultValue="Juan Martinez" className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 outline-none focus:ring-2 focus:ring-teal-500 text-gray-700" />
            </div>

            {/* Campo Correo */}
            <div className="flex items-center gap-4">
              <label className="w-24 text-sm font-semibold text-gray-500">Correo</label>
              <input type="email" defaultValue="Juan@gmail.com" className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 outline-none focus:ring-2 focus:ring-teal-500 text-gray-700" />
            </div>

            {/* Selectores Rol y Área */}
            <div className="flex items-center gap-4">
              <label className="w-24 text-sm font-semibold text-gray-500">Rol</label>
              <select className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 outline-none appearance-none cursor-pointer">
                <option>Admin</option>
                <option>Empleado</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm font-semibold text-gray-500">Área</label>
              <select className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 outline-none appearance-none cursor-pointer">
                <option>Inventario</option>
                <option>Ventas</option>
                <option>Reportes</option>
              </select>
            </div>

            {/* Estado Radio Buttons */}
            <div className="flex items-center gap-4">
              <label className="w-24 text-sm font-semibold text-gray-500">Estado</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                  <input type="radio" name="estado" className="accent-teal-500 w-4 h-4" defaultChecked /> Activo
                </label>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                  <input type="radio" name="estado" className="accent-gray-300 w-4 h-4" /> Bloqueado
                </label>
              </div>
            </div>

            {/* Checkboxes de Permisos */}
            <div className="flex gap-4">
              <label className="w-24 text-sm font-semibold text-gray-500">Permisos</label>
              <div className="space-y-2">
                {['Ver Producto', 'Editar Productos', 'Ver Reportes'].map((p) => (
                  <label key={p} className="flex items-center gap-3 text-sm font-medium text-gray-700 cursor-pointer group">
                    <input type="checkbox" defaultChecked className="accent-teal-500 w-4 h-4 rounded" />
                    <span className="group-hover:text-teal-600 transition-colors">{p}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex gap-4 pt-8">
              <button type="button" onClick={cerrar} className="flex-1 py-3 border border-gray-100 rounded-xl font-bold text-gray-400 hover:bg-gray-50 transition-all">Cancelar</button>
              <button type="submit" className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-100 transition-all">Guardar Cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}