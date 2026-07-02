from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
# Se importa la herramienta de seguridad
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

db_config = {
    'host': '127.0.0.1',
    'user': 'root',
    'password': 'Root', 
    'database': 'inventiendas'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

# --- USUARIOS (Login y Registro con Seguridad) ---

@app.route('/login', methods=['POST'])
def login():
    try:
        datos = request.json
        correo = datos.get('correo')
        password_ingresada = datos.get('password')

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Buscamos al usuario por correo
        query = "SELECT id_usuario, id_negocio, id_rol, nombre, password FROM usuario WHERE correo = %s"
        cursor.execute(query, (correo,))
        usuario = cursor.fetchone()

        cursor.close()
        conn.close()

        # VALIDACIÓN SEGURA: Comparamos el hash de la DB con la clave ingresada
        if usuario and check_password_hash(usuario['password'], password_ingresada):
            return jsonify({
                "status": "success",
                "usuario": {
                    "id": usuario['id_usuario'],
                    "nombre": usuario['nombre'],
                    "id_negocio": usuario['id_negocio']
                }
            }), 200
        
        return jsonify({"status": "error", "mensaje": "Credenciales inválidas"}), 401
    except Exception as e:
        return jsonify({"status": "error", "mensaje": str(e)}), 500

@app.route('/registro', methods=['POST'])
def registrar():
    try:
        datos = request.json
        nombre = datos.get('nombre')
        correo = datos.get('correo')
        password_plana = datos.get('password')
        nombre_tienda = datos.get('tienda', f"Tienda de {nombre}")

        # GENERAR HASH: Encriptamos la contraseña antes de guardarla
        password_encriptada = generate_password_hash(password_plana)

        conn = get_db_connection()
        cursor = conn.cursor()
        
        # 1. Crear el negocio
        cursor.execute("INSERT INTO negocio (nombre) VALUES (%s)", (nombre_tienda,))
        id_nuevo_negocio = cursor.lastrowid 

        # 2. Crear el usuario usando la contraseña encriptada
        query_usuario = """
            INSERT INTO usuario (id_negocio, id_rol, nombre, correo, password, estado) 
            VALUES (%s, %s, %s, %s, %s, 1)
        """
        cursor.execute(query_usuario, (id_nuevo_negocio, 1, nombre, correo, password_encriptada))
        
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"status": "success", "mensaje": "Registro exitoso"}), 201
    except Exception as e:
        return jsonify({"status": "error", "mensaje": str(e)}), 400

# --- PRODUCTOS (CRUD) ---

@app.route('/productos/<int:id_negocio>', methods=['GET'])
def obtener_productos(id_negocio):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM producto WHERE id_negocio = %s"
        cursor.execute(query, (id_negocio,))
        productos = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(productos), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/productos/agregar', methods=['POST'])
