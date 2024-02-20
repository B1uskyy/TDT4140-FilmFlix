import React from 'react';
import {Nav, Navbar, NavDropdown, Button, Form} from "react-bootstrap";
import FilmFlixLogo from '../images/FilmFlixLogo.svg';
import './MyNav.css';
//import { useNavigate } from "react-router-dom";

//const navigate = useNavigate();



function MyNav() {  

    return (        
        <div className="nav-div">
            <Navbar className="navbar-style" data-bs-theme="dark" expand="lg" sticky='top'>
                 <Navbar.Brand href="/home">
                    <img
                    src={FilmFlixLogo}
                    className="logo-style"
                    alt="React Bootstrap logo"
                    />
                 </Navbar.Brand>
                <Nav className="menu-items-style">
                    <Nav.Link href="/home">HOME</Nav.Link>
                    <Nav.Link href="/movies">MOVIES</Nav.Link>
                    <Form className="search-bar-style" method="get" action="/movies">
                        <Form.Control
                            type="search"
                            placeholder="Search on FilmFlix"
                            aria-label="Search"          
                            className="search-button-style"                
                        />
                        <Button variant="outline-light" size="sm">Search</Button>
                    </Form>
                    <NavDropdown title="PROFILE" className="profile-dropdown">
                        <NavDropdown.Item href="/action/2.1">View your profile</NavDropdown.Item>
                        <NavDropdown.Item href="/action/2.2">My friends</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/login">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
        </div>
    )
}

export default MyNav;