package no.ntnu.stud.gr55.entities;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

import no.ntnu.stud.gr55.utils.OMDBFetch;
import no.ntnu.stud.gr55.utils.OMDBObject;

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

    private String description;

    @Column(nullable = true)
    private Integer imdbVotes;

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

    public boolean attemptPopulateMissingOMDB(String omdbApiKey) {
        if (omdbApiKey == null) {
            System.out.println("OMDB API key not set.");
            return false;
        }

        if (!(this.posterUrl == null || this.description == null || this.imdbVotes == null)) {
            System.out.println("OMDB data for " + this.title + " already fetched.");
            return false;
        }
        System.out.println("Fetching missing OMDB data for " + this.title + "...");

        OMDBObject omdbObject = OMDBFetch.fetchMovie(omdbApiKey, this.id);

        if (omdbObject == null) {
            System.out.println("Failed fetching missing OMDB data for " + this.title + ".");
            return false;
        }

        if (getPosterUrl() == null) {
            setPosterUrl(omdbObject.getPoster());
            System.out.println("Fetched poster for " + this.title + " successfully.");
        }

        if (getDescription() == null) {
            setDescription(omdbObject.getDescription());
            System.out.println("Fetched description for " + this.title + " successfully.");
        }

        if (getImdbVotes() == null) {
            setImdbVotes(omdbObject.getImdbVotes());
            System.out.println("Fetched IMDB votes for " + this.title + " successfully.");
        }

        return true;

    }
}
