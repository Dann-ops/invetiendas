import { useState, useEffect } from 'react';

export default function StatsCards({ usuario }) {
  const [stats, setStats] = useState([
    { label: 'Productos Totales', value: '0', color: 'text-blue-600', key: 'total_productos' },
    { label: 'Bajo Stock', value: '0', color: 'text-red-600', key: 'bajo_stock' },
    { label: 'Ventas Hoy', value: '$0.00', color: 'text-green-600', key: 'ventas_hoy' },
  ]);

  useEffect(() => {
    const cargarStats = async () => {
      // Si el usuario no ha cargado, no hacemos la petición
      if (!usuario?.id_negocio) return;
      
      try {
        const respuesta = await fetch(`http://127.0.0.1:5000/stats/${usuario.id_negocio}`);
        const datos = await respuesta.json();

        // Mapeamos los datos del JSON directamente a nuestro estado
        setStats(prevStats => prevStats.map(s => ({
          ...s,
          value: datos[s.key] !== undefined ? datos[s.key] : s.value
        })));
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      }
    };

    cargarStats();
  }, [usuario]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((s) => (
        <div key={s.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in duration-700">
          <p className="text-sm text-gray-500 font-medium uppercase">{s.label}</p>
          <p className={`text-3xl font-bold mt-2 ${s.color}`}>
            {/* Si es la tarjeta de ventas, le ponemos el signo de $ */}
            {s.key === 'ventas_hoy' ? `$${s.value}` : s.value}
          </p>
        </div>
      ))}
    </div>
  );
}