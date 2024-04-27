import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { FaCommentsDollar } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { NavLink, useNavigate } from "react-router-dom";

const Slider = ({ carouselList }) => {
  // eslint-disable-next-line no-unused-vars
  const [rewind, setRewind] = useState(true);
  const [index, setIndex] = useState(0);
  //const [url, setUrl] = useState("");

  const navigate = useNavigate();



  const mobileView = useMediaQuery({ query: `(max-width: 991px)` });
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const redirectUrl =(url) => {
    if(url.slice(0, 5) == "https"){
      window.open(url, '_self', 'noopener,noreferrer')
    }else{
      navigate(`${url}`);
    }

  }



  return (
    <div className="Slider">
      {carouselList !== undefined ? (
        <Carousel
          autoplayspeed={1000}
          autoPlay={true}
          rewind={rewind.toString()}
          infinite={rewind.toString()}
          activeIndex={index}
          onSelect={handleSelect}
          controls={carouselList.length > 1 ? true : false}
        >
          {carouselList.map((element, i) => (
            <Carousel.Item key={i}>

              {/* <NavLink to={element.url}>
                <img
                  className="d-block w-100"
                  src={
                    mobileView ? element.mobile_image_url : element.image_url
                  }
                  alt="banner"
                />
              </NavLink> */}
              <div >
                <img  onClick={() => redirectUrl(element.url)}
                  className="d-block w-100"
                  src={
                    mobileView ? element.mobile_image_url : element.image_url
                  }
                  alt="banner"  
                />
              </div>

            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <div>
          <div
            style={{
              background: "#D9D9D9",
              position: "relative",
              paddingTop: "120px",
              height: `${mobileView ? "146px" : "430px"}`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Slider;
