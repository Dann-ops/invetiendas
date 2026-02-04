--- ==========================================================
-- ESTRUCTURA DE LA BASE DE DATOS: INVENTIENDAS
-- ==========================================================

DROP DATABASE IF EXISTS inventiendas;
CREATE DATABASE inventiendas;
USE inventiendas;

-- 1. TABLA NEGOCIO
CREATE TABLE negocio (
  id_negocio INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  PRIMARY KEY (id_negocio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. TABLA ROL
CREATE TABLE rol (
  id_rol INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. TABLA USUARIO
CREATE TABLE usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  id_negocio INT NOT NULL,
  id_rol INT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  estado TINYINT NOT NULL DEFAULT '1',
  PRIMARY KEY (id_usuario),
  CONSTRAINT fk_usuario_negocio FOREIGN KEY (id_negocio) REFERENCES negocio (id_negocio) ON DELETE CASCADE,
  CONSTRAINT fk_usuario_rol FOREIGN KEY (id_rol) REFERENCES rol (id_rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. TABLA PRODUCTO
CREATE TABLE producto (
  id_producto INT NOT NULL AUTO_INCREMENT,
  id_negocio INT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  codigo_barra VARCHAR(100) UNIQUE,
  categoria VARCHAR(100),
  precio_compra DECIMAL(10,2) NOT NULL,
  precio_venta DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT '0',
  stock_minimo INT NOT NULL DEFAULT '5',
  PRIMARY KEY (id_producto),
  CONSTRAINT fk_producto_negocio FOREIGN KEY (id_negocio) REFERENCES negocio (id_negocio) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. TABLAS DE VENTAS
CREATE TABLE venta (
  id_venta INT NOT NULL AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(12,2) NOT NULL,
  PRIMARY KEY (id_venta),
  CONSTRAINT fk_venta_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE detalle_venta (
  id_detalle INT NOT NULL AUTO_INCREMENT,
  id_venta INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(12,2) NOT NULL,
  PRIMARY KEY (id_detalle),
  CONSTRAINT fk_detalle_venta FOREIGN KEY (id_venta) REFERENCES venta (id_venta) ON DELETE CASCADE,
  CONSTRAINT fk_detalle_producto FOREIGN KEY (id_producto) REFERENCES producto (id_producto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================================
-- INSERCIÓN DE DATOS INICIALES (NECESARIOS PARA EL SISTEMA)
-- ==========================================================

INSERT INTO rol (nombre) VALUES ('Administrador'), ('Empleado');