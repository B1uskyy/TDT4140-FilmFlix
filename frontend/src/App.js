import logo from './logo.svg';
import './App.css';
import {useState} from "react";

let address = "http://localhost:8080/api/hello";

function HelloWorld() {
  const [helloWorld, setHelloWorld] = useState("loading...");

  fetch(address)
      .then(response => response.text())
      .then(data => {
        setHelloWorld(data);
        console.log(data);
      })
      .catch(error => console.error(error));

  return (
      <p>{helloWorld}</p>
  )
}

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <HelloWorld/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
