package no.ntnu.stud.gr55.utils.kinocheck;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import no.ntnu.stud.gr55.utils.omdb.OMDBMovie;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MovieTrailer {
    @JsonProperty("id")
    private String id;

    @JsonProperty("youtube_video_id")
    private String youtube_video_id;

    @JsonProperty("youtube_channel_id")
    private String youtube_channel_id;

    @JsonProperty("youtube_thumbnail")
    private String youtube_thumbnail;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getYoutube_video_id() {
        return youtube_video_id;
    }

    public void setYoutube_video_id(String youtube_video_id) {
        this.youtube_video_id = youtube_video_id;
    }

    public String getYoutube_channel_id() {
        return youtube_channel_id;
    }

    public void setYoutube_channel_id(String youtube_channel_id) {
        this.youtube_channel_id = youtube_channel_id;
    }

    public static MovieTrailer getTrailer(String imdb_id){
        KinocheckResponse response = KinocheckResponse.getTrailer(imdb_id);
        if(response != null && response.getTrailer() != null){
            return response.getTrailer();
        }
        return null;
    }
}

@JsonIgnoreProperties(ignoreUnknown = true)
class KinocheckResponse{

    private static final String API_URL = "https://api.kinocheck.de/movies?";

    @JsonProperty("trailer")
    private MovieTrailer trailer;

    @JsonProperty("status")
    private String status;

    @JsonProperty("error")
    private String error;

    @JsonProperty("imdb_id")
    private String imdb_id;

    public static KinocheckResponse getTrailer(String imdb_id) {
        String urlS = API_URL + "imdb_id=" + imdb_id;

        try {
            // send request, get json response
            URL url = new URL(urlS);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();

            con.setRequestMethod("GET");
            con.setRequestProperty("Content-Type", "application/json");

            con.connect();

            // get json response
            int status = con.getResponseCode();
            if (status != 200) {
                System.out.println("Failed fetching trailer data for " + imdb_id + ": " + status);
                System.out.println("URL: " + urlS);
                return null;
            }

            BufferedReader br = new BufferedReader(
                    new InputStreamReader(con.getInputStream())
            );

            ObjectMapper mapper = new ObjectMapper();

            KinocheckResponse json = mapper.readValue(br, KinocheckResponse.class);
            br.close();
            con.disconnect();

            if (json.getError() != null) {
                System.out.println("Failing fetching trailer data for " + imdb_id + ". Error: " + json.getError());
                System.out.println("URL: " + urlS);
                return null;
            }

            return json;
        } catch (Exception e) {
            System.out.println("Failing fetching trailer data for " + imdb_id + ".");
            System.out.println("URL: " + urlS);
            e.printStackTrace();
        }

        return null;
    }
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getImdb_id() {
        return imdb_id;
    }

    public void setImdb_id(String imdb_id) {
        this.imdb_id = imdb_id;
    }

    public MovieTrailer getTrailer() {
        return trailer;
    }

    public void setTrailer(MovieTrailer trailer) {
        this.trailer = trailer;
    }


}
