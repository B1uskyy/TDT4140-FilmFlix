import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import posters from "../../img/posters.jpg";
import FilmFlixLogo from "../../img/FilmFlixLogo.svg";
import { useUser } from "../../helpers/UserContext";

// import Logo from "./../components/Logo";æ

function Login(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [successfulLogin, setSuccessfulLogin] = useState("");
	const { setUser } = useUser();

	// eslint-disable-next-line
	const navigate = useNavigate();

	const validateCredentials = async () => {
		setSuccessfulLogin("");

		try {
			const response = await fetch("http://localhost:8080/api/users/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});
			console.log(response);

			if (!response.ok) {
				setSuccessfulLogin("Wrong username og password!");
				throw new Error(
					"Failed to authenticate user. Please check your credentials.",
				);
			}

			setUser( username ); // Update context with the username
			setSuccessfulLogin("Login successfull");
			navigate("/homepage");
		} catch (error) {
			console.log(`Error: ${error}`);
		}
	};

	const onButtonClick = () => {
		// Set initial error values to empty
		setEmailError("");
		setPasswordError("");
		setSuccessfulLogin("");

		if ("" === username) {
			// Check if the user has entered both fields correctly
			setEmailError("Please enter your username");
			return;
		}

		if ("" === password) {
			setPasswordError("Please enter a password");
			return;
		}

		if (!emailError && !passwordError) {
			validateCredentials();
		}
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
