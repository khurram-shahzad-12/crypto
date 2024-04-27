import React, { useState } from "react";
import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { apiSelector } from "../../store/Api_middelware";
import { Container } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";
import { useSwipeable } from 'react-swipeable';

const CategoryTool = () => {
  const { data } = useSelector(apiSelector);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1192 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1191, min: 768 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 4,
    },
  };
  
  const colorArray = {
    0: "#FFF1EB",
    1: "#FDFFEB",
    2: "#EBFFEB",
    3: "#EBEBFF",
    4: "#EBF8FF",
    5: "#FFF1EB",
    6: "#FDFFEB",
    7: "#EBFFEB",
    8: "#EBEBFF",
    9: "#EBF8FF",
  };

  const dataDummy = [1, 2, 3, 4, 5, 6, 7, 8];
  // eslint-disable-next-line no-unused-vars
  let [color, setColor] = useState("#0098d8");

  return (
    <>
      <Container
        className="paddingContainerFluid maxWidthContainerFluid vectorCategory"
        style={{ paddingRight: "unset" }}
        fluid
      >
        <div className="">
          {data.length > 0 ? (
            
              <Carousel
                arrows={true}
                responsive={responsive}
                autoPlay={false}
                autoPlaySpeed={2000}
                // rewind={true}
                infinite={true}

              // swipeable={true}
              // draggable={true}
              // touchEnabled={true}
              >
                {data.map((each, i) => (
                  <Card
                    className="categorytool"
                    key={i}
                    style={{
                      backgroundColor: `${colorArray[i.toString().slice(-1)]}`,
                    }}
                  >
                    <NavLink
                      to={`/categories/${each.url}`}
                      className="text-decoration-none"
                    >
                      <img
                        className="categoryimage"
                        src={each.vector_icon}
                        alt={each.category_name}
                      />
                      <div className="categoryname">{each.category_name}</div>
                    </NavLink>
                  </Card>
                ))}
              </Carousel>

          )
            : (
              <Carousel arrows={false} responsive={responsive}>
                {dataDummy.map((each, i) => (
                  <Card
                    key={i}
                    className="categorytool"
                    style={{
                      paddingTop: "45px",
                      backgroundColor: `${colorArray[i.toString().slice(-1)]}`,
                    }}
                  >
                    <ClipLoader
                      color={color}
                      size={35}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </Card>
                ))}
              </Carousel>
            )}
        </div>
      </Container>
    </>
  );
};

export default CategoryTool;
