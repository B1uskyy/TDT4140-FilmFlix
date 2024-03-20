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
				<div>
					<img className="movie-card" src={movie.posterURL} alt="MovieCard" />
				</div>

				<div className="movie-card-content">
					<h2 className="movie-card"> {movie.title}</h2>
					<p className="movie-card"> {movie.description}</p>
					<p className="movie-card"> {movie.genres} </p>
					<p className="movie-card">
						Director: {movie.directors} | Duration: {movie.runtimeMinutes} |
						Year: {movie.year}
					</p>
					<button onClick={toggleMarked}>
                        {isMarked ? "Unmark" : "Mark"} {/* Toggle mark/unmark button */}
                    </button>
				</div>
			</div>
		</div>
	);
}

export default MovieCard;
