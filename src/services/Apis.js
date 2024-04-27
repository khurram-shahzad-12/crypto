import axios from "axios";
import Cookies from "universal-cookie";



//homeApi
const getbannerlist = async () => {
  const response = await axios.get("/api/getbannerlist");
  return response;
};

const getExcitingOffer = async () => {
  const response = await axios.get("/api/deal_offers");
  return response;
};

const Bundel_Clearance_Sale = async () => {
  const response = await axios.get("/api/bundle_clearance_sale");
  return response;
};

const deal_of_the_day = async () => {
  const response = await axios.get("/api/getDealOfTheDay");
  return response;
};

const saverZone = async () => {
  const response = await axios.get("/api/getSaverZone");
  return response;
};

const saverZoneSection = async (type) => {
  const response = await axios.get(`/api/saver_zone1?section_id=${type}`);
  return response;
};

const getAddressList = async (id) => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");

  if (cookies.get("jwt_token") !== undefined) {
    const response = await axios
      .get(`/api/getalladdresses?idaddress=${id}`, {
        headers: {
          Authorization: "Barear " + token,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    return response;
  }


};

const getWishLists = async () => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");
  const response = await axios
    .get("/api/getWishLists", {
      headers: {
        Authorization: "Barear " + token,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return response;
};

const getPlaceOrder = async (id) => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");

  if (cookies.get("jwt_token") !== undefined) {
    const response = await axios
      .get(`/api/GetPlaceOrder?userId=${id}`, {
        headers: {
          Authorization: "Barear " + token,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    return response;
  }




};

const defaultAddress = async (input_data) => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");
  const response = await axios.post("/api/saveDefaultAddress", input_data, {
    headers: {
      Authorization: "Barear " + token, //the token is a variable which holds the token
    },
  });
  return response;
};

const postWishLists = async (input_data) => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");
  const response = await axios.post("/api/postWishList", input_data, {
    headers: {
      Authorization: "Barear " + token, //the token is a variable which holds the token
    },
  });
  return response;
};
const updateCartStatus = async () => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");
  const response = await axios.post("/api/updateCartStatus", {}, {
    headers: {
      Authorization: "Barear " + token, //the token is a variable which holds the token
    },
  });
  return response;
};

const getLocations = async () => {
  const response = await axios.get("/api/getLocations");
  return response;
};

const getAreas = async (input_data) => {
  const response = await axios.get("/api/getAreas?emirateid=" + input_data);
  return response;
};

const removeFromCart = async (input_data) => {
  const response = await axios.post("/api/removeFromCart", input_data);
  return response;
};

const getCartList = async (input_data) => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");
  const response = await axios.post("/api/GetFromCart", input_data, {
    headers: {
      Authorization: "Barear " + token, //the token is a variable which holds the token
    },
  });
  return response;
};

const getQuantity = async (input_data) => {
  const response = await axios.post("/api/changeCartQuantity", input_data);
  return response;
};

const saveAddress = async (input_data) => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");
  const response = await axios.post("/api/postUserAddress", input_data, {
    headers: {
      Authorization: "Barear " + token, //the token is a variable which holds the token
    },
  });
  return response;
};

const updatestatus = async (input_data) => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");
  const response = await axios.post("/api/updatestatus", input_data, {
    headers: {
      Authorization: "Barear " + token, //the token is a variable which holds the token
    },
  });
  return response;
};


const getuserdefaultaddress = async (input_data) => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");
  const response = await axios.post("/api/getuserdefaultaddress",input_data,{
    headers: {
      Authorization: "Barear " + token, //the token is a variable which holds the token
    },
  });
  return response;
};

const saveCouponCode = async (input_data) => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");
  const response = await axios.post("/api/checkCouponCode", input_data, {
    headers: {
      Authorization: "Barear " + token, //the token is a variable which holds the token
    },
  });
  return response;
};

