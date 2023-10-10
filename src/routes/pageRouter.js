import { Router } from "express";
import { home, agregarCarrito, cart, qtyCart } from "../controllers/pageController.js";

const page = Router();


page.get("/", home);
page.get("/cart", cart);

page.post("/agregar-carrito", agregarCarrito);
page.post("/cantidad-carrito", qtyCart);



export default page;
