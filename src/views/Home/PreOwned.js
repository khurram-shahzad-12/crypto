import React from "react";
import "react-multi-carousel/lib/styles.css";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import Banner from "./Banner";
import { NavLink } from "react-router-dom";

const PreOwned = ({ data }) => {
  const { t } = useTranslation();
  const mobileView = useMediaQuery({ query: `(max-width: 991px)` });

  return (
    <Container className="maxWidthContainerFluid excitingSection" fluid>
      <div className="preOwned">
        <img
          src={mobileView ? data.mobileImage : data.desktopImage}
          alt="brandBanner"
          width="100%"
        />

        <div className="dealSection mb-3">
          <NavLink to="/categories/pre-owned/">
            <div
              className="view_all"
              style={{ color: "#0D69E0", marginTop: "0px" }}
            >
              {t("global.viewAll")}
            </div>
          </NavLink>
          <Banner bannerList={data.carouselItems} />
        </div>
      </div>
    </Container>
  );
};

export default PreOwned;
