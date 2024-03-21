import React, { useState } from 'react';
// Assuming StarRating is your component that allows users to set a rating
import StarRating from './StarRating';
import RESTFetcher from "../../helpers/RESTFetcher";

function ReviewBox ({ username, movieId }) {
    // State to hold the review text
    const [review, setReview] = useState('');

    // State to hold the star rating
    const [rating, setRating] = useState(0);

    // Handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating < 0 || rating > 5) {
            alert("Rating must be between 0 and 5");
            return;
        }
        if (review.length === 0) {
            alert("Review cannot be empty");
            return;
        }

        RESTFetcher.addReview(movieId, username, rating, review);
        // Process the review and rating here (e.g., send to an API or state management store)
        console.log("Review submitted with rating: ", rating, " and review: ", review);
    };

    return (
        <div className="review-box">
            <h2>Movie Review</h2>
            <form onSubmit={handleSubmit}>
                <StarRating rating={rating} setRating={setRating} />
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review here..."
                />
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default ReviewBox;
