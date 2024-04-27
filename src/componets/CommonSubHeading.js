import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CommonSubHeading = ({ heading, title, viewColor, viewAll }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`${title === true ? "subheadingStyle" : ""}`}
      style={{ paddingBottom: "16px" }}
    >
      <div
        className={`${title !== true ? "divLargeTitle " : "divMediumTitle"}`}
      >
        {heading}
      </div>
      {viewAll && (
        <NavLink to="/deals/Top-Selling-Products">
          <div className="headingview_all" style={{ color: `${viewColor}` }}>
            {t("global.viewAll")}
          </div>
        </NavLink>
      )}
    </div>
  );
};

export default CommonSubHeading;
