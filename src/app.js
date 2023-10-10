import express from "express";
import { create } from 'express-handlebars';
import "dotenv/config";

import page from "./routes/pageRouter.js";

const app = express();
const port = process.env.PORT || 4500;

const hbs = create({ extname:".hbs",  partialsDir:['./src/views/components'] });
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './src/views');

app.use(express.static("./src/public"));
app.use(express.json({"Content-Type":"application/json;charset=utf-8;"}))
app.use(page); // Page Router

app.listen(port, ()=> console.log(`Running on port ${port}`));