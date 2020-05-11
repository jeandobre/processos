import express from "express";
import Index from "./controllers/Index";
import Processos from "./controllers/ProcessoController";

const routes = new express.Router();

routes.get("/", Index.index);
routes.route("/processos")
	.get(Processos.index)
	.post(Processos.save);

routes.route("/processos/:id")
	.get(Processos.byId)
	.put(Processos.update)
	.delete(Processos.delete);


export default routes;