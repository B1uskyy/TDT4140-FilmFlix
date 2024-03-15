import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CustomNextArrow(props){
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{
            ...style, 
            background: "transparent",
            right: "0",
        }}
        onClick={onClick}
        />
    );
}

function CustomPrevArrow(props){
    const { className, style, onClick } = props;
    return (
        <div
        className={`${className} custom-prev-arrow`}
        style={{
            ...style, 
            background: "transparent",
            left: "0",
            zIndex: 1,
        }}
        onClick={onClick}
        />
    );
}


function CarouselPage({ title, imageUrls}){
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    return (
        <div>
            <h1>{title}</h1>
            <Slider {...settings}>
                {imageUrls.map((url, index) => (
                    <Link to={`/movie/${index +1}`} key={index}>
                        <div>
                            <img src={url} alt={`Movie ${index +1 }`} />
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>
    );
}

export default CarouselPage;
