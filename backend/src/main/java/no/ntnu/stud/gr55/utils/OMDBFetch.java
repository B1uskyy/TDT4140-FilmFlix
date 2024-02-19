package no.ntnu.stud.gr55.utils;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
public class OMDBFetch {

    private static final String API_URL = "http://www.omdbapi.com/?";

    public static OMDBObject fetchMovie(String omdbApiKey, String imdbId) {
        String urlS = API_URL + "apikey=" + omdbApiKey;

        urlS = urlS + "&i=" + imdbId;

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
                System.out.println("Failed fetching movie poster from OMDB. Status code: " + status);
                System.out.println("URL: " + urlS);
                return null;
            }

            BufferedReader br = new BufferedReader(
                    new InputStreamReader(con.getInputStream())
            );

            ObjectMapper mapper = new ObjectMapper();

            OMDBObject json = mapper.readValue(br, OMDBObject.class);
            br.close();
            con.disconnect();

            if (!json.getResponse()) {
                System.out.println("Failing fetching movie poster from OMDB. Error: " + json.getError());
                System.out.println("URL: " + urlS);
                return null;
            }

            return json;
        } catch (Exception e) {
            System.out.println("Failed fetching movie poster from OMDB");
            System.out.println("URL: " + urlS);
            e.printStackTrace();
        }

        return null;
    }
}