const clearanceData = async (page) => {
  const response = await axios.get(`api/clearance_sale?page=${page}`);
  return response;
};

const brandData = async (id, page, category_id, subcategory_id) => {
  const response = await axios.get(
    `api/getAllBrandItems?brand_name=${id}&page=${page}&category_id=${category_id}&subcategory_id=${subcategory_id}`
  );
  return response;
};

const searchBrandData = async (slug, page) => {
  const response = await axios.get(
    `api/getAllBrandItems?brand_id=0&slug=${slug}&page=${page}`
  );
  return response;
};

const brandWeek = async () => {
  const response = await axios.get(`api/brand_week`);
  return response;
};

const subcategoryData = async (slug, page) => {
  const response = await axios.get(
    `api/getallsubcategoryItems?subcat_url=${slug}&page=${page}`
  );
  return response;
};

const subSubcategoryData = async (slug1, slug2, page) => {
  const response = await axios.get(
    `api/getallsubcategoryItems?subcat_url=${slug1}&sub_subcat_url=${slug2}&page=${page}`
  );
  return response;
};

const pre_owned = async () => {
  const response = await axios.get(`api/pre_owned`);
  return response;
};

const getCategorySection = async () => {
  const response = await axios.get("api/getCategorySection");
  return response;
};

const deleteAddress = async (input_data) => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");
  const response = await axios.post("/api/deleteUserAddress", input_data, {
    headers: {
      Authorization: "Barear " + token, //the token is a variable which holds the token
    },
  });
  return response;
};

const userProfile = async () => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");
  const response = await axios.get("/api/getMyProfile", {
    headers: {
      Authorization: "Barear " + token, //the token is a variable which holds the token
    },
  });
  return response;
};

const updateProfile = async (input_data) => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");

  const response = await axios.post("/api/updateMyProfile", input_data, {
    headers: {
      Authorization: "Barear " + token, //the token is a variable which holds the token
    },
  });
  return response;
};

const verifyOtp = async (input_data) => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");
  const response = await axios.post("/api/verifyOtp", input_data, {
    headers: {
      Authorization: "Barear " + token, //the token is a variable which holds the token
    },
  });
  return response;
};

const reSendOtp = async (input_data) => {
  const response = await axios.post("/api/reSendOtp", input_data, {
    // headers: {
    //   Authorization: "Barear " + token, //the token is a variable which holds the token
    // },
  });
  return response;
};

const reSendOtpWhatsapp = async (input_data) => {
  const response = await axios.post("/api/reSendOtpWhatsapp", input_data, {
    // headers: {
    //   Authorization: "Barear " + token, //the token is a variable which holds the token
    // },
  });
  return response;
};


const changePassword = async (input_data) => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");
  const response = await axios.post("/api/changePassword", input_data, {
    headers: {
      Authorization: "Barear " + token, //the token is a variable which holds the token
    },
  });
  return response;
};

const getCountryList = async () => {
  const response = await axios.get("/api/GetNationality");
  return response;
};

const getProductData = async (slug1) => {
  const response = await axios.get(`/api/product_detail`, {
    params: { sku: `${slug1}` },
  });


  return response;
};

const postProductData = async (input_data) => {
  const response = await axios.post("/api/get_relatedItems", input_data);
  return response;
};

const postPlaceOrder = async (input_data) => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");
  const response = await axios.post("/api/postpostPlaceOrder", input_data, {
    headers: {
      Authorization: "Barear " + token, //the token is a variable which holds the token
    },
  });
  return response;
};

const saveComplaints = async (input_data) => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");
  const response = await axios.post("/api/addComplaint", input_data, {
    headers: {
      Authorization: "Barear " + token, //the token is a variable which holds the token
    },
  });
  return response;
};

