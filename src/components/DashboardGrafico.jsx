import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';

const datosBarra = [{ p: 'A', v: 10 }, { p: 'B', v: 20 }];
const datosPie = [{ name: 'G1', value: 400 }, { name: 'G2', value: 300 }];

// EL PRINCIPAL (DEBE SER EXPORT DEFAULT)
export default function DashboardGrafico() {
  return (
    <div className="h-64 bg-white p-4 rounded-xl shadow">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={datosBarra}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="p" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="v" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// LOS ADICIONALES (SOLO EXPORT)
export function GraficoEstado() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={datosPie} dataKey="value" cx="50%" cy="50%" outerRadius={50} fill="#8884d8">
            <Cell fill="#0088FE" />
            <Cell fill="#00C49F" />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function GraficoVentas() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={datosBarra}>
          <Area type="monotone" dataKey="v" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
