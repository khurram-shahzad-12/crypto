import React, {useState} from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

const CommonSubCategorySection = ({ data, borderRadius, type }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
  const [stringLen, setStringLen] = useState(15)

  const responsive =  {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  

  return (
    <>
      {type !== "perfume" ? 
        <>
          {!isMobile ?  
          <>
          <div className="subCategoryTitle">{t("category.subcategory")}</div>
            <ul className="subCategorySection">
              {data.map((each, i) => (
                <li key={i} style={{width: '14.1%',marginRight: '10px'}}>
                  <NavLink
                    className="subCategoryLink"
                    to={`/products-category/${each.url}`}
                  >
                    <img
                      src={each.sub_category_image}
                      alt=""
                      style={{ width: "100%", borderRadius: `${borderRadius}` }}
                    />
                    <div className="subCategoryName" onMouseOver={() => setStringLen(each.sub_category_name.length)}> {each.sub_category_name.slice(0, stringLen)}</div>
                  </NavLink>
                </li>
              ))}
        
            </ul>
          </> : 

            <Carousel
              responsive={responsive}
              className="subCategorySection"
              arrows={true}
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
                  <div className="subCategoryName"> {each.sub_category_name.slice(0, stringLen)}</div>
                </NavLink>
              </Card>
            ))}
            </Carousel>
          }
        </>
        : 
        <Carousel
          responsive={responsive}
          className="subCategorySection"
          arrows={true}
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
                <div className="subCategoryName"> {each.sub_category_name.slice(0, stringLen)}</div>
              </NavLink>
            </Card>
          ))}
        </Carousel>
      }
    </>
   
    
     
    
  );
};

export default CommonSubCategorySection;
