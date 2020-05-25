<template>
	<div>
		<v-data-table class="elevation-1"
			:headers="headers"
			:items="lista"
			:items-per-page="20">	

			<template v-slot:top>
				<v-toolbar flat color="white">
					<v-toolbar-title>Processos</v-toolbar-title>
					<v-divider
						class="mx-4"
						inset
						vertical
					></v-divider>
					<v-spacer></v-spacer>
					<v-dialog v-model="dialog" max-width="500px">
						<template v-slot:activator="{ on }">
							<v-btn color="primary" dark class="mb-2" v-on="on">Novo processo</v-btn>
						</template>
						<v-card>
							<v-card-title>
								<span class="headline">{{ formTitle }}</span>
							</v-card-title>

							<v-card-text>
								<v-container>
									<v-row>
										<v-col cols="12" sm="6" md="4">
											<v-text-field v-model="editedItem.numero" label="Número"></v-text-field>
										</v-col>
										<v-col cols="12" sm="6" md="4">
											<v-text-field v-model="editedItem.descricao" label="Descrição"></v-text-field>
										</v-col>
										<v-col cols="12" sm="6" md="4">
											<v-text-field v-model="editedItem.texto" label="Texto"></v-text-field>
										</v-col>            
									</v-row>
								</v-container>
							</v-card-text>

							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
								<v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
			</template>

			<template v-slot:item.actions="{ item }">
				<v-icon small class="mr-2" @click="editItem(item)">>
					mdi-pencil
				</v-icon>

				<v-icon
					small
					@click="deleteItem(item)">
					mdi-delete
				</v-icon>
							
			</template>
		</v-data-table>
	</div>
</template>

<script>
import axios from "@/plugins/axios";
import { mdiAccount } from "@mdi/js";

function obterRecursos(recursos = [], recurso = "") {
	const obtido = recursos.find(el => el.nome === recurso);
	if(!obtido) return "";

	return obtido.rota;
}

export default {

	name: "Listagem",
	data() {
		return {
			dialog: false,
			lista: [],
			headers: [{
				text: "#",
				align: "start",
				sortable: false,
				value: "_id",
				with: 150
			}, {
				text: "Numero",
				value: "numero"
			}, {
				text: "Descrição",
				value: "descricao"
			}, {
				text: "Texto",
				value: "texto",
				with: 200
			}, { text: 'Ações', value: 'actions', sortable: false }],
			editedIndex: -1,
			editedItem: {
        numero: '',
				texto: '',
				descricao: ''
      },
      defaultItem: {
        numero: '',
				texto: '',
				descricao: ''
			},
			svgPath: mdiAccount,
		}
	},

	computed: {
		formTitle () {
			return this.editedIndex === -1 ? 'Novo processo' : 'Alterar processo'
		},
	},

	watch: {
		dialog (val) {
			val || this.close()
		},
	},

	methods: {
		listar(){
			axios.get(obterRecursos(this.recursos, "listar-processos"))
				.then(response => {
					this.lista = response.data;
				});
		},

		editItem(item){
			this.editedIndex = this.lista.indexOf(item)
			
			axios.get(obterRecursos(this.recursos, "obter-processo").replace("{id}", item._id))
			.then(response => {

				this.editedItem = {
					_id: response.data._id,
					numero: response.data.numero,
					texto: response.data.texto,
					descricao: response.data.descricao
				}
				this.dialog = true
			});
		},
		
		deleteItem(item){
			const index = this.lista.indexOf(item)

			if(confirm('Deseja realmente remover este processo?')){
				axios.delete(obterRecursos(this.recursos, "remover-processo").replace("{id}", item._id)).then(() => {
					this.lista.splice(index, 1)
				});
			}
		},
		
		close () {
			this.dialog = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			})
		},

		save () {

			if(this.editedIndex > -1){
				axios.put(obterRecursos(this.recursos, "alterar-processo").replace("{id}", this.editedItem._id), {
					numero: this.editedItem.numero,
					descricao: this.editedItem.descricao,
					texto: this.editedItem.texto
				}).then(() => {
					this.listar();
				});

			} else {
				axios.post(obterRecursos(this.recursos, "criar-processo"), {
					numero: this.editedItem.numero,
					descricao: this.editedItem.descricao,
					texto: this.editedItem.texto
				}).then(() => {
					this.listar();
				});		
			}
			this.close();
		},
	},

	created(){
		const recursosCompletos = this.$store.state.recursos;
		this.recursos = recursosCompletos.map(rec => {
			return {
				nome: rec.nome,
				rota: rec.rotaExterna
			}
		});

		this.listar();		
	}
}
</script>

<style>

</style>