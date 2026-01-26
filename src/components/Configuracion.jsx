import { useState } from 'react';
import ModalEditarUsuario from './ModalEditarUsuario';

export default function Configuracion() {
  const [pestana, setPestana] = useState('permisos');
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[600px] animate-in fade-in">
      {/* Pestañas */}
      <div className="flex gap-10 border-b border-gray-100 mb-8">
        <button onClick={() => setPestana('permisos')} className={`pb-4 font-bold transition-all ${pestana === 'permisos' ? 'text-teal-500 border-b-4 border-teal-400' : 'text-gray-400'}`}>Gestión de permisos</button>
        <button onClick={() => setPestana('visuales')} className={`pb-4 font-bold transition-all ${pestana === 'visuales' ? 'text-teal-500 border-b-4 border-teal-400' : 'text-gray-400'}`}>Ajustes Visuales</button>
        <button onClick={() => setPestana('seguridad')} className={`pb-4 font-bold transition-all ${pestana === 'seguridad' ? 'text-teal-500 border-b-4 border-teal-400' : 'text-gray-400'}`}>Seguridad</button>
      </div>

      {/* CONTENIDO: GESTIÓN DE PERMISOS (RESTAURADO) */}
      {pestana === 'permisos' && (
        <div className="animate-in slide-in-from-left-2">
          <div className="flex justify-between items-center mb-6">
            <input type="text" placeholder="Buscar Usuario..." className="bg-gray-50 border-none rounded-xl py-2 px-4 w-1/3 outline-none" />
            <button className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-100">
              + Añadir Nuevo Usuario
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-50">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest">
                <tr>
                  <th className="p-4 font-semibold">Usuario</th>
                  <th className="p-4 font-semibold">Rol</th>
                  <th className="p-4 font-semibold">Estado</th>
                  <th className="p-4 font-semibold">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">JM</div>
                    <div>
                      <p className="font-bold text-gray-800">Juan Martinez</p>
                      <p className="text-gray-400 text-xs">juanm@gmail.com</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">Admin</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold">Activo</span>
                  </td>
                  <td className="p-4">
                    <button onClick={() => setModalAbierto(true)} className="text-gray-400 hover:text-teal-500 p-1">✏️</button>
                    <button className="text-gray-400 hover:text-red-500 p-1">🗑️</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CONTENIDO: AJUSTES VISUALES */}
      {pestana === 'visuales' && (
        <div className="animate-in slide-in-from-right-2">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Tamaño de Letra</h3>
          <div className="flex gap-8 mb-10">
            {['Normal', 'Grande', 'Mediano', 'Extra Grande'].map((size) => (
              <label key={size} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="font" className="w-5 h-5 accent-teal-500" defaultChecked={size === 'Normal'} />
                <span className="text-gray-600 font-medium">{size}</span>
              </label>
            ))}
          </div>
          <button className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-bold hover:bg-orange-600 shadow-xl shadow-orange-100">
            Guardar Cambios
          </button>
        </div>
      )}

      {modalAbierto && <ModalEditarUsuario cerrar={() => setModalAbierto(false)} />}
    </div>
  );
}