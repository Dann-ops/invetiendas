import pytest
from app import app # Importamos tu servidor Flask real

@pytest.fixture
def cliente():
    """Configura el cliente de pruebas de Flask"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

# --- PRUEBA 1: Probar el Login Exitoso (POST) ---
def test_login_exitoso(cliente):
    # Simula los datos que tu ruta real 'request.json' va a recibir
    datos_login = {
        "correo": "admin@tienda.com", # Asegúrate de que este correo exista en tu DB de pruebas
        "password": "clave_correcta"
    }
    
    # Enviamos una petición POST real a la ruta /login
    respuesta = cliente.post('/login', json=datos_login)
    
    # Verificamos que el código de estado sea 200 OK
    assert respuesta.status_code == 200
    
    # Verificamos que la respuesta JSON contenga el estado "success"
    datos_respuesta = respuesta.get_json()
    assert datos_respuesta['status'] == "success"

# --- PRUEBA 2: Probar las Credenciales Inválidas (POST - Caso Negativo) ---
def test_login_fallido(cliente):
    datos_incorrectos = {
        "correo": "admin@tienda.com",
        "password": "clave_erronea"
    }
    
    respuesta = cliente.post('/login', json=datos_incorrectos)
    
    # Tu código real devuelve un 401 si las credenciales no coinciden
    assert respuesta.status_code == 401
    
    datos_respuesta = respuesta.get_json()
    assert datos_respuesta['status'] == "error"
    assert datos_respuesta['mensaje'] == "Credenciales inválidas"

# --- PRUEBA 3: Probar Obtener Productos de un Negocio (GET dinámico) ---
def test_obtener_productos_negocio(cliente):
    # Tu ruta real es '/productos/<int:id_negocio>'
    # Simulamos el GET a un negocio con ID 1
    respuesta = cliente.get('/productos/6')
    
    # Verificamos que responda exitosamente
    assert respuesta.status_code == 200
    
    # Verificamos que lo que devuelva sea una lista (array de productos)
    productos = respuesta.get_json()
    assert isinstance(productos, list)