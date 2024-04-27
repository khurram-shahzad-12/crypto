import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";

function AsNavFor() {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slider1 = useRef(null);
    const slider2 = useRef(null);

    useEffect(() => {
        setNav1(slider1.current);
        setNav2(slider2.current);
    }, []);




    const settings2 = {
        asNavFor: nav1,
        ref: slider2,
        afterChange: (current) => {
            setCurrentSlide(current);
        },
        slidesToShow: 3,
        swipeToSlide: true,
        focusOnSelect: true,
        centerMode: true,
        initialSlide: 1,
        centerPadding: "60px"
    };


    return (
        <div>
            <Slider {...settings2}>
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
            </Slider>
        </div>
    );
}

export default AsNavFor;
