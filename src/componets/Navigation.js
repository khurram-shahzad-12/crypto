import React from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import NavigationDesktopView from "./NavigationDesktopView";
import UseCategoryHook from "./UseCategoryHook";
import { useSelector } from "react-redux";
import { apiSelector } from "../../src/store/Api_middelware";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const { t } = useTranslation();

  let slug = window.location.href.split("/");
  let value = slug[slug.length - 1];

  const categoryList = useSelector(apiSelector);

  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

  const { showcategorylist, showcategory, checkMouseLeave } =
    UseCategoryHook(categoryList);

  React.useEffect(() => {}, [showcategory]);

  return (
    <div style={{ background: "#FFFFFF", borderBottom: "1px solid #f1f1f1" }}>
      <Container
        className="navigation paddingContainerFluid maxWidthContainerFluid"
        fluid
      >
        <div className="" 
        onMouseLeave={(e) => checkMouseLeave(e)}
        >
          <div className="left-product-cat">
            {!isMobile ? (
              <button
                type="button"
                className="category_btn"
                onMouseOver={(e) => showcategorylist()}
              >
                <img alt="menu" src="/Assets/blackMenu.svg" /> &nbsp;{" "}
                {t("navigation.category")}
              </button>
            ) : (
              <button type="button" className="category_btn">
                {" "}
                {t("navigation.all")}
              </button>
            )}
            {!isMobile && showcategory && (
              <NavigationDesktopView categoryList={categoryList} />
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between" style={{width: "100%"}}>
          <ul className="navigation_ul">
            <li
              style={{
                backgroundColor: `${
                  value === "perfumes" ? "#FFDB27" : "#FFFFFF"
                }`,
                margin: "2px",
              }}
            >
              <NavLink to="/perfumes" className="active">
                {" "}
                {t("navigation.perfume")}{" "}
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor: `${
                  value === "clearance" ? "#FFDB27" : "#FFFFFF"
                }`,
                margin: "2px",
              }}
            >
              <NavLink to="/clearance"> {t("navigation.clearance")} </NavLink>
            </li>
            <li
              style={{
                backgroundColor: `${
                  value === "pre-owned" ? "#FFDB27" : "#FFFFFF"
                }`,
                margin: "2px",
              }}
            >
              <NavLink to="/categories/pre-owned">
                {" "}
                {t("navigation.preowned")}{" "}
              </NavLink>
            </li>
            <li
              style={{
                backgroundColor: `${
                  value === "saver-zone" ? "#FFDB27" : "#FFFFFF"
                }`,
                margin: "2px",
              }}
            >
              <NavLink to="/saver-zone"> {t("navigation.saverZone")} </NavLink>
            </li>
            <li
              style={{
                backgroundColor: `${
                  value === "deals-of-the-day" ? "#FFDB27" : "#FFFFFF"
                }`,
                margin: "2px",
              }}
            >
              <NavLink to="/deals-of-the-day"> {t("navigation.deal")} </NavLink>
            </li>
            <li
              style={{
                backgroundColor: `${
                  value === "Top-Selling-Products" ? "#FFDB27" : "#FFFFFF"
                }`,
                margin: "2px",
              }}
            >
              <NavLink to="/deals/Top-Selling-Products">
                {" "}
                {t("navigation.topSellingProduct")}
              </NavLink>
            </li>
          </ul>

          <div className="d-none d-xl-block">
            <a
              href="https://www.pharma.ourshopee.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://www.pharma.ourshopee.com/images/Pharmacy.gif"
                className="gifImage"
                alt="pharma"
              />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navigation;
