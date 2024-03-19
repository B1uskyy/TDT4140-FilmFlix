import React, { useEffect, useState } from 'react';
import './homepage.css';
import Navbar from '../../components/navbar/Navbar.jsx';
import MovieCarousel from '../../components/carousel/MovieCarousel.jsx';
import RESTFetcher from '../../helpers/RESTFetcher.js';

function Homepage() {
    const [actionMovies, setActionMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
    const [horrorMovies, setHorrorMovies] = useState([]);
    const [dramaMovies, setDramaMovies] = useState([]); 
    const [animationMovies, setAnimationMovies] = useState([]);

    useEffect(() => {

        fetchActionMovies();

        fetchComedyMovies();

        fetchHorrorMovies();

        fetchDramaMovies(); 

        fetchAnimationMovies();

    }, []);


    const fetchActionMovies = async () => {
        const actionMoviesData = await RESTFetcher.fetchMovies('', 'Action', null, null, null, 1900, 2022);
        setActionMovies(actionMoviesData.slice(0, 10));
    };

    const fetchComedyMovies = async () => {
        const comedyMoviesData = await RESTFetcher.fetchMovies('', 'Comedy', null, null, null, 1900, 2022);
        setComedyMovies(comedyMoviesData.slice(0, 10));
    };

    const fetchHorrorMovies = async () => {
        const horrorMoviesData = await RESTFetcher.fetchMovies('', 'Horror', null, null, null, 1900, 2022);
        setHorrorMovies(horrorMoviesData.slice(0, 10));
    }

    const fetchDramaMovies = async () => {
        const dramaMoviesData = await RESTFetcher.fetchMovies('', 'Drama', null, null, null, 1900, 2022); 
        setDramaMovies(dramaMoviesData.slice(0, 10)); 
    };

    const fetchAnimationMovies = async () => {
        const animationMoviesData = await RESTFetcher.fetchMovies('', 'Animation', null, null, null, 1900,2022);
        setAnimationMovies(animationMoviesData.slice(0,10));
    };

    return (
        <div className="main-container">
            <Navbar />

            <div className="recommendation-container">
                <MovieCarousel title="Action Movies" movies={actionMovies} />
            </div>

            <div className="recommendation-container">
                <MovieCarousel title="Comedy Movies" movies={comedyMovies} />
            </div>

            <div className="recommendation-container">
                <MovieCarousel title="Horror Movies" movies={horrorMovies} />
            </div>

            <div className="recommendation-container">
                <MovieCarousel title="Drama Movies" movies={dramaMovies} /> 
            </div>

            <div className="recommendation-container">
                <MovieCarousel title="Animation Movies" movies={animationMovies} />
            </div>
            
        </div>
    );
}

export default Homepage;