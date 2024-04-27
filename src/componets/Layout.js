import React, { useLayoutEffect } from "react";
import Header from "./Header";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import MobileFooter from "./MobileFooter";
import { useSelector } from "react-redux";
import NavigationMobileView from "./NavigationMobileView";
import { useMediaQuery } from "react-responsive";

const Layout = ({ children }) => {
  var menuShow = useSelector((state) => state.hamburger.menuShow);
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

  React.useEffect(() => {}, [menuShow]);

  const location = useLocation();
  // useLayoutEffect(() => {
  //   document.documentElement.scrollTo(0, 0);
  // }, [location.pathname]);


  // axios.defaults.baseURL = "https://api.ourshopee.com/";
  axios.defaults.baseURL = "http://localhost:4500/";
  document.body.scrollTop = document.documentElement.scrollTop = 0;

  return (
    <div>
      <div className={`${menuShow ? "d-none" : ""}`}>
        <Header />
        <div className="NavbarCategoryFixed">{children}</div>
        {isMobile ? <MobileFooter /> : <Footer />}
      </div>
      {menuShow && <NavigationMobileView />}
    </div>
  );
};

export default Layout;