def agregar_producto():
    datos = request.json
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = """
            INSERT INTO producto (id_negocio, nombre, codigo_barra, categoria, precio_compra, precio_venta, stock, stock_minimo)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        valores = (
            datos['id_negocio'], datos['nombre'], datos['codigo_barra'],
            datos['categoria'], datos['precio_compra'], datos['precio_venta'],
            datos['stock'], datos['stock_minimo']
        )
        cursor.execute(query, valores)
        conn.commit()
        return jsonify({"mensaje": "Producto creado"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        if 'conn' in locals() and conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/productos/editar/<int:id_producto>', methods=['PUT'])
def editar_producto(id_producto):
    datos = request.json
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = """
            UPDATE producto 
            SET nombre=%s, codigo_barra=%s, categoria=%s, 
                precio_compra=%s, precio_venta=%s, stock=%s, stock_minimo=%s
            WHERE id_producto=%s
        """
        valores = (
            datos['nombre'], datos['codigo_barra'], datos['categoria'],
            datos['precio_compra'], datos['precio_venta'], datos['stock'], 
            datos['stock_minimo'], id_producto
        )
        cursor.execute(query, valores)
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"mensaje": "Producto actualizado correctamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/productos/eliminar/<int:id_producto>', methods=['DELETE'])
def eliminar_producto(id_producto):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "DELETE FROM producto WHERE id_producto = %s"
        cursor.execute(query, (id_producto,))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"status": "success", "mensaje": "Producto eliminado"}), 200
    except Exception as e:
        return jsonify({"status": "error", "mensaje": str(e)}), 500

# --- ESTADÍSTICAS Y GRÁFICOS ---

@app.route('/stats/<int:id_negocio>', methods=['GET'])
def obtener_stats(id_negocio):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT COUNT(*) as total FROM producto WHERE id_negocio = %s", (id_negocio,))
        total = cursor.fetchone()['total']
        cursor.execute("SELECT COUNT(*) as bajo FROM producto WHERE id_negocio = %s AND stock <= stock_minimo", (id_negocio,))
        bajo_stock = cursor.fetchone()['bajo']
        cursor.close()
        conn.close()
        return jsonify({
            "total_productos": total,
            "bajo_stock": bajo_stock,
            "ventas_hoy": 0 
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/grafico-categorias/<int:id_negocio>', methods=['GET'])
def grafico_categorias(id_negocio):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = """
            SELECT categoria, COUNT(*) as cantidad 
            FROM producto 
            WHERE id_negocio = %s 
            GROUP BY categoria
        """
        cursor.execute(query, (id_negocio,))
        resultados = cursor.fetchall()
        cursor.close()
        conn.close()
        datos = [{"name": r[0] if r[0] else "Sin Categoría", "value": r[1]} for r in resultados]
        return jsonify(datos)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/grafico-productos/<int:id_negocio>', methods=['GET'])
def grafico_productos(id_negocio):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = """
            SELECT nombre, stock 
            FROM producto 
            WHERE id_negocio = %s 
            ORDER BY stock DESC 
            LIMIT 5
        """
        cursor.execute(query, (id_negocio,))
        resultados = cursor.fetchall()
        cursor.close()
        conn.close()
        datos = [{"p": r[0], "v": r[1]} for r in resultados]
        return jsonify(datos)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/usuarios-negocio/<int:id_negocio>', methods=['GET'])
def obtener_usuarios_negocio(id_negocio):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        query = "SELECT id_usuario, nombre, correo, id_rol, estado FROM usuario WHERE id_negocio = %s"
        cursor.execute(query, (id_negocio,))
        usuarios = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(usuarios), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/test-api', methods=['GET'])
def test_api():
    return {"status": "Conexion exitosa", "proyecto": "Invetiendas API"}, 200


# ==========================================================
# NUEVO: CONEXIONES INTEGRALES PARA EL ESCÁNER Y LAS VENTAS
# ==========================================================

@app.route('/productos/buscar/<int:id_negocio>/<string:codigo_barra>', methods=['GET'])
def buscar_producto_codigo(id_negocio, codigo_barra):
    """ Busca un producto usando el EAN escaneado para agregarlo a la canasta """
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        query = """
            SELECT id_producto, nombre, precio_venta, stock, stock_minimo, codigo_barra 
            FROM producto 
            WHERE id_negocio = %s AND codigo_barra = %s
        """
        cursor.execute(query, (id_negocio, codigo_barra))
        producto = cursor.fetchone()
        
        cursor.close()
        conn.close()
        
        if producto:
            return jsonify(producto), 200
        else:
            return jsonify({"error": "Producto no registrado"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/ventas/registrar', methods=['POST'])
def registrar_venta_real():
    """ Procesa los artículos escaneados, descuenta existencias e inserta en venta y detalle_venta """
    datos = request.json
    id_negocio = datos.get('id_negocio')
    id_usuario = datos.get('id_usuario') 
    items = datos.get('items', []) 

    if not id_negocio or not items:
        return jsonify({"error": "Datos de transacción insuficientes"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Si no viene un id_usuario definido, asociamos el primer usuario registrado en el negocio
        if not id_usuario:
            cursor.execute("SELECT id_usuario FROM usuario WHERE id_negocio = %s LIMIT 1", (id_negocio,))
            usuario_db = cursor.fetchone()
            id_usuario = usuario_db['id_usuario'] if usuario_db else None
            if not id_usuario:
                return jsonify({"error": "No se detectó un usuario válido para la transacción"}), 400

        # 1. ETAPA DE CONTROL: Validamos stocks antes de escribir cambios en la DB
        total_factura = 0
        productos_validados = []

        for item in items:
            id_prod = item['id_producto']
            cant_vender = item['cantidad']
            
            cursor.execute("SELECT nombre, stock, precio_venta FROM producto WHERE id_producto = %s AND id_negocio = %s", (id_prod, id_negocio))
            prod_db = cursor.fetchone()
            
            if not prod_db:
                cursor.close()
                conn.close()
                return jsonify({"error": f"El producto ID #{id_prod} no existe"}), 404
                
            if prod_db['stock'] < cant_vender:
                cursor.close()
                conn.close()
                return jsonify({"error": f"Stock insuficiente para '{prod_db['nombre']}'. Disponibles: {prod_db['stock']}"}), 400

            subtotal = prod_db['precio_venta'] * cant_vender
            total_factura += subtotal
            
            productos_validados.append({
                'id_producto': id_prod,
                'cantidad': cant_vender,
                'precio_unitario': prod_db['precio_venta'],
                'subtotal': subtotal
            })

        # 2. ETAPA DE OPERACIÓN: Escritura relacional en cascada (InnoDB)
        
        # A. Crear cabecera en la tabla 'venta'
        query_venta = "INSERT INTO venta (id_usuario, total) VALUES (%s, %s)"
        cursor.execute(query_venta, (id_usuario, total_factura))
        id_nueva_venta = cursor.lastrowid # Recuperamos el ID autogenerado de la factura

        # B. Insertar cada artículo en 'detalle_venta' y descontar stock
        for prod in productos_validados:
            query_detalle = """
                INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario, subtotal)
                VALUES (%s, %s, %s, %s, %s)
            """
            cursor.execute(query_detalle, (
                id_nueva_venta, prod['id_producto'], prod['cantidad'], 
                prod['precio_unitario'], prod['subtotal']
            ))
            
            # Descuento físico del inventario
            query_update_stock = "UPDATE producto SET stock = stock - %s WHERE id_producto = %s"
            cursor.execute(query_update_stock, (prod['cantidad'], prod['id_producto']))

        # Guardamos definitivamente todos los cambios en MySQL
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({
            "status": "success", 
            "mensaje": f"Venta #{id_nueva_venta} procesada exitosamente. Total: ${total_factura}"
        }), 200
        
    except Exception as e:
        if 'conn' in locals() and conn.is_connected():
            cursor.close()
            conn.close()
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)