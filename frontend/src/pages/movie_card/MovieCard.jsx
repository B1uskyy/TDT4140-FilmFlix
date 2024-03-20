import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./moviecard.css";
import RESTFetcher from "../../helpers/RESTFetcher";
import { Movie } from "../../helpers/BackendEntities";
import Navbar from "../../components/navbar/Navbar.jsx";
import { useUser } from "../../helpers/UserContext";
import  MarkedMoviesList from "../../components/moviesWatched/MarkedMoviesList.jsx";

function MovieCard() {
	const params = useParams();
	const { markMovie, unmarkMovie, markedMovies } = useUser();

	const [movie, setMovie] = useState(Movie.empty());
	const [isMarked, setIsMarked] = useState(false);

	useEffect(() => {
		RESTFetcher.fetchMovie(params.id).then((movie) => {
			setMovie(movie);
			setIsMarked(movieIsMarked(movie.id));
		});
	}, [params.idm]);

	const movieIsMarked = (movieId) => {
		return markedMovies.includes(movieId);
	};

	const handleMarkMovie = () => {
		markMovie(params.id); // Kall markMovie-funksjonen med filmens ID
		setIsMarked(true); // Oppdater isMarked til true
	};

	const toggleMarked = () => {
        if (isMarked) {
            unmarkMovie(movie.id);
        } else {
            markMovie(movie.id);
        }
        setIsMarked(!isMarked);
    };

	return (
		<div>
			<Navbar />
			<div className="movie-card-container">
				<div className="movie-card-content movie-left-side-containter">
					<img className="movie-card" src={movie.posterURL} alt="MovieCard" />
						<div className="movie-footer">
							<p>Release year: {movie.year}</p>
							<p>|</p>
							<p>{movie.runtimeMinutes} min</p>
						</div>
				</div>

				<div className="movie-card-content">
					<div className="title-container">
						<h1 className="title">{movie.title}</h1>
					</div>

					<div className="rating-and-watch-btn-containter">
						<p className="rating">Rating: {movie.rating}</p>
						<button onClick={toggleMarked} className="watched-btn">
						{isMarked ? "Mark as unwatched" : "Mark as watched"} {/* Toggle mark/unmark button */}</button>
					</div>
					
					<div className="movie-description">
						<p className=""> {movie.description}</p>
					</div>

					<div className="movie-genres-and-director-container">

						<div className="movie-genres">
							<h2 className="margin-btm">Genres:</h2>
							<br></br>
							<p>{movie.genres.join('  |  ')}</p>
						</div>
	
						<div className="movie-director">
							<h2 className="margin-btm">Director:</h2>
							<br></br>
							<p>{movie.directors}</p>
						</div>

					</div>			
				</div>
			</div>
		</div>
	);
}

export default MovieCard;
