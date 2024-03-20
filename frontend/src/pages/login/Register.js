// eslint-disable-next-line
import react, { useState } from "react";
import "./login.css";
import posters from "../../img/posters.jpg";
import FilmFlixLogo from "../../img/FilmFlixLogo.svg";
import axios from "axios";

function Register() {
	const [password, setPassword] = useState("");
	const [username, setUserName] = useState("");

	const registerUser = async () => {
		try {
			const response = await axios.post("http://localhost:8080/api/users/register", {
				username: username,
				password: password,
			},
				{
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
					},
				});

			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const toLogin = async () => {
		window.location.href = "/";
	}

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
						onChange={(ev) => setUserName(ev.target.value)}
						className={"inputBox"}
					/>
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
				</div>
				<br />
				<div className={"inputContainer"}>
					<input
						className={"inputButton"}
						type="button"
						value={"Register user"}
						onClick={() => {
							registerUser();
							toLogin();
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default Register;
