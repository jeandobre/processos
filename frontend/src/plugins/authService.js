import jwt from "jsonwebtoken";

const VAR_STORAGE = "Authorization";

const authService = {
	
	VAR_STORAGE,
	
	getId(){
		let token = localStorage.getItem(VAR_STORAGE);
		if (token){
			let decoded = jwt.decode(token);
			return decoded.id;
		}else{
			return null;
		}
	},

	getUsuario(){
		let token = localStorage.getItem(VAR_STORAGE);
		if (token){
			let decoded = jwt.decode(token);
			return {
				id: decoded.id,
				login: decoded.usuario
			};
		} else {
			return null;
		}	
	},

	logout(){
		localStorage.removeItem(VAR_STORAGE);
		window.location = "/";
	},

	estaAutenticado(){			
		return (localStorage.getItem(VAR_STORAGE) !== null);
	},

	temPermissao(papeisPermitidos = [], papeisDoUsuario){
		//const store = vuex.Store;

		if(papeisPermitidos){

			for(let i = 0; i < papeisPermitidos.length; i++){
				const papel = papeisPermitidos[i];

				if(papeisDoUsuario.includes(papel)) return true;
			}

			return false;
		}

		return true;
		
	},


};

export default authService;
