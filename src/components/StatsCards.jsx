export default function StatsCards() {
  const stats = [
    { label: 'Productos Totales', value: '1,240', color: 'text-blue-600' },
    { label: 'Bajo Stock', value: '12', color: 'text-red-600' },
    { label: 'Ventas Hoy', value: '$450.00', color: 'text-green-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((s) => (
        <div key={s.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium uppercase">{s.label}</p>
          <p className={`text-3xl font-bold mt-2 ${s.color}`}>{s.value}</p>
        </div>
      ))}
    </div>
  );
}