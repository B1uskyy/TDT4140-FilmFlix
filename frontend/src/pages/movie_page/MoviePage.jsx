import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MoviePage.css";
import RESTFetcher from "../../helpers/RESTFetcher";
import { Movie } from "../../helpers/BackendEntities";
import Navbar from "../../components/navbar/Navbar.jsx";
import { useUser } from "../../helpers/UserContext";
import ReviewBox from "../../components/review/ReviewBox";
import MovieReview from "../../components/review/MovieReview";

function MoviePage() {
	const params = useParams();

	const { user, markMovie, unmarkMovie, markedMovies } = useUser();

	const [movie, setMovie] = useState(Movie.empty());
	const [isMarked, setIsMarked] = useState(false);
	const [alreadyHasReview, setAlreadyHasReview] = useState(false);

	useEffect(() => {
		console.log("test");
		RESTFetcher.fetchMovie(params.id).then((movie) => {
			setMovie(movie);
			setIsMarked(movieIsMarked(movie.id));

			// check if user has already reviewed the movie
			if (user) {
				if (movie.reviews) {
					movie.reviews.forEach(review => {
						if (review.reviewer === user) {
							setAlreadyHasReview(true);
						}
					});
				}
			}
		});
	}, [params.id, user]);

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

	if (!movie) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<Navbar />
			<div className="movie-card-container">
				<div className="movie-card-content movie-left-side-containter">
					<img className="movie-card" src={movie.posterURL} alt="MoviePage" />
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
					<div>
						<h2 className={"margin-btm"}>Trailer</h2>
						<br/>
						{ movie.youtube_embed_url ? <div className="video-responsive">
							<iframe
								width="480"
								height="360"
								src={movie.youtube_embed_url}
								title="Movie Trailer"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</div> : <p>No trailer available</p> }
					</div>
					<div>
						{ !alreadyHasReview && <ReviewBox username={user} movieId={params.id} /> }
					</div>
					<div className="movie-rating">
						{ ( movie && movie.reviews && movie.reviews.length > 0) && movie.reviews.map((review, index) => (
							<MovieReview movieReview={review} currentMovie={params.id} currentUser={user} key={review.id} />
						))}
					</div>

				</div>
			</div>
		</div>
	);
}

export default MoviePage;