import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "./SessionContext"; // Endre dette med den faktiske stien

// Enkel innloggingskomponent
function Login() {
  // Lokale tilstander for e-post, passord og feilmeldinger
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Henter navigasjonsfunksjonen fra react-router-dom
  const navigate = useNavigate();

  // Henter sesjonskonteksten ved hjelp av useSession-hooket
  const { session, login, logout } = useSession();

  // Håndterer innloggingsprosessen
  const handleLogin = async () => {
    // Forenklet for dette eksempelet: Legitimasjonssjekk skjer i backend

    try {
      // Kall til backend for innlogging
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Hvis innlogging er vellykket, oppdater sesjonstilstanden
        login(response.userId, true);
        navigate("/protected-route"); // Naviger til en beskyttet rute etter innlogging
      } else {
        setEmailError("Feil e-post eller passord");
      }
    } catch (error) {
      console.error('Innlogging feilet:', error);
    }
  };

  // Håndterer utloggingsprosessen
  const handleLogout = () => {
    // Forenklet for dette eksempelet: Kall til backend for utlogging

    logout();
    navigate("/login"); // Naviger til innloggingssiden etter utlogging
  };

  // Render innloggingskomponenten
  return (
    <div className={"inputContainer"}>
      <input
        value={email}
        placeholder="Enter your email here"
        onChange={(ev) => setEmail(ev.target.value)}
        className={"inputBox"}
      />
      <label className="errorLabel">{emailError}</label>

      <input
        type="password"
        value={password}
        placeholder="Enter your password here"
        onChange={(ev) => setPassword(ev.target.value)}
        className={"inputBox"}
      />
      <label className="errorLabel">{passwordError}</label>

      {session.isLoggedIn ? (
        <button onClick={handleLogout}>Logg ut</button>
      ) : (
        <button onClick={handleLogin}>Logg inn</button>
      )}
    </div>
  );
}

export default Login;