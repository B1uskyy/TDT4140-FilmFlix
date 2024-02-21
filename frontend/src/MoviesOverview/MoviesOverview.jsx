import React, { useState } from 'react';
import './MoviesOverview.css'; // Importer CSS-filen
import RESTFetcher from '../helpers/RESTFetcher';

const MoviesOverview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // Tilstand for å kontrollere visningen av filterboksene
  const [movies, setMovies] = useState([]); // Tilstand for å lagre filmene som hentes fra backend

  RESTFetcher.fetchMovies().then((movies) => {
    setMovies(movies);
  });

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
    <div className="movies-overview-container">
      <div className="search-container">
        <div className="title-container">
          <h1>Movies</h1>
        </div>
        <input type="text" placeholder="Søk etter film..." value={searchTerm} onChange={handleSearchChange} />
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
      <div className="movies-container">
        {movies.map((movie, index) => (
          <div className="movie" key={index}>
            <img src={movie.posterURL} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>Poster url {movie.posterURL}</p>
            
            <p>Year: {movie.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesOverview; 