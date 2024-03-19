// Importer alle nødvendige avhengigheter og komponenter
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './movies.css';
import RESTFetcher from '../../helpers/RESTFetcher.js';
import Navbar from "../navbar/Navbar.jsx";
import { Link, useParams } from "react-router-dom";
import ValueSelectorMultivalue from "../value_selectors/ValueSelectorMultivalue.jsx";
import ValueSelectorRangeTwovalued from "../value_selectors/ValueSelectorRangeTwovalued.jsx";

// Definer Movies-komponenten
const Movies = () => {
    // Hent parameter fra URL
    const params = useParams();

    // Tilstander for komponenten
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [availableGenres, setAvailableGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [availableWriters, setAvailableWriters] = useState([]);
    const [selectedWriter, setSelectedWriter] = useState(null);
    const [availableDirectors, setAvailableDirectors] = useState([]);
    const [selectedDirector, setSelectedDirector] = useState(null);
    const [availableActors, setAvailableActors] = useState([]);
    const [selectedActor, setSelectedActor] = useState(null);
    const [availableYearRange, setAvailableYearRange] = useState([1900, 2022]);
    const [selectedYearRange, setSelectedYearRange] = useState([1900, 2022]);

    // Hent data ved lasting av komponenten og ved endringer i filtervalg
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const fetchedMovies = await RESTFetcher.fetchMovies(
                params.query,
                selectedGenre,
                selectedActor,
                selectedDirector,
                selectedWriter,
                selectedYearRange[0],
                selectedYearRange[1]
            );
            setMovies(fetchedMovies);
            setLoading(false);
        };
        fetchData();
    }, [selectedGenre, selectedActor, selectedWriter, selectedDirector, selectedYearRange, params.query]);

    // Hent tilgjengelige filtre ved lasting av komponenten
    useEffect(() => {
        const fetchFilters = async () => {
            const genres = await RESTFetcher.fetchGenres();
            const writers = await RESTFetcher.fetchWriters();
            const directors = await RESTFetcher.fetchDirectors();
            const actors = await RESTFetcher.fetchActors();
            const yearRange = await RESTFetcher.fetchYears();
            setAvailableGenres(genres);
            setAvailableWriters(writers);
            setAvailableDirectors(directors);
            setAvailableActors(actors);
            setAvailableYearRange([yearRange.min, yearRange.max]);
        };
        fetchFilters();
    }, []);

    // JSX for komponenten
    return (
        <div>
            <Navbar />
            <div className="movies-overview-container">
                <div className="movies-filter-container">
                    <ValueSelectorRangeTwovalued stateChanger={setSelectedYearRange} filterName="Release year" min_max_array={availableYearRange} />
                    <ValueSelectorMultivalue stateChanger={setSelectedGenre} filterName="Genre" filterAlternatives={availableGenres} />
                    <ValueSelectorMultivalue stateChanger={setSelectedDirector} filterName="Director" filterAlternatives={availableDirectors} />
                    <ValueSelectorMultivalue stateChanger={setSelectedActor} filterName="Actor" filterAlternatives={availableActors} />
                    <ValueSelectorMultivalue stateChanger={setSelectedWriter} filterName="Writer" filterAlternatives={availableWriters} />
                </div>
                <div className={"movies-list-container"}>
                    {loading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : (
                        <div className="movies-container">
                            {movies.map((movie, index) => (
                                <Link to={"/movies/" + movie.id} className="movie" key={index}>
                                    <div className="movie-block">
                                        <img className="movie-poster" src={
                                            movie.posterURL === "N/A" ? "https://via.placeholder.com/300" : movie.posterURL
                                        } alt={movie.title} />
                                        <div className="movie-info">
                                            <h2>{movie.title}</h2>
                                            <p>{movie.year}</p>
                                            <p>{(movie.genres !== null) ? movie.genres.join(' | ') : ""}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Movies;