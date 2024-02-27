import React, {useEffect, useState} from "react"
import { useParams } from 'react-router-dom';
import "./moviecard.css"
import RESTFetcher from "../../helpers/RESTFetcher";
import { Movie } from "../../helpers/BackendEntities";
import Navbar from "../../components/navbar/Navbar.jsx";

function MovieCard(){

    const params = useParams();

    const [movie, setMovie] = useState(Movie.empty());

    useEffect(() => {
        RESTFetcher.fetchMovie(params.id).then((movie) => {
            setMovie(movie);
        })
    }, []);


    return (
        <div>
            <Navbar />
            <div className = "movie-card-container">
                <div>
                    <img className="movie-card" src = {movie.posterURL}/>
                </div>
                
                <div className="movie-card-content">
                    <h2 className="movie-card"> {movie.title}</h2>
                    <p className="movie-card"> {movie.description}</p>
                    <p className = "movie-card"> {movie.genres} </p>
                    <p className="movie-card">Director: {movie.directors} | Duration: {movie.runtimeMinutes} | Year: {movie.year}</p>
                </div>
            </div>
        </div>
)

}

export default MovieCard
