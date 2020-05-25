import Axios from "axios";

let url = process.env.VUE_APP_GATEWAY + "/rest";

const http = Axios.create({
	baseURL: url
});

http.interceptors.request.use(async (config) => {
	const token = localStorage.getItem("Authorization");

	let headers = {
		withCredentials: true,
		Accept : "application/json",
		appId: process.env.VUE_APP_APPID,
		Authorization: token,
		"Content-type": "application/json"
	};

	config.headers = headers;

	return config;
}, error => {
	return Promise.reject(error);
}); 

http.interceptors.response.use(response => {
	return response;
}, error => {

	return Promise.reject(error.response.data);
});

export default http;