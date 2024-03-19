package no.ntnu.stud.gr55.rest_controllers;

import no.ntnu.stud.gr55.entities.Movie;
import no.ntnu.stud.gr55.entities.Review;
import no.ntnu.stud.gr55.entities.User;
import no.ntnu.stud.gr55.repositories.MovieRepository;
import no.ntnu.stud.gr55.repositories.ReviewRepository;
import no.ntnu.stud.gr55.repositories.UserRepository;
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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReviewRepository reviewRepository;

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

        movie.loadTrailerURL();

        return movie;
    }

    @GetMapping("/movies/view/{id}/reviews")
    @PostMapping(path = "/movies/view/{id}/review", consumes = "application/json")
    public Map<String, String> addReview(@PathVariable("id") String id, @RequestBody Map<String, Object> body) {
        Movie movie = movieRepository.findById(id).orElse(null);
        if (movie == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Movie not found.");
        }

        if (body.get("username") == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User ID is required.");
        }

        User user = userRepository.findByUsername((String)body.get("username"));

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        }

        if (body.get("rating") == null || body.get("review") == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rating and review are required.");
        }

        // check for duplicate
        if (reviewRepository.findByUserAndMovie(user, movie) != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User has already reviewed this movie.");
        }

        int rating = (int) body.get("rating");
        String review = (String) body.get("review");

        if (rating < 0 || rating > 5) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rating must be between 0 and 5.");
        }

        Review movieReview = new Review();
        movieReview.setRating(rating);
        movieReview.setReview(review);

        movie.addMovieReview(movieReview);
        user.addMovieReview(movieReview);

        movieRepository.save(movie);
        userRepository.save(user);
        reviewRepository.save(movieReview);

        return Map.of("status", "ok");
    }

    @DeleteMapping(path = "/movies/view/{id}/review", consumes = "application/json")
    public Map<String, String> deleteReview(@PathVariable("id") String id, @RequestBody Map<String, Object> body) {
        Movie movie = movieRepository.findById(id).orElse(null);
        if (movie == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Movie not found.");
        }

        if (body.get("username") == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User ID is required.");
        }

        User user = userRepository.findByUsername((String)body.get("username"));

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        }

        Review review = reviewRepository.findByUserAndMovie(user, movie);
        if (review == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found.");
        }

        movie.removeMovieReview(review);
        user.removeMovieReview(review);

        movieRepository.save(movie);
        userRepository.save(user);
        reviewRepository.delete(review);

        return Map.of("status", "ok");
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
