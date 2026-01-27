import { useState } from 'react';

export default function Registro({ irALogin }) {
  const [datos, setDatos] = useState({
    nombre: '',
    tienda: '',
    correo: '',
    password: ''
  });
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

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        alert("¡Cuenta creada! Ya puedes iniciar sesión.");
        irALogin();
      } else {
        setError(resultado.mensaje || "Error al registrar");
      }
} catch (err) {
  console.error(err); // <-- Esto "usa" la variable y quita el aviso
  setError("Error de conexión con el servidor");
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E7F4EE]">
      <form onSubmit={manejarRegistro} className="bg-white p-10 rounded-[2rem] shadow-xl w-96 space-y-4">
        <h2 className="text-2xl font-black text-[#263238] text-center">CREAR CUENTA</h2>
        
        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

        <input 
          type="text" placeholder="Nombre" 
          className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
          onChange={(e) => setDatos({...datos, nombre: e.target.value})}
          required 
        />
        <input 
          type="text" placeholder="Nombre de tu tienda" 
          className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
          onChange={(e) => setDatos({...datos, tienda: e.target.value})}
          required 
        />
        <input 
          type="email" placeholder="Correo" 
          className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
          onChange={(e) => setDatos({...datos, correo: e.target.value})}
          required 
        />
        <input 
          type="password" placeholder="Contraseña" 
          className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
          onChange={(e) => setDatos({...datos, password: e.target.value})}
          required 
        />

        <button type="submit" disabled={cargando} className="w-full bg-[#2DCDBA] text-white p-4 rounded-2xl font-bold">
          {cargando ? 'REGISTRANDO...' : 'REGISTRARME'}
        </button>

        <button type="button" onClick={irALogin} className="w-full text-gray-400 text-xs font-bold">
          ¿YA TIENES CUENTA? INICIA SESIÓN
        </button>
      </form>
    </div>
  );
}