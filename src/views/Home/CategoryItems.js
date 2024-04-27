import React from "react";
import { Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CommonCard from "../../componets/CommonCard";
import { useMediaQuery } from "react-responsive";

const CategoryItems = (categoryItems) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

  return (
    <div className="categoryItem pb-3">
      {categoryItems.categoryItems.map((each) => (
        <Container
          fluid
          className="maxWidthContainerFluid paddingContainerFluid categoryPage pt-2"
          key={each.subcategory_id}
          style={{ marginTop: "10px" }}
        >
          <div className="d-flex justify-content-between pb-2">
            <div
              className={`${isMobile ? "divSmallTitle" : "divMediumTitle"}`}
            >{` ${each.subcategory_name}`}</div>
            <NavLink to={`/products-category/${each.url}`}>
              <div className="view_all" style={{ color: "#403f41" }}>
                {t("global.viewAll")}
              </div>
            </NavLink>
          </div>
          <Row className="row-cols-sm-6 row-cols-md-4 row-cols-lg-6 cardMargin"/*  style={{margin: '3px'}} */>
            {each.items.slice(0,6).map((item, i) => (
              <div className="col-6 col-sm-6 col-md-4 col-lg-21 cardPadding" key={i}>
                <CommonCard data={item} type="heart" />
              </div>
            ))}
          </Row>
        </Container>
      ))}
    </div>
  );
};

export default CategoryItems;
