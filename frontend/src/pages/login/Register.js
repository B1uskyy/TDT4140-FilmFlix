import react, { useState } from "react";
import "./login.css";
import posters from "../../img/posters.jpg";
import { useNavigate } from "react-router-dom";
import FilmFlixLogo from "../../img/FilmFlixLogo.svg";

function Register() {
	const [password, setPassword] = useState("");
	const [username, setUserName] = useState("");

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
						placeholder="Enter your email here"
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
						value={"Reguster user"}
					/>
				</div>
			</div>
		</div>
	);
}

export default Register;
