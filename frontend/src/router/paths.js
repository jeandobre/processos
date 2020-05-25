import Publico from "@/components/Publico.vue";
import Login from "@/components/Login.vue";
import NaoAutorizado from "@/components/NaoAutorizado.vue";

export default [{
	path: "/",
	name: "Publico",
	component: Publico
}, {
	path: "/administrador",
	name: "Administrador",
	meta: {
		requiresAuth: true,
		papeis: ["administrador"]
	},
	component: (resolve) => import(/* webpackChunkName: "apps" */ "@/components/Administrador.vue").then(resolve)
}, {
	path: "/listagem",
	name: "Listagem",
	meta: {
		requiresAuth: true,
		papeis: ["operador", "administrador"]
	},
	component: (resolve) => import(/* webpackChunkName: "apps" */ "@/components/Listagem.vue").then(resolve)
}, {
	path: "/login",
	name: "Login",
	component: Login
}, {
	path: "/nao-autorizado",
	name: "NaoAutorizado",
	component: NaoAutorizado
}, 
{
	path: "*",
	name: "404",
	component: require(/* webpackChunkName: "not_found" */ "@/components/NotFound.vue").default //load sync 404
}]; 