const getOrderData = async (page) => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");
  const response = await axios
    .get(`/api/myOrders?page=${page}`, {
      headers: {
        Authorization: "Barear " + token,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return response;
};

const forgetPassword = async (email) => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");
  const response = await axios
    .post(`https://www.ourshopee.com/webservice/index.php?tag=forgetPassword&emailid=${email}&country_code=1`, {

    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return response;
};


const checkMobileNumber = async (input_data) => {
  console.log("checkMobileNumber", input_data)
  const response = await axios.post("/api/checkMobile", input_data, {
    // headers: {
    //   Authorization: "Barear " + token, //the token is a variable which holds the token
    // },
  });
  return response;
};

const getlistbyblogCategory = async (id) => {

  const response = await axios.get(`api/blogByCatId?id=${id}`);
  return response;
};

const getBlogDetail = async (id) => {

  const response = await axios.get(`api/blogByCatId?blogId=${id}`);
  return response;
};



const getComplaint = async (input_data) => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");
  const response = await axios.post("/api/getComplaint", input_data, {
    headers: {
      Authorization: "Barear " + token, //the token is a variable which holds the token
    },
  });
  return response;
};


const selectAddress = async (input_data) => {
  var cookies = new Cookies();
  var token = cookies.get("jwt_token");
  const response = await axios.post("/api/selectaddress", input_data, {
    headers: {
      Authorization: "Barear " + token, //the token is a variable which holds the token
    },
  });
  return response;
};

const subcategoryMetatags = async (input_data) => {
 
  const response = await axios.post("/api/subcategorymetatags", input_data,{});
  return response;
};

const subsubcategoryMetatags = async (input_data) => {
 
  const response = await axios.post("/api/subsubcategorymetatag", input_data,{});
  return response;
};

const brandsMetatags = async (input_data) => {
 
  const response = await axios.post("/api/brandsmetatags", input_data,{});
  return response;
};



const call_apis = {
  getAddressList: getAddressList,
  removeFromCart: removeFromCart,
  getCartList: getCartList,
  getQuantity: getQuantity,
  saveAddress: saveAddress,
  getLocations: getLocations,
  getAreas: getAreas,
  getbannerlist: getbannerlist,
  brandWeek: brandWeek,
  pre_owned: pre_owned,
  getExcitingOffer: getExcitingOffer,
  Bundel_Clearance_Sale: Bundel_Clearance_Sale,
  deal_of_the_day: deal_of_the_day,
  saverZone: saverZone,
  clearanceData: clearanceData,
  saverZoneSection: saverZoneSection,
  getWishLists: getWishLists,
  brandData: brandData,
  postWishLists: postWishLists,
  defaultAddress: defaultAddress,
  getPlaceOrder: getPlaceOrder,
  searchBrandData: searchBrandData,
  subcategoryData: subcategoryData,
  getCategorySection: getCategorySection,
  deleteAddress: deleteAddress,
  getCountryList: getCountryList,
  userProfile: userProfile,
  updateProfile: updateProfile,
  verifyOtp: verifyOtp,
  reSendOtp: reSendOtp,
  reSendOtpWhatsapp: reSendOtpWhatsapp,
  changePassword: changePassword,
  subSubcategoryData: subSubcategoryData,
  getProductData: getProductData,
  postProductData: postProductData,
  postPlaceOrder: postPlaceOrder,
  getOrderData: getOrderData,
  saveCouponCode: saveCouponCode,
  saveComplaints: saveComplaints,
  forgetPassword: forgetPassword,
  getlistbyblogCategory: getlistbyblogCategory,
  getBlogDetail: getBlogDetail,
  getComplaint: getComplaint,
  checkMobileNumber: checkMobileNumber,
  updateCartStatus:updateCartStatus,
  updatestatus: updatestatus,
  getuserdefaultaddress: getuserdefaultaddress,
  selectAddress: selectAddress,
  subcategoryMetatags: subcategoryMetatags,
  subsubcategoryMetatags: subsubcategoryMetatags,
  brandsMetatags: brandsMetatags,
};

export default call_apis;
