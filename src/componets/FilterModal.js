import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useTranslation } from "react-i18next";

const FilterModal = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <Offcanvas
        show={props.show}
        onHide={() => props.setshow_filters(!props.show)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="filterTille">
            {t("subCategory.filter")}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="customContainer">
          {props.children}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FilterModal;
