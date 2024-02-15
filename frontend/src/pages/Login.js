import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const navigate = useNavigate();

	return (
		<div className={"inputContainer"}>
			<input
				value={email}
				placeholder="Enter your email here"
				onChange={(ev) => setEmail(ev.target.value)}
				className={"inputBox"}
			/>
			<label className="errorLabel">{emailError}</label>
		</div>
	);
}

export default Login;
