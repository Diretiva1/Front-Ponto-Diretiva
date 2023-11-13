"use client";
import styles from "./retrieve.module.css";

import { retrievePassword } from "../../services/auth_api.js";
import { useState } from "react";

import forgotPasswordIcon from '../../../public/forgot-password-icon.png';
import Image from "next/image";

export default function Retrieve(){

    const tempmensage = 2000;

    const [email, setEmail] = useState("");
    const [retrieveError, setRetiveError] = useState("");
    const [color, setColor] = useState("");

    const retrieveForm = async (e) => {
        e.preventDefault();

        if (email === "" ) {
            setColor("");
            setRetiveError("Email is required");
            setTimeout(function() {
                setRetiveError("")
            }, tempmensage)
            return;
        }

        const retive = {
            "email": email,
        };

        try {
            const response = await retrievePassword(retive);
    
            if (response.status !== 200) {
                setColor("#4285f4");
                setRetiveError("Email sent successfully");
            }
        } catch (error) {
        
            setColor("");
            setRetiveError(error.data.message);
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
                    Retrieve your password
                </h2>
                <a className={styles.body}>
                    Please enter the e-mail address associated with your account so that we can send you a reset link.
                </a>
                <input 
                    className={styles.form__input} 
                    type="emial" 
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <a style={{color: color === "" ? '#ff5555' : color}}>
                    {retrieveError}
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