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

                <Link to="/homepage">
                    <div className='nav-link'>
                        <p className='text'>HOME</p>
                    </div>
                </Link>

                <Link to="/movies">
                    <div className='nav-link'>
                        <p className='text'>MOVIES</p>
                    </div>
                </Link>
            </div>

            <SearchBar/>

            <div className='menu-items-right'>
                    <Link to="/user">
                        <div className='profile-btn'>
                            <p className='text'>PROFILE</p>
                        </div>
                    </Link>
            </div>
        </nav>
    )
}

