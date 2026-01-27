import { useState } from 'react';

// Agregamos irARegistro a las propiedades que recibe el componente
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

      if (respuesta.ok) {
        alAutenticar(resultado.usuario);
      } else {
        setError(resultado.mensaje);
      }
    } catch (err) {
      console.error("Error capturado:", err);
      setError("No se pudo conectar con el servidor Python. Verifica que app.py esté corriendo.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E7F4EE]">
      <form onSubmit={manejarLogin} className="bg-white p-10 rounded-[2rem] shadow-xl w-96 space-y-6 border border-[#2DCDBA]/20">
        <h2 className="text-2xl font-black text-[#263238] text-center tracking-tighter">INVE TIENDAS</h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold text-center border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Correo electrónico"
            className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#2DCDBA] transition-all"
            onChange={(e) => setDatos({...datos, correo: e.target.value})}
            required
          />
          <input 
            type="password" 
            placeholder="Contraseña"
            className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#2DCDBA] transition-all"
            onChange={(e) => setDatos({...datos, password: e.target.value})}
            required
          />
        </div>

        <button type="submit" className="w-full bg-[#2DCDBA] text-white p-4 rounded-2xl font-black hover:bg-[#26b8a8] shadow-lg shadow-[#2DCDBA]/20 transition-all active:scale-95">
          INGRESAR
        </button>

        {/* BOTÓN AGREGADO PARA REGISTRO */}
        <div className="pt-2">
          <button 
            type="button" 
            onClick={irARegistro} 
            className="w-full text-[#263238]/60 text-xs font-bold hover:text-[#2DCDBA] transition-colors uppercase tracking-widest"
          >
            ¿No tienes cuenta? Regístrate aquí
          </button>
        </div>
      </form>
    </div>
  );
}