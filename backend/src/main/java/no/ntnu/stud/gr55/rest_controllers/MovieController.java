package no.ntnu.stud.gr55.rest_controllers;

import no.ntnu.stud.gr55.entities.Movie;
import no.ntnu.stud.gr55.repositories.MovieRepository;
import no.ntnu.stud.gr55.utils.omdb.OMDBFetch;
import no.ntnu.stud.gr55.utils.omdb.OMDBSearch;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RequestMapping("/api")
@RestController
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @Value("${omdb_api_key}")
    private String omdbApiKey;

    @GetMapping("/movies")
    public List<Movie> getMovies(@RequestParam(name = "page", required = false, defaultValue = "0") int page,
                                @RequestParam(name = "genre", required = false) String genre,
                                 @RequestParam(name = "minYear", required = false) Integer minYear,
                                @RequestParam(name = "maxYear", required = false) Integer maxYear,
                                 @RequestParam(name = "director", required = false) String director,
                                @RequestParam(name = "actor", required = false) String actor,
                                @RequestParam(name = "writer", required = false) String writer,
                                 @RequestParam(name = "search", required = false) String search
    ) {

        if (search != null) {
            OMDBSearch omdbSearch = OMDBFetch.fetchSearch(omdbApiKey, search);
            if (omdbSearch != null && omdbSearch.getResponse()) {
                omdbSearch.search.forEach(movie -> {
                    if (movieRepository.findById(movie.getImdbId()).isEmpty()) {
                        Movie asMovieObject = movie.toMovie(false);
                        if (asMovieObject != null) {
                            movieRepository.save(asMovieObject);
                        }
                    }
                });
            }
        }

        Sort sort = Sort.by("imdbVotes").descending(); // primitive sort for first release
        Pageable pageable = PageRequest.of(page, 25, sort);

        return movieRepository.findMoviesFiltered(minYear, maxYear,
                director, genre,
                actor, writer,
                search, pageable).getContent();
    }

    @GetMapping("/movies/autocomplete/{title}")
    public List<Movie> getMoviesByTitle(@PathVariable("title") String title) {
        Pageable topFive = PageRequest.of(0, 5);
        return movieRepository.findByTitleContainingIgnoreCase(title, topFive).getContent();
    }

    @GetMapping("/movies/view/{id}")
    public Movie getMovie(@PathVariable("id") String id) {
        Movie movie = movieRepository.findById(id).orElse(null);

        if (movie == null) {
            var fetch = OMDBFetch.fetchMovie(omdbApiKey, id);
            if (fetch == null){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Movie not found.");
            }

            movie = fetch.toMovie(true);
            movieRepository.save(movie);
        }

        if (!movie.isDetailsFetched()) {
            var fetch = OMDBFetch.fetchMovie(omdbApiKey, movie.getId());

            if (fetch != null) {
                fetch.updateDetailsMovie(movie);
                movieRepository.save(movie);
            }
        }

        return movie;
    }

    @GetMapping("/movies/genres")
    public List<String> getGenres() {
        return movieRepository.getDistinctGenres();
    }

    @GetMapping("/movies/directors")
    public List<String> getDirectors() {
        return movieRepository.getDistinctDirectors();
    }

    @GetMapping("/movies/actors")
    public List<String> getActors() {
        return movieRepository.getDistinctActors();
    }

    @GetMapping("/movies/writers")
    public List<String> getWriters() {
        return movieRepository.getDistinctWriters();
    }

    @GetMapping("/movies/years")
    public Map<String, Integer> getMinMaxYear() {
        return movieRepository.getMinMaxYear();
    }
}
