import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import DashboardGrafico, { GraficoEstado } from './components/DashboardGrafico';
import AlertaStock from './components/AlertaStock';
import Inventario from './components/Inventario'; 
import Login from './components/Login';
import Registro from './components/Registro';
import Configuracion from './components/Configuracion'; 
import Ventas from './components/Ventas';

function App() {
  const [usuario, setUsuario] = useState(() => {
    const guardado = sessionStorage.getItem('usuario_sesion');
    return guardado ? JSON.parse(guardado) : null;
  });
  
  const [vistaActual, setVistaActual] = useState('inicio');
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const manejarAutenticacion = (datos) => {
    setUsuario(datos);
    sessionStorage.setItem('usuario_sesion', JSON.stringify(datos));
  };

  const manejarLogout = () => {
    sessionStorage.removeItem('usuario_sesion');
    setUsuario(null);
  };

  // --- SI NO HAY USUARIO, MOSTRAR LOGIN ---
  if (!usuario) {
    return mostrarRegistro ? (
      <Registro irALogin={() => setMostrarRegistro(false)} />
    ) : (
      <Login 
        alAutenticar={manejarAutenticacion} 
        irARegistro={() => setMostrarRegistro(true)} 
      />
    );
  }

  // --- RENDERIZADO PRINCIPAL ---
  return (
    <div className="flex min-h-screen bg-[#E7F4EE]/30">
      <Sidebar alCambiarVista={setVistaActual} vistaActiva={vistaActual} onLogout={manejarLogout} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header alCambiarVista={setVistaActual} onBuscar={setTerminoBusqueda} usuarioNombre={usuario?.nombre} />
        
        <main className="p-8 overflow-y-auto flex-1">
          {/* VISTA INICIO */}
          {vistaActual === 'inicio' && (
            <div className="space-y-6">
              <StatsCards usuario={usuario} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-[2rem] h-96">
                  <DashboardGrafico usuario={usuario} />
                </div>
                <div className="bg-white p-6 rounded-[2rem] h-96">
                  <GraficoEstado usuario={usuario} />
                </div>
              </div>
            </div>
          )}

          {/* VISTA INVENTARIO */}
          {vistaActual === 'inventario' && (
            <Inventario filtro={terminoBusqueda} usuario={usuario} />
          )}

          {/* VISTA VENTAS (CORREGIDO: SE AGREGÓ ESTE BLOQUE) */}
          {vistaActual === 'ventas' && (
            <Ventas usuario={usuario} />
          )}

          {/* VISTA CONFIGURACIÓN */}
          {vistaActual === 'configuracion' && (
            <Configuracion usuario={usuario} />
          )}
        </main>
      </div>
      <AlertaStock usuario={usuario} />
    </div>
  );
}

export default App;