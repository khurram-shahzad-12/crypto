import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SortBy = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const handelClick = (value) => {
    if (searchParams.has("sortby")) {
      searchParams.delete("sortby");
      searchParams.set("sortby", value);
    } else {
      searchParams.set("sortby", value);
    }
    setSearchParams(searchParams);
  };

  return (
    <Container>
      <Row>
        <Col md={2} className="d-none d-md-block">
          <h6 className="sortbyTitle">{t("subCategory.sort")}</h6>
        </Col>
        <Col xs={6} md={2} className="arrivals newarrivals">
          <button
            type="button"
            style={{
              color: `${searchParams.get("sortby") == "new arrival"
                ? "#0D69E0"
                : "#4F4F4F"
                }`,
            }}
            onClick={(e) => handelClick("new arrival")}
            className="border-0 kkk sortByButton"
          >
            {t("subCategory.newArrival")}
          </button>
        </Col>
        <Col xs={6} md={3} className="arrivals highPrice">
          <button
            type="button"
            style={{
              color: `${searchParams.get("sortby") == "Low to High"
                ? "#0D69E0"
                : "#4F4F4F"
                }`,
            }}
            onClick={(e) => handelClick("Low to High")}
            className="border-0 sortByButton"
          >
            {t("subCategory.LTHprice")}
          </button>
        </Col>

        <Col xs={6} md={3} className="arrivals LowPrice">
          <button
            type="button"
            style={{
              color: `${searchParams.get("sortby") == "High to Low"
                ? "#0D69E0"
                : "#4F4F4F"
                }`,
            }}
            onClick={(e) => handelClick("High to Low")}
            className="border-0 sortByButton"
          >
            {t("subCategory.HTLprice")}
          </button>
        </Col>
        <Col xs={6} md={2} className="arrivals Position">
          <button
            type="button"
            style={{
              color: `${searchParams.get("sortby") == "Position" ? "#0D69E0" : "#4F4F4F"
                }`,
            }}
            onClick={(e) => handelClick("Position")}
            className="border-0 sortByButton"
          >
            {t("subCategory.position")}
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default SortBy;
