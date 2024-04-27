import React, { useContext } from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { CgProfile } from "react-icons/cg";
import { BsBorderStyle, BsHeart, BsTruck } from "react-icons/bs";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Cart1 from "./Cart1";
import RegisterCommonModal from "../views/RegisterComponent/RegisterCommonModal";
import { GlobalUserStatus } from "../App";
import { useTranslation } from "react-i18next";
import { BiPlusCircle } from "react-icons/bi";
import {GoTriangleDown} from 'react-icons/go'
import {FaRegAddressCard} from 'react-icons/fa'
import { HiMenu } from "react-icons/hi";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import LoginComponent from "../componets/LoginComponent";

const Navbar1 = ({ addressData }) => {
  const [value, SetValue] = React.useState("0");
  const [getFlag, SetGetFlag] = React.useState([]);
  const [language, SetLanguage] = React.useState("العربية");
  const [langCode, SetLangCode] = React.useState("ar");

  const cookies = new Cookies();
  var useName = "";
  if (cookies.get("jwt_token") !== undefined) {
    const userData = jwtDecode(cookies.get("jwt_token"));
    useName = userData.first_name;
  }

  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
  const isTablet = useMediaQuery({ query: `(max-width: 991px)` });

  const options = [
    {
      label: "UAE",
      value: "UAE",
      image: "/Assets/UAE.svg",
      url: "https://www.qatar.ourshopee.com/",
    },
    {
      label: "Oman",
      value: "oman",
      image: "/Assets/oman.svg",
      url: "https://www.oman.ourshopee.com/",
    },
    {
      label: "Qatar",
      value: "Qatar",
      image: "/Assets/qatar.svg",
      url: "https://www.qatar.ourshopee.com/",
    },
    {
      label: "Kuwait",
      value: "kuwait",
      image: "/Assets/kuwait.svg",
      url: "https://www.kuwait.ourshopee.com/",
    },
    {
      label: "Bahrain",
      value: "Bahrain",
      image: "/Assets/bahrain.svg",
      url: "https://www.bahrain.ourshopee.com/",
    },
    {
      label: "Saudi",
      value: "saudi",
      image: "/Assets/saudi.svg",
      url: "https://www.saudi.ourshopee.com/",
    },
  ];

  React.useEffect(() => {
    SetValue(options[0]);
  }, []);

  React.useEffect(() => {
    SetGetFlag(options.filter((ele) => ele.label !== value.label));
  }, [value]);

  const handleItem = (item) => {
    SetValue(options.filter((ele) => ele.label === item)[0]);
  };

  var menuShow = useSelector((state) => state.hamburger.menuShow);

  const dispatch = useDispatch();

  const openMenu = () => {
    dispatch({ type: "Open", menuShow: !menuShow });
  };

  //open sign up modal
  var openModal = useSelector((state) => state.modalShow.openModal);

  const { status, logout } = useContext(GlobalUserStatus);

  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.dataset.code);
    if (e.target.innerText !== "ENGLISH") {
      SetLanguage("ENGLISH");
      SetLangCode("en");
    } else {
      SetLanguage("العربية");
      SetLangCode("ar");
    }
  };

  return (
    <div className="navbar1">
      <Container fluid className="maxWidthContainerFluid paddingContainerFluid">
        {isMobile && (
          <Row className="mb-2">
            <Col className="d-flex" style={{paddingRight: 'unset'}}>
              {/* <HiMenu className="menuBar d-lg-none" onClick={openMenu} /> */}
                <div className="switch-shopee">
                <NavLink to="/" className='switch-pharma'>
                <img
                  alt="Website Logo"
                  src="/Assets/selection-icon-ourshopee.webp"
                  className=""
                /> Ourshopee
                 </NavLink>
                </div>
            </Col>
            <Col className="d-flex justify-content-center">
              <a
                href="https://www.pharma.ourshopee.com/"
                rel="noreferrer"
                target="_blank" className="w-100"
              >
                {" "}
                <div className="btn navpharmacy">
                  <BiPlusCircle
                    style={{ fontSize: "20px", paddingBottom: "1px" }}
                  />
                  Pharmacy{" "}
                </div>
              </a>
            </Col>
          </Row>
        )}
        <Row className="navbarRow">
          {!isMobile && (
            <Col lg={2} md={3} className="col">
              <NavLink to="/">
                {isTablet ? (
                  <div className="d-flex">
                  <HiMenu className="menuBar d-none d-md-block d-lg-none me-2" size={35} onClick={openMenu} />
                  <img
                    alt="Website Logo"
                    src="/Assets/ourShoppeeMobLogo.svg"
                    className="mobWebsiteLogo"
                  />
                  </div>
                  
                ) : (
                  <img
                    alt="Website Logo"
                    src="/Assets/ourShopeeLogo.svg"
                    className="d-inline-block align-top websiteLogo"
                  />
                )}
              </NavLink>
            </Col>
          )}

          <Col lg={6} md={6} xs={8} className="d-flex">
            <HiMenu className="menuBar d-md-none me-2" size={35} onClick={openMenu} />
            <div className="desktopSearch">
              <SearchBar />
            </div>
          </Col>

          <Col lg={4} md={3} xs={4}>
            <div className="navIcon">
              <div style={{ textDecoration: "none", paddingTop: "12px" }}>
                <div
                  className="translate"
                  onClick={changeLanguage}
                  data-code={langCode}
                >
                  {/* {language} */}
                </div>
              </div>
              <Dropdown className="d-lg-none">
                <Dropdown.Toggle
                  style={{ border: "1px solid red !important" }}
                  className="dropbtn"
                >
                  <img src="/Assets/UAE.svg" alt='countryFlag' className="w-100"/>
                  {/* <img src={value.image} alt="countryFlag" /> */}
                  <GoTriangleDown />
                </Dropdown.Toggle>

                <Dropdown.Menu className="flagMenu tog" style={{minWidth: "55px"}}>
                  {getFlag.length > 0 &&
                    getFlag.map((Element, index) => {
                      return (
                        <Dropdown.Item
                          className="d-flex gap-2 px-2"
                          key={index}
                          as="button"
                          onClick={() => handleItem(Element.label)} 
                        >
                          <a href={Element.url} target="_blank" rel="noreferrer" className="linkflag">
                            <img src={Element.image} alt="countryFlag" className="w-100" />
                            <div className="d-none d-lg-block">{Element.label}</div>
                          </a>
                        </Dropdown.Item>
                      );
                    })}
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown className="d-none d-lg-block">
                <Dropdown.Toggle
                  style={{ border: "1px solid red !important" }}
                  className="dropbtn"
                >
                 <img src="/Assets/UAE.svg" alt='countryFlag' /> UAE
                  {/* <img src={value.image} alt="countryFlag" />
                   {value.label} */}
                   <GoTriangleDown className="ps-1" />
                </Dropdown.Toggle>

                <Dropdown.Menu className="flagMenu">
                  <img
                    src="/Assets/arrowUp.svg"
                    className="flagMenuimg"
                    alt="arrowUp"
                  />
                  {getFlag.length > 0 &&
                    getFlag.map((Element, index) => {
                      return (
                        <Dropdown.Item
                          className="d-flex gap-2"
                          key={index}
                          as="button"
                          onClick={() => handleItem(Element.label)}
                          
                        >
                            <a href={Element.url} target="_blank" rel="noreferrer" className="linkflag">
                              <img src={Element.image} alt="countryFlag" />
                              <div>{Element.label}</div>
                            </a>
                        </Dropdown.Item>
                      );
                    })}
                </Dropdown.Menu>
              </Dropdown>

              <div className="guest d-none d-lg-block">
                <Dropdown>
                  <Dropdown.Toggle
                    style={{ border: "1px solid red !important" }}
                    className="dropbtn d-flex"
                  >
                    <img
                      src="/Assets/avatar.png"
                      alt="Account_Circle"
                      className="avatar"
                    />

                    <div type="button" className="sing">
                      {status === false ? (
                        <>
                          <span> Guest</span>
                          <br />
                          <span>{t("navbar.register")}</span><GoTriangleDown className="ps-1" />
                        </>
                      ) : (
                        <>
                          <span> Hello {useName}</span>
                          <br />
                          <span>My Account</span><GoTriangleDown className="ps-1" />
                        </>
                      )}
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    id="popover-basic"
                    style={{ boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.12)" }}
                  >
                    <img
                      src="/Assets/arrowUp.svg"
                      className="flagMenuimg"
                      alt="arrowUp"
                    />
                    {status === false && (
                      <div className="text-center mb-1">
                        <LoginComponent />
                      </div>
                    )}
                    {status === true && (
                      <>
                        <Dropdown.Item href="/myaccount">
                          <CgProfile className="profile" />
                          &nbsp;&nbsp;&nbsp;My Profile{" "}
                        </Dropdown.Item>
                        <Dropdown.Item href="/my-orders">
                          <BsBorderStyle className="profile" />
                          &nbsp;&nbsp;&nbsp;My Orders
                        </Dropdown.Item>
                        <Dropdown.Item href="/my-wishlist">
                          <BsHeart className="profile" />
                          &nbsp;&nbsp;&nbsp;My Wishlist
                        </Dropdown.Item>
                        <Dropdown.Item href="/track-your-order">
                          <BsTruck className="profile" />
                          &nbsp;&nbsp;&nbsp;Track Order
                        </Dropdown.Item>
                        <Dropdown.Item href="/address">
                          <FaRegAddressCard className="profile" />
                          &nbsp;&nbsp;&nbsp; My Address
                        </Dropdown.Item>
                        <Dropdown.Item href="/complaints">
                          <AiOutlineQuestionCircle className="profile" />
                          &nbsp;&nbsp;&nbsp;Complains
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => logout()}>
                          <RiLogoutBoxRLine className="profile" />
                          &nbsp;&nbsp;&nbsp;Logout
                        </Dropdown.Item>
                      </>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div
                className="d-none d-lg-block"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <Cart1 addressData={addressData} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {openModal && <RegisterCommonModal />}
    </div>
  );
};

export default Navbar1;