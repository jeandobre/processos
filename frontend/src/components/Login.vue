<template>
	<div>
     <v-container>
      <v-row dense>
        <v-col cols="4">
          <v-card
            color="#385F73"
            dark>
            <v-card-title class="headline">Sem usuário</v-card-title>

            <v-card-subtitle>Realiza o logout e remove a sessão do usuário.</v-card-subtitle>

            <v-card-actions>
              <v-btn text @click="logout" >Logout</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="4"
        >
          <v-card
            :color="item.color"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.title"
                ></v-card-title>

                <v-card-subtitle v-text="item.artist"></v-card-subtitle>
              </div>
            </div>
            <v-card-actions>
              <v-btn text @click="item.login" >Fazer o login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <blockquote class="blockquote">
      {{ token }}
    </blockquote>
    <p>
      Usuario: <kbd>{{ usuario }}</kbd>			
    </p>
		<p>
			Papeis: <kbd>{{ papeis }}</kbd>
		</p>

	</div>
</template>

<script>
import axios from "@/plugins/axios";
import auth from "@/plugins/authService";

import { mapState, mapMutations } from "vuex";

export default {

	data(){
    return {
      items: [
        {
          color: '#1F7087',
          src: '',
          title: 'Usuário: secretario',
          artist: 'Acesso à area pública e processos.',
          login: () => {
            console.log("login secretario");
						this.autenticar("secretario", "123456");
						this.setPapeis([{
							nome: "operador",
							admin: false,
							restrito: false,
							passaporte: {
								nome: "operador"
							}
						}]);
						this.setUsuario("secretario");
          }
        },
        {
          color: '#952175',
          src: '',
          title: 'Usuário: Administrador',
          artist: 'Acesso à tudo inclusive área restrita',
          login: () => {
            console.log("login administrador");
						this.autenticar("administrador", "123456");
						this.setPapeis([{
							nome: "administrador",
							admin: true,
							restrito: true,
							passaporte: {
								nome: "administrador",
								dados: {
									faculdadeId: 17
								}
							}
						}]);
						this.setUsuario("administrador");
          }
        },
      ],
      token: '',
    }
	},

	computed: {
		...mapState(["usuario", "papeis"])
	},
	
  methods: {
		
		...mapMutations(["setUsuario", "setPapeis"]),
		
		logout() {
      console.log("sair");
			this.setUsuario("");
			this.setPapeis([]);
      this.token = '';
      localStorage.removeItem("Authorization"); 
    },

    autenticar(usuario, senha) {
      axios({
        url: "/login",
        baseURL: process.env.VUE_APP_GATEWAY,
        method: "post",
        data: {
          usuario,
          senha,
          manterConectado: true
        },
        params: {
          fa: "mock"
        }
      })
      .then((resp) => {
        if(resp.data.autenticado === true){
          alert("Autenticado com sucesso!");
        }
        this.token = resp.data.token;
        localStorage.setItem("Authorization", this.token);
        auth.getUsuario();
      })
      .catch((err) => {
        console.log(err);
			});
		}
	},
	
	created(){
		this.token = localStorage.getItem("Authorization");
	}
}
</script>

<style>

</style>