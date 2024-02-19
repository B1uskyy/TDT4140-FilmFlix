import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/login.css";
import posters from "./../img/posters.jpg";

function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	// eslint-disable-next-line
	const navigate = useNavigate();

	const onButtonClick = () => {
		// Set initial error values to empty
		setEmailError("");
		setPasswordError("");

		// Check if the user has entered both fields correctly
		if ("" === email) {
			setEmailError("Please enter your email");
			return;
		}

		// eslint-disable-next-line
		if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
			// REGEX for å oppgi en valid epost
			setEmailError("Please enter a valid email");
			return;
		}

		if ("" === password) {
			setPasswordError("Please enter a password");
			return;
		}

		// Authentication calls will be made here...
	};

	return (
		<div className={"mainContainer"}>
			<div className="leftSide">
				<img src={posters} alt="poster" className="posterImage" />
			</div>
			<div className="rightSide">
				<h1 className="filmFlixTitle">FilmFlix</h1>
				<div className={"titleContainer"}>
					<div>Login</div>
				</div>
				<br />
				<div className={"inputContainer"}>
					<p className="inputTitle">Username</p>
					<input
						value={email}
						placeholder="Enter your email here"
						onChange={(ev) => setEmail(ev.target.value)}
						className={"inputBox"}
					/>
					<label className="errorLabel">{emailError}</label>
				</div>
				<br />
				<div className={"inputContainer"}>
					<p className="inputTitle">Password</p>
					<input
						value={password}
						placeholder="Enter your password here"
						onChange={(ev) => setPassword(ev.target.value)}
						className={"inputBox"}
					/>
					<label className="errorLabel">{passwordError}</label>
				</div>
				<br />
				<div className={"inputContainer"}>
					<input
						className={"inputButton"}
						type="button"
						onClick={onButtonClick}
						value={"Log in"}
					/>
				</div>
			</div>
		</div>
	);
}

export default Login;
