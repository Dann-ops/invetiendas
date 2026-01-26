import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import DashboardGrafico, { GraficoEstado, GraficoVentas } from './components/DashboardGrafico';
import AlertaStock from './components/AlertaStock';
import Configuracion from './components/Configuracion';
import Inventario from './components/Inventario'; 
import Ventas from './components/Ventas'; 

function App() {
  const [vistaActual, setVistaActual] = useState('inicio');
  // NUEVO: Estado para capturar lo que se escribe en el buscador
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  return (
    <div className="flex min-h-screen bg-[#E7F4EE]/30"> 
      <AlertaStock />
      
      <Sidebar alCambiarVista={setVistaActual} vistaActiva={vistaActual} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* HEADER: Ahora recibe la función onBuscar para actualizar el estado */}
        <Header 
          alCambiarVista={setVistaActual} 
          onBuscar={setTerminoBusqueda} 
        />
        
        <main className="p-8 overflow-y-auto flex-1">
          
          {/* VISTA: INICIO */}
          {vistaActual === 'inicio' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <StatsCards />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DashboardGrafico />
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-white">
                   <h3 className="font-bold text-[#263238] mb-6 text-lg">Estado del Inventario</h3>
                   <GraficoEstado />
                </div>
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-white lg:col-span-2">
                   <h3 className="font-bold text-[#263238] mb-6 text-lg">Evolución de Ventas</h3>
                   <GraficoVentas />
                </div>
              </div>
            </div>
          )}

          {/* VISTA: INVENTARIO (Ahora recibe el filtro de búsqueda) */}
          {vistaActual === 'inventario' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <Inventario filtro={terminoBusqueda} />
            </div>
          )}

          {/* VISTA: VENTAS */}
          {vistaActual === 'ventas' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <Ventas />
            </div>
          )}

          {/* VISTA: CONFIGURACIÓN */}
          {vistaActual === 'configuracion' && (
            <div className="animate-in fade-in duration-500">
              <Configuracion />
            </div>
          )}

          {/* VISTA: REPORTES */}
          {vistaActual === 'reportes' && (
            <div className="flex flex-col items-center justify-center h-full text-[#263238]/30">
              <span className="text-6xl mb-4">📊</span>
              <p className="font-bold italic">Sección de Reportes en construcción...</p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default App;