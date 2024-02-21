package no.ntnu.stud.gr55.rest_controllers;

import no.ntnu.stud.gr55.entities.Movie;
import no.ntnu.stud.gr55.repositories.MovieRepository;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin
@RequestMapping("/api")
@RestController
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @Value("${omdb_api_key}")
    private String omdbApiKey;

    @GetMapping("/movies")
    public List<Movie> getMovies() {
        Sort sort = Sort.by("year").descending(); // primitive sort for first release
        Pageable pageable = PageRequest.of(0, 10, sort);

        return movieRepository.findAll(pageable).getContent();
    }

    @GetMapping("/movies/search/{title}")
    public List<Movie> getMoviesByTitle(@PathVariable("title") String title) {
        return movieRepository.findByTitleContainingIgnoreCase(title);
    }

    @GetMapping("/movies/view/{id}")
    public Movie getMovie(@PathVariable("id") String id) {
        Movie movie = movieRepository.findById(id).orElse(null);

        if (movie == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Movie not found.");
        }

        Hibernate.initialize(movie.getDirectors());
        Hibernate.initialize(movie.getWriters());

        boolean omdbFetch = movie.attemptPopulateMissingOMDB(omdbApiKey);
        if (omdbFetch) {
            movieRepository.save(movie);
        }

        return movie;
    }

    @GetMapping("/movies/genres")
    public List<String> getGenres() {
        return movieRepository.getDistinctGenres();
    }
}
