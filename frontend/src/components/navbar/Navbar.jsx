import React from 'react';
import { Link } from "react-router-dom";
import FilmFlixLogo from '../../img/FilmFlixLogo.svg';
import './navbar.css';
import SearchBar from "../searchbar/SearchBar";

export default function MyNav() {  

    return (        
        <nav className="nav-container">
            <div className="menu-items">

                <Link to="/homepage">
                <img src={FilmFlixLogo} alt="Logo" />
                </Link>

                <div className='nav-link'>
                    <Link to="/homepage">HOME</Link>
                </div>

                <div className='nav-link'>
                    <Link to="/movies">MOVIES</Link>
                </div>

            </div>

            <SearchBar/>

            <div className='menu-items-right'>
                <div className='profile-btn'>
                    <Link to="/user">PROFILE</Link>
                </div>
            </div>

        </nav>
    )
}

