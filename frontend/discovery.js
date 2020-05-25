const request = require("request");
require("dotenv").config();

const ambiente = process.env.NODE_ENV;
const gatewayURL = process.env.VUE_APP_GATEWAY;
const appId = process.env.VUE_APP_APPID;

const url = `${gatewayURL}/registry/apps/${appId}`;

request.post({
	url, 
	form: {
		nome: "processos",
		ambiente,
		papeis: [{
			nome: "administrador",
			admin: true,
			restrito: true
		}, {
			nome: "operador",
			admin: false,
			restrito: false,
			recursos: ["obter-processo", "listar-processos", "remover-processo", "alterar-processo", "criar-processo"]
		}],
		//recursosPublicos: [""]
	}
}, function (err, res, bodyString){
	if(err) console.log(err);
	
	const body = JSON.parse(bodyString);

	if(res && res.statusCode != 201){
		console.log(res.statusCode);

		const { errors } = body;
		console.log(errors.map(err => err.detail));
		throw new Error("Erro ao registrar gateway");	
	}

	console.log(`Gateway ${url} - processo terminado!`);

});

