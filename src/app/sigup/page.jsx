"use client";
import styles from "./sigin.module.css";

import Button from "../../component/Button/button.jsx";

import { sigUp, sigIn } from "../../services/auth_api.js";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { decode } from 'jsonwebtoken';

const sigup = "sigup";

export default function Sigup(){

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter(); 

	const sigupForm = async (e) => {
		e.preventDefault();

		const sigup = {
			"user_tag": username,
			"user_password": password
		};

		const responseSigUp = await sigUp(sigup);
		
		const sigin = {
			"user_tag": sigup.user_tag,
			"user_password": sigup.user_password
		};
		
		if (responseSigUp.status === 201) {
			
			const responseSigIn = await sigIn(sigin);
			
			if (responseSigIn.status === 200) {
				
				const token = responseSigIn.data.access_token;
				
				if(token){
					console.log("responseSigUp");
					
					const decodedToken = decode(token);
		
					Cookies.set("access_token", token, { expires: 1, path: "/" });
		
					router.replace('/'+decodedToken.permissions[0]);
					
				}else{
	
					console.log("erro no sigin");
				
				}
			}
		}else{

			console.log(responseSigUp);
		
		}
	};

	return (
		<div className={styles.siguppage}>
			<div className={styles.form}>
				<form className={styles.registerform}>
					<input
						type="text"
						placeholder="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						type="password"
						placeholder="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						style="primary"
						click={sigupForm}
						body={sigup}
					/>
					<p className="message">
						Already registered? 
						<a href="/sigin">
							Sign In
						</a>
					</p>
				</form>
			</div>
		</div>
    
	);
}