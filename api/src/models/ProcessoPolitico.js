import { Schema } from "mongoose";
import mongoose from "mongoose";

const ProcessoSchema = new Schema({
	numero: String,
	descricao: String,
	texto: String,
	dataCadastro: {
		type: Date,
		default: new Date()
	}
}, { collection: "processos" });

module.exports = mongoose.model("Procesos", ProcessoSchema);