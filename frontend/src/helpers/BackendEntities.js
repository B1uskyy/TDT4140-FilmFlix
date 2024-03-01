
class Movie {
    constructor(id, title, year, runtimeMinutes, genres, posterURL, description, directors, writers, actors, imdbVotes){
        this.id = id;
        this.title = title;
        this.year = year;
        this.runtimeMinutes = runtimeMinutes;
        this.genres = genres;
        this.posterURL = posterURL;
        this.description = description;
        this.directors = directors;
        this.writers = writers;
        this.actors = actors;
        this.imdbVotes = imdbVotes;
    }

    static empty(){
        return new Movie(-1, "", -1, -1, [], "", "", [], [], [], -1);
    } 
}

export {Movie}