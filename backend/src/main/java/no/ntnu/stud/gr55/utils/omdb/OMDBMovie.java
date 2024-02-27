package no.ntnu.stud.gr55.utils.omdb;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import no.ntnu.stud.gr55.entities.Movie;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OMDBMovie {

    @JsonProperty("imdbID")
    private String imdbId;

    @JsonProperty("Title")
    private String Title;

    @JsonProperty("Poster")
    private String Poster;

    @JsonProperty("Response")
    private Boolean Response;

    @JsonProperty("Error")
    private String Error;

    @JsonProperty("Plot")
    private String description;

    @JsonProperty("Director")
    private String director;

    @JsonProperty("Writer")
    private String writer;

    @JsonProperty("Genre")
    private String genres;

    @JsonProperty("imdbVotes")
    private String imdbVotesString;

    @JsonProperty("Year")
    private int Year;

    public String getError() {
        return Error;
    }

    public void setError(String error) {
        Error = error;
    }


    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    public String getPoster() {
        return Poster;
    }

    public void setPoster(String poster) {
        Poster = poster;
    }

    public Boolean getResponse() {
        return Response;
    }

    public void setResponse(Boolean response) {
        Response = response;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImdbVotesString() {
        return imdbVotesString;
    }

    public void setImdbVotesString(String imdbVotes) {
        this.imdbVotesString = imdbVotes;
    }

    @JsonIgnore
    public Integer getImdbVotes() {
        if (imdbVotesString == null || imdbVotesString.isEmpty() || imdbVotesString.equals("N/A")) {
            return null;
        }

        try{
            return Integer.parseInt(imdbVotesString.replaceAll("[^0-9]", ""));
        } catch (NumberFormatException e) {
            System.out.println("Failed parsing imdbVotesString: " + imdbVotesString);
            return null;
        }
    }
    public String toString() {
        return "OMDBMovie{" +
                "imdbId='" + imdbId + '\'' +
                ", Title='" + Title + '\'' +
                ", Poster='" + Poster + '\'' +
                ", Response=" + Response +
                ", Error='" + Error + '\'' +
                ", description='" + description + '\'' +
                ", director='" + director + '\'' +
                ", writer='" + writer + '\'' +
                ", genres='" + genres + '\'' +
                ", imdbVotesString='" + imdbVotesString + '\'' +
                ", Year=" + Year +
                '}';
    }

    private List<String> parseGenres()
    {
        return parseCSV(genres);
    }

    private List<String> parseWriters() {
        return parseCSV(writer);
    }

    private List<String> parseDirectors() {
        return parseCSV(director);
    }

    public String getImdbId() {
        return imdbId;
    }

    public void setImdbId(String imdbId) {
        this.imdbId = imdbId;
    }

    public int getYear() {
        return Year;
    }

    public void setYear(int year) {
        Year = year;
    }

    private List<String> parseCSV(String csv) {
        if (csv == null || csv.isEmpty() || csv.equals("N/A")) {
            return new ArrayList<>();
        }

        String[] items = csv.split(", ");
        return List.of(items);
    }

    /*
        * Convert OMDBMovie to Movie
        * @param includeDetails - if true, include details such as directors, writers, poster url, description, imdb votes, genres
        * Those are not present in search results, and should not be included in that case
        * @return Movie object
     */
    public Movie toMovie(boolean includeDetails) {
        if (this.getError() != null || this.getImdbId() == null) {
            return null;
        }

        Movie movie = new Movie();
        movie.setId(imdbId);
        movie.setTitle(Title);
        movie.setYear(Year);
        movie.setPosterUrl(Poster);
        movie.setDetailsFetched(false);

        if (includeDetails) {
            movie.setDirectors(parseDirectors());
            movie.setWriters(parseWriters());
            movie.setDescription(description);
            movie.setImdbVotes(getImdbVotes());
            movie.setGenres(parseGenres());
            movie.setDetailsFetched(true);
        }

        // Parse writers, directors

        return movie;
    }

    public void updateDetailsMovie(Movie movie) {
        if (movie == null) {
            return;
        }

        if (this.Response == null || !this.Response) {
            return;
        }

        if (this.imdbId == null || !this.imdbId.equals(movie.getId())) {
            throw new IllegalArgumentException("IMDB ID does not match");
        }

        movie.setTitle(Title);
        movie.setYear(Year);
        movie.setDirectors(new ArrayList<>(parseDirectors()));
        movie.setWriters(new ArrayList<>(parseWriters()));
        movie.setPosterUrl(Poster);
        movie.setDescription(description);
        movie.setImdbVotes(getImdbVotes());
        movie.setGenres(new ArrayList<>(parseGenres()));
        movie.setDetailsFetched(true);
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getGenres() {
        return genres;
    }

    public void setGenres(String genres) {
        this.genres = genres;
    }
}
