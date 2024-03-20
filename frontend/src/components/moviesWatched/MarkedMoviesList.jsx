import React from "react";
import { useUser } from "../../helpers/UserContext";

function MarkedMoviesList() {
    const { markedMovies } = useUser();

    return (
        <div>
            <h2>Marked Movies</h2>
            <ul>
                {markedMovies.map(movieId => (
                    <li key={movieId}>{movieId}</li>
                ))}
            </ul>
        </div>
    );
}

export default MarkedMoviesList;