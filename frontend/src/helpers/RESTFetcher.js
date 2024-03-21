import {Movie, UserReview} from './BackendEntities'

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
    static urlYears = this.urlMovies + "/years"

    static reviewURL(movieId) {
        return this.urlMovieView(movieId) + "/review";
    }

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
            json.imdbVotes,
            json.movieReview.map(review => this.jsonToReview(review)),
            json.trailerURL
        );
    }

    static jsonToReview(json) {
        return new UserReview(
            json.reviewer,
            json.rating,
            json.review,
            json.id
        );

    }

    /**
     * Fetches all (upto 10) movies from the backend
     * @returns {Promise<*|*[]>} A promise with a list of all movies from the backend
     */
    static async fetchMovies(search_query = null,
        genres = null, actors = null, directors = null, writers = null,
                             minYear = null, maxYear = null) {
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
        if (minYear !== null){
            url += "&minYear=" + minYear
        }
        if (maxYear !== null){
            url += "&maxYear=" + maxYear
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

    static async fetchJSON(url, defaultValue = null) {
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
                return defaultValue
            }
            return await response.json();
        }
        catch (error){
            console.log("Failed fetching genres: " + error)
            return defaultValue
        }
    }

    static async fetchGenres() {
        return await this.fetchJSON(this.urlGenres, []);
    }

    static async fetchDirectors() {
        return await this.fetchJSON(this.urlDirectors, []);
    }

    static async fetchWriters() {
        return await this.fetchJSON(this.urlWriters, []);
    }

    static async fetchActors() {
        return await this.fetchJSON(this.urlActors, []);
    }

    static async fetchAutocomplete(query) {
        let search = this.urlMovieAutocomplete(query)
        const response = await this.fetchJSON(search)

        if (response === null) {
            return []
        }
        return response.map(movie => this.jsonToMovie(movie))
    }

    static async fetchYears() {
        return await this.fetchJSON(this.urlYears, {min: 1900, max: 2050});
    }

    static async addReview( movieId, username, rating, review ) {
        try {
            const response = await fetch(this.reviewURL(movieId), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, rating, review }),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("Review added successfully");
                        return true;
                    }
                    else{
                        console.log("Review could not be added");
                        return false;
                    }
                });
            return response;
        } catch (error) {
            console.log(`Error: ${error}`);
            return false;
        }
    }

    static async removeReview( movieId, username ) {
        try {
            const response = await fetch(this.reviewURL(movieId), {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
            });
            console.log(response);
            return response.ok;
        } catch (error) {
            console.log(`Error: ${error}`);
            return false;
        }
    }

}

export default RESTFetcher;