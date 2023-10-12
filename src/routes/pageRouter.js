import { Router } from "express";
import { home, agregarCarrito, cart, qtyCart, actualizarProduct, totalAPagar } from "../controllers/pageController.js";

const page = Router();


page.get("/", home);
page.get("/cart", cart);

page.post("/agregar-carrito", agregarCarrito);
page.post("/cantidad-carrito", qtyCart);
page.post("/actualizar-carrito", actualizarProduct);
page.post("/total-pagar", totalAPagar);


export default page;
