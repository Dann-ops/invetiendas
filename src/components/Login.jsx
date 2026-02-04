import { useState } from 'react';

export default function Login({ alAutenticar, irARegistro }) {
  const [datos, setDatos] = useState({ correo: '', password: '' });
  const [error, setError] = useState('');

  const manejarLogin = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      const respuesta = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      const resultado = await respuesta.json();
      if (respuesta.ok) alAutenticar(resultado.usuario);
      else setError(resultado.mensaje);
    } catch (err) {
      console.error("Error en login:", err); // Así ves en la consola de Chrome qué pasó
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-50">
      {/* LADO IZQUIERDO: Decorativo / Bienvenida */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2DCDBA] to-[#263238] p-12 flex-col justify-center items-center text-white">
        <div className="max-w-md text-center">
          <div className="bg-white/20 p-6 rounded-3xl backdrop-blur-md mb-8">
            <span className="text-8xl">🏪</span>
          </div>
          <h1 className="text-5xl font-black mb-6 tracking-tight">INVE TIENDAS</h1>
          <p className="text-xl text-teal-50 shadow-sm">
            La mejor forma de gestionar tu inventario y potenciar tus ventas en un solo lugar.
          </p>
        </div>
      </div>

      {/* LADO DERECHO: Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="mb-10">
            <h2 className="text-4xl font-black text-[#263238] mb-2">Inicia sesión aquí</h2>
            <p className="text-gray-400">¡Qué bueno verte de nuevo!</p>
          </div>

          <form onSubmit={manejarLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-xs font-bold border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-2">Correo Electrónico</label>
                <input 
                  type="email" 
                  className="w-full p-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-[#2DCDBA] transition-all"
                  placeholder="ejemplo@correo.com"
                  onChange={(e) => setDatos({...datos, correo: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-2">Contraseña</label>
                <input 
                  type="password" 
                  className="w-full p-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-[#2DCDBA] transition-all"
                  placeholder="••••••••"
                  onChange={(e) => setDatos({...datos, password: e.target.value})}
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-[#ff7b54] hover:bg-[#ff6a3d] text-white p-5 rounded-2xl font-black text-lg shadow-lg shadow-orange-200 transition-all active:scale-95">
              INICIAR SESIÓN
            </button>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-500 font-medium">
                ¿No tienes una cuenta?{' '}
                <button 
                  type="button"
                  onClick={irARegistro}
                  className="text-[#2DCDBA] font-black hover:underline"
                >
                  Regístrate gratis
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}