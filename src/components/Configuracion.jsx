import { useState, useEffect } from 'react';
import ModalEditarUsuario from './ModalEditarUsuario';

export default function Configuracion({ usuario }) {
  const [pestana, setPestana] = useState('permisos');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('preferencia_font') || 'Normal';
  });
  const [usuariosDB, setUsuariosDB] = useState([]);

  // --- 1. CARGAR USUARIOS REALES DE LA BASE DE DATOS ---
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const resp = await fetch(`http://127.0.0.1:5000/usuarios-negocio/${usuario.id_negocio}`);
        const data = await resp.json();
        if (Array.isArray(data)) {
          setUsuariosDB(data);
        }
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      }
    };
    if (usuario?.id_negocio) cargarUsuarios();
  }, [usuario]);

  // --- 2. CAMBIAR TAMAÑO DE LETRA (SOLUCIÓN PARA VITE) ---
  const cambiarTamanoLetra = (size) => {
    setFontSize(size);
    localStorage.setItem('preferencia_font', size);
    
    // Forma segura de acceder al root en entornos estrictos
    const root = window.document.documentElement;
    
    const tamanos = {
      'Normal': '16px',
      'Mediano': '18px',
      'Grande': '20px',
      'Extra Grande': '24px'
    };
    
    if (root && tamanos[size]) {
      // setProperty es la forma más compatible con Vite/Linter
      root.style.setProperty('font-size', tamanos[size], 'important');
    }
  };

  // Aplicar el tamaño guardado al cargar el componente
  useEffect(() => {
    const guardado = localStorage.getItem('preferencia_font');
    if (guardado) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      cambiarTamanoLetra(guardado);
    }
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[600px] animate-in fade-in">
      {/* Pestañas de Navegación Interna */}
      <div className="flex gap-10 border-b border-gray-100 mb-8">
        <button 
          onClick={() => setPestana('permisos')} 
          className={`pb-4 font-bold transition-all ${pestana === 'permisos' ? 'text-teal-500 border-b-4 border-teal-400' : 'text-gray-400'}`}
        >
          Gestión de permisos
        </button>
        <button 
          onClick={() => setPestana('visuales')} 
          className={`pb-4 font-bold transition-all ${pestana === 'visuales' ? 'text-teal-500 border-b-4 border-teal-400' : 'text-gray-400'}`}
        >
          Ajustes Visuales
        </button>
      </div>

      {/* CONTENIDO: GESTIÓN DE PERMISOS (DATOS REALES) */}
      {pestana === 'permisos' && (
        <div className="animate-in slide-in-from-left-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Personal del Negocio</h2>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-100">
              + Añadir Nuevo Usuario
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100">
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
                {usuariosDB.length > 0 ? (
                  usuariosDB.map((u) => (
                    <tr key={u.id_usuario} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center font-bold text-teal-600 shadow-sm">
                          {u.nombre.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{u.nombre}</p>
                          <p className="text-gray-400 text-xs">{u.correo}</p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">
                        {u.id_rol === 1 ? 'Administrador' : 'Empleado'}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${u.estado === 1 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {u.estado === 1 ? 'ACTIVO' : 'INACTIVO'}
                        </span>
                      </td>
                      <td className="p-4">
                        <button onClick={() => setModalAbierto(true)} className="text-gray-400 hover:text-teal-500 p-2 transition-colors">✏️</button>
                        <button className="text-gray-400 hover:text-red-500 p-2 transition-colors">🗑️</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-10 text-center text-gray-400">Cargando usuarios o no hay registros...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CONTENIDO: AJUSTES VISUALES */}
      {pestana === 'visuales' && (
        <div className="animate-in slide-in-from-right-2">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Personalización de Interfaz</h3>
          <div className="bg-gray-50 p-6 rounded-2xl mb-8">
            <p className="text-gray-700 font-semibold mb-4">Tamaño de la fuente principal:</p>
            <div className="flex flex-wrap gap-6">
              {['Normal', 'Mediano', 'Grande', 'Extra Grande'].map((size) => (
                <label key={size} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="font" 
                    className="w-5 h-5 accent-teal-500 cursor-pointer" 
                    checked={fontSize === size}
                    onChange={() => cambiarTamanoLetra(size)}
                  />
                  <span className={`font-medium transition-colors ${fontSize === size ? 'text-teal-600' : 'text-gray-500 group-hover:text-gray-800'}`}>
                    {size}
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="border-l-4 border-orange-400 bg-orange-50 p-4 rounded-r-xl">
            <p className="text-sm text-orange-700">
              <strong>Nota:</strong> Estos cambios se guardarán automáticamente en tu navegador para futuras sesiones.
            </p>
          </div>
        </div>
      )}

      {modalAbierto && <ModalEditarUsuario cerrar={() => setModalAbierto(false)} />}
    </div>
  );
}