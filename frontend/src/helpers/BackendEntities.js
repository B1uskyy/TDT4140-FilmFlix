
class Movie {
    constructor(id, title, year, runtimeMinutes, genres, posterURL, description, directors, writers, actors, imdbVotes, reviews, youtube_embed_url){
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
        this.reviews = reviews;
        this.youtube_embed_url = youtube_embed_url;
    }

    static empty(){
        return new Movie(-1, "", -1, -1, [], "", "", [], [], [], -1, [], null);
    } 
}

class UserReview {
    constructor(reviewer, rating, review, id){
        this.reviewer = reviewer;
        this.rating = rating;
        this.review = review;
        this.id = id;
    }
}

export {Movie, UserReview}