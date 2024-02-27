import React, {useEffect, useState} from 'react';

import Spinner from 'react-bootstrap/Spinner'

import './movies.css'; // Importer CSS-filen
import RESTFetcher from '../../helpers/RESTFetcher';
import Navbar from "../../components/navbar/Navbar.jsx";
import {Link} from "react-router-dom";

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // Tilstand for å kontrollere visningen av filterboksene
  const [movies, setMovies] = useState([]); // Tilstand for å lagre filmene som hentes fra backend
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    RESTFetcher.fetchMovies().then((movies) => {
      setMovies(movies); // TODO - add filter options
      setLoading(false);
    });
  }, [searchTerm, selectedGenres]);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleGenreChange = (event) => {
    const value = event.target.value;
    setSelectedGenres(
      selectedGenres.includes(value)
        ? selectedGenres.filter(genre => genre !== value)
        : [...selectedGenres, value]
    );
  };

  const handleFilterClick = () => {
    setShowFilters(!showFilters); // Veksler visningen av filterboksene
  };

  const applyFilters = () => {
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGenres.length === 0 || movie.genres.some(genre => selectedGenres.includes(genre)))
    );
    setFilteredMovies(filtered);
    setShowFilters(false); // Skjul filterboksene etter filtrering
  };

  // https://via.placeholder.com/150

  return (
      <div>
        <Navbar/>
        <div className="movies-overview-container">
          <div className="search-container">
            <div className="title-container">
              <h1>Movies</h1>
            </div>
            <input type="text" placeholder="Søk etter film..." value={searchTerm} onChange={handleSearchChange}/>
            <button onClick={handleFilterClick}>{showFilters ? 'Skjul filter' : 'Vis filter'}</button>
            {showFilters && (
                <>
                  <select multiple={true} value={selectedGenres} onChange={handleGenreChange}>
                    {/* Her legger du til dine sjangervalg */}
                    <option value="Action">Action</option>
                    <option value="Drama">Drama</option>
                    <option value="Comedy">Comedy</option>
                    {/* Flere sjangre */}
                  </select>
                  <button onClick={applyFilters}>Bruk filter</button>
                </>
            )}
          </div>
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
  );
};

export default Movies;