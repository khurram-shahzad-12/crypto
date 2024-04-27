import React from "react";
import CommonCard from "../../componets/CommonCard";
import { useTranslation } from "react-i18next";

const MostPicked = ({ data }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="mb-4">
        <div className="subCategoryTitle">{t("perfume.mostPicked")}</div>
        <div className="row row-cols-md-4 row-cols-lg-5">
          {data.items.length > 0 &&
            data.items.map((each, i) => (
              <div className="col-6 col-sm-4 col-md-4" key={i}>
                <CommonCard data={each} type="heart" />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MostPicked;
