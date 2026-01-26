import { useState } from 'react';

export default function Header({ alCambiarVista }) { 
  const [mostrarNotis, setMostrarNotis] = useState(false);
  
  const notificaciones = [
    { id: 1, msg: "Stock bajo: Arroz (5kg restantes)", tiempo: "Hace 5 min" },
    { id: 2, msg: "Venta registrada: $45.000", tiempo: "Hace 20 min" }
  ];

  return (
    <header className="h-20 bg-white flex items-center justify-between px-8 border-b border-gray-100 relative">
      {/* 1. Título Izquierdo */}
      <h2 className="text-xl font-black text-[#2DCDBA] uppercase tracking-widest">INVENTARIO</h2>
      
      {/* 2. Contenedor Derecho */}
      <div className="flex items-center gap-6">
        
        {/* GRUPO DE ICONOS */}
        <div className="flex items-center gap-2">
          
          {/* CONFIGURACIÓN */}
          <button 
            onClick={() => alCambiarVista('configuracion')}
            className="p-2 hover:bg-[#E7F4EE] rounded-xl transition-all group"
            title="Configuración"
          >
            <img 
              src="/Iconos/settings.png" 
              className="w-6 h-6 opacity-40 group-hover:opacity-100 group-hover:brightness-0 transition-all duration-300" 
              alt="Ajustes" 
            />
          </button>

          {/* NOTIFICACIONES */}
          <div className="relative">
            <button 
              onClick={() => setMostrarNotis(!mostrarNotis)}
              className="p-2 hover:bg-[#E7F4EE] rounded-xl transition-all group relative"
            >
              <img 
                src="/Iconos/notificacion.png" 
                className="w-6 h-6 opacity-40 group-hover:opacity-100 group-hover:brightness-0 transition-all" 
                alt="Notificaciones" 
              />
              <span className="absolute top-2 right-2 bg-[#FF7043] w-2 h-2 rounded-full border-2 border-white"></span>
            </button>

            {/* Menú desplegable de Notis */}
            {mostrarNotis && (
              <div className="absolute right-0 mt-3 w-72 bg-white shadow-2xl rounded-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="p-4 bg-gray-50 border-b font-bold text-[#263238] text-sm">Notificaciones</div>
                <div className="max-h-60 overflow-y-auto">
                  {notificaciones.map(n => (
                    <div key={n.id} className="p-4 hover:bg-[#E7F4EE]/50 border-b border-gray-50 last:border-none cursor-pointer text-xs">
                      <p className="text-[#263238] font-medium">{n.msg}</p>
                      <span className="text-gray-400">{n.tiempo}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PERFIL */}
        <div className="flex items-center border-l border-gray-100 pl-6">
          <button className="w-10 h-10 rounded-full bg-[#E7F4EE] border-2 border-[#2DCDBA] overflow-hidden shadow-sm hover:scale-105 transition-transform">
            <img 
              src="/Iconos/avatar.png" 
              alt="Perfil" 
              className="w-full h-full object-cover"
            />
          </button>
        </div>

      </div>
    </header>
  );
}