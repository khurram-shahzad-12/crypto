import React, { useContext, useEffect, useState } from "react";
import { GlobalCart } from "../../App";
import { GlobalUserStatus } from "../../App";
import {
  Row,
  Col,
  Card,
  Form,
  Modal,
  Button,
  Container,
} from "react-bootstrap";
import { BiPencil, BiX } from "react-icons/bi";
import { AiOutlineDelete, AiFillCheckCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import call_apis from "../../services/Apis";
import AddressModel from "../../componets/AddressModel";
import { useMediaQuery } from "react-responsive";
import MyAccount from "./MyAccount";
import LoginComponent from "../../componets/LoginComponent";

const MyAddress = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 425px)` });
  const { getAddressList, userAddress } = useContext(GlobalCart);
  const { token } = useContext(GlobalUserStatus);
  const [show, setShow] = useState(false);
  const [addressById, SetAddressById] = useState({});
  


  useEffect(() => {
    if (token !== "") {
      getAddressList();
    }
  }, [token]);

  const handleDeleteAddress = async (id) => {
    const result = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (result) {
      const input_data = { idaddress: id };
      const resp = await call_apis.deleteAddress(input_data);
      if (resp.status === 200) {
        getAddressList();
      }
    }
  };

  const handleChecked = async (id) => {
    const inputData = {
      idaddress: id,
    };
    const resp = await call_apis.defaultAddress(inputData);
    if (resp.status === 200) {
      getAddressList();
    }
  };

  const handleEditAddress = async (id) => {
    const resp = await call_apis.getAddressList(id);
    if (resp.status === 200) {
      setShow(true);
      //   SetShowaddressModal(true);
      //   setShowAddress(true);
      SetAddressById(resp.data.data);
    }
  };

  const handelNewAddress = () => {
    SetAddressById({});
    setShow(true);
  };


  useEffect(() => {
    console.log("addressById", addressById);
    
  }, [addressById])

  //console.log("token", token.length)

  return (
    <Container className="mt-2 maxWidthContainerFluid myaddress" fluid>
      <Row>
        <Col lg={3}>
          <MyAccount />
        </Col>
        <Col lg={9} className="mt-4">
          <div className={isMobile ? 'mt-2' : 'd-flex justify-content-between mt-2'}>
            <div><h2 className="MyProfile">My Address</h2></div>
            <div className="login mb-3">
              {token.length > 0 && 
                <button
                type="button"
                className="addAddress"
                onClick={(e) => handelNewAddress()}
              >
                + Add A New Address
              </button>
              }
            </div>
          </div>
          {token.length > 0 ?
            <Row className="addressScroll">
              {userAddress.length > 0 ? (
                userAddress.map((each, id) => (
                  <Col md={4} key={id}>
                    <Card className="m-2 addressCard" key={id}>
                      <Card.Body>
                        <div className="d-flex justify-content-between mb-2">
                          <div>
                            <Form.Check
                              type="radio"
                              name="addressType"
                              onChange={(e) => handleChecked(each.idaddress)}
                              defaultChecked={each.default_address ? true : false}
                              aria-label="radio 1"
                            />
                          </div>
                          <div className="d-flex justify-content-end addressIcon">
                            <div className="mr-2">
                              <BiPencil
                                color="blue"
                                size={20}
                                className="editClass"
                                onClick={(e) => handleEditAddress(each.idaddress)}
                              />
                            </div>
                            <div></div>

                            <AiOutlineDelete
                              color=""
                              size={20}
                              onClick={(e) => handleDeleteAddress(each.idaddress)}
                            />
                          </div>
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <Row className="w-100 pb-1">
                            <Col xs={5} className="addresshead">
                              Name
                            </Col>
                            <Col xs={7} className="addressText">
                              {each.first_name}
                            </Col>
                          </Row>
                          <Row className="w-100 pb-1 h-25">
                            <Col xs={5} className="addresshead">
                              Address
                            </Col>
                            <Col xs={7} className="addressText">
                              {each.building_name +
                                " " +
                                each.address +
                                " " +
                                each.address2}
                            </Col>
                          </Row>
                          <Row className="w-100 pb-1">
                            <Col xs={5} className="addresshead">
                              Phone Number
                            </Col>
                            <Col xs={5} className="addressText">
                              {each.mobile}
                            </Col>
                            <Col xs={2}>
                              {each.status === 1 ? (
                                <AiFillCheckCircle size={20} color="#32c804" />
                              ) : (
                                <RxCrossCircled color="#ff0000" size={19} />
                              )}
                            </Col>
                          </Row>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <h6 className="text-center">No Address</h6>
              )}

              {show && (
                <AddressModel
                  addressById={addressById}
                  showAddress={show}
                  SetShowaddressModal={setShow}
                />
              )}
            </Row>
            :
            <div id="popover-basic" className="">
              <LoginComponent />
            </div>
          }
          
        </Col>
      </Row>
      
    </Container>
  );
};

export default MyAddress;
