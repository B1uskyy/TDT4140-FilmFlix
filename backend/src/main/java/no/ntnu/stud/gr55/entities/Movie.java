package no.ntnu.stud.gr55.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

import no.ntnu.stud.gr55.utils.kinocheck.MovieTrailer;
import no.ntnu.stud.gr55.utils.omdb.OMDBFetch;
import no.ntnu.stud.gr55.utils.omdb.OMDBMovie;

/**
 * Class describing movie entities
 */
@Entity
public class Movie {

    @Id
    private String id;

    private String title; // using primaryTitle from https://developer.imdb.com/non-commercial-datasets/

    @Column(name = "movie_year") // h2 does not like year as name
    private int year;

    @Column(nullable = true)
    private Integer runtimeMinutes;

    private String posterUrl;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    private List<String> directors;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    private List<String> writers;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    private List<String> actors;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    private List<String> genres;

    private String description;

    @Column(nullable = true)
    private Integer imdbVotes;

    private boolean detailsFetched = false;

    @JsonManagedReference
    @OneToMany(mappedBy = "movie")
    public List<Review> movieReview;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public Integer getRuntimeMinutes() {
        return runtimeMinutes;
    }

    public void setRuntimeMinutes(Integer runtimeMinutes) {
        this.runtimeMinutes = runtimeMinutes;
    }

    public List<String> getDirectors() {
        return directors;
    }

    public void setDirectors(List<String> directors) {
        this.directors = directors;
    }

    public List<String> getWriters() {
        return writers;
    }

    public void setWriters(List<String> writers) {
        this.writers = writers;
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public Integer getImdbVotes() {
        return imdbVotes;
    }

    public void setImdbVotes(Integer imdbVotes) {
        this.imdbVotes = imdbVotes;
    }

    public boolean isDetailsFetched() {
        return detailsFetched;
    }

    public void setDetailsFetched(boolean detailsFetched) {
        this.detailsFetched = detailsFetched;
    }

    public List<String> getActors() {
        return actors;
    }

    public void setActors(List<String> actors) {
        this.actors = actors;
    }

    public List<Review> getMovieReview() {
        return movieReview;
    }

    public void setMovieReview(List<Review> movieReview) {
        this.movieReview = movieReview;
    }

    public void addMovieReview(Review review){
        movieReview.add(review);
        review.setMovie(this);
    }

    public void removeMovieReview(Review review){
        movieReview.remove(review);
        review.setMovie(null);
    }

    @Transient
    public String getTrailerURL() {
        MovieTrailer trailer = MovieTrailer.getTrailer(this.getId());

        if (trailer == null ) {
            return null;
        }

        return "https://www.youtube.com/watch?v=" + trailer.getYoutube_video_id();
    }
}
