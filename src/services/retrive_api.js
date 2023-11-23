import axios from "axios";

// require("dotenv").config();

// Agora você pode acessar as variáveis de ambiente definidas no .env
const API_URL = 'http://localhost:8080';//process.env.API_URL;

const RETRIEVE_URL = `${API_URL}/retrieve`;
const UPDATE_URL = `${API_URL}/users`;
 
export async function retrievePassword(retrieve){
	try {
		const response = await axios.post(
			RETRIEVE_URL,
		  	retrieve, 
		  	{
			  headers: {
					"Content-Type": "application/json",
			  },
			}
		)
			.then(response => {
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
		throw error.response;
	}
}

export async function updatePassword(retrieve, user_id, token){
	try {
		const response = await axios.put(
			`${UPDATE_URL}/${user_id}`,
			retrieve,
			{
				headers: {
		  			"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
	  		}
		)
			.then(response => {
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
		throw error.response;
	}
}
