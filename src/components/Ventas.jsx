import { useState } from 'react';
import ScannerCamara from './ScannerCamara';

export default function Ventas({ usuario }) {
  const [carrito, setCarrito] = useState([]);
  const [camaraAbierta, setCamaraAbierta] = useState(false);
  const [procesando, setProcesando] = useState(false);

  const buscarProducto = async (codigo) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/productos/buscar/${usuario.id_negocio}/${codigo}`);
      if (!res.ok) throw new Error("Producto no encontrado");
      const prod = await res.json();
      
      setCarrito(prev => {
        const existe = prev.find(p => p.id_producto === prod.id_producto);
        if (existe) {
          if (existe.cantidad >= prod.stock) {
            alert("No hay suficiente stock");
            return prev;
          }
          return prev.map(p => p.id_producto === prod.id_producto ? {...p, cantidad: p.cantidad + 1} : p);
        }
        return [...prev, { ...prod, cantidad: 1 }];
      });
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  const modificarCantidad = (id, delta) => {
    setCarrito(prev => prev.map(item => {
      if (item.id_producto === id) {
        const nuevaCantidad = item.cantidad + delta;
        return nuevaCantidad >= 1 && nuevaCantidad <= item.stock 
          ? { ...item, cantidad: nuevaCantidad } 
          : item;
      }
      return item;
    }));
  };

  const procesarVenta = async () => {
    setProcesando(true);
    try {
      const res = await fetch('http://127.0.0.1:5000/ventas/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_negocio: usuario.id_negocio,
          id_usuario: usuario.id,
          items: carrito.map(i => ({ id_producto: i.id_producto, cantidad: i.cantidad }))
        })
      });
      if (!res.ok) throw new Error("Fallo al registrar la venta");
      alert("¡Venta realizada con éxito!");
      setCarrito([]);
    } catch (e) {
      alert(e.message);
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <div className="flex justify-between mb-6">
        <button onClick={() => setCamaraAbierta(true)} className="bg-[#2DCDBA] text-white px-6 py-2 rounded-xl font-bold">
          Escanear Producto
        </button>
      </div>

      <input 
        type="text" placeholder="Código de barras..." 
        className="w-full border p-3 rounded-xl mb-4"
        onKeyDown={(e) => { if(e.key === 'Enter') buscarProducto(e.target.value); }}
      />

      <table className="w-full text-left">
        <thead><tr className="text-gray-400"><th>Producto</th><th>Cantidad</th><th>Subtotal</th></tr></thead>
        <tbody>
          {carrito.map(p => (
            <tr key={p.id_producto} className="border-b">
              <td className="py-4">{p.nombre}</td>
              <td className="py-4 flex items-center gap-2">
                <button onClick={() => modificarCantidad(p.id_producto, -1)} className="bg-gray-100 px-3 py-1 rounded">-</button>
                <span className="font-bold w-8 text-center">{p.cantidad}</span>
                <button onClick={() => modificarCantidad(p.id_producto, 1)} className="bg-gray-100 px-3 py-1 rounded">+</button>
              </td>
              <td className="py-4">${(p.precio_venta * p.cantidad).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={procesarVenta} disabled={procesando || carrito.length === 0} className="mt-6 bg-[#263238] text-white w-full py-4 rounded-xl font-bold">
        {procesando ? "Procesando..." : "Finalizar Venta"}
      </button>

      {/* Contenedor que fuerza la detección de la cámara */}
      {camaraAbierta && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl w-full max-w-md">
            <ScannerCamara 
              cerrar={() => setCamaraAbierta(false)} 
              onScanSuccess={(c) => { buscarProducto(c); setCamaraAbierta(false); }} 
            />
            <button onClick={() => setCamaraAbierta(false)} className="mt-4 w-full py-2 text-gray-500 underline">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}