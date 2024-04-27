import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CategoryPage from "./views/CategoryPage/CategoryPage";
import SubSubCategoryItems from "./views/SubSubCategoryItems/SubSubCategoryItems";
import Perfumes from "./views/Perfumes/Perfumes";
import CheckoutProcess from "./componets/CheckoutProcess";
import SaverZone from "./views/SaverZone/SaverZone";
import axios from "axios";
import DealofTheDays from "./views/DealofTheDay/DealofTheDays";
import ProductDetail from "./views/ProductDetail/ProductDetail";
import NotFound from "./views/NotFound";
import "./App.scss";
import StaticPage from "./views/StaticPage/StaticPage";
import Home from "./views/Home/Home";
import Layout from "./componets/Layout";
import { fetch_category_api, fetch_blogs_api } from "../src/store/Api_middelware";
import { useDispatch } from "react-redux";
import Searchresult from "./views/SearchResult/Searchresult";
import AffiliateProgram from "./views/StaticPage/AffiliateProgram";
import NavbarCategoryItems from "./views/NavbarCategoryItems/NavbarCategoryItems";
//import BundleDeals from "./views/BundleDeals/BundleDeals";
import ClearanceSale from "./views/ClearanceSale/ClearanceSale";
import BrandPage from "./views/Brands/BrandPage";
import TabbyPlan from "./views/BankOffer/TabbyPlan";
import TopSelling from "./views/TopSelling/TopSelling";
import MyAccount from "./views/MyAccount/MyAccount";
import Mywishlist from "./views/MyAccount/Mywishlist";
import Cookies from "universal-cookie";
import call_apis from '../src/services/Apis';
import { useSelector } from "react-redux";
import { apiSelector } from "../src/store/Api_middelware";
import ThanksOrder from '../src/views/ThanksOrder';
import WarrantyPage from './views/StaticPage/WarrantyPage'
import MyOrders from './views/MyAccount/MyOrders'
import TrackMyOrder from "./views/TrackOrder/TrackMyOrder";
import Complaints from "./views/Complaints/Complaints";
import PlaceComplaint from "./views/Complaints/PlaceComplaint";
import Cancelled from './componets/Cancelled';
import MyAddress from '././views/MyAccount/MyAddress'
import MyProfile from "./views/MyAccount/MyProfile";
import ProductDetailForm from "./views/ProductDetail/ProductDetailForm";
import jwt_decode from "jwt-decode";
import ForgetPassword from "./views/RegisterComponent/ForgetPassword";

export const GlobalUserStatus = createContext();
export const GlobalCart = createContext();
export const Wishlist = createContext();


