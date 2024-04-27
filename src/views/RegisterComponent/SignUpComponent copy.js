import React, { useState, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import ModalCommonHook from "../../componets/ModalCommonHook";
import NationalityComponent from "../../componets/NationalityComponent";
import { BsEyeSlash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { GlobalUserStatus } from "../../App";
import OtpVerify from '../../componets/OtpVerify'
import call_apis from '../../services/Apis'
import { GoTriangleDown } from 'react-icons/go'
import UseOTPVarificationHook from "../../componets/UseOTPVarificationHook";

const SignUpComponent = () => {
  const [phoneVerify, setPhoneVerify] = useState(false);
  const { SetUserStatus, SetToken } = useContext(GlobalUserStatus);

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch({ type: "open_modal", openModal: false });
  };

  const { showModal } = ModalCommonHook();

  const {varifyMobileNumber, getResendOtp} = UseOTPVarificationHook()

  //Initialise cookies
  const cookies = new Cookies();

  //Initialise User State

  //varify Email
  const [emailVarify, SetEmailVarify] = useState(false);
  const [emailMsz, SetEmailMsz] = useState("");
  const [areacode, SetAreacode] = useState(50);

  const handleVarifyEmail = (event) => {
    let data = {
      email: event.target.value,
    };

    axios
      .post(`/api/CheckEmail`, data)
      .then((response) => {
        if (response.status === 204) {
          SetEmailVarify(true);
        } else if (response.status === 200) {
          SetEmailVarify(false);
          
          SetEmailMsz(response.data.message);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const [isChecked, setIsChecked] = useState(true);
  const [isNextChecked, setIsNextChecked] = useState(true);
  const [respmsg, setrespmsg] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [updatedData, SetUpdatedData] = useState({});
  const [entireData, setEntireData] = useState({})
  //const [prephone, setPrephone] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [successMpbile, setsuccessMpbile] = useState(false)
  const [validMobilemsz, setValidMobilemsz] = useState(false)
  const [showmobileverifymsz, setshowmobileverifymsz] = useState("")
  const [mobileVarificationDone, setMobileVarificationDone] = useState(false)
  //get checked box value


  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handleAnotherOnChange = () => {
    setIsNextChecked(!isNextChecked);
  };

  //toggle password

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  var totaldata = {};


  // const getResendOtp = async () => {
  //   console.log("mobile", mobile)
  //   const input = {
  //     mobile: mobile,
  //   };  
  //   console.log("input",input)
  //   varifyMobileNumber(input)
   
  // };



  const onSubmit = (data) => {
    console.log("onSubmit",data)
    setEntireData(data)
    totaldata = Object.assign(data, updatedData)
    console.log("Object",totaldata)
    if (isNextChecked && isChecked && emailVarify) {

      setPhoneVerify(false)
      //getResendOtp(data.pre, data.mobile)
      addressSave(totaldata)
      
    }
  };

  const handleNationality = (event) => {
    SetUpdatedData({ ...updatedData, nationality: event.value.toString() });
  };

  const handleClose = () => setPhoneVerify(false);

  const addressSave = (totaldata) => {
    console.log("totaldata", totaldata)
    axios
        .post(`/api/Signup`, totaldata)
        .then((response) => {

          if (response.data.status === "success") {
            cookies.set("jwt_token", response.data.data.token, { path: '/' });
            setrespmsg("")
            SetUserStatus(true);
            SetToken(response.data.data.token);
            closeModal();
          } else {
            setrespmsg(response.data.message)
          }
        })
        .catch((err) => {

          console.log("error", err);
        });
  }

  const handleAreaCode = (event) => {
    SetAreacode(event.target.value)
  }

  // const varifyMobileNumber = async(input) => {
  //   const resp = await call_apis.checkMobileNumber(input);
  //     console.log("resp", resp)
  //     if(resp.status === 200){
  //       if(resp.data.status == 'success'){
  //         setsuccessMpbile(true)
  //         setshowmobileverifymsz(resp.data.message)
  //         setPhoneVerify(true)
  //         setMobileVarificationDone(true)
  //         setValidMobilemsz(false)
  //       }else if(resp.data.status == "exits"){
  //         setPhoneVerify(false)
  //         setshowmobileverifymsz(resp.data.message)
  //       }
  //     }
  // }

  const handleKeyDown = async(event) => {
    const regexName = /^(\+\d{1,3}[- ]?)?\d{7}$/;
    if(event.target.value != '' && event.target.value.length == 7){
      setMobileno(event.target.value)
      SetUpdatedData({ ...updatedData, mobile: areacode + event.target.value});
      var mob = "";
      if (event.keyCode === 9) {
        mob = areacode + event.target.value;
      }else{
        mob = areacode + event.target.value
      }

      setMobile(mob)
      const input={
        "mobile": mob
      }
      varifyMobileNumber(input)
      

    }else if(!regexName.test(event.target.value)){
      setValidMobilemsz(true)
      //console.log("Mobile should be atleast 7 digit")
    }

  };


  return (
    <>
      <div className="title">Register Account</div>
      <div className="subHeading">
        If you don’t have an account, please join with us
      </div>
      <Form className="signUpForm" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-2">
          <input
            placeholder="Name"
            {...register("first_name", {
              required: true,
              pattern: /^[a-zA-Z -]*$/i,
            })}
            className="form-control"
          />
          {errors.first_name && (
            <p className="error">Please check the Name</p>
          )}
        </Form.Group>

        <Form.Group className="mb-2  genderRadio pl-1">
          <div className="d-flex gap-4">
            <label style={{ marginTop: "4px" }}>Gender</label>
            <div className="form-check">
              <label htmlFor="Male">
                <input
                  {...register("gender", { required: true })}
                  type="radio"
                  name="gender"
                  value="Male"
                  className="form-check-input"
                />{" "}
                Male
              </label>
            </div>
            <div className="form-check">
              <label htmlFor="Female">
                <input
                  {...register("gender", { required: true })}
                  type="radio"
                  name="gender"
                  value="Female"
                  className="form-check-input"
                />{" "}
                Female
              </label>
            </div>
          </div>
          {errors.gender && <p className="error">Please check the Gender</p>}
        </Form.Group>

        <NationalityComponent name={"nationality"} handle={handleNationality} />

        <Form.Group className="mb-2">
          <input
            placeholder="Email Address"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
            })}
            className="form-control"
            onBlur={(e) => handleVarifyEmail(e)}
          />
          {errors.email && <p className="error">Please check the Email</p>}{" "}
          {!emailVarify && <p className="error">{emailMsz}</p>}
        </Form.Group>

        <Form.Group className="mb-2 d-flex">

        <input
          placeholder="Password"
          type={passwordShown ? "text" : "password"}
          {...register("password", { required: true, min: 6 })}
          className="form-control"
        />
        {passwordShown ? (
          <AiOutlineEye className="eyeSlash" onClick={togglePassword} />
        ) : (
          <BsEyeSlash className="eyeSlash" onClick={togglePassword} />
        )}
        </Form.Group>
        {errors.password && (
        <p className="error" style={{ marginTop: '-9px' }}>Password should not be blank</p>
        )}

        <Form.Group className="row mb-2">
          <span style={{ width: '20%' }}>
            <input
              className="form-control"
              type="text"
              placeholder="+971"
              id="code"
              name="code"
              disabled
            />
          </span>
          <span className="preSpan d-flxe" style={{ width: '20%',paddingTop: "4px",
            borderBottom: "1px solid #ced4da" }}>
            <select name="pre" id="pre" onChange={handleAreaCode} defaultValue={areacode}
            {...register("pre", {
              required: true,
            })} className="form-control pl-1 border-0" >
              <option value="50">50</option>
              <option value="52">52</option>
              <option value="54">54</option>
              <option value="55">55</option>
              <option value="56">56</option>
              <option value="58">58</option>
            </select>
          </span>
          <span style={{ width: '60%' }} 

          >
            <input
              placeholder="Phone" 
              /* {...register("mobile", { required: true, pattern: /^(\+\d{1,3}[- ]?)?\d{7}$/ })} */
              className="form-control mobileno" onKeyDown={handleKeyDown} onChange={handleKeyDown}
            />
          </span>
          {/* {errors.mobile && (
              <p className="error">Mobile should be atleast 7 digit</p>
            )} */}
          {validMobilemsz && (
              <p className="error">Mobile should be atleast 7 digit</p>
            )}
          {mobileVarificationDone != true && (
              <p className="error">{showmobileverifymsz}</p>
            )}
        </Form.Group>
        



        <div className="panel-body">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              style={{ marginTop: "6px" }}
              checked={isChecked}
              onChange={handleOnChange}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              I agree to <NavLink to="/terms-and-conditions">terms</NavLink> &{" "}
              <NavLink to="/privacy-policy">privacy policy</NavLink>
            </label>
          </div>
        </div>
        <div className="panel-body">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck2"
              checked={isNextChecked}
              onChange={handleAnotherOnChange}
            />
            <label className="form-check-label" htmlFor="exampleCheck2">
              Yes, I would like to receive news, special offers & other
              information about ourshopee.com
            </label>
          </div>
        </div>
        {!isNextChecked && !isChecked && (
          <p className="error">Please select both checkbox</p>
        )}

        <Button className="logInBtn w-100" type="submit">
          Sign Up
        </Button>
      </Form>
      <div className="signupsec">
      <p className="error">{respmsg}</p>
        <span className="DontAccount">Already have an account, please</span>
        &nbsp;
        
        <NavLink className="signUpNavLink" onClick={(e) => showModal("login")}>
          Sign In
        </NavLink>
        {phoneVerify && <OtpVerify phoneVerify={phoneVerify} setPhoneVerify={setPhoneVerify}  handleClose={handleClose} 
      prephone = {areacode} phone={mobileno}  getResendOtp={getResendOtp}
      addressSave={addressSave} type="" />}
      </div>
    </>
  );
};

export default SignUpComponent;
