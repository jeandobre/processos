import express from "express";
import Index from "./controllers/Index";

const routes = new express.Router();

routes.get("/", Index.index);


export default routes;