const App = () => {
  const [userStatus, SetUserStatus] = useState(false);

  const [quantity, setQuantity] = useState(0)
  const [cartList, setCartList] = useState({})
  const [carterrMsg, setcarterrMsg] = useState("");
  const [carterrStatus, setcarterrStatus] = useState(false);
  const [datalist, Setdatalist] = useState([])
  const [token, SetToken] = useState('')
  const [showcategory, Setshowcategory] = useState(false);
  const categoryList = useSelector(apiSelector);
  const [userAddress, SetUserAddress] = useState([])
  const [userId, SetUserId] = useState(0);
  const [selectAddress ,setSelectAddress]=useState("")
  const [mobile,setMobile]=useState("");
  const [precheckoutno,setPrecheckoutno]=useState("")
  const [postcheckoutno,setPostcheckoutno]=useState("")
  const [idaddress,setIdaddress]=useState("");
  const [selectAddressError,setSelectAddressError]=useState("");
  const [adloading,setAdloading]=useState(false)
  const cookies = new Cookies();

  const updateCookies = () => {
    if (cookies.get("jwt_token") !== undefined) {
      SetToken(cookies.get("jwt_token"))
      let decode = jwt_decode(cookies.get("jwt_token"));
      SetUserId(decode.user_id)
    } else {
      SetUserId(0)
    }
  }

  const showcategorylist = () => {
    if (categoryList !== undefined && categoryList !== "") {
      //SetShowMenu(true)
      Setshowcategory(true);
    }
  };


  const logout = () => {
    cookies.remove("jwt_token", { path: '/' })
    cookies.remove("oscad", { path: '/' })
    SetUserStatus(false)
    getCartData(userId)
  };


  const dispatch = useDispatch();

  useEffect(() => {
    if (cookies.get('jwt_token') !== undefined) {
      SetUserStatus(true)
    }
  }, [])

  //cart code

  async function getCartData() {
    if (cookies.get("oscad") !== undefined) {
      var oscad = cookies.get("oscad")
    }

    if (cookies.get("jwt_token") !== undefined) {
      let decode = jwt_decode(cookies.get("jwt_token"));
      var userId = decode.user_id;
      var oscad = 0
    } else {
      var userId = 0;
    }


    const inputData = {
      "ip_address": oscad,
      "user_id": userId,
    }


    const response = await call_apis.getCartList(inputData);
    if (response.status === 200) {
      if (response.data.data.result.length > 0) {
        setQuantity(response.data.data.result.length)
        setCartList(response.data.data)
        if (response.data.data.msg != '') {
          setcarterrMsg(response.data.data.msg)
          setcarterrStatus(true)
        } else {
          setcarterrStatus(false)
        }
      }
    } else if (response.status === 204) {
      setQuantity(0)
      setCartList({})
      setcarterrMsg("")
      setcarterrStatus(false)
    }

  }

  async function getWishlist() {
    const allwishlist = await call_apis.getWishLists();
    if (allwishlist.status === 200) {
      Setdatalist(allwishlist.data.data)
    }
  }

  axios.interceptors.response.use(function (response) {

    return response;
  }, function (error) {

    if (error.response.status === 401) {
      logout()
    }
  });

  async function getAddressList() {
    if (cookies.get("jwt_token") !== undefined) {
      const resp = await call_apis.getAddressList(0);
      if (resp.status === 200) {
        let addresslist=resp.data.data;
        let revaddresslist=addresslist.reverse();

        SetUserAddress(revaddresslist);
      }else{
        SetUserAddress("");
      }
    }

  }

  useEffect(() => {
    dispatch(fetch_category_api());

    dispatch(fetch_blogs_api());
  }, []);



  useEffect(() => {
    if (token !== '') {

      getWishlist();
    }
    updateCookies()

    getCartData(userId);
  }, [token]);


  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  React.useLayoutEffect(() => {
    window.scrollTo(scrollX, scrollY);
  });

  return (
    <BrowserRouter>
      <GlobalUserStatus.Provider
        value={{

          status: userStatus,
          SetUserStatus: SetUserStatus,
          logout: logout,
          token: token,
          SetToken: SetToken,
          showcategory: showcategory,
          Setshowcategory: Setshowcategory,
          showcategorylist: showcategorylist,
        }}
      >
        <GlobalCart.Provider
          value={{
            userId: userId,
            getCartData: getCartData, setcarterrMsg: setcarterrMsg, carterrMsg: carterrMsg,
            carterrStatus: carterrStatus,adloading:adloading,setAdloading:setAdloading,
            quantity: quantity, setQuantity: setQuantity, setCartList: setCartList, cartList: cartList, getAddressList: getAddressList, userAddress: userAddress, SetUserAddress: SetUserAddress,selectAddress ,setSelectAddress,mobile,setMobile,precheckoutno,setPrecheckoutno,postcheckoutno,setPostcheckoutno,idaddress,setIdaddress,selectAddressError,setSelectAddressError
          }}
        >
          <Wishlist.Provider value={{ getWishlist: getWishlist, datalist: datalist }}>

            <Layout>
              <Routes>
                <Route path="*" element={<NotFound />} />
                <Route exact path="/" element={<Home />} />
                <Route path="/brands/:slug" element={<BrandPage />} >
                  <Route path="/brands/:slug/:slug1" element={<BrandPage />}></Route>
                </Route>
                <Route path="/categories/:slug" element={<CategoryPage />} />
                <Route path="/products-category/:slug/" element={<NavbarCategoryItems />} >
                  <Route path="/products-category/:slug/:thirdslug" element={<NavbarCategoryItems />}></Route>
                </Route>
                <Route
                  path="/products-subcategory/:slug1/:slug2"
                  element={<SubSubCategoryItems />}
                />
                <Route path="/perfumes" element={<SaverZone type={"165"} />} />
                <Route path="/fitness" element={<SaverZone type={"139"} />} />
                <Route path="/AED-1-to-20" element={<SaverZone type={"205"} />} />


                <Route path="/saver-zone" element={<SaverZone type={"16"} />} />
                <Route path="/tech-mania" element={<SaverZone type={"82"} />} />
                <Route path="/wtl-fest" element={<SaverZone type={"203"} />} />
                <Route path="/time-fest" element={<SaverZone type={"140"} />} />
                <Route path="/offers" element={<SaverZone type={"179"} />} />




                <Route path="/deals-of-the-day" element={<DealofTheDays />} />
                <Route path="/clearance" element={<ClearanceSale />} />
                <Route
                  path="/deals/Top-Selling-Products"
                  element={<TopSelling />}
                />
                <Route path="/address" element={<MyAddress />} />
                <Route path="/order/thanks/:slug" element={<ThanksOrder />} />
                <Route path="/shopping-cart" element={<CheckoutProcess />} />
                <Route path="/details/:slug/:slug1" element={<ProductDetail />} />
                <Route path="/:slug" exact element={<StaticPage />} />
                <Route path="/:slug/:slug1" exact element={<StaticPage />} />

                <Route path="/search-result/:slug" element={<Searchresult />} >
                  <Route path="/search-result/:slug/:thirdslug" element={<Searchresult />}>
                  </Route>
                </Route>
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate replace to="/404" />} />
                <Route
                  path="/affiliate-program/"
                  exact
                  element={<AffiliateProgram />}
                />

                <Route path="/tabbyplan" exact element={<TabbyPlan />} />
                <Route path="/myaccount" exact element={<MyProfile />} />
                <Route path="/my-wishlist" exact element={<Mywishlist />} />
                <Route path="/warranty-terms" exact element={<WarrantyPage />} />
                <Route path="/my-orders" exact element={<MyOrders />} />
                <Route path="/order/cancelled" exact element={<Cancelled />} />
                <Route path="/check-out" exact element={<Cancelled />} />
                <Route path="/track-your-order" exact element={<TrackMyOrder />} />
                <Route path="/complaints" exact element={<Complaints type={"complaints"} />} />
                <Route path="/track-your-complaints" exact element={<Complaints type={"track"} />} />
                <Route path="/place-a-complaint" exact element={<PlaceComplaint />} />
                <Route path="/forgot-password" exact element={<ForgetPassword/>}/>
              </Routes>
            </Layout>

          </Wishlist.Provider>
        </GlobalCart.Provider>
      </GlobalUserStatus.Provider>

      <Routes>
        <Route path="/Product-form" element={<ProductDetailForm />} />
      </Routes>

    </BrowserRouter>
  );
};

export default App;
