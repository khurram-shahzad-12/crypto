import React, { useState, useContext } from "react";
import { BsEyeSlash } from "react-icons/bs";
import { AiOutlineEye, AiFillWarning } from "react-icons/ai";
import { Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ModalCommonHook from "../../componets/ModalCommonHook";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { GlobalUserStatus } from "../../App";
import { useDispatch } from "react-redux";
import { GlobalCart } from "../../App";

const SignInComponent = () => {
  const { showModal } = ModalCommonHook();

  const { SetUserStatus, SetToken } = useContext(GlobalUserStatus);
  const { userId, getCartData } = useContext(GlobalCart);
  //showing forgetpassword 
  const [showForget, setShowForget] = useState(false);
  const handleForgetShow = () => {
    setShowForget(true)

  }

  console.log("showForget", userId)

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch({ type: "open_modal", openModal: false });
  };

  //toggle password
  //const [passwordShown, setPasswordShown] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [errorText, setErrorText] = useState("")

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  };


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [updatedData, SetUpdatedData] = useState({});

  //Initialise cookies
  const cookies = new Cookies();

  var totaldata = {};
  const onSubmit = (data) => {
    totaldata = Object.assign(data, updatedData);


    if (cookies.get("oscad") !== undefined) {
      var oscad = cookies.get("oscad")
     }else{
      var oscad = 0;
     }

    totaldata = {
      ...totaldata,
      oscad:oscad
    }



    



    axios
      .post(`/api/Login`, totaldata)
      .then((response) => {
        if (response.data.status === "success") {
          //Decode JWT token
          const decoded = jwt(response.data.data.token);
          //getCartData(decoded.user_id);
          cookies.set("jwt_token", response.data.data.token, { path: '/' });

          SetUserStatus(true);
          SetToken(response.data.data.token);

          closeModal();
        }else{
          setErrorText(response.data.message)
        }
      })
      .catch((err) => {
        setErrorText("something went wrong")
      });
  };

  return (
    <>
      <div className="title">Registered Customer</div>
      <div className="subHeading">
        If you have an account with us, please login
      </div>
      <Form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <input style={{ width: '95%', height: '32px' }}
            placeholder="Email"
            {...register('email', {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
            })} />
          {errors.email && <p className="error">Please fill this field</p>}
        </Form.Group>
        <Form.Group className="mb-3 d-flex"
          controlId="exampleForm.ControlTextarea1">
          <input
            placeholder="Password"
            className="form-control"
            type={passwordType}
            {...register('password', { required: true, min: 6 })} />
          {passwordType === "password" ? (
            <BsEyeSlash className="eyeSlash" onClick={togglePassword} />
          ) : (
            <AiOutlineEye className="eyeSlash" onClick={togglePassword} />
          )}
        </Form.Group>
        {errors.password && (
          <div className="error" style={{ marginTop: '-15px' }}>Password should not be blank</div>
        )}
        <div className="d-flex justify-content-between forgetDiv">
          <div>
            <a href="https://www.ourshopee.com/forgot-password/?sc=ourshopee" target="_blank" rel="noreferrer">
              <span className="forgetText" /* onClick={(e) => showModal("for1gotPassword")} */ >Forgot password?</span>
            </a>
          </div>
          <div className="rememberText">
            <Form.Check aria-label="option 1" label="Remember me" />
          </div>
        </div>
        {errorText !== "" &&
          <div className="error"><AiFillWarning fill="red" size={10} />{errorText}</div>}

        <Button className="logInBtn w-100" type="submit">
          Log In
        </Button>
      </Form>
      <div className="signupsec">
        <span className="DontAccount">If you don't have an account, Please</span>&nbsp;
        <NavLink className="signUpNavLink" onClick={(e) => showModal("signup")}>
         Register
        </NavLink>
      </div>
    </>

  );
};

export default SignInComponent;
