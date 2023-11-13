import axios from "axios";

// require("dotenv").config();

// Agora você pode acessar as variáveis de ambiente definidas no .env
const API_URL = 'http://localhost:8080';//process.env.API_URL;

const SIGNIN_URL = `${API_URL}/signin`;
const SIGNUP_URL = `${API_URL}/users`;
const RETRIEVE_URL = `${API_URL}/retrieve`;
  
export async function signIn(dataSignIn) {
	try {
		const response = await axios.post(
			SIGNIN_URL,
			dataSignIn,
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

export async function signUp(dataSignUp){
	try {
		const response = await axios.post(
			SIGNUP_URL,
		  	dataSignUp, 
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
