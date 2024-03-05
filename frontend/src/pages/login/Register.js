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
<<<<<<< HEAD
			const response = await axios.post("http://localhost:8080/api/users", {
				username,
				password,
			});
=======
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
>>>>>>> 5cf48317bf9a430f7813561d29bcfc4a0b2f5f85

			console.log(response.data);
		} catch (error) {
			console.log(error);
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
						onClick={() => registerUser()}
					/>
				</div>
			</div>
		</div>
	);
}

export default Register;
