import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, AreaChart, Area, Legend } from 'recharts';

const COLORES = ['#2DCDBA', '#FF7043', '#263238', '#FFC107', '#4f46e5', '#9C27B0'];

export function GraficoEstado({ usuario }) {
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    if (usuario?.id_negocio) {
      fetch(`http://127.0.0.1:5000/grafico-categorias/${usuario.id_negocio}`)
        .then(res => res.json()).then(setDatos).catch(console.error);
    }
  }, [usuario]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={datos} dataKey="value" cx="50%" cy="50%" innerRadius="60%" outerRadius="80%" paddingAngle={5}>
          {datos.map((_, i) => <Cell key={i} fill={COLORES[i % COLORES.length]} />)}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }} />
        <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default function DashboardGrafico({ usuario }) {
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    if (usuario?.id_negocio) {
      fetch(`http://127.0.0.1:5000/grafico-productos/${usuario.id_negocio}`)
        .then(res => res.json()).then(setDatos).catch(console.error);
    }
  }, [usuario]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={datos} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis dataKey="p" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11}} />
        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11}} />
        <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{ borderRadius: '12px', border: 'none' }} />
        <Bar dataKey="v" fill="#263238" radius={[5, 5, 0, 0]} barSize={35} />
      </BarChart>
    </ResponsiveContainer>
  );
}
// (GraficoVentas se mantiene igual con datos demo por ahora)