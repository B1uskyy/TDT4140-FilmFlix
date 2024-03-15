import React, { useState } from "react";
import "./StarRating.css";
import axios from "axios";
import { useUser } from "../../helpers/UserContext";


const StarRating = (props) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const { movieId } = props;
    const user = useUser();

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`/api/movies/view/${movieId}/review`, {
                rating,
                review: comment,
            });
            if (response.data.status === "ok") {
            }
        } catch (error) {
            // Handle error (e.g., showing an error message)
        }
    };



    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "on" : "off"}
                        onClick={() => {
                            setRating(index);

                        }}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here"
            />
            <button id="submit-button" onClick={handleSubmit()}>Submit Review</button>
        </div>
    );
};
export default StarRating;