import axios from "axios";

require("dotenv").config();

// Agora você pode acessar as variáveis de ambiente definidas no .env
const API_URL = "http://localhost:3000";//process.env.API_URL;

const CLIENTE_URL = `${API_URL}/employers`;

export async function getEmployersId(getEmployersId, token){
	try {
		const response =  axios.get(
			`${CLIENTE_URL}/${getEmployersId}`,
			{
				headers: {
		  		"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
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

		return response;
	} catch (error) {
		  console.error("Erro:", error.message);
		  throw error;
	}
}