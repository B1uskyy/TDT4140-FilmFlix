import {Link} from "react-router-dom";
import React from "react";
import './MovieCard.css';

function MovieCard( {movie, index} ) {

    return <Link to={"/movies/"+ movie.id} className="movie">
            <div className="movie-block">
                <img className="movie-poster" src={
                    movie.posterURL === "N/A" ? "https://via.placeholder.com/300" : movie.posterURL
                } alt={movie.title}/>
                <div className="movie-info">
                    <h2>{movie.title}</h2>
                    <p>{movie.year}</p>
                    <p>{(movie.genres !== null) ? movie.genres.join(' | ') : ""}</p>
                </div>
            </div>
        </Link>
}

export default MovieCard;