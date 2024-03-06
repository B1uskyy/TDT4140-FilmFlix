import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import posters from "../../img/posters.jpg";
import users from "../../data/users.json";
import FilmFlixLogo from "../../img/FilmFlixLogo.svg";

// import Logo from "./../components/Logo";æ

function Login(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [successfulLogin, setSuccessfulLogin] = useState("");
	// eslint-disable-next-line
	const navigate = useNavigate();

	const validateCredentials = async () => {
		try {
		} catch (error) {
			console.log(error);
		}
	};

	const onButtonClick = () => {
		// Set initial error values to empty
		setEmailError("");
		setPasswordError("");
		setSuccessfulLogin("");

		// Check if the user has entered both fields correctly
		if ("" === username) {
			setEmailError("Please enter your email");
			return;
		}

		// eslint-disable-next-line
		if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username)) {
			// REGEX for å oppgi en valid epost
			setEmailError("Please enter a valid email");
			return;
		}

		if ("" === password) {
			setPasswordError("Please enter a password");
			return;
		}

		// Authentication calls will be made here...

		validateCredentials();
	};

	return (
		<div className={"mainContainer"}>
			<div className="leftSide">
				<img src={posters} alt="poster" className="posterImage" />
			</div>
			<div className="rightSide">
				{/* <Logo /> */}
				<img src={FilmFlixLogo} alt="Logo" className="filmFlixLogo" />
				<div className={"inputContainer"}>
					<p className="inputTitle">Username</p>
					<br />
					<input
						value={username}
						placeholder="Enter your username here"
						onChange={(ev) => setUsername(ev.target.value)}
						className={"inputBox"}
					/>
					<label className="errorLabel">{emailError}</label>
				</div>
				<br />
				<div className={"inputContainer"}>
					<p className="inputTitle">Password</p>
					<br />
					<input
						type="password"
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
						value={"Enter FilmFlix"}
					/>
					<label className="successfulLogin">{successfulLogin}</label>
				</div>
				<a href="/register" className="signupLink">
					{" "}
					New user? Sign up
				</a>
			</div>
		</div>
	);
}

export default Login;
