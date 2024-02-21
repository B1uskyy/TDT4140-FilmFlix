import React, { useState } from 'react';
import './MoviesOverview.css'; // Importer CSS-filen
import RESTFetcher from '../helpers/RESTFetcher';

const movies = [
  { title: 'Ponyo', director: 'Director 1', year: 2021, imageUrl: 'https://m.media-amazon.com/images/M/MV5BOTc3YmM3N2QtODZkMC00ZDE5LThjMTQtYTljN2Y1YTYwYWJkXkEyXkFqcGdeQXVyODEzNjM5OTQ@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Spirited Away', director: 'Director 2', year: 2022, imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg' },
  { title: 'Movie 3', director: 'Director 3', year: 2023, imageUrl: 'https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg' },
  { title: 'Movie 1', director: 'Director 1', year: 2021, imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTU4NDg0MzkzNV5BMl5BanBnXkFtZTgwODA3Mzc1MDE@._V1_.jpg' },
  { title: 'Movie 2', director: 'Director 2', year: 2022, imageUrl: 'https://m.media-amazon.com/images/M/MV5BNmI2MzJkYzYtM2Y2My00NmJmLTgxZDAtODAwNjBmM2RlZjRhXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg' },
  { title: 'Movie 3', director: 'Director 3', year: 2023, imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjZkNThjNTMtOGU0Ni00ZDliLThmNGUtZmMxNWQ3YzAxZTQ1XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg' },
  { title: 'Movie 1', director: 'Director 1', year: 2021, imageUrl: 'https://via.placeholder.com/150' },
  { title: 'Movie 2', director: 'Director 2', year: 2022, imageUrl: 'https://via.placeholder.com/150' },
  { title: 'Movie 3', director: 'Director 3', year: 2023, imageUrl: 'https://via.placeholder.com/150' },
  { title: 'Movie 1', director: 'Director 1', year: 2021, imageUrl: 'https://via.placeholder.com/150' },
  { title: 'Movie 2', director: 'Director 2', year: 2022, imageUrl: 'https://via.placeholder.com/150' },
  { title: 'Movie 3', director: 'Director 3', year: 2023, imageUrl: 'https://via.placeholder.com/150' },
  { title: 'Movie 3', director: 'Director 3', year: 2023, imageUrl: 'https://via.placeholder.com/150' },
  { title: 'Movie 3', director: 'Director 3', year: 2023, imageUrl: 'https://via.placeholder.com/150' },
  { title: 'Movie 3', director: 'Director 3', year: 2023, imageUrl: 'https://via.placeholder.com/150' },
  
  //Can add more movies here
];

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