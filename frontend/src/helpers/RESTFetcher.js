import {Movie} from './BackendEntities'

class RESTFetcher {
    static url = "http://localhost:8080/api/"

    static urlMovies = this.url + "movies"

    static urlMovieView(id) {
        return this.urlMovies + "/view/" + id;
    }

    static urlMovieAutocomplete(query) {
        return this.urlMovies + "/autocomplete/" + query;
    }

    static urlGenres = this.urlMovies + "/genres"

    static urlDirectors = this.urlMovies + "/directors"
    static urlWriters = this.urlMovies + "/writers"
    static urlActors = this.urlMovies + "/actors"

    static jsonToMovie(json) {
        console.log("json: " + json)


        return new Movie(
            json.id,
            json.title,
            json.year,
            json.runtimeMinutes,
            json.genres,
            json.posterUrl,
            json.description,
            json.directors,
            json.writers,
            json.actors,
            json.imdbVotes
        );
    }

    /**
     * Fetches all (upto 10) movies from the backend
     * @returns {Promise<*|*[]>} A promise with a list of all movies from the backend
     */
    static async fetchMovies(search_query = null,
        genres = null, actors = null, directors = null, writers = null) {
        let url = this.urlMovies + "?"
        if (genres !== null){
            url += "&genre=" + genres
        }
        if (actors !== null){
            url += "&actor=" + actors
        }
        if (directors !== null){
            url += "&director=" + directors
        }
        if (writers !== null){
            url += "&writer=" + writers
        }

        if (search_query !== null && search_query !== undefined){
            url += "&search=" + search_query
        }


        try{
            const response = await fetch(url, {
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

    static async fetchJSON(url) {
        try{
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            if (!response.ok){
                console.log("Could not fetch genres")
                return []
            }
            return await response.json();
        }
        catch (error){
            console.log("Failed fetching genres: " + error)
            return []
        }
    }

    static async fetchGenres() {
        return await this.fetchJSON(this.urlGenres);
    }

    static async fetchDirectors() {
        return await this.fetchJSON(this.urlDirectors);
    }

    static async fetchWriters() {
        return await this.fetchJSON(this.urlWriters);
    }

    static async fetchActors() {
        return await this.fetchJSON(this.urlActors);
    }

    static async fetchAutocomplete(query) {
        let search = this.urlMovieAutocomplete(query)
        const response = await this.fetchJSON(search)
        return response.map(movie => this.jsonToMovie(movie))
    }

}

export default RESTFetcher;