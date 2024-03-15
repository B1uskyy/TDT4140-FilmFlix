import React from "react";
import "./homepage.css"
import ponyo from "../../img/ponyo.jpg"
import totoro from "../../img/totoro.jpg"
import Navbar from "../../components/navbar/Navbar.jsx"
import CarouselPage from "../carouselpage/CarouselPage";

// function Homepage() {
//     return (
//         <div className="main-container"> 
//         <Navbar />
//             <div className="recommendation-container">
//                 <h1 className="title-container">TRENDING</h1>
//                 <div className="trending-movies">
//                     <div className="movie-card">
//                         <img className="picture" src={ponyo} alt="Feil"/>
//                         Movie1
//                     </div>
//                     <div className="movie-card">
//                         <img className="picture" src={totoro} alt="Feil"/>
//                         Movie2
//                     </div>
//                     <div className="movie-card">
//                         <img className="picture" src={ponyo} alt="Feil"/>
//                         Movie3
//                     </div>
//                     <div className="movie-card">
//                         <img className="picture" src={totoro} alt="Feil"/>
//                         Movie4
//                     </div>
//                     <div className="movie-card">
//                         Movie5
//                     </div>
//                     <div className="movie-card">
//                         Movie6
//                     </div>
//                     <div className="movie-card">
//                         Movie7
//                     </div>
//                     <div className="movie-card">
//                         Movie8
//                     </div>
//                 </div>
//             </div>
//             <div className="recommendation-container">
//                 <h1 className="title-container">COMEDY</h1>
//                 <div className="trending-movies">
//                     <div className="movie-card">
//                         <img className="picture" src={ponyo} alt="Feil"/>
//                         Movie1
//                     </div>
//                     <div className="movie-card">
//                         <img className="picture" src={ponyo} alt="Feil"/>
//                         Movie2
//                     </div>
//                     <div className="movie-card">
//                         <img className="picture" src={ponyo} alt="Feil"/>
//                         Movie3
//                     </div>
//                     <div className="movie-card">
//                         <img className="picture" src={ponyo} alt="Feil"/>
//                         Movie4
//                     </div>
//                     <div className="movie-card">
//                         Movie5
//                     </div>
//                     <div className="movie-card">
//                         Movie6
//                     </div>
//                     <div className="movie-card">
//                         Movie7
//                     </div>
//                     <div className="movie-card">
//                         Movie8
//                     </div>
//                 </div>
//             </div>
            
//             <div className="recommendation-container">
//                 <h1 className="title-container">ACTION</h1>
//                 <div className="trending-movies">
//                     <div className="movie-card">
//                         <img className="picture" src={ponyo} alt="Feil"/>
//                         Movie1
//                     </div>
//                     <div className="movie-card">
//                         <img className="picture" src={ponyo} alt="Feil"/>
//                         Movie2
//                     </div>
//                     <div className="movie-card">
//                         <img className="picture" src={ponyo} alt="Feil"/>
//                         Movie3
//                     </div>
//                     <div className="movie-card">
//                         <img className="picture" src={ponyo} alt="Feil"/>
//                         Movie4
//                     </div>
//                     <div className="movie-card">
//                         Movie5
//                     </div>
//                     <div className="movie-card">
//                         Movie6
//                     </div>
//                     <div className="movie-card">
//                         Movie7
//                     </div>
//                     <div className="movie-card">
//                         Movie8
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }



//export default Homepage;



  function Homepage() {
    // Placeholder URLs for African animals
    const africanAnimalImages = [
        "https://source.unsplash.com/800x400/?lion",
        "https://source.unsplash.com/800x400/?elephant",
        "https://source.unsplash.com/800x400/?giraffe",
        "https://source.unsplash.com/800x400/?cheetah",
        "https://source.unsplash.com/800x400/?rhinoceros",
        "https://source.unsplash.com/800x400/?zebra",
        "https://source.unsplash.com/800x400/?hippopotamus",
        "https://source.unsplash.com/800x400/?gorilla",
        "https://source.unsplash.com/800x400/?meerkat",
        "https://source.unsplash.com/800x400/?african-buffalo"
    ];
  
    // Placeholder URLs for Nordic nature
    const nordicNatureImages = [
        "https://source.unsplash.com/800x400/?aurora",
        "https://source.unsplash.com/800x400/?mountain",
        "https://source.unsplash.com/800x400/?forest",
        "https://source.unsplash.com/800x400/?lake",
        "https://source.unsplash.com/800x400/?snow",
        "https://source.unsplash.com/800x400/?waterfall",
        "https://source.unsplash.com/800x400/?landscape",
        "https://source.unsplash.com/800x400/?sunset",
        "https://source.unsplash.com/800x400/?cabin",
        "https://source.unsplash.com/800x400/?northern-lights"
    ];
  
    const winterPictures = [
        "https://source.unsplash.com/800x400/?winter-snow",
        "https://source.unsplash.com/800x400/?snowy-forest",
        "https://source.unsplash.com/800x400/?winter-landscape",
        "https://source.unsplash.com/800x400/?frozen-lake",
        "https://source.unsplash.com/800x400/?snowy-mountains",
        "https://source.unsplash.com/800x400/?winter-cabin",
        "https://source.unsplash.com/800x400/?iceberg",
        "https://source.unsplash.com/800x400/?snowfall",
        "https://source.unsplash.com/800x400/?winter-wonderland",
        "https://source.unsplash.com/800x400/?northern-lights-winter"
    ];
  
    return (
        <div className="main-container">
          <Navbar />
    
          {/* African Animals Carousel */}
          <div className="recommendation-container">
            <CarouselPage title="Trending" imageUrls={africanAnimalImages} />
          </div>
    
          {/* Nordic Nature Carousel */}
          <div className="recommendation-container">
            <CarouselPage title="Comedy" imageUrls={nordicNatureImages} />
          </div>
    
          {/* American Highways Carousel */}
          <div className="recommendation-container">
            <CarouselPage title="Action" imageUrls={winterPictures} />
          </div>
        </div>
      );
    }
    
    export default Homepage;