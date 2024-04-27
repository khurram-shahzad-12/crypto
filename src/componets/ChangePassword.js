import React, { useState } from "react";
import { Modal, Button, Row, Form } from "react-bootstrap";
import call_apis from "../services/Apis";

const ChangePassword = ({ showModal, SetShowModal }) => {
  const handleClose = () => SetShowModal(false);
  const [textmsg, setTextmsg] = useState("");
  const [values, SetValues] = useState({
    old_password: "",
    new_password: "",
  });

  const handleChange = (event, i) => {

    SetValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.new_password.length < 6) {
      setTextmsg("Password is weak ! Should contain Minimum 6 characters");
    } else {
      const resp = await call_apis.changePassword(values);
      if (resp.data.status == 'success') {
        setTextmsg("Password Changed Succfully");
        setTimeout(() => {
          SetShowModal(false);
        }, 2000);
      } else if (resp.data.status == 'error') {
        setTextmsg("Old Password is Wrong! Please Enter Current Password ");
        // setTimeout(() => {
        //   SetShowModal(false);
        // }, 2000);
      }
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} className="changePassword">
      <Modal.Header closeButton>
        <Modal.Title>
          <h4>Change Password</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="modalSubheading">
          Enter your current password and new password to change the password
        </p>
        <Row className="mb-3">
          <label>Old Password</label>
          <input
            type="text"
            placeholder="Old Password"
            name="old_password"
            autoComplete={false} role="presentation"
            onChange={handleChange}
          />
        </Row>
        <Row>
          <label>New Password</label>
          <input
            type="password"
            placeholder="New Password"
            name="new_password"
            autoComplete={false} role="presentation"
            onChange={handleChange}
          />
        </Row>
      </Modal.Body>
      <div className="warning" 
      
      style={{
        color: `${textmsg == 'Password Changed Succfully' ? "green" : "red"}`,
      }}
      >{textmsg}</div>
      <Modal.Footer>
        <Button className="formname" onClick={handleSubmit}>
          Update Password
        </Button>
        <Button
          className="formname"
          style={{ backgroundColor: "#dc0d33" }}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePassword;
