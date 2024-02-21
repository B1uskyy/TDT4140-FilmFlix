import React, { useState } from "react"
import { useParams } from 'react-router-dom';
import "../styles/filmcard.css" 
import RESTFetcher from "../helpers/RESTFetcher";
import { Movie } from "../helpers/BackendEntities";
import Navbar from "../components/Navbar.jsx";

function FilmCard(){

    const params = useParams();

    const [movie, setMovie] = useState(Movie.empty());

    RESTFetcher.fetchMovie(params.id).then((movie) => {
        setMovie(movie);
    })

    return (
        <div>
            <Navbar />
            <div className = "film-card-container">
                <div>
                    <img className="film-card" src = {movie.posterURL}/>
                </div>
                
                <div className = "film-card-content">
                    <h2 className="film-card"> {movie.title}</h2>
                    <p className="film-card"> {movie.description}</p>
                    <p className = "film-card"> {movie.genres} </p>
                    <p className="film-card">Director: {movie.directors} | Duration: {movie.runtimeMinutes} | Year: {movie.year}</p>
                </div>
            </div>
        </div>
)

}

export default FilmCard
