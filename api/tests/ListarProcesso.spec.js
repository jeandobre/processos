import request from "supertest";
import app from "../src/app";
import Processo from "../src/models/ProcessoPolitico";

describe("Routes: Processos", () => {
	let processo1, processo2;

	beforeEach(async done => {
		await Processo.deleteMany({});
		processo1 = new Processo({
			numero: "01",
			descricao: "Novo processo",
			texto: "Novo processo"
		});

		processo2 = new Processo({
			numero: "0564",
			descricao: "Processo de teste 3",
			texto: "Outro caso de processo cadastrado com sucesso!"
		});

		await Processo.insertMany([ processo1, processo2 ]);

		done();
	});

	it("200 Deve listar com sucesso!", async done => {
		request(app)
		.get("/processos")
		.expect(200)
		.end((err, res) => {
			const listagem  = res.body;
			expect(listagem).toHaveLength(3);
		
		//	expect(listagem[0]._id).toEqual(processo1._id);

		//	expect(listagem[1]._id).toEqual(processo2._id);
			done(err);
		});
	});

});