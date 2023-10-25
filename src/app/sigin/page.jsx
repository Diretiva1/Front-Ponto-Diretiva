"use client";
import styles from "./sigin.module.css";

import Button from "../../component/Button/button.jsx";

import { sigIn } from "../../services/auth_api.js";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { decode } from 'jsonwebtoken';

const sigin = "sigin";

export default function Sigin(){

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter();

	const siginForm = async (e) => {
		e.preventDefault();

		const sigin = {
			"user_tag": username,
			"user_password": password
		};

		const response = await sigIn(sigin);

		if (response.status === 200) {

			const token = response.data.access_token;

			if(token){

				const decodedToken = decode(token);
	
				Cookies.set("access_token", token, { expires: 1, path: "/" });
	
				router.replace('/'+decodedToken.permissions[0]);
				
			}else{

				console.log("erro no sigin");
			
			}
		}
	};

	return (
		<div className={styles.siginpage}>
			<div className={styles.form}>
				<form 
					className={styles.siginform}
					onSubmit={siginForm}
				>
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
						style="secondary"
						click={siginForm}
						body={sigin}
					/>
					<p className="message">
						Not registered? 
						<a href="/sigup">
							Create an account
						</a>
					</p>
				</form>
			</div>
		</div>
	);
}