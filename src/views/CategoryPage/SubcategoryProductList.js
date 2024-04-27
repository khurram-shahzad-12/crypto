import React from "react";
import { useSelector } from "react-redux";
import { apiSelector } from "../../store/Api_middelware";
import { useParams, NavLink } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CommonCard from "../../componets/CommonCard";
import { useTranslation } from "react-i18next";

const SubcategoryProductList = ({ data, type, background }) => {
  const { t } = useTranslation();
  const categoryList = useSelector(apiSelector);
  const { slug } = useParams();

  if (categoryList.data.length > 0) {
    // eslint-disable-next-line no-unused-vars
    var subCategorylist = categoryList.data.filter((each) => each.url === slug);
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 6,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <>
      <div
        className="subCategorySectionList"
        style={{ background: `${background}`,marginTop: type == "saverZone" ? "0px" : "40px", padding: "20px" }}
      >
        {data.length > 0 &&
          data.map((each, i) => (
            <div
              className="subCategoryRow row"
              key={i}
              style={{
                
                marginBottom: type == "saverZone" && "0px",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ marginBottom: "12px" }}
              >
                <div className="subCategoryNameTitle">
                  {each.subcategory_name}
                </div>
                <NavLink
                  to={type == 'saverZone' ? `${each.url}` : `/products-category/${each.url}`}
                  className="viewAll"
                >
                  {t("global.viewAll")}
                </NavLink>
              </div>
              <div>
                <Carousel responsive={responsive} infinite={true} arrows={true}>
                  {each.items.map((sub_each, i) => (
                    <CommonCard data={sub_each} type="heart" key={i} />
                  ))}
                </Carousel>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default SubcategoryProductList;
