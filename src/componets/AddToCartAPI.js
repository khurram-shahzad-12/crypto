import React, { useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { GlobalCart } from "../App";
import jwt from "jwt-decode";

const AddToCartAPI = ({ cartDetail ,cartClick,setCartClick}) => {
  const { getCartData, userId, setcarterrMsg} = useContext(GlobalCart)
  const cookies = new Cookies();
  var userData = {};

  const getUserdata = () => {
    if (cookies.get("oscad") === undefined) {
      userData = {
        product_id: cartDetail.id,
        ip_address: 0,
        user_id: userId,
        quantity: cartDetail.quantity,
      };
    } else {
      userData = {
        product_id: cartDetail.id,
        ip_address: cookies.get("oscad"),
        user_id: userId,
        quantity: cartDetail.quantity,
      };
    }
    addTocartFunc(userData)
  }

  const removeAnimation = () => {
    document.getElementById("shopCart").style.animation = "unset"
  }

  const addTocartFunc = (userData, e) => {
    // e.preventDefault()
    
console.log(userData)
    
    axios
      .post("/api/AddToCart", userData)
      .then((response) => {


        var user_id = 0
        if(cookies.get("jwt_token") !== undefined){
          var decoded = jwt(cookies.get("jwt_token"));
          user_id = decoded.user_id;
        }

        cookies.set('oscad', response.data.data.ip_address, {
          httpOnly: false,
          path: '/',
          maxAge: 60*60*24*5
        });

        if (response.data.data.msg === undefined) {
          setcarterrMsg("")
        } else {
          setcarterrMsg(response.data.data.msg)
        }
        //console.log("addTocartFunc",userId)
        getCartData(user_id);
        setCartClick(false);

      })
      .catch((err) => {
        console.log("err",err);
      });

  };

  useEffect(() => {
    getUserdata()
  }, [])

  return <div></div>;
};

export default AddToCartAPI;
