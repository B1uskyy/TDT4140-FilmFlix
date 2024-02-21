import React from 'react';
import { Link } from "react-router-dom";
import FilmFlixLogo from '../img/FilmFlixLogo.svg';
import '../styles/navbar.css';

export default function MyNav() {  

    return (        
        <nav className="nav-container">
            <div className="menu-items">

                <img src={FilmFlixLogo} alt="Logo" />

                <div className='nav-link'>
                    <Link to="/Homepage">HOME</Link>
                </div>

                <div className='nav-link'>
                    <Link to="/Movies">MOVIES</Link>
                </div>

            </div>
            <div className="search-bar">
                <input type="text" placeholder='Search on FilmFlix...' ></input>
                <button className='searchbtn'>Search</button>
            </div>

            <div className='menu-items-right'>
                <div className='profile-btn'>
                    <Link to="/UserSite">PROFILE</Link>
                </div>
            </div>

        </nav>
    )
}

