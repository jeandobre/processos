const mongoose = require('mongoose');

const configMongo = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
};

const DB = "mongodb://usuarioteste:usuarioteste@10.30.3.230:27017/teste"

	mongoose.connect(DB, configMongo, (err, client) => {
		if (err) return console.log('Erro ao realizar conexão com o banco de dados: ' + err);

		console.log("Conectado ao mongo teste!");
	});

	export default mongoose;

