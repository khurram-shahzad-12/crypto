import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiDraftFill } from "react-icons/ri";
import { AiOutlineHeart, AiOutlineQuestionCircle } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import {FaRegAddressCard} from "react-icons/fa"
import MyProfile from "./MyProfile";
import Mywishlist from "./Mywishlist";
import MyOrders from "./MyOrders";
import Cookies from "universal-cookie";
import LoginComponent from "../../componets/LoginComponent";
import MyAddress from './MyAddress'
import { useNavigate } from "react-router-dom";

    

const MyAccount = () => {
  //const [url, setUrl] = useState("")
  const [status, SetState] = useState("");

  /* const getStatus = (data) => {

    SetState(data);
  }; */

  let navigate = useNavigate();

  //setUrl(window.location.pathname.substring(1))
  //logout function
  const cookies = new Cookies();
  const logout = () => {
    cookies.remove("jwt_token");
    navigate("/");
  };

  useEffect(() => {
    if(window.location.pathname.substring(1) == "my-orders"){
      SetState(window.location.pathname.substring(1).replace("-", ""));
    }else if(window.location.pathname.substring(1) == "my-wishlist"){
      SetState(window.location.pathname.substring(1).replace("-", ""));
    }else{
      SetState(window.location.pathname.substring(1))
    }
  },[])


  return (
      
    <Container className=" MyAccount maxWidthContainerFluid" fluid>
      <Row className="fillform mt-4">
          <ul className="MyAccount">
            <li
              className={status === "myaccount"  ? "active" : "orders"}
              onClick={()=>navigate("/myaccount")}
            >
              {" "}
              <HiOutlineUserCircle /> My Profile{" "}
            </li>
            <li
              className={status === "myorders" ? "active" : "orders"}
              onClick={()=>navigate("/my-orders")}
            >
              {" "}
              <RiDraftFill /> My Orders
            </li>
            <li
              className={status === "mywishlist" ? "active" : "orders"}
              onClick={()=>navigate("/my-wishlist")}
            >
              {" "}
              <AiOutlineHeart /> My Wishlist
            </li>
            <li
              className={status === "address" ? "active" : "orders"}
              onClick={()=>navigate("/address")}
            >
              {" "}
              <FaRegAddressCard />&nbsp; Addresses
            </li>
            <li
              className={status === "complaints" ? "active" : "orders"}
              onClick={()=>navigate("/complaints")}
            >
              {" "}
              <AiOutlineQuestionCircle />&nbsp; Complaints
            </li>
            {cookies.get("jwt_token") !== undefined && (
              <li className="orders" onClick={logout}>
                <FiLogOut /> Logout
              </li>
            )}
          </ul>
    
          
        

       
         {/*  {cookies.get("jwt_token") !== undefined ? (
            <>
              {status === "profile" && <MyProfile />}
              {status === "order" && <MyOrders />}
              {status === "wishlist" && <Mywishlist />}
              {status === "address" && <MyAddress />}
            </>
          ) : (
            <div id="popover-basic" className="">
              <LoginComponent />
            </div>
          )} */}
      
      </Row> 
    </Container>
  );
};

export default MyAccount;
