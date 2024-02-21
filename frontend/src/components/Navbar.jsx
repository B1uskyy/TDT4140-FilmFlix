import React from 'react';
import FilmFlixLogo from '../img/FilmFlixLogo.svg';
import '../styles/navbar.css';

export default function MyNav() {  

    return (        
        <nav className="nav-container">
            <div className="menu-items">
                <img src={FilmFlixLogo} alt="Logo" />
                <div className='nav-link'>
                    <a href="/home">HOME</a>
                </div>
                <div className='nav-link'>
                    <a href="/movies">MOVIES</a>
                </div>
            </div>
            <div className="search-bar">
                <input type="text" placeholder='Search on FilmFlix...' ></input>
                <button className='searchbtn'>Search</button>
            </div>
            <div className='menu-items'>
                <div className='nav-link'>
                    <a href="/profile">PROFILE</a>
                </div>
            </div>
            </nav>
    )
}

