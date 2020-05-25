import Vue from "vue";
import VueRouter from "vue-router";
import auth from "@/plugins/authService";
import { store } from "@/store";

// As rotas estão aqui
import routes from "./paths";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	routes,
	linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
	const papeisDoUsuario = store.state.papeis.map(p => p.nome);

	if(to.meta.requiresAuth){
		if(!auth.estaAutenticado()){
			next({ name: "Login" });
		} else if(!auth.temPermissao(to.meta.papeis, papeisDoUsuario)){
			next({ name: "NaoAutorizado" })
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;