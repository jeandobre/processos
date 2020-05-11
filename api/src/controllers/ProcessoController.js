import ProcessoPolitico from "../models/ProcessoPolitico";

export default {

	byId: async (req, res) => {

		const { id } = req.params;

		const processos = await ProcessoPolitico.find({ _id: id });
		const processo = processos[0];

		res.json(processo);
	},

	index: async (req, res) => {

		const lista = await ProcessoPolitico.find({});

		res.json(lista);
	},

	save: async (req, res) => {

		const { numero, descricao, texto } = req.body;
		
		const processo = new ProcessoPolitico({
			numero,
			descricao,
			texto
		});

		await processo.save();
		
		res.status(201).json({
			id: processo._id
		})
	},

	delete: async (req, res) => {

		const { id } = req.params;

		await ProcessoPolitico.deleteOne({ _id: id });

		res.json({
			"ok": "Removido com sucesso!"
		});
	},

	update: async (req, res) => {
		const { id } = req.params;

		const { numero, descricao, texto } = req.body;

		const processo =	await ProcessoPolitico.findOneAndUpdate({ _id: id }, {
			numero,
			descricao,
			texto
		}, { new: true, omitUndefined: true });

		res.status(200).json(processo);
	}
};