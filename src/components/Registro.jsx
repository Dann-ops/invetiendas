import { useState } from 'react';

export default function Registro({ irALogin }) {
  const [datos, setDatos] = useState({ nombre: '', tienda: '', correo: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    try {
      const respuesta = await fetch('http://127.0.0.1:5000/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      if (respuesta.ok) {
        alert("¡Cuenta creada exitosamente!");
        irALogin();
      } else {
        const res = await respuesta.json();
        setError(res.mensaje);
      }
    } catch (err) {
      console.error("Error en registro:", err); // Esto "usa" la variable err y quita el error
      setError("Error de conexión con el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#E7F4EE]">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center p-4">
        
        {/* INFO CARD */}
        <div className="hidden lg:block lg:w-1/3 p-8">
           <h2 className="text-4xl font-black text-[#263238] mb-4 leading-tight">Crea tu cuenta y empieza a vender</h2>
           <p className="text-gray-600">Únete a cientos de negocios que ya confían en nuestra plataforma para su inventario.</p>
           <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-3 text-[#2DCDBA] font-bold italic">
                <span>✅ Control total de stock</span>
              </div>
              <div className="flex items-center space-x-3 text-[#2DCDBA] font-bold italic">
                <span>✅ Reportes de ventas diarios</span>
              </div>
           </div>
        </div>

        {/* FORM CARD */}
        <div className="w-full max-w-xl bg-white p-10 lg:p-12 rounded-[3rem] shadow-2xl border border-teal-50">
          <h2 className="text-3xl font-black text-[#263238] mb-8">Registra tu Negocio</h2>
          
          <form onSubmit={manejarRegistro} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {error && <div className="col-span-full bg-red-50 text-red-500 p-4 rounded-2xl font-bold">{error}</div>}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase px-2">Nombre Completo</label>
              <input 
                type="text" placeholder="Tu nombre" 
                className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#2DCDBA]"
                onChange={(e) => setDatos({...datos, nombre: e.target.value})}
                required 
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase px-2">Nombre del Negocio</label>
              <input 
                type="text" placeholder="Ej: Mi Tienda" 
                className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#2DCDBA]"
                onChange={(e) => setDatos({...datos, tienda: e.target.value})}
                required 
              />
            </div>

            <div className="col-span-full space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase px-2">Correo Corporativo</label>
              <input 
                type="email" placeholder="correo@negocio.com" 
                className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#2DCDBA]"
                onChange={(e) => setDatos({...datos, correo: e.target.value})}
                required 
              />
            </div>

            <div className="col-span-full space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase px-2">Contraseña</label>
              <input 
                type="password" placeholder="Mínimo 6 caracteres" 
                className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#2DCDBA]"
                onChange={(e) => setDatos({...datos, password: e.target.value})}
                required 
              />
            </div>

            <button 
              type="submit" 
              disabled={cargando} 
              className="col-span-full bg-[#263238] hover:bg-[#2DCDBA] text-white p-5 rounded-2xl font-black transition-all shadow-xl mt-4"
            >
              {cargando ? 'PROCESANDO...' : 'REGISTRAR MI TIENDA'}
            </button>

            <button type="button" onClick={irALogin} className="col-span-full text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-[#263238]">
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}