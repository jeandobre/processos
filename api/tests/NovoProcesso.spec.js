import request from "supertest";
import app from "../src/app";
import Processo from "../src/models/ProcessoPolitico";

describe("Routes: Processos", () => {

	beforeAll(async () => {
		await Processo.deleteMany({});
	});

	it("201 Deve cadastrar com sucesso!", async done => {
		request(app)
		.post("/processos")
		.send({
			numero: "123",
			descricao: "Processo judicial",
			texto: "Apenas um teste"
		})
		.expect(201)
		.end((err, res) => {
			expect(res.body).toHaveProperty("id");
			done(err);
		});
	});

});