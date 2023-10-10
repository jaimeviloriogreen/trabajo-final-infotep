import { request, response } from "express";
import getConnect from "../connections/createConnection.js";
import { rating } from "../helpers/getRating.js"

const conn = await getConnect();

const home = async (req = request, res = response)=>{
    const pageHome = true;
    const [rows, fields] = await conn.execute("SELECT * FROM productos");
    rows.forEach(product => product.rating = rating[product.rating])
    res.render("index", { rows , pageHome });
}
const agregarCarrito = async (req = request, res = response)=>{
    try {
        const { id } = req.body;
        const sql = 
        `INSERT INTO
            carritos(total_producto, id_producto)
        SELECT precio, producto_id
        FROM productos
        WHERE producto_id = ?;`;

        const [ ResultSetHeader ] = await conn.execute(sql, [ id ]);
        const { affectedRows } = ResultSetHeader;

        res.json({affectedRows});
    } catch (error) {
        res.json({"Error": error.message})
    }
}

const cart = async (req = request, res = response)=>{
    const sql = `
    SELECT cantidad_producto, total_producto, producto_id,
        nombre_producto, precio, imagen 
    FROM carritos 
        INNER JOIN productos 
    ON productos.producto_id = carritos.id_producto;
    `;

    const [rows, fields] = await conn.execute(sql);

    res.render("cart", { rows });
}


const qtyCart = async (req = request, res = response)=>{
    const sql = "SELECT SUM(cantidad_producto) AS cantidad_productos FROM carritos;";
    const [[ cantidad_productos ], _ ] = await conn.execute(sql);
    res.json(cantidad_productos)
}

export { home, agregarCarrito, cart, qtyCart } 