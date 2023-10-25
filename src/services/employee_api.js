import axios from "axios";

require("dotenv").config();

// Agora você pode acessar as variáveis de ambiente definidas no .env
const API_URL = "http://localhost:3000";//process.env.API_URL;

const PESSOA_URL = API_URL+"/pessoa";

export async function getEmployeesId(getEmployeesId, token) {
	try {
		const response = await axios.get(
			`${PESSOA_URL}/${getEmployeesId}`,
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

		return response.data;
	} catch (error) {
		  console.error("Erro:", error.message);
		  throw error;
	}
}
