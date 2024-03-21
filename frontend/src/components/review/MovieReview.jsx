import RESTFetcher from "../../helpers/RESTFetcher";

function MovieReview({movieReview, currentUser, currentMovie}) {

    const isCurrentUser = currentUser === movieReview.reviewer;

    function del_review() {
        RESTFetcher.removeReview(currentMovie, currentUser).then(() => {
            window.location.reload();
        });
    }


    return (
        <div className={"movie-review"}>
            <h2>Anmeldelse</h2>
            <div className={"movie-review-content"}>
                <p>{movieReview.review}</p>
                <p>Rating: {movieReview.rating}</p>
                <p>Reviewer: {movieReview.reviewer}</p>
            </div>
            {isCurrentUser && <button onClick={del_review}>Delete review</button>}
        </div>
    );
}

export default MovieReview;