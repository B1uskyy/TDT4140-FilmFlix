import React from "react";
import "../styles/homepage.css"
import ponyo from "../img/ponyo.jpg"
import totoro from "../img/totoro.jpg"
import Navbar from "../components/Navbar.jsx"




function Homepage() {
    return (
        <div className="main-container"> 
        <Navbar />
            <div className="recommendation-container">
                <h1 className="title-container">TRENDING</h1>
                <div className="trending-movies">
                    <div className="movie-card">
                        <img className="picture" src={ponyo} alt="Feil"/>
                        Movie1
                    </div>
                    <div className="movie-card">
                        <img className="picture" src={totoro} alt="Feil"/>
                        Movie2
                    </div>
                    <div className="movie-card">
                        <img className="picture" src={ponyo} alt="Feil"/>
                        Movie3
                    </div>
                    <div className="movie-card">
                        <img className="picture" src={totoro} alt="Feil"/>
                        Movie4
                    </div>
                    <div className="movie-card">
                        Movie5
                    </div>
                    <div className="movie-card">
                        Movie6
                    </div>
                    <div className="movie-card">
                        Movie7
                    </div>
                    <div className="movie-card">
                        Movie8
                    </div>
                </div>
            </div>
            <div className="recommendation-container">
                <h1 className="title-container">COMEDY</h1>
                <div className="trending-movies">
                    <div className="movie-card">
                        <img className="picture" src={ponyo} alt="Feil"/>
                        Movie1
                    </div>
                    <div className="movie-card">
                        <img className="picture" src={ponyo} alt="Feil"/>
                        Movie2
                    </div>
                    <div className="movie-card">
                        <img className="picture" src={ponyo} alt="Feil"/>
                        Movie3
                    </div>
                    <div className="movie-card">
                        <img className="picture" src={ponyo} alt="Feil"/>
                        Movie4
                    </div>
                    <div className="movie-card">
                        Movie5
                    </div>
                    <div className="movie-card">
                        Movie6
                    </div>
                    <div className="movie-card">
                        Movie7
                    </div>
                    <div className="movie-card">
                        Movie8
                    </div>
                </div>
            </div>
            
            <div className="recommendation-container">
                <h1 className="title-container">ACTION</h1>
                <div className="trending-movies">
                    <div className="movie-card">
                        <img className="picture" src={ponyo} alt="Feil"/>
                        Movie1
                    </div>
                    <div className="movie-card">
                        <img className="picture" src={ponyo} alt="Feil"/>
                        Movie2
                    </div>
                    <div className="movie-card">
                        <img className="picture" src={ponyo} alt="Feil"/>
                        Movie3
                    </div>
                    <div className="movie-card">
                        <img className="picture" src={ponyo} alt="Feil"/>
                        Movie4
                    </div>
                    <div className="movie-card">
                        Movie5
                    </div>
                    <div className="movie-card">
                        Movie6
                    </div>
                    <div className="movie-card">
                        Movie7
                    </div>
                    <div className="movie-card">
                        Movie8
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Homepage;