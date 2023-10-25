"use client";

import React, { useState, useEffect } from "react";
import { BiEditAlt, BiPlus, BiSave, BiTrash } from "react-icons/bi";


import styles from "./employer.module.css";
import { getEmployeesId } from "../../services/employee_api";
import Cookies from "js-cookie";


export default function Employer(){

	const access_token = Cookies.get("access_token");

	// Pessoa API
	async function GetById(id){
		try {
			let json = await getEmployeesId(id, access_token);
			// console.log("Dados da pessoa como JSON:", json);
			setJson(json);
		} catch (error) {
			console.error("Erro ao buscar dados da pessoa:", error);
			throw error;
		}
	}

	useEffect(() => {
	}, []); 

	return (
		<>
			<br></br>
			<h1>Empregador</h1>
		</>
	);
}