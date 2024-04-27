import React, { useState, useContext } from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import AddToCartAPI from "../componets/AddToCartAPI";
import { useTranslation } from "react-i18next";
import UseAddToCartHook from "./UseAddToCartHook";
import { FaTimes } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import call_apis from "../services/Apis";
import { Wishlist } from "../App";
import { GlobalUserStatus } from "../App";
import axios from 'axios';
import ProductQuickView from './ProductQuickView';
import {ThreeDots} from 'react-loader-spinner'; 


  const CommonCard = ({ data, height, categorysection, type }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  const { cartClick, cartDetail, addToCart } = UseAddToCartHook();
  const [show, setShow] = useState(false);


  // start add to cart button Spin
  const [isLoading, setIsLoading] = useState(false);
  // Simulate an asynchronous action, such as fetching data
  const handleAddToCart = () => {
    setIsLoading(true);
    // Simulate a delay of 2 seconds to simulate data fetching
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

// End add to cart button shake



  //wishlist
  const [isShown, setIsShown] = useState(false);
  const [heartFill, setHeartFill] = useState([]);
  const { getWishlist, datalist } = useContext(Wishlist);
  const { status } = useContext(GlobalUserStatus);
  const [productModelData, setProductModelData] = useState({})

  const SaveWishlist = async (id, sku) => {
    var input_data = {
      product_id: id,
      sku: sku,
    };
    const resp = await call_apis.postWishLists(input_data);
    if (resp.status === 200) {
      if (heartFill.includes(id) === false) {
        setHeartFill([...heartFill, id]);
      } else {
        setHeartFill(heartFill.filter((each) => each !== id));
      }
      getWishlist();
    }
  };

  const removeWishlist = async (id, sku) => {
    var input_data = {
      product_id: id,
      sku: sku,
    };
    const resp = await call_apis.postWishLists(input_data);
    if (resp.status === 200) {
      getWishlist();
    }
  };

  const handelProductModel = (data) => {
    setShow(!show)
    axios.get(`api/product_detail?sku=${data.sku}`).then((response) => {
      setProductModelData(response.data.data.product[0])
    }).catch((err) => {
      console.log("error", err);
    });
  }


  return (
    <>
      {isMobile ? (
        <Card
          style={{
            paddingBottom: "15px",
            height: `${height !== "top_pick" ? "" : "235px"}`,
          }}
          className={
            categorysection
              ? "commoncategoryItems commoncategoryItems1"
              : "commoncategoryItems"
          }
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          {status && type === "wishlistCross" && isShown && (
            <div>
              <FaTimes
                className="crossButton"
                onClick={() => removeWishlist(data.id, data.sku)}
              />
            </div>
          )}
          
          {status && type === "heart" && (
            <div >

              {heartFill.includes(data.id) ? (
                <AiFillHeart
                  className="heartFillButton"
                  onClick={() => SaveWishlist(data.id, data.sku)}
                />
              ) : (
                <AiOutlineHeart
                  className="heartButton"
                  onClick={() => SaveWishlist(data.id, data.sku)}
                />
              )}
            </div>
          )}
  
          <NavLink
            className="text-decoration-none commonCardLink"
            style={{ width: "100%" }}
            to={`/details/${data.url}/${data.sku}`}
          >
            <div
              className="commonCardimage"
              style={{
                backgroundImage: `url(${data.image.replaceAll(" ", "%20")})`,
              }}
            ></div>
            <div className="categoryContainers">
              <div className="categoryText">{data.name}</div>
              <div
                className="justify-content-between"
                style={{
                  margin: "8px 0",
                  display: `${isMobile ? "block" : "flex"}`,
                }}
              >
                <div className="displayPrice">{data.display_price}</div>
                <div className="previousPrice">{data.old_price}</div>
              </div>
              {data.percentage ? (
                <div className="dealPercentage">
                  {data.percentage}% {t("global.off")}
                </div>
              ) : (
                ""
              )}
            </div>
          </NavLink>
          <div className="d-block d-lg-none yellowOutlineCard text-center">
            <div className="btn add-to-cart" onClick={(e) => addToCart(data.id)}>
              {t("global.addCart")}
            </div>
          </div>
        </Card>
      ) :
        (
          <Card style={{
            paddingBottom: "15px",
            height: `${height !== "top_pick" ? "" : "235px"}`,
          }}
            className={
              categorysection
                ? "commoncategoryItems commoncategoryItems1 fullbody"
                : "commoncategoryItems fullbody"
            }
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >
            {status && type === "wishlistCross" && isShown && (
              <div>
                <FaTimes
                  className="crossButton"
                  onClick={() => removeWishlist(data.id, data.sku)}
                />
              </div>
            )}
            {status && type === "heart" && (
              <div className= "itemcard-AddWishlist">
                {heartFill.includes(data.id) ? (
                  <AiFillHeart
                    className="heartFillButton"
                    onClick={() => SaveWishlist(data.id, data.sku)}
                  />
                ) : (
                  <AiOutlineHeart
                    className="heartButton"
                    onClick={() => SaveWishlist(data.id, data.sku)}
                  />
                )}
              </div>
            )}

            <div
              className="glassContainer"
              style={{
                backgroundImage: `url(${data.image.replaceAll(" ", "%20")})`,
              }}
            >


              <div className="glassContainerView">
                <button
                  type="button"
                  className="quickButton"
                  onClick={() =>
                    handelProductModel(data)
                  }
                >
                  Quick View
                </button>
              </div>
            </div>
            <NavLink
              className="text-decoration-none commonCardLink"
              to={`/details/${data.url}/${data.sku}`}
            >
              <div className="categoryContainers">
                <div className="categoryText">{data.name}</div>
                <div
                  className="justify-content-between"
                  style={{
                    margin: "8px 10px 8px 0px",
                    display: `${isMobile ? "block" : "flex"}`,
                  }}
                >
                  <div className="displayPrice">{data.display_price}</div>
                  <div className="previousPrice">{data.old_price}</div>
                </div>
                <div
                  className="justify-content-between"
                  style={{
                    margin: "8px 10px 8px 0px",
                    display: `${isMobile ? "block" : "flex"}`,
                  }}
                >
                  {data.percentage ? (
                    <div className="dealPercentage">
                      {data.percentage}% {t("global.off")}
                    </div>

                  ) : (
                    ""
                  )}
                </div>
              </div>
            </NavLink>
            
            <div className="AddToCartHover d-none d-lg-block">
              <div
                className="AddToCartLink"
                onClick={() => {
                  addToCart(data.id);
                  handleAddToCart(); // Call the custom function on button click
                }}
                style={{
                  textDecoration: "none",
                  color: "#ffffff",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >

                <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {isLoading ? (
                    <ThreeDots type="ThreeDots" color="#00BFFF" height={44} width={40} />
                  ) : (
                    
                    <div>{t("global.addCart")}</div>
                  )}
                </div>
              


              </div>
            </div>

          </Card>
        )}
      {cartClick && <AddToCartAPI cartDetail={cartDetail} />}
      {Object.keys(productModelData).length > 0 &&
        <ProductQuickView productModelData={productModelData} show={show} setShow={setShow} />
      }

    </>
  );
};

export default CommonCard;


