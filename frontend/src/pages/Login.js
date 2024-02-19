import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/login.css";
import posters from "./../img/posters.jpg";
import users from "./../data/users.json";

// import Logo from "./../components/Logo";

function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [successfulLogin, setSuccessfulLogin] = useState("");

	// eslint-disable-next-line
	const navigate = useNavigate();

	const validateCredentials = async () => {
		try {
			// Set initial error values to empty
			setEmailError("");
			setPasswordError("");

			// Check if the user has entered both fields correctly
			if ("" === email) {
				setEmailError("Please enter your email");
				return;
			}

			if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
				setEmailError("Please enter a valid email");
				return;
			}

			if ("" === password) {
				setPasswordError("Please enter a password");
				return;
			}

			// Find matching user in the data
			const foundUser = users.find(
				(user) => user.email === email && user.password === password,
			);

			if (foundUser) {
				setSuccessfulLogin("Login successful!");
				const path = "/";
				navigate(path);
				// Store any user data or tokens if available
			} else {
				throw new Error("Invalid email or password");
			}
		} catch (error) {
			console.error("Login error:", error);
			setEmailError("Invalid email or password");
		}
	};

	const onButtonClick = () => {
		// Set initial error values to empty
		setEmailError("");
		setPasswordError("");
		setSuccessfulLogin("");

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

		validateCredentials();
	};

	return (
		<div className={"mainContainer"}>
			<div className="leftSide">
				<img src={posters} alt="poster" className="posterImage" />
			</div>
			<div className="rightSide">
				{/* <Logo /> */}
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
					<a href="/register" className="signupLink">
						{" "}
						New user? Sign up
					</a>
					<label className="successfulLogin">{successfulLogin}</label>
				</div>
				<h3 className="filmFlixFooterLogo"> FilmFlix</h3>
			</div>
		</div>
	);
}

export default Login;
