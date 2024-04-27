import { useMediaQuery } from "react-responsive";
import { Carousel } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const CommonBanner = ({ banner }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  return (
    <>
      <div className="categoryBanner Slider">
        {banner !== undefined && banner.length > 0 && (
          <Carousel>
            {banner.map((each, i) => (
              <Carousel.Item key={i}>
                <NavLink to="">
                  <img
                    src={isMobile ? each.mobile_image_url : each.image_url}
                    alt="banner"
                    style={{ maxWidth: "-webkit-fill-available" }}
                  />
                </NavLink>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </div>
    </>
  );
};

export default CommonBanner;
