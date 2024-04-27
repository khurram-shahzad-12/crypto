import React, { useState, useEffect, useContext,useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Row, Col, Card, Form, Modal, Button } from "react-bootstrap";
import { BiPencil, BiX } from "react-icons/bi";
import { AiOutlineDelete, AiFillCheckCircle } from "react-icons/ai"
import { RxCrossCircled } from 'react-icons/rx'
import call_apis from "../services/Apis";
import { GlobalCart } from "../App";
import { GlobalUserStatus } from "../App";
import AddressModel from "./AddressModel";

const AddressCarosule = ({
  getPlaceOrder,

}) => {
  const [addressById, SetAddressById] = useState({});
  const { getAddressList, userAddress, setSelectAddress, setMobile, setPrecheckoutno, setPostcheckoutno, idaddress, setIdaddress, setSelectAddressError, selectAddress, adloading,setAdloading } = useContext(GlobalCart);
  const [show, setShow] = useState(false);
  const [phoneVerify, setPhoneVerify] = useState(false);
  const [showaddressModal, setShowaddressModal] = useState(false);
  const [editid, setEditid] = useState("")




  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const selectAddressRef=useRef(null);

  const handleEditAddress = async (id) => {
    const resp = await call_apis.getAddressList(id);
    if (resp.status === 200) {
      setEditid(id)
      setShowaddressModal(true);
      SetAddressById(resp.data.data);
      // await getuserdefaultaddress();
      await getAddressList()
    }
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1401 },
      items: 2,
      partialVisibilityGutter: 5,
    },
    tablet: {
      breakpoint: { max: 1400, min: 768 },
      items: 1,
      partialVisibilityGutter: 80,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      partialVisibilityGutter: 80,
    },
  };

 

   const handleDeleteAddress = async (id) => {
    const result = window.confirm('Are you sure you want to delete this address?');
    if (result) {
      const input_data = { idaddress: id };
      const resp = await call_apis.deleteAddress(input_data);
      if (resp.status === 200) {
        // await getuserdefaultaddress();
        await getAddressList();
      }
    }
  };
  

  const handleChecked = async(e, each) => {
    let id=each.idaddress;
    const inputData = {
      idaddress: id,
    };
    const resp = await call_apis.selectAddress(inputData);
    if (resp.status === 200) {
      getAddressList();
      setSelectAddressError("")
    }
    
    
  };
  
  
    let reversAddress = userAddress? userAddress:[];
  let updatedAddress=[...reversAddress];
 


  const handleverifycheck = () => setPhoneVerify(false);


  return (
    <>
      {adloading ? (<></>) : (
        <div className="addressScroll">
          {updatedAddress !== undefined && updatedAddress.length > 0 &&
            <Carousel
              arrows={true}
              responsive={responsive}
              partialVisible={true}
            >

              {updatedAddress.sort((a, b) => b.default_address - a.default_address)
                .map((each, id) => (


                  <Card className="me-2 addressCard" key={id}>
                    {/* {loading?<></>:( */}
                      <Card.Body>
                      <div style={{ color: "green", fontSize: "10px" }}>{each.default_address === 1 ? "Default" : <span style={{ width: "50px", display: "inline-block" }}>&nbsp;</span>}</div>

                      <div className="d-flex justify-content-between mb-2">
                        <div>
                          <Form.Check
                            type="radio"
                            name="inlineRadioOptions"
                            value={each.idaddress}
                            // defaultChecked={(selectAddress && selectAddress.idaddress === each.idaddress)}
                            defaultChecked={each.select_address ? true : false}
                            onChange={(e) => handleChecked(e,each)}
                            
                            aria-label="radio 1"

                          />
                          
                        </div>
                        <div className="d-flex justify-content-end addressIcon">
                          <div className="mr-2">
                            <BiPencil color="blue" size={20}
                              className="editClass"
                              onClick={(e) => handleEditAddress(each.idaddress)}
                            />
                          </div>
                          <div>
                          </div>

                          <AiOutlineDelete color="" size={20}
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
                        <Row className="w-100 pb-1">
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
                            {each.status === 1 ? <AiFillCheckCircle size={20} color="#32c804" />
                              : <RxCrossCircled color="#ff0000" size={19} />}
                          </Col>
                        </Row>
                      </div>
                    </Card.Body>
                    {/* )} */}
                    
                  </Card>
                ))}
            </Carousel>}
        </div>
       )}




      {showaddressModal && (
        <AddressModel
          addressById={addressById}
          showAddress={showaddressModal}
          setShowaddressModal={setShowaddressModal}
          type="edit"
        />
      )}


    </>
  );
};

export default AddressCarosule;