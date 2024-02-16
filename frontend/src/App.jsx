import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import {Nav, Navbar} from "react-bootstrap";

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
    <div>
        <Navbar classname="p-3">
            <Navbar.Brand href="#home">
                Home
            </Navbar.Brand>
            <Navbar.Brand href="#user">
                My user
            </Navbar.Brand>
            <Navbar.Brand href="#movies">
                Movies
            </Navbar.Brand>
        </Navbar>
    </div>
  );
}

export default App;
