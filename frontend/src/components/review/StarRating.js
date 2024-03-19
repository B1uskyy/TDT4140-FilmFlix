// StarRating.js
import React from "react";
import "./StarRating.css";

const StarRating = ({ rating, setRating, readOnly = false }) => {
	const [hover, setHover] = React.useState(1);


	return (
		<div className="star-rating">
			{[...Array(5)].map((star, index) => {
				index += 1;
				return (
					<button
						type="button"
						key={index}
						className={index <= (hover || rating) ? "on" : "off"}
						onClick={() => setRating(index)}
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
