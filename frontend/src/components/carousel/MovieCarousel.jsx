import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';


const MovieCarousel = ({ title, movies }) => {
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    return (
        <div>
            <h2>{title}</h2>
            <Slider {...settings}>
                {movies.map((movie, index) => (
                    <div key={index}>
                        <Link to={`/movies/${movie.id}`} className="movie">
                            <div className="movie-block">
                                <img
                                    className="movie-poster"
                                    src={movie.posterURL === 'N/A' ? 'https://via.placeholder.com/300' : movie.posterURL}
                                    alt={movie.title}
                                />
                                <div className="movie-info">
                                    <h3>{movie.title}</h3>
                                    <p>{movie.year}</p>
                                    <p>{movie.genres !== null ? movie.genres.join(' | ') : ''}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default MovieCarousel;