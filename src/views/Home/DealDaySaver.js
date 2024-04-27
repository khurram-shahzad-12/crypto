import React from "react";
import { NavLink } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import CommonHorizontalCard from "../../componets/CommonHorizontalCard";
import { useTranslation } from "react-i18next";

const DealDaySaver = ({ heading, background, data, setWidth, redirect }) => {
  const { t } = useTranslation();

  const color = "#EB5757";
  const setPadding = "4px 8px 4px 0px";
  const countdownStyle = {
    background: "transparent",
    color: "#EB5757",
  };

  return (
    <div className="dealSection mb-3" style={{ background: `${background}` }}>
      <div className="" style={{ paddingBottom: "16px" }}>
        <div className="text-center divLargeTitle">{heading}</div>
        <NavLink to={redirect}>
          <div className="view_all ">{t("global.viewAll")}</div>
        </NavLink>
      </div>
      <Row>
          {data.map((each, i) => (
            <Col xs={6} key={i} style={{marginBottom: '2px', padding: '2px 0px 2px 6px'}}>
              <CommonHorizontalCard
                data={each}
                setWidth={setWidth}
                buttonColor={color}
                backwhite={true}
                countdownStyle={countdownStyle}
                setPadding={setPadding}
              />
            </Col>
          ))}
        </Row>
    </div>
  );
};

export default DealDaySaver;
