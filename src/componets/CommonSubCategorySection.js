import React, {useState, useEffect} from "react";
import { Card, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

const CommonSubCategorySection = ({ data, borderRadius, type }) => {
  const { t } = useTranslation();
  const [stringLen, setStringLen] = useState(15)
  const [pathname, setPathname] = useState(false)
  const [dataLength, setDataLength] = useState(10)
  const isMobile = useMediaQuery({ query: `(max-width: 991px)` });

  //console.log("data", data)
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

  useEffect(()=>{
    setDataLength(data.length)
  },[data])

  useEffect(()=>{
    const urlParam = window.location.pathname.slice(1,)

    if(urlParam == 'offers' || urlParam == 'perfumes'){
      setPathname(true)
    }
  },[pathname])


  return (
    <>
    {(!pathname) &&
    <div className="subCategoryTitle">{t("category.subcategory")}</div>
    }
    {isMobile ?
      <Carousel
      arrows={false}
      responsive={responsive}
      //autoPlay={true}
      //autoPlaySpeed={2000}
      // rewind={true}
      //infinite={true}
      style={{
        justifyContent: "center"
      }}
      containerClass={dataLength <= 4 ? 'centerCarausel':''} 
    
    
      //className="subCategorySection"
      >
        {data.map((each, i) => (
          <Card key={i} className="border-0 text-center">
          <NavLink
            className="subCategoryLink"
            
            to={type == 'perfume'? `${each.url}` :`/products-category/${each.url}`}
          >
            <img
              src={each.sub_category_image}
              alt=""

              style={{ width: "90%", borderRadius: `${borderRadius}` }}
            />
            <div className="subCategoryName mt-2"> {each.sub_category_name}</div>
          </NavLink>
        </Card>
        ))}
      </Carousel>
    :
    <Row className="product-shop-main">
      <ul>
        {data.map((each, i) => (
          <li key={i} className="list-col col-md-2">
            <Card className="border-0">
              <NavLink
                className="subCategoryLink"
                to={type == 'perfume'? `${each.url}` :`/products-category/${each.url}`}
              >
                {/* <div className="category_image1"> */}
                <img
                  src={each.sub_category_image}
                  alt="category" style={{ width: "100%", borderRadius: `${borderRadius}` }}
                />
                {/* </div> */}
                <div className="subCategoryName mt-2">
                  {" "}
                  {each.sub_category_name}
                </div>
              </NavLink>
            </Card>
          </li>
        ))}
      </ul>
    </Row>
    }




















    
      {/* {type !== "perfume" ? 
        <>

          

            <Carousel
              responsive={responsive}
              className="subCategorySection"
             // arrows={true}
              autoPlay={true}
              autoPlaySpeed={2000}
              arrows={false}
              //rewind={true}
              infinite={true}
            >
            {data.map((each, i) => (
              <Card key={i}>
                <NavLink
                  className="subCategoryLink"
                  to={`${each.url}`}
                >
                  <img
                    src={each.sub_category_image}
                    alt=""
                    style={{ width: "100%", borderRadius: `${borderRadius}` }}
                  />
                  <div className="subCategoryName"> {each.sub_category_name}</div>
                </NavLink>
              </Card>
            ))}
            </Carousel>

        </>
        :  */}
        {/* <Carousel
          responsive={responsive}
          className="subCategorySection"
          //arrows={true}
          autoPlay={true}
                autoPlaySpeed={2000}
                rewind={true}
                infinite={true}
                arrows={false}
        >
          {data.map((each, i) => (
            <Card key={i}>
              <NavLink
                className="subCategoryLink"
                to={`${each.url}`}
              >
                <img
                  src={each.sub_category_image}
                  alt=""
                  style={{ width: "100%", borderRadius: `${borderRadius}` }}
                />
                <div className="subCategoryName"> {each.sub_category_name}</div>
              </NavLink>
            </Card>
          ))}
        </Carousel> */}

      {/* } */}
    </>
   
    
     
    
  );
};

export default CommonSubCategorySection;
