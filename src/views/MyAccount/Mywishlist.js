import React, { useEffect, useContext } from "react";
import { Container, Row, Col} from "react-bootstrap";
import CommonCard from "../../componets/CommonCard";
import { Wishlist } from "../../App";
import MyAccount from "./MyAccount";
import Cookies from "universal-cookie";
import LoginComponent from "../../componets/LoginComponent";


const Mywishlist = (items) => {
  const { datalist } = useContext(Wishlist);
  const cookies = new Cookies();

  useEffect(() => {}, [datalist]);
  return (
    <>
      <Container className="mt-2 mywishlist maxWidthContainerFluid" fluid>
        <Row>
          <Col lg={3}>
            <MyAccount />
          </Col>
          <Col lg={9} className="mt-4">
            <h2 className="MyProfile">My Wishlist</h2>
            {cookies.get("jwt_token") !== undefined ?
              <Row className="row row-cols-md-4 row-cols-lg-4">
              {datalist.length > 0 ? (
                datalist.map((each, i) => (
                  <div className="col-xs-6 col-sm-4 col-md-3 col-lg-21" key={i}>
                    <CommonCard data={each} type="wishlistCross" />
                  </div>
                ))
              ) : (
                <div>No Data Found</div>
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
    </>
  );
};

export default Mywishlist;
