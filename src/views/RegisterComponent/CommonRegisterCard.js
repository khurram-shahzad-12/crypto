import React from "react";
import { Card } from "react-bootstrap";
import SignInComponent from "./SignInComponent";
import SignUpComponent from "./SignUpComponent";
import ForgetPassword from "./ForgetPassword";
import { useSelector } from "react-redux";

const CommonRegisterCard = () => {
  var renderComponent = useSelector((state) => state.component.renderComponent);
  return (
    <Card>
      <Card.Body>
        {renderComponent === "login" && <SignInComponent />}
        {renderComponent === "signup" && <SignUpComponent />}
        {renderComponent === "forgotPassword" && <ForgetPassword />}
      </Card.Body>
    </Card>
  );
};

export default CommonRegisterCard;
