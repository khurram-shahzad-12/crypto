import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MatchedText from "./MatchedText";

const SearchBar = () => {
  const { t } = useTranslation();
  const enter_ref = React.useRef(null);
  const navigate = useNavigate();

  const [searchres, setsearchres] = React.useState({});
  const [hideList, SetHideList] = React.useState(false);
  const input_ref = React.useRef();

  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  const isFold = useMediaQuery({ query: `(max-width: 300px)` });
  const onChange_search = (event) => {
    enter_ref.current = false;

    if (event.target.value === "") {
      setsearchres({});
    } else {
      if (event.key === "Enter") {
        enter_ref.current = true;
        SetHideList(true);
        setsearchres({});
        navigate(
          `/search-result/${input_ref.current !== undefined && input_ref.current.value
          }`
        );
        input_ref.current.value = "";
      } else {
        axios
          .get(`/api/searchproducts?str=${event.target.value}`)
          .then(function (response) {
            if (enter_ref.current !== true) {
              SetHideList(false);
              setsearchres(response.data.data);
            }
          })
          .catch(function (error) {
            console.log("An error occured." + error);
          });
      }
    }
  };

  function MouseOver() {
    SetHideList(false);
  }
  function MouseOut() {
    SetHideList(true);
  }

  const closeResultList = () => {
    SetHideList(true);
    setsearchres({});
    input_ref.current.value = "";
  };

  return (
    <>
      <div
        className="searchContainer"
        onMouseOver={MouseOver}
        onMouseOut={MouseOut}
      >
        <div>
          <Form.Control
            type="text"
            onKeyUp={onChange_search}
            ref={input_ref}
            placeholder={t("navbar.search")}
            className="search"
          />
          <NavLink
            to={`/search-result/${input_ref.current !== undefined && input_ref.current.value
              }`}
          >
            {/* <BsSearch className='searchIcon' onClick={closeResultList} /> */}
            {/* <img
              src="/Assets/search.svg"
              alt="searchLogo"
              className="searchIcon d-none d-lg-block"
              onClick={closeResultList}
            /> */}
            {!isFold && 
            <img
              src="/Assets/search.svg"
              alt="searchLogo"
              className="searchIcon"
              onClick={closeResultList}
            
            />
            }
          </NavLink>
        </div>

        {!hideList && searchres.hasOwnProperty("products") && (
          <div className="searchDetail"
          style={{ width: searchres.hasOwnProperty("products") && searchres.products.length > 0 ? 'none': '100%'}}
          >
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                xs={12}
                style={{
                  // height: `${isMobile ? "654px" : "382px"}`,
                }}
              >
                <div className="searchDetailList">
                  <ul>
                    {searchres.hasOwnProperty("products") && 
                    searchres.products.length > 0 ? 
                      searchres.products.map((ele, ind) => {
                        return (
                          <NavLink
                            key={ind}
                            to={
                              ele.type == 'detail' ? `/details/${ele.url}` : ele.hasOwnProperty("url") ? `${ele.url}` : `/search-result/${input_ref.current !== undefined && input_ref.current.value}?subcategory=${ele.subcategory_id}_${ele.category_id}`
                            }
                            state={{ subcategory_id: `${ele.subcategory_id}` }}
                            style={{ textDecoration: "none" }}
                            onClick={closeResultList}
                          >
                            <li className="row">
                              <div className="row">
                                <div className="col-lg-1 col-md-1 col-sm-3 col-2">
                                  <div>
                                    <img src={ele.image} alt="" />
                                  </div>
                                </div>
                                <div className="col-lg-10 col-md-11 col-sm-9 col-10">
                                  <div>
                                    <span>
                                      <MatchedText text={ele.title} query={input_ref.current.value} />
                                      <p className="loginsign" style={{ color: "#0055B8" }}>
                                        {ele.small_title != '' && "in"} {ele.small_title}
                                        {ele.type == 'brands' && "in brands"}</p>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </NavLink>
                        );
                      })
                    : 
                    <div style={{width:"100%"}}>
                        <h6>No Record Found</h6>
                    </div>
                    }
                  </ul>
                </div>
              </Col>

            </Row>
          </div>
        )}
      </div >
    </>
  );
};

export default SearchBar;
