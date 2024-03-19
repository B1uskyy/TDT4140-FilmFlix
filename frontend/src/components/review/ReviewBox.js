import React, { useState } from 'react';
import StarRating from './StarRating';
import {useUser} from "../../helpers/UserContext";

const ReviewBox = ({movieId, userReview }) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);
    const { user } = useUser(); // Assuming useUser is your context for accessing the current user

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/movies/view/${movieId}/review`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: user.username,
                    rating,
                    review,
                }),
            });


            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            // Handle successful review submission (e.g., clear form, show message)
            setReview('');
            setRating(0);
            alert('Review submitted successfully');
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div className="review-box">
            <h2>Write a Review</h2>
            <form onSubmit={handleSubmit}>
                <StarRating rating={rating} setRating={setRating} readOnly={!!userReview} />
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
