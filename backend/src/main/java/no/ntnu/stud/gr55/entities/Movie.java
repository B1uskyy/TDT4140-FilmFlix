package no.ntnu.stud.gr55.entities;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

import no.ntnu.stud.gr55.utils.OMDBFetch;

/**
 * Class describing movie entities
 */
@Entity
public class Movie {

    @Id
    private String id;

    private String title; // using primaryTitle from https://developer.imdb.com/non-commercial-datasets/
    private int year;

    @Column(nullable = true)
    private Integer runtimeMinutes;

    private String posterUrl;

    @OneToMany(fetch = FetchType.LAZY)
    private Set<Crew> directors;

    @OneToMany(fetch = FetchType.LAZY)
    private Set<Crew> writers;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    private List<String> genres;

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

    public void setRuntimeMinutes(int runtimeMinutes) {
        this.runtimeMinutes = runtimeMinutes;
    }

    public Set<Crew> getDirectors() {
        return directors;
    }

    public void setDirectors(Set<Crew> directors) {
        this.directors = directors;
    }

    public Set<Crew> getWriters() {
        return writers;
    }

    public void setWriters(Set<Crew> writers) {
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

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public boolean attemptFetchPosterURL(String omdbApiKey) {
        if (omdbApiKey == null) {
            System.out.println("OMDB API key not set.");
            return false;
        }

        if (this.posterUrl != null) {
            System.out.println("Poster for " + this.title + " already fetched.");
            return false;
        }
        System.out.println("Fetching poster for " + this.title + "...");

        String poster = OMDBFetch.fetchMoviePoster(omdbApiKey, this.id);
        if (poster != null) {
            this.posterUrl = poster;
            System.out.println("Fetched poster for " + this.title + " successfully.");
            return true;
        } else {
            System.out.println("Failed fetching poster for " + this.title + ".");
            return false;
        }
    }
}
