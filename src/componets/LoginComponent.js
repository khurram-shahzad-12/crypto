import React from "react";
import ModalCommonHook from "../componets/ModalCommonHook";

const LoginComponent = () => {
  const { showModal } = ModalCommonHook();

  return (
    <>
      <div className="text-center">
        <button
          type="button"
          className="logIn"
          onClick={(e) => showModal("login")}
        >
          Login
        </button>
        <div className="loginAccount mt-2">Don’t have an account?</div>
        <button
          type="button"
          className="signUp p-0"
          onClick={(e) => showModal("signup")}
        >
          Sign Up
        </button>
      </div>
    </>
  );
};

export default LoginComponent;
