// eslint-disable-next-line
import react, { useState } from "react";
import "./login.css";
import posters from "../../img/posters.jpg";
import FilmFlixLogo from "../../img/FilmFlixLogo.svg";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Register() {
	const [password, setPassword] = useState("");
	const [username, setUserName] = useState("");

	// navigate
	const navigate = useNavigate();

	const registerUser = () => {
		const response = axios.post("http://localhost:8080/api/users/register", {
			username: username,
			password: password,
		},
			{
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
			}).then((response) => {
			console.log(response.status)
				const json = response.data;

				if (json.status === "success") {
					alert("User registered");
					navigate("/");
				}

			}).catch((error) => {
				if (error.response.status === 400) {
					alert("No username or password provided");
					return;
				}
				else if (error.response.status === 409) {
					alert("Username already exists");
					return;
				}

				alert("Unknown error - contact support");
			})
		;
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
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default Register;
