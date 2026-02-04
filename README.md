#  InveTiendas - Sistema de Gestión de Inventarios (Full Stack)

**InveTiendas** es una solución integral para el control de inventarios, ventas y reportes. Este proyecto ha evolucionado de un prototipo visual a una aplicación funcional con arquitectura Cliente-Servidor, desarrollada como parte del proceso de formación en el SENA.

##  Características Actuales

* **Rendimiento optimizado:** Frontend construido sobre **Vite** para una carga ultrarrápida.
* **Arquitectura API REST:** Backend independiente desarrollado en **Python (Flask)**.
* **Seguridad Avanzada:** Implementación de **Hashing (Bcrypt)** para la protección de credenciales en la base de datos.
* **Gestión de Inventario y Usuarios:** * Registro dinámico de negocios y administradores.
    * Dashboard interactivo con estadísticas clave.
    * Tabla de productos con estados dinámicos (Bajo Stock, etc.).
* **UI/UX Profesional:** Diseño moderno con **Tailwind CSS** y sistema de navegación persistente.

##  Tecnologías Utilizadas

### Frontend
* **Framework:** React.js + Vite
* **Estilos:** Tailwind CSS
* **Iconografía:** Lucide React / Emojis dinámicos

### Backend & Base de Datos
* **Lenguaje:** Python 3.x
* **Framework API:** Flask + Flask-CORS
* **Seguridad:** Flask-Bcrypt
* **Base de Datos:** MySQL (Relacional)


##  Instalación y Ejecución

### 1. Requisitos Previos
* Node.js instalado.
* Python 3.x y MySQL Server.

###  Configuración del Entorno y Ejecución
Para que el sistema funcione correctamente, se deben configurar ambos entornos (Backend y Frontend) y la base de datos.

1. Base de Datos (MySQL)
Antes de iniciar los servidores, es necesario preparar el esquema de datos:

Abrir MySQL Workbench.

Ejecutar el script SQL incluido en la carpeta /database para crear la base de datos inventiendas y las tablas negocio y usuario.

Verificar que el servicio de MySQL esté corriendo en el puerto 3306.

# Navegar a la carpeta del servidor
cd backend-invetiendas

# Instalar las librerías necesarias
pip install flask flask-cors mysql-connector-python flask-bcrypt

# Iniciar el servidor
python app.py

### Ejecucion FrontEnd
# Navegar a la carpeta del cliente
cd frontend-invetiendas

# Instalar dependencias de Node
npm install

# Iniciar la aplicación en modo desarrollo
npm run dev