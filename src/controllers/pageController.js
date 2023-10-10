import { request, response } from "express";
import getConnect from "../connections/createConnection.js";
import { rating } from "../helpers/getRating.js"

const home = async (req = request, res = response)=>{
    const conn = await getConnect();
    const [rows, fields] = await conn.execute("SELECT * FROM productos");
    rows.forEach(product => product.rating = rating[product.rating])
    res.render("index", { rows });
}

export { home } 