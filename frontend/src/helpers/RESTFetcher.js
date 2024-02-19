import {Movie, Crew} from './BackendEntities'

class RESTFetcher {
    static url = "http://localhost:8080/api/"

    static urlMovies = this.url + "movies"

    static urlMovieView(id) {
        return this.urlMovies + "/view/" + id;
    }

    static urlMovieSearch(query) {
        return this.urlMovies + "/search/" + query;
    }

    static jsonToMovie(json) {
        console.log("json: " + json)

        const directors = json.directors.map(director => this.jsonToCrew(director));
        const writers = json.writers.map(writer => this.jsonToCrew(writer));

        return new Movie(
            json.id,
            json.title,
            json.year,
            json.runtimeMinutes,
            json.genres,
            json.posterURL,
            json.description,
            directors,
            writers,
            json.imdbVotes
        );
    }

    static jsonToCrew(json) {
        return new Crew(
            json.id,
            json.name,
            json.birthYear,
            json.deathYear
        );
    }

    /**
     * Fetches all (upto 10) movies from the backend
     * @returns {Promise<*|*[]>} A promise with a list of all movies from the backend
     */
    static async fetchMovies() {
        try{
            const response = await fetch(this.urlMovies, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            if (!response.ok){
                console.log("Could not fetch movies")
                return []
            }
            const json = await response.json();
            return json.map(movie => this.jsonToMovie(movie));
        }
        catch (error){
            console.log("Failed fetching movies: " + error)
            return []
        }
    }

    /**
     * Fetches details about a movie based on its id
     * @param id The IMDB id of the movie
     * @returns {Promise<Movie|null>} A promise with the movie details
     */
    static async fetchMovie(id) {
        try{
            const response = await fetch(this.urlMovieView(id), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            if (!response.ok){
                console.log("Could not fetch movie")
                return null
            }
            const json = await response.json();
            return this.jsonToMovie(json);
        }
        catch (error){
            console.log("Failed fetching movie: " + error)
            return null
        }
    }
}

export default RESTFetcher;