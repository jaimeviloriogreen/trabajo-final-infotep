DROP TABLE carritos;

DROP TABLE productos;

CREATE TABLE productos(
    producto_id INT PRIMARY KEY AUTO_INCREMENT, 
    nombre_product VARCHAR(100) NOT NULL,
    precio DECIMAL(15, 2) NOT NULL,
    imagen VARCHAR(50) NOT NULL UNIQUE,
    rating DECIMAL(2, 1) NOT NULL
);

CREATE TABLE carritos(
    carritos_id INT PRIMARY KEY AUTO_INCREMENT,
    cantidad_producto INT NULL DEFAULT(1),
    total_producto DECIMAL(25, 2),
    id_producto INT NOT NULL UNIQUE,
    FOREIGN KEY(id_producto) REFERENCES productos(producto_id)
);

INSERT INTO productos(nombre_product, precio, imagen, rating)
VALUES
	('Iphone 12 SE PRO', 400.00, 'iphone.jpeg', 4.5),
    ('PS4 Remote Controller', 29.99 , 'controll-ps.jpeg', 3.5),
    ('Macbook Air 2017', 889.99, 'macbook.jpeg', 5), 
    ('Bose Over-Ear Headphone', 329.99, 'earphone.jpeg', 3.5), 
    ('Nikon D750 DSLR', 796.95, 'nikon-camera.jpeg', 4.5),
    ('Phantom Drone 4 PRO', 2399.00, 'drone.jpeg', 5),
    ('PlayStation 5 Console', 499.00, 'ps5.jpeg', 4.5), 
    ('Apple Watch SE', 239.99, 'apple-watch.jpeg', 5);

-- Insertar en el carrito
INSERT INTO
    carritos(total_producto, id_producto)
SELECT precio, producto_id
FROM productos
WHERE producto_id = 1;

SELECT cantidad_producto, total_producto, producto_id,
nombre_producto, precio, imagen, rating 
FROM carritos 
INNER JOIN productos 
ON productos.producto_id = carritos.id_producto;

-- Actualizar cantidad en el carrito

UPDATE carritos
INNER JOIN productos
ON productos.producto_id = carritos.id_producto
SET cantidad_producto = 5,
total_producto = productos.precio * carritos.cantidad_producto
WHERE productos.producto_id = 1;


--