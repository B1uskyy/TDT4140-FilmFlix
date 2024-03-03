import "./SearchBar.css";
import React, { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import RESTFetcher from "../../helpers/RESTFetcher";

function SearchBar() {
	const navigate = useNavigate();

	const [searchTerm, setSearchTerm] = React.useState("");
	const [movieHints, setMovieHints] = React.useState([]);

	useEffect(() => {
		if (searchTerm.length > 3) {
			RESTFetcher.fetchAutocomplete(searchTerm).then((movies) => {
				setMovieHints(movies);
			});
		} else {
			setMovieHints([]);
		}
	}, [searchTerm]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const searchTerm = e.target.elements.search;
		if (searchTerm === undefined || searchTerm.value.length === 0) {
			navigate("/movies");
			return;
		}
		navigate("/search/" + searchTerm.value);
	};

	return (
		<form className={"search-bar"} onSubmit={handleSubmit}>
			<input
				className={"search-input"}
				type="text"
				placeholder="Search through FilmFlix..."
				name="search"
				onChange={(e) => setSearchTerm(e.target.value)}
				onBlur={() => {
					setMovieHints([]);
				}}
			/>
			<BsSearch className={"filter-search-icon"} />
			<div id={"search-hint-dropdown"}>
				{movieHints.map((movie) => {
					return (
						<div
							className={"search-hint-movie"}
							onMouseDown={() => {
								// eslint-disable-next-line
								navigate("/movies/" + movie.id);
							}}
							// eslint-disable-next-line
						>
							<div className={"search-hint-img-container"}>
								<img
									className={"search-hint-img"}
									src={movie.posterURL}
									alt="Movie poster"
								/>
							</div>
							<div className={"search-hint-title"}>{movie.title}</div>
						</div>
					);
				})}
			</div>
		</form>
	);
}

export default SearchBar;
