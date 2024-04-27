import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

const SubmitaReview = () => {
  const ratingChanged = (newRating) => {};

  return (
    <>
      <div>
        <Container className="SubmitaReview maxWidthContainerFluid" fluid>
          <Row>
            <div>
              <img
                style={{ width: "100%" }}
                src="Assets/ratingimg.webp"
                alt=""
              />
              <h1 className="honetitle">
                LET US KNOW YOUR ONLINE SHOPPING EXPERIENCES!!!
              </h1>
            </div>
          </Row>
          <Row style={{ paddingTop: "5%" }}>
            <Col md={7}>
              <h2 className="htwo">How to Submit Product reviews</h2>
              <h3 className="hthree">How to find needed product</h3>
              <ul>
                <li>Enter a few words into the search box.</li>
                <li>We will List all matching results.</li>
                <li>Select your product.</li>
              </ul>
              <div>
                <h3 className="hthree">How to browse by category</h3>
                <ul>
                  <li>
                    Select a product category from drop down menu just next to
                    search box.
                  </li>
                  <li>Each category will list its own products.</li>
                  <li>Select the product and click to it.</li>
                </ul>
                <p>
                  Share your shopping experience with the other customer by
                  writing a review.
                </p>
              </div>
            </Col>
            <Col md={5}>
              <h2 className="submitpage">Submit Your Website reviews</h2>
              <lable className="TextName" Order No>
                Order No.
              </lable>
              <Form.Control className="filltext" placeholder="Order No." />
              <lable className="TextName">Email</lable>
              <Form.Control
                className="filltext"
                placeholder="Ex: emailid@gmail.com"
              />
              <lable className="TextName">Rating</lable>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
                style={{ color: "#F2C94C;" }}
              />
              <span className="TextName">captcha</span>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextCaptcha"
              >
                <Form.Label column sm="2">
                  <img
                    className="imagecaptcha"
                    src="Assets/imagecaptcha.png"
                    alt=""
                  />
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="Enter Captcha"
                    placeholder="Enter Captcha"
                    className="Captcha"
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="TextName">Your Review</Form.Label>
                <span className="glyphicon .glyphicon-star-empty glyphicon-star-empty"></span>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="textarea"
                  placeholder="Comment"
                />
              </Form.Group>
              <Button className="submit">SUBMIT</Button>
            </Col>
            <div>
              <h3 className="fontbold">Customer Website Review Comments</h3>
              <strong>Comments</strong>
              <p>0 Comments.</p>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SubmitaReview;
