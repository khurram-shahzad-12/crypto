import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import call_apis from "../../services/Apis";
import Cookies from "universal-cookie";
//import OtpInput from "react18-input-otp";
import ChangePassword from "../../componets/ChangePassword";
import OtpVerify from "../../componets/OtpVerify";
import axios from "axios";
import MyAccount from "./MyAccount";
import LoginComponent from "../../componets/LoginComponent";

const MyProfile = () => {
  const cookies = new Cookies();
  const token = cookies.get("jwt_token");
  const navigate = useNavigate();
  const [countryList, SetcountryList] = useState({});
  const [countryId, SetCountryId] = useState(0);
  const [area, SetAreaCode] = useState("");
  const [mobile, SetMobile] = useState("");
  const [tempmobile, Settempmobile] = useState("");
  const [showotp, SetShowOtp] = useState(false);
  const [numVerified, SetnumVerified] = useState(false);
  const [apiStatus, SetapiStatus] = useState(true);
  const [profile, SetProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    nationality: "",
    mobile: "",
    area: area,
  });
  const [otp, setOtp] = useState("");
  const [showModal, SetShowModal] = useState(false);
  const [msssssz, Setmsz] = useState("");
  const [successMpbile, setsuccessMpbile] = useState(false)
  const [phoneVerify, setPhoneVerify] = useState(false);
  const [areacode, SetAreacode] = useState(50);


  //const [onMobileChange]



  const handleShow = () => SetShowModal(true);

  const handleOtp = (enteredOtp) => {
    setOtp(enteredOtp);
  };

  const validateOTP = async () => {
    const input = {
      otp: otp,
    };
    axios
      .post("/api/verifyOtp", input, {
        headers: {
          Authorization: "Barear " + token,
        },
      })
      .then((response) => {
        Setmsz(response.data.message);
        navigate("/");
      })
      .catch((err) => {
        Setmsz(err.response.data.data);
      });
  };

  // const getResendOtp = async () => {
  //   const input = {
  //     mobile: profile.mobile,
  //   };
  //   const resp = await call_apis.reSendOtp(input);
  //   Setmsz(resp.data.message);
  // };

  const getResendOtp = async () => {
    console.log("mobile", mobile)
    const input = {
      mobile: profile.area + mobile,
    };
    console.log("input", input)
    varifyMobileNumber(input)

  };

  const getProfile = async () => {
    const response = await call_apis.userProfile();
    if (response.status === 200) {
      SetProfile(response.data.data[0]);
      SetCountryId(parseInt(response.data.data[0].nationality));
      SetProfile((profile) => ({
        ...profile,
        ["area"]: response.data.data[0].mobile.slice(0, 2),
      }));
      SetMobile(response.data.data[0].mobile.slice(2));
      SetapiStatus(false);
    }
  };

  const getCountryList = async () => {
    const resp = await call_apis.getCountryList();
    if (resp.status === 200) {
      SetcountryList(resp.data.data);
    }
  };

  const varifyMobileNumber = async (input) => {
    const resp = await call_apis.checkMobileNumber(input);
    //console.log("resp", resp)
    if (resp.status === 200) {
      if (resp.data.status == 'success') {

        // SetProfile((profile) => ({ ...profile, ['mobile']: input.mobile }));
        Settempmobile(input.mobile)
        setsuccessMpbile(true)
        // setshowmobileverifymsz(resp.data.message)
        setPhoneVerify(true)
        // setMobileVarificationDone(true)
        // setValidMobilemsz(false)
      } else if (resp.data.status == "exits") {
        // setPhoneVerify(false)
        // setshowmobileverifymsz(resp.data.message)
      }
    }
  }

  React.useEffect(() => {
    //console.log(successMpbile);
    if (!phoneVerify && !successMpbile) {
      SetMobile(profile.mobile.slice(2));
      SetProfile((profile) => ({
        ...profile,
        ["area"]: profile.mobile.slice(0, 2),
      }));
    } else {
      console.log("hjuyf");
      if (!phoneVerify && successMpbile) {
        SetProfile((profile) => ({
          ...profile,
          ["mobile"]: tempmobile,
        }));
      }
    }




  }, [phoneVerify])

  const handleChange = (event, i) => {
    if (event.target.name === "area") {
      SetProfile((profile) => ({
        ...profile,
        [event.target.name]: event.target.value,
      }));
    } else if (event.target.name === "mobile") {
      const mob = profile.area + event.target.value;
      SetMobile(event.target.value);
      const input = {
        "mobile": mob
      }
      const regexName = /^(\+\d{1,3}[- ]?)?\d{7}$/;
      if (event.target.value != '' && event.target.value.length == 7) {
        varifyMobileNumber(input)
      } else if (!regexName.test(event.target.value)) {
        //setValidMobilemsz(true)
        //console.log("Mobile should be atleast 7 digit")
      }
    } else {
      SetProfile((profile) => ({
        ...profile,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const onSubmit = async () => {
    const resp = await call_apis.updateProfile(profile);
    if (resp.status === 200) {
      if (resp.data.data === 0) {
        // SetShowOtp(false);
      } else {
        // SetShowOtp(true);
      }
    }
  };

  const handleClose = () => {
    setPhoneVerify(false)
    setsuccessMpbile(false);
  };

  useEffect(() => {
    getCountryList();
  }, []);

  useEffect(() => {
    if (cookies.get("jwt_token") !== undefined) {
      getProfile();
    }
  }, [cookies.get("jwt_token")]);

  console.log("apiStatus",apiStatus)

  return (
    <>
      <Container className="mt-2 MyAccount maxWidthContainerFluid" fluid>
        <Row>
          <Col lg="3">
            <MyAccount />
          </Col>
          <Col lg="9" className="mt-4 outer-sec">
          <h2 className="MyProfile">My Profile</h2>
            {cookies.get("jwt_token") !== undefined ? 
            <>
            { 
            !apiStatus ?
            <>
              <Row className="">
                <Col lg={6} md={12} sm={12} xs={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="formname">First name*</Form.Label>
                    <Form.Control
                      placeholder="First name"
                      defaultValue={profile.first_name}
                      name="first_name"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} md={12} sm={12} xs={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="formname">Gender*</Form.Label>
                    <select
                      className="form-control"
                      name="gender"
                      value={profile.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>

                <Col lg={6} md={12} sm={12} xs={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="formname">Nationality*</Form.Label>
                    {Object.keys(countryList).length > 0 && (
                      <Select
                        className="mb-3 select-style"
                        name="nationality"
                        options={countryList}
                        value={countryList.filter((ele) => ele.value === countryId)}
                        onChange={(e) => {
                          SetProfile({ ...profile, nationality: e.value.toString() });
                        }}
                      />
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} md={12} sm={12} xs={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="formname">Email Address*</Form.Label>
                    <Form.Control
                      placeholder="Email"
                      defaultValue={profile.email}
                      name="email"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={12} sm={12} xs={12}>
                  <Form.Label className="formname">Contact Number*</Form.Label>
                  <Form.Group className="mb-3 d-flex gap-1 inputtext">
                    <Col lg={2} md={3} sm={3} xs={3}>
                      <Form.Control placeholder="+971" />
                    </Col>
                    <Col lg={4} md={3} sm={3} xs={3}>
                      <select
                        className="form-control"
                        placeholder=""
                        name="area"
                        value={profile.area}
                        onChange={handleChange}
                      >
                        <option value="50">50</option>
                        <option value="52">52</option>
                        <option value="54">54</option>
                        <option value="55">55</option>
                        <option value="56">56</option>
                        <option value="58">58</option>
                      </select>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6}>
                      <Form.Control
                        placeholder="Ex: 99988899"
                        name="mobile"
                        onInput = {(e) =>{
                          const re = /^[0-9\b]+$/;
                          e.target.value = ((e.target.value != '' && re.test(e.target.value))? Math.max(0, parseInt(e.target.value) ).toString().slice(0,7) : '')
                        }}
                        // key={mobile}
                        // defaultValue={mobile}
                        value={mobile}
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="twobox mb-4">
                <Col lg={6} md={6} sm={6} xs={12}>
                  <button
                    type="submit"
                    to="#fadeandscale"
                    className="greenbox"
                    onClick={handleShow}
                  >
                    Change Password
                  </button>
                </Col>
                <Col lg={6} md={6} sm={6} xs={12}>
                  <button
                    type="submit"
                    to="#fadeandscale"
                    className="bluebox"
                    onClick={onSubmit}
                  >
                    Update Profile
                  </button>
                </Col>
              </Row>
              {showModal && (
                <ChangePassword showModal={showModal} SetShowModal={SetShowModal} />
              )}
            </>
            :
            <div style={{ height: "50vh" }}>
              <div className="loading-indicator"></div>
            </div>
          }
            </>:
            <div id="popover-basic" className="">
                <LoginComponent />
              </div>
            }

          
          </Col>
        </Row>
      </Container>
     {phoneVerify && <OtpVerify phoneVerify={phoneVerify} setPhoneVerify={setPhoneVerify} setsuccessMpbile={setsuccessMpbile} handleClose={handleClose}
        prephone={profile.area} phone={mobile} getResendOtp={getResendOtp}
        addressSave="" type="header" />}
    </>
  );
};

export default MyProfile;
