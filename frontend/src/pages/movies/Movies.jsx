import React, {useEffect, useState} from 'react';

import Spinner from 'react-bootstrap/Spinner'

import './movies.css'; // Importer CSS-filen
import RESTFetcher from '../../helpers/RESTFetcher';
import Navbar from "../../components/navbar/Navbar.jsx";
import {Link, useParams} from "react-router-dom";
import FilterBlock from "./components/FilterBlock";

const Movies = () => {

  const [movies, setMovies] = useState([]); // Tilstand for å lagre filmene som hentes fra backend
  const [loading, setLoading] = useState(true);

  const [availableGenres, setAvailableGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

    const [availableWriters, setAvailableWriters] = useState([]);
    const [selectedWriter, setSelectedWriter] = useState(null);

    const [availableDirectors, setAvailableDirectors] = useState([]);
    const [selectedDirector, setSelectedDirector] = useState(null);

    const [availableActors, setAvailableActors] = useState([]);
    const [selectedActor, setSelectedActor] = useState(null);

  useEffect(() => {
        setLoading(true);
        RESTFetcher.fetchMovies(selectedGenre, selectedActor, selectedDirector, selectedWriter).then((movies) => {
          setMovies(movies); // TODO - add filter options
          setLoading(false);
        });
  }, [selectedGenre, selectedActor, selectedWriter, selectedDirector]);

    useEffect(() => {
        RESTFetcher.fetchGenres().then((genres) => {
            setAvailableGenres(genres);
        });
        RESTFetcher.fetchWriters().then((writers) => {
            setAvailableWriters(writers);
        });
        RESTFetcher.fetchDirectors().then((directors) => {
            setAvailableDirectors(directors);
        });
        RESTFetcher.fetchActors().then((actors) => {
            setAvailableActors(actors);
        });

    }, []);

  // https://via.placeholder.com/150

  return (
      <div>
        <Navbar/>
        <div className="movies-overview-container">
          <div className="movies-filter-container">
              <FilterBlock stateChanger={setSelectedGenre} filterName="Genre" filterAlternatives={availableGenres}/>
              <FilterBlock stateChanger={setSelectedDirector} filterName="Director" filterAlternatives={availableDirectors}/>
              <FilterBlock stateChanger={setSelectedActor} filterName="Actor" filterAlternatives={availableActors}/>
              <FilterBlock stateChanger={setSelectedWriter} filterName="Writer" filterAlternatives={availableWriters}/>
          </div>
          <div>
            {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <div className="movies-container">
                  {movies.map((movie, index) => (
                      <Link to={movie.id} className="movie" key={index}>
                        <div className="movie-block">
                          <img className="movie-poster" src={
                            movie.posterURL === "N/A" ? "https://via.placeholder.com/300" : movie.posterURL
                          } alt={movie.title}/>
                          <div className="movie-info">
                            <h2>{movie.title}</h2>
                            <p>{movie.year}</p>
                            <p>{movie.genres.join(' | ')}</p>
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