package no.ntnu.stud.gr55.utils;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OMDBObject {
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

    @JsonProperty("imdbVotes")
    private String imdbVotesString;

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

        return "OMDB Object (Title: " + Title + ", Poster: " + Poster + ", Response: " + Response + "," +
                "Description: " + description +", IMDB votes: " + imdbVotesString + ")";
    }
}
