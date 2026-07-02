// ScannerCamara.jsx
import { useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

export default function ScannerCamara({ cerrar, onScanSuccess }) {
  
  useEffect(() => {
    // Creamos la instancia apuntando al contenedor 'reader'
    const html5Qrcode = new Html5Qrcode("reader");

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    // Encendemos la cámara trasera automáticamente
    html5Qrcode.start(
      { facingMode: "environment" }, 
      config,
      (codigoDetectado) => {
        // Al detectar código, notificamos, apagamos cámara y cerramos modal
        onScanSuccess(codigoDetectado);
        html5Qrcode.stop().then(() => cerrar()).catch(err => console.error(err));
      },
      () => {
        // Ignoramos los errores por fotograma para evitar olas rojas
      }
    ).catch(err => console.error("Error al iniciar cámara:", err));

    // CLAVE DE LIMPIEZA: Apaga físicamente la cámara al cerrar el modal de cualquier forma
    return () => {
      if (html5Qrcode.isScanning) {
        html5Qrcode.stop().catch(err => console.error("Error al detener en desmontaje:", err));
      }
    };
  }, [onScanSuccess, cerrar]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative flex flex-col items-center">
        <h3 className="text-sm font-bold text-[#263238] mb-4">Escaneando Código de Barras</h3>
        
        {/* Contenedor del lente de la cámara */}
        <div id="reader" className="w-full rounded-2xl overflow-hidden bg-gray-100 min-h-[250px]"></div>
        
        <button 
          type="button" 
          onClick={cerrar}
          className="mt-4 bg-red-50 text-red-500 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-all"
        >
          Cerrar Cámara
        </button>
      </div>
    </div>
  );
}