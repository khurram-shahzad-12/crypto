import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useMediaQuery } from "react-responsive";

const CommonSubsubCategorySection = ({ data, borderRadius, type }) => {

  //set media query
  const isMobile = useMediaQuery({ query: `(max-width: 991px)` });

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

  return (
    <div className="row product-shop-main">
      {data.length > 0 && (
        <>
          <div className="product-shop">Shop By Category</div>
          {isMobile ?
            <Carousel
            arrows={true}
            responsive={responsive}
            /* style={{
              justifyContent: "center"
            }} */
            containerClass='centerCarausel'
          
          >
            {data.map((each, i) => (
              <Card key={i} className="border-0 text-center carausel-card">
                <NavLink
                  className="subCategoryLink"
                  
                  to={`/products-subcategory/${each.url}`}
                >
                  <div className="category_image1">
                    <img src={each.sub_subcategory_image} alt="subcategory"/>
                  </div>
                  <div className="sub-category-name1">
                    {" "}
                    {each.sub_subcategory_name}
                  </div>
                </NavLink>
              </Card>
            ))}
            </Carousel>
          :
            <ul>
              {data.map((each, i) => (
                <li key={i} className="col-md-2">
                  <NavLink
                    className="subCategoryLink"
                    to={`/products-subcategory/${each.url}`}
                  >
                    <div className="category_image1">
                    <img
                      src={each.sub_subcategory_image}
                      alt="subcategory"
                    />
                    </div>
                    <div className="sub-category-name1">
                      {" "}
                      {each.sub_subcategory_name}
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          }



          
        </>
      )}
    </div>
  );
};

export default CommonSubsubCategorySection;
