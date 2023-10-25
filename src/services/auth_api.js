import axios from "axios";

// require("dotenv").config();

// Agora você pode acessar as variáveis de ambiente definidas no .env
const API_URL = "http://localhost:8080";//process.env.API_URL;

const SIGIN_URL = `${API_URL}/sigin`;
const SIGUP_URL = `${API_URL}/users`;
  
export async function sigIn(dataSigIn) {
	try {
		const response = await axios.post(
			SIGIN_URL,
			dataSigIn,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then(response => {
				// console.log("Resposta da API:", response.data);
				return response;
			})
			.catch(error => {
				console.error("Erro: " + error.message);
				throw error;
			});

		return {
			status: response.status,
			data:response.data
		};
	  } catch (error) {
		console.error("Erro ao buscar dados da cliente:", error);
		throw error;
	  }
	
}

export async function sigUp(dataSigUp){
	try {
		const response = await axios.post(
			SIGUP_URL,
		  	dataSigUp, 
		  	{
			  headers: {
					"Content-Type": "application/json",
			  },
			}
		)
			.then(response => {
				// console.log("Resposta da API:", response.data);
				return response;
			})
			.catch(error => {
				console.error("Erro: " + error.message);
				throw error;
			});

		return {
			status: response.status,
			data:response.data
		};
	} catch (error) {
		console.error("Erro: " + error.message);
	}
}

