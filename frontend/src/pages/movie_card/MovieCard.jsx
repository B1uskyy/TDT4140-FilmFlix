import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./moviecard.css";
import RESTFetcher from "../../helpers/RESTFetcher";
import { Movie } from "../../helpers/BackendEntities";
import Navbar from "../../components/navbar/Navbar.jsx";
import ReviewBox from "../../components/review/ReviewBox";
import {useUser} from "../../helpers/UserContext";

function MovieCard() {
	const params = useParams();
	const [movie, setMovie] = useState(Movie.empty());
	const [rating, setRating] = useState(1); // Define rating and setRating
	const [userReview, setUserReview] = useState(null); // For storing the user's review if it exists
	const { user } = useUser();


	useEffect(() => {
		RESTFetcher.fetchMovie(params.id).then((movie) => {
			setMovie(movie);

		});
	}, [params.id]);

	useEffect(() => {
		const fetchMovieDetails = async () => {
			// Fetch movie details logic

			// Assuming fetching the user review is part of this
			try {
				const reviewResponse = await fetch(`/movies/view/${params.id}/review/${user.username}`, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				});

				if (reviewResponse.ok) {
					const reviewData = await reviewResponse.json();
					setRating(reviewData.rating); // Assuming reviewData has a rating
					setUserReview(reviewData); // Store the entire review
				}
			} catch (error) {
				console.error('Failed to fetch user review:', error);
			}
		};

		fetchMovieDetails();
	}, [params.id, user.username]);

	useEffect(() => {
		const fetchMovieDetails = async () => {
			const movieResponse = await RESTFetcher.fetchMovie(params.id);
			setMovie(movieResponse);


			const reviewResponse = await fetch(`/movies/view/${params.id}/review/${user.username}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (reviewResponse.ok) {
				const reviewData = await reviewResponse.json();
				// Assuming reviewData includes a field for the rating
				setRating(reviewData.rating);
			}
		};

		fetchMovieDetails();
	}, [params.id]);



	return (
		<div>
			<Navbar />
			<div className="movie-card-container">
				<div>
					<ReviewBox movieId={params.id} rating={rating} setRating={setRating} userReview={userReview} />
				</div>
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
				</div>
			</div>
		</div>
	);
}

export default MovieCard;
