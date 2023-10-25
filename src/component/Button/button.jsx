import styles from "./button.module.css";

const types = {
	primary: styles.primary,
	secondary: styles.secondary,
};


export default function Button(props) {

	const verifyTypes =(valor) => (types[valor] ? types[valor] : styles.primary);
	
	return (
		<button 
			type="button"
			className={verifyTypes(props.style)}
			onClick={props.click}
		>
			{props.body}
		</button>)
	;
}