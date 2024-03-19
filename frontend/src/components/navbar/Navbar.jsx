import React from 'react';
import { Link } from "react-router-dom";
import FilmFlixLogo from '../../img/FilmFlixLogo.svg';
import './navbar.css';
import SearchBar from "../searchbar/SearchBar";

export default function MyNav() {  

    return (        
        <nav className="nav-container">
            <div className="menu-items">

                <img src={FilmFlixLogo} alt="Logo" />

                <div className='nav-link'>
                    <Link to="/homepage">HOME</Link>
                </div>

                <div className='nav-link'>
                    <Link to="/movies">MOVIES</Link>
                </div>

            </div>

            <SearchBar/>

            <div className='menu-items-right'>
                <div className='logout-btn'>
                    <Link to="/">LOGOUT</Link>
                </div>
                <div className='profile-btn'>
                    <Link to="/user">PROFILE</Link>
                </div>
            </div>

        </nav>
    )
}

