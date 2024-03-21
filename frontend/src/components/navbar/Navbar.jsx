import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import FilmFlixLogo from '../../img/FilmFlixLogo.svg';
import './navbar.css';
import SearchBar from "../searchbar/SearchBar";
import {useUser} from "../../helpers/UserContext";

export default function MyNav() {

    const {user, setUser} = useUser();
    const navigate = useNavigate();

    const logout = () => {
        setUser(null);
        navigate("/");
    }

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
                {user &&
                    <div className='nav-link' onClick={logout}>
                        <p className='text'>LOGG UT</p>
                    </div> }
                {!user &&
                    <Link to="/">
                        <div className='nav-link'>
                            <p className='text'>LOGG INN</p>
                        </div>
                    </Link>
                }
            </div>
</nav>
)
}

