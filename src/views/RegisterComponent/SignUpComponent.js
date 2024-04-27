import React, { useState, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate, Link  } from "react-router-dom";
import { useSelector } from "react-redux";
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
  const navigate = useNavigate()
  const [phoneVerify, setPhoneVerify] = useState(false);
  const { SetUserStatus, SetToken } = useContext(GlobalUserStatus);
  const dispatch = useDispatch();

  //close funtion for signup
  const closeModal = () => {
    dispatch({ type: "open_modal", openModal: false });
  };

  const { showModal } = ModalCommonHook();

  //Initialise cookies
  const cookies = new Cookies();

  var menuShow = useSelector((state) => state.hamburger.menuShow);

  //varify Email
  const [emailVarify, SetEmailVarify] = useState(false);
  const [emailMsz, SetEmailMsz] = useState("");
  const [areacode, SetAreacode] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [isNextChecked, setIsNextChecked] = useState(false);
  const [respmsg, setrespmsg] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [updatedData, SetUpdatedData] = useState({});
  const [entireData, setEntireData] = useState({})
  const [mobile, setMobile] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [validMobilemsz, setValidMobilemsz] = useState(false)
  const [showmobileverifymsz, setshowmobileverifymsz] = useState("")
  const [otpVarify, setOtpVarify] = useState(undefined)
  const [signinsuccess, setSigninsuccess] = useState(undefined)

  //rediectint to terms & policy
  const refreshPage = (data) => {
    if(data == 'terms'){
      window.location.replace('/terms-and-conditions');
    }else if(data == "policy"){
      window.location.replace('/privacy-policy');
    }
   // 
    
  }

  //email varification
  const handleVarifyEmail = (event) => {

    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if(regex.test(event.target.value)== false){
      SetEmailMsz("Invalid email format");
    }else if(event.target.value == ""){
      SetEmailMsz("Email required");
    }else{

      let data = {
        email: event.target.value,
      };
  
      axios
        .post(`/api/CheckEmail`, data)
        .then((response) => {
          if (response.status === 204) {
          } else if (response.status === 200) {
            if(response.data.status == 'error'){
              SetEmailVarify(false)
              SetEmailMsz(response.data.message);
            }else{
              SetEmailVarify(true)
              SetEmailMsz("");
            }
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
    
  };


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


 const getResendOtp = async () => {
    const input = {
      mobile: mobile,
    };  
    //console.log("input",input)
    varifyMobileNumberResend(input)
   
  };

  const getResendOtpWhatsapp = async () => {
    const input = {
      mobile: mobile,
    };  
    //console.log("input",input)
    varifyMobileNumberWhtsap(input)
   
  };


  // React.useEffect(()=>{
  //   if(otpVarify == true){
  //     setPhoneVerify(false)
  //     addressSave(entireData)
  //   }
  // },[otpVarify,entireData])

  const onSubmit = (data) => {
    setEntireData(data)
  
    totaldata = Object.assign(data, updatedData)
    // if(otpVarify == false){
    //   setshowmobileverifymsz("Mobile number not verified")
    // }

    // const input={
    //   "mobile": mobile
    // }

    if (cookies.get("oscad") !== undefined) {
      var oscad = cookies.get("oscad")
     }else{
      var oscad = 0;
     }


    totaldata = {
      ...totaldata,
      oscad:oscad
    }

   
    
    // if (isChecked && emailVarify && otpVarify) {
      if (isChecked && emailVarify) {

      // setPhoneVerify(false)
      console.log(totaldata)
      addressSave(totaldata)
    }else{
      // varifyMobileNumber(input)
      setEntireData(totaldata)
    }
  };

  const handleNationality = (event) => {
    SetUpdatedData({ ...updatedData, nationality: event.value.toString() });
  };

  const handleClose = () => {
    
    setPhoneVerify(false)
    setOtpVarify(false)
    setshowmobileverifymsz("Mobile number not varified")
  };

  const addressSave = (totaldata) => {
    axios
        .post(`/api/Signup`, totaldata)
        .then((response) => {
          if (response.data.status === "success") {
            cookies.set("jwt_token", response.data.data.token, { path: '/' });
            setSigninsuccess(true)
            setrespmsg(response.data.message)
            SetUserStatus(true);
            SetToken(response.data.data.token);
            setTimeout(() => {
              closeModal()
              window.location.replace('/');
              //dispatch({ type: "Open", menuShow: !menuShow });
            },3000);
            

            //closeModal();
          } else {
            setSigninsuccess(false)
            setrespmsg(response.data.message)
          }
        })
        .catch((err) => {

          console.log("error", err);
        });
  }

  const handleAreaCode = (event) => {

    console.log("handleAreaCode", event.target.value)
    SetAreacode(event.target.value);
    if(event.target.value!==""){
      let mobileset=event.target.value+mobileno
      SetUpdatedData({ ...updatedData, mobile: mobileset});

    
      setMobile(mobileset)

    }
    // if(mobile != ""){
    //   const input={
    //     "mobile": event.target.value + mobileno
    //   }
      // varifyMobileNumber(input)
    // }
    
    //SetUpdatedData({ ...updatedData, mobile: areacode + event.target.value});
  }

  const varifyMobileNumber = async(input) => {
    const resp = await call_apis.checkMobileNumber(input);
      if(resp.status === 200){
        if(resp.data.status == 'success'){

          //setsuccessMpbile(true)
          setshowmobileverifymsz(resp.data.message)
          setPhoneVerify(true)
          //setMobileVarificationDone(true)
          //setValidMobilemsz(false)
        }else if(resp.data.status == "exits"){
          setPhoneVerify(false)
          setshowmobileverifymsz(resp.data.message)
        }
      }
  }

  const varifyMobileNumberResend = async(input) => {
    const resp = await call_apis.reSendOtp(input);
      if(resp.status === 200){
        if(resp.data.status == 'success'){

          //setsuccessMpbile(true)
          setshowmobileverifymsz(resp.data.message)
          setPhoneVerify(true)
          //setMobileVarificationDone(true)
          //setValidMobilemsz(false)
        }else if(resp.data.status == "exits"){
          setPhoneVerify(false)
          setshowmobileverifymsz(resp.data.message)
        }
      }
  }

  const varifyMobileNumberWhtsap = async(input) => {
    const resp = await call_apis.reSendOtpWhatsapp(input);
      if(resp.status === 200){
        if(resp.data.status == 'success'){

          //setsuccessMpbile(true)
          setshowmobileverifymsz(resp.data.message)
          setPhoneVerify(true)
          //setMobileVarificationDone(true)
          //setValidMobilemsz(false)
        }else if(resp.data.status == "exits"){
          setPhoneVerify(false)
          setshowmobileverifymsz(resp.data.message)
        }
      }
  }

  const handleKeyDown = async(event) => {
    
    const regexName = /^(\+\d{1,3}[- ]?)?\d{7}$/;

    if(event.target.value != '' && event.target.value.length == 7){
      console.log(event.target.value)
      setMobileno(event.target.value)
      SetUpdatedData({ ...updatedData, mobile: areacode + event.target.value});
      var mob = "";
      if (event.keyCode === 9) {
        mob = areacode + event.target.value;
      }else{
        mob = areacode + event.target.value
      }
      console.log(mob)

      setMobile(mob)
      const input={
        "mobile": mob
      }
      // varifyMobileNumber(input)
      

    }else if(!regexName.test(event.target.value)){
      //setValidMobilemsz(true)
      setOtpVarify(false)
      setshowmobileverifymsz("Mobile should be atleast 7 digit")
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
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
              message: "invalid email format"
            })}
            className="form-control"
            onChange={(e) => handleVarifyEmail(e)}
          />
          {errors.email && <p className="error" style={{ marginTop: '-9px' }}>{errors.email.message}</p>}
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
          <span style={{ width: '25%' }}>
            <input
              className="form-control"
              type="text"
              placeholder="+971"
              id="code"
              name="code"
              disabled
            />
          </span>
          <span className="preSpan d-flxe" style={{ width: '25%',paddingTop: "4px",
            borderBottom: "1px solid #ced4da" }}>
            <select name="pre" id="pre" onChange={handleAreaCode} value={areacode} required
             className="form-control pl-1 border-0" >
        
              <option value="" disabled hidden ></option>
              <option value="50">50</option>
              <option value="52">52</option>
              <option value="54">54</option>
              <option value="55">55</option>
              <option value="56">56</option>
              <option value="58">58</option>
            </select>
          </span>
          <span style={{ width: '50%' }} 

          >
            <input
            type="text"
              placeholder="Phone" required
              onInput = {(e) =>{
                const re = /^[0-9\b]+$/;
                if(e.target.value.length >= 7){
                  setshowmobileverifymsz('')
                }
                e.target.value = ((e.target.value != '' && re.test(e.target.value)) ? Math.max(0, parseInt(e.target.value) ).toString().slice(0,7) : '')
              }}
              /* {...register("mobile", { required: true, pattern: /^(\+\d{1,3}[- ]?)?\d{7}$/ })} */
              className="form-control mobileno" /* onKeyDown={handleKeyDown} */ onChange={handleKeyDown}
            />
          </span>
          
          {
          otpVarify != true ? (
              <p className="error">{showmobileverifymsz}</p>
            ):
            (
              <p className="error"></p>
            )
          
          
          }
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
              I agree to <span className="text-primary term-class" onClick={() => refreshPage("terms")}>terms</span> &{" "}
              <span className="text-primary term-class" onClick={() => refreshPage("policy")}  >privacy policy</span>
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
        {!isChecked && (
          <p className="error">Please select terms & conditions</p>
        )}

        <Button 
        className={`logInBtn w-100 ${otpVarify  ? "disabled" : ''}`}
        type="submit">
          Sign Up
        </Button>
      </Form>
      <div className="signupsec">
        
        <p className={signinsuccess == true ? 'text-success':'text-danger'}>{respmsg}</p>
        <span className="DontAccount">Already have an account, please</span>
        &nbsp;
        
        <NavLink className="signUpNavLink" onClick={(e) => showModal("login")}>
          Sign In
        </NavLink>
        {phoneVerify && <OtpVerify phoneVerify={phoneVerify} setPhoneVerify={setPhoneVerify}  handleClose={handleClose} 
        prephone = {areacode} phone={mobileno}  getResendOtp={getResendOtp} getResendOtpWhatsapp={getResendOtpWhatsapp} setOtpVarify={setOtpVarify} otpVarify={otpVarify}
        addressSave={addressSave} type="" />}
      </div>
    </>
  );
};

export default SignUpComponent;
