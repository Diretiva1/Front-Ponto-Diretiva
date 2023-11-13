"use client";
import styles from "./new_password.module.css";

import { retrievePassword } from "../../../services/auth_api.js";
import { useState } from "react";
import forgotPasswordIcon from '../../../../public/forgot-password-icon.png';
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function RetrievById( {params} ){

	const tempmensage = 2000;

    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordError, setRetiveError] = useState("");
    const [color, setColor] = useState("");
	
	const router = useRouter();
	
	const token = params.id;

    const retrieveForm = async (e) => {
        e.preventDefault();

        if (password1 === "" && password2 === "") {
            setColor("");
            setRetiveError("Password is required");
            setTimeout(function() {
                setRetiveError("")
            }, tempmensage)
            return;
        }

		if (password1 === password2) {

			const retive = {
				"password": password1,
			};

			try {
				const response = await retrievePassword(retive);
		
				if (response.status !== 200) {
					setColor("#4285f4");
					setRetiveError("New password sent successfully");

					setTimeout(function() {
						setRetiveError("")
					}, tempmensage)

					router.replace('/signin');
				}
			} catch (error) {
			
				setColor("");
				setRetiveError(error.data.message);
				setTimeout(function() {
					setRetiveError("")
				}, tempmensage)
			}
		}else{
			setColor("");
			setRetiveError("Passwords do not match");
			setTimeout(function() {
				setRetiveError("")
			}, tempmensage)
		}
    };
    return (
        <div className={`${styles.container} ${styles['b-container']}`} id={styles['b-container']}>
            <form 
                className={styles.form} 
                method="" 
                action=""
                onSubmit={retrieveForm}
            >     
				<div className={styles.title__icons}>
                    <Image 
                        width={200}
                        height={200} 
                        className={styles.title__icon} 
                        src={forgotPasswordIcon} 
                        alt="Forgot Password Icon" 
                    />
                </div>      
                <h2 className={`${styles.title}`}>
                    New password
                </h2>
                <a className={styles.body}>
					To update your password, enter a new password and repeat it. The password must be strong and secure, with at least 8 characters, including uppercase letters, lowercase letters, numbers and special characters.
                </a>
                <input 
                    className={styles.form__input} 
                    type="password" 
                    placeholder="Password"
                    onChange={(e) => setPassword1(e.target.value)}
                />
				<input 
                    className={styles.form__input} 
                    type="password" 
                    placeholder="Password"
                    onChange={(e) => setPassword2(e.target.value)}
                />
                <a style={{color: color === "" ? '#ff5555' : color}}>
                    {passwordError}
                </a>
                <button 
                    className={`${styles.switch__button} ${styles.button}`}
                    onClick={retrieveForm}
                    >
                    SEND
                </button>
            </form>
        </div>
	);
}