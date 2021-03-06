import express from "express";
//import { celebrate, Segments, Joi } from "celebrate";
import express from "express";
import cors from "cors";
import { errors } from "celebrate";
import routes from "./routes";
import db from "./db";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;