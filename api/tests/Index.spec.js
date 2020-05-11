import request from "supertest";
import app from "../src/app";

describe("Routes: Index", () => {

	it("200 Deve apresentar ok com sucesso!", async () => {
		const response = await request(app).get("/");

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("ok");
		expect(response.body.ok).toBe("Rodando");
	});

});