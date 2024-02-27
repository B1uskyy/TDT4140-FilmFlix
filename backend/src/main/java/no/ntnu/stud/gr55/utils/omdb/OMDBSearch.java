package no.ntnu.stud.gr55.utils.omdb;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OMDBSearch {

    @JsonProperty("Search")
    public List<OMDBMovie> search;

    @JsonProperty("totalResults")
    public Integer totalResults;

    @JsonProperty("Response")
    public Boolean response;


    @JsonProperty("Error")
    public String error;

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public List<OMDBMovie> getSearch() {
        return search;
    }

    public void setSearch(List<OMDBMovie> search) {
        this.search = search;
    }

    public Integer getTotalResults() {
        return totalResults;
    }

    public void setTotalResults(Integer totalResults) {
        this.totalResults = totalResults;
    }

    public Boolean getResponse() {
        return response;
    }

    public void setResponse(Boolean response) {
        this.response = response;
    }

    public int getPageAmount() {
        return (int) Math.ceil((double) totalResults / 10); // OMDB returns 10 results per page
    }

    public String toString() {

        StringBuilder sb = new StringBuilder();

        sb.append("OMDBSearch: {\n");
        sb.append("\tResponse: ").append(response).append("\n");
        sb.append("\tTotal results: ").append(totalResults).append("\n");
        sb.append("\tSearch: \n");
        for (OMDBMovie movie : search) {
            sb.append("\t\t").append(movie.toString()).append("\n");
        }

        sb.append("}");

        return sb.toString();
    }
}
