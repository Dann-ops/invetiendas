export default function Sidebar({ alCambiarVista, vistaActiva, onLogout }) {
  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: '/Iconos/home.png' },
    { id: 'inventario', label: 'Inventario', icon: '/Iconos/box.png' },
    { id: 'ventas', label: 'Ventas', icon: '/Iconos/cart.png' },
  ]; // Se eliminó por completo la pestaña de reportes

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen">
      {/* SECCIÓN DEL LOGO */}
      <div className="p-8 flex items-center gap-3">
        <img 
          src="/Iconos/logo.png" 
          className="w-60 h-10 object-contain" 
          style={{ filter: 'drop-shadow(0px 2px 4px rgba(45, 205, 186, 0.2))' }}
          alt="Icono InveTiendas" 
        />
      </div>

      <nav className="flex-1 px-4 space-y-3">
        {menuItems.map((item) => {
          const estaActivo = vistaActiva === item.id;
          return (
            <button
              key={item.id}
              onClick={() => alCambiarVista(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 transform ${
                estaActivo 
                  ? 'bg-[#2DCDBA]/20 text-[#2DCDBA] scale-105 shadow-sm' 
                  : 'text-[#263238]/60 hover:bg-gray-50 hover:translate-x-2'
              }`}
            >
              <img 
                src={item.icon} 
                className={`w-6 h-6 transition-all duration-300 ${
                  estaActivo 
                    ? 'brightness-0 contrast-200' 
                    : 'brightness-0 opacity-30'
                }`} 
                alt={item.label} 
              />
              <span className="text-[15px]">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* BOTÓN CERRAR SESIÓN */}
      <div className="p-6 border-t border-gray-50">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-6 py-3 text-[#263238]/40 font-bold hover:text-[#FF7043] group transition-all duration-300"
        >
          <img 
            src="/Iconos/log-out.png" 
            className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:brightness-0 transition-all" 
            alt="Cerrar Sesion" 
          />
          <span className="text-sm">Cerrar Sesion</span>
        </button>
      </div>
    </aside>
  );
}