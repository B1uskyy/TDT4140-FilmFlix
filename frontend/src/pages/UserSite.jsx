import React from "react";
import "../styles/usersite.css";
import Navbar from "../components/Navbar.jsx";
import userImage from "../img/Johanpfp.jpg"

function UserSite() {

    // User descriptions
    const userName = "Johan Ho";
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const favorites = "Favorites";
    const genres = ["Adventure", "Animation", "Action", "Horror"];
    const director = "Hayao Miyazaki";
    const title = "Ponyo";
    
    // Images 
    const movieImage = "https://m.media-amazon.com/images/M/MV5BOTc3YmM3N2QtODZkMC00ZDE5LThjMTQtYTljN2Y1YTYwYWJkXkEyXkFqcGdeQXVyODEzNjM5OTQ@._V1_FMjpg_UX1000_.jpg"
    const directorImage = "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/156932_v9_ba.jpg"
    // const userImage = "https://scontent.fosl3-2.fna.fbcdn.net/v/t1.15752-9/429091682_724535366476904_1591500501486172626_n.png?_nc_cat=111&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=iM9Mnu_HmYAAX8IjaNa&_nc_ht=scontent.fosl3-2.fna&oh=03_AdTu2wJLeYQj8igFYSDY0-lCCUelP3JHa4LEJoEB5DCJgw&oe=65FB05CD";
        
    return (
        <div>
            <Navbar />

            <div>
                <div className="user-content-container">
                    <div className = "user-information-container">
                        <div>
                            <img className="profilePicture" src={userImage} alt="User" />
                        </div>
                    
                        <div>
                            <div className="informationBox">
                                <h1 className="user-site-element">{userName}</h1>
                                <p className="user-site-element">{description}</p>
                            </div>
                        </div>
                    </div>
                    <h2 className="user-site-element"> {favorites}</h2>
                    <div>
                        <div className="user-favorites-container">    
                            <div className="genres-container">
                                <h3>Genres</h3>
                                <div>
                                    {genres.map((genre, index) => (
                                        <div key={index} className="genre-box">
                                            {genre}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="movie-container">
                                <h3>Movie</h3>
                                <div className="container-content">
                                    <img className="otherPhotos" src={movieImage} alt="Movie" />
                                    <p className="user-site-element">{title}</p>
                                </div>
                            </div>

                            <div className="director-container">
                                <h3>Director</h3>
                                <div className="container-content">
                                    <img className="otherPhotos" src={directorImage} alt="Director" />
                                    <p className="user-site-element">{director}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>       
        
                <div className="user-site-element">
                    <div className="watch-list-container">
                        <div>
                            <h2 className="user-site-element">Current Watchlist</h2>
                        </div>

                        <div className="watch-list-movie">
                            <img className="moviePictures" src={movieImage} alt="Movie" />
                            <img className="moviePictures" src={movieImage} alt="Movie" />
                            <img className="moviePictures" src={movieImage} alt="Movie" />
                            <img className="moviePictures" src={movieImage} alt="Movie" />
                            <img className="moviePictures" src={movieImage} alt="Movie" />
                            <img className="moviePictures" src={movieImage} alt="Movie" />
                            <img className="moviePictures" src={movieImage} alt="Movie" />
                            <img className="moviePictures" src={movieImage} alt="Movie" />
                        </div>

                    </div>
                </div>           
            
            </div>
    </div>
    );

}

export default UserSite;