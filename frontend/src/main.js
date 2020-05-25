import Vue from 'vue'
import App from './App.vue'
import vuetify from "@/plugins/vuetify";
import router from "@/router";
import pt from "vuetify/es5/locale/pt";

import { store } from "@/store";
import axios from "axios";

const urlRecursosRegistrados = process.env.VUE_APP_GATEWAY + "/apps/" + 
	process.env.VUE_APP_APPID + "/recursos";

axios.get(urlRecursosRegistrados)
	.then(resp => {
		if(resp.status !== 200) throw new Error();		
		store.state.recursos = resp.data;
	})
	.catch(() => {
		console.log(`O gateway não está disponível em ${process.env.VUE_APP_GATEWAY}. A aplicação não pode ser levantada!`);
	});

Vue.use(vuetify, {
	lang:{
		locales: { pt },
		current: "pt"
	}
});

Vue.config.productionTip = false;

new Vue({
	vuetify,
	router,
	store,
  render: h => h(App),
}).$mount('#app')
