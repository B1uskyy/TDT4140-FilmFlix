import React from "react";
import "./UserSite.css";

function UserSite() {

    // User descriptions
    const userName = "Johan Ho";
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const favorites = "Favorites";
    const genres = ["Adventure", "Animation", "Action", "Horror"];
    const director = "Hayao Miyazaki";
    
    // Images 
    const movieImage = "https://m.media-amazon.com/images/M/MV5BOTc3YmM3N2QtODZkMC00ZDE5LThjMTQtYTljN2Y1YTYwYWJkXkEyXkFqcGdeQXVyODEzNjM5OTQ@._V1_FMjpg_UX1000_.jpg"
    const directorImage = "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/156932_v9_ba.jpg"
    const userImage = "https://scontent.fosl3-2.fna.fbcdn.net/v/t1.15752-9/429091682_724535366476904_1591500501486172626_n.png?_nc_cat=111&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=iM9Mnu_HmYAAX8IjaNa&_nc_ht=scontent.fosl3-2.fna&oh=03_AdTu2wJLeYQj8igFYSDY0-lCCUelP3JHa4LEJoEB5DCJgw&oe=65FB05CD";
        
    return (
        <div className="fullSite">

            <div className="userSite-content">
                <div>
                    <img className="profilePicture" src={userImage} alt="User" />
                </div>
            
            
                <div className = "userSite-container">
                    <div className="informationBox">
                        <h1 className="userSite">{userName}</h1>
                        <p className="userSite">{description}</p>
                </div>

                <div className="userSite-content">    
                    <div className="genresBox">
                        <h2 className="userSite"> {favorites}</h2>
                        {genres.map((genre, index) => (
                            <div key={index} className="genreBox">
                                {genre}
                            </div>
                        ))}
                </div>

                <div className="movieBox">
                    <h3 className="userSite">Movie</h3>
                    <img className="otherPhotos" src={movieImage} alt="Movie" />
                </div>

                <div className="directorBox">
                        <h3 className="userSite">Director</h3>
                        <img className="otherPhotos" src={directorImage} alt="Director" />
                        <p className="userSite">{director}</p>
                    
                </div>
            </div>
        </div>
    </div>       
            <div className="userSite">
                <div>
                    <div>
                        <h2 className="userSite">Current Watchlist</h2>
                    </div>

                    <div className="userSite">
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
    
    );

}

export default UserSite;