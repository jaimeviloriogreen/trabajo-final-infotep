import { Router } from "express";
import { home } from "../controllers/pageController.js";

const page = Router();


page.get("/", home);



export default page;
