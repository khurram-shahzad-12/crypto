import React, { useState, useEffect, useContext } from "react";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { GlobalUserStatus } from "../App";
import call_apis from "../services/Apis";

const UseGlobalHook = () => {
  const { status } = useContext(GlobalUserStatus);

  const [cartData, SetCartData] = useState({});
  const [totalQuantity, SetTotalQuantity] = useState(0);

  const cookies = new Cookies();
  let userId = 0;
  let oscad = 0;

  async function getCartData() {
    if (status) {
      userId = jwt(cookies.get("jwt_token")).user_id;
    }
    if (cookies.get("oscad") !== undefined) {
      oscad = cookies.get("oscad");
    }
    const inputData = {
      ip_address: oscad,
      user_id: userId,
    };

    const response = await call_apis.getCartList(inputData);
    if (response.status === 200) {
      getCartQuantity(response.data.data.result);
      SetCartData(response.data.data);
    }
  }

  const getCartQuantity = (data) => {
    let quan = 0;
    if (data.length > 0) {
      data.map((each) => (quan = quan + each.quantity));
    }
    SetTotalQuantity(quan);
  };

  useEffect(() => {
    getCartData();
  }, []);

  return {
    getCartData,
    cartData,
    totalQuantity,
  };
};

export default UseGlobalHook;
