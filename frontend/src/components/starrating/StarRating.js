import React, { useState } from "react";
import "./StarRating.css"; // Make sure to style your stars

const StarRating = ({ onRating }) => {
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);

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
							onRating(index);
						}}
						onMouseEnter={() => setHover(index)}
						onMouseLeave={() => setHover(rating)}
					>
						<span className="star">&#9733;</span>
					</button>
				);
			})}
		</div>
	);
};
export default StarRating;
