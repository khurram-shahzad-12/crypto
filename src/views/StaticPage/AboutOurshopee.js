import React from "react";
import { Col, Row } from "react-bootstrap";
import {FaBinoculars} from "react-icons/fa";
import {FaBullseye} from "react-icons/fa";
import styled from 'styled-components';
import {BiCircle} from "react-icons/bi";

const NestedColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubColumn = styled.div`
  flex: 1;
  padding: 10px;
  background-color: #d0d0d0;
  margin: 5px;
`;

const AboutOurshopee = () => {
  return (
    <div className="AboutOurshopee">
      <Row>
        <Col md={12}>
          <img className="singleimg" src="Assets/OurStory-1.jpg" alt="" />
        </Col>
      </Row>
      <Row>
        <Col lg={12} sm={12} md={12}>
          <div className="titlemainparagraph">
              <h2> Welcome to Ourshopee.com - Where Shopping Dreams Come True! </h2>
              <p>
                Since our inception in 2015, Ourshopee.com has blossomed into one of the leading and fastest-growing online shopping
                platforms, capturing hearts across the UAE, Oman, Qatar, Kuwait, Bahrain, and KSA. As pioneers in the e-commerce realm, we
                take pride in being one of the oldest and most trusted names in the industry.
              </p>
              <p>
                At Ourshopee.com, we curate a captivating collection of top-quality products, carefully handpicked to cater to your every
                desire. From the latest electronics that spark innovation to the trendiest fashion that sets new standards, we have something
                for everyone, all within the comfort of your fingertips.
              </p>
              <p>
                Our commitment to excellence is unwavering, and our user-friendly interface ensures a seamless and enjoyable shopping
                experience. Feel secure with our range of trusted payment options and embrace the excitement of swift and reliable
                deliveries right to your doorstep.
              </p>
              <p>
                Join the millions of satisfied customers who have embarked on an extraordinary journey with Ourshopee.com. Discover the
                joy of shopping with us, where convenience meets trust, and let your shopping dreams soar. Begin your delightful retail
                adventure today - Happy shopping!
              </p>
          </div>
        </Col>
      </Row>
      <Row className="vision-mission">
        <Col lg={6} md={12}>
            <Row>
                <Col lg={2} md={3}>
                  <div className="vision-img">
                    <FaBinoculars style={{ fontSize:'3em', color:'white' }} />
                  </div>
                </Col>
                <Col lg={10} md={9}>
                  <div>
                    <h3 className="titleOnline"> VISION </h3>
                    <p className="paragraphbig">
                      Our vision is to become a globally trusted e-commerce platform where customer
                      needs are fulfilled
                    </p>
                  </div>
                </Col>
            </Row>
        </Col>
      
        <Col lg={6} md={12}>
          <Row>
                <Col lg={2} md={3}>
                  <div className="vision-img">
                    <FaBullseye style={{ fontSize:'3em', color:'white' }} />
                  </div>
                </Col>
                <Col lg={10} md={9}>
                  <div>
                    <h3 className="titleOnline"> MISSION </h3>
                    <p className="paragraphbig">
                    Our mission is to ensure customer satisfaction through faster delivery of 
                    genuine products at competitive prices & round the clock services
                    </p>
                  </div>
                </Col>
            </Row>
        </Col>
      </Row>
      
      <Row className="factor-inspire">
        <Col lg={4} md={4}>
          <img className="singleimg" src="Assets/Ourshopee-inspire.jpg" alt="Ourshopee Inspire" />
        </Col>
      
        <Col lg={8} md={6} className="mt-5">
          <Row>
              <Col lg={6} md={12} as={NestedColumn}>
                <SubColumn className="sub-clm">
                  <Row>
                    <Col lg={1} md={1}>
                      <BiCircle style={{ fontSize:'1em', color:'white' }}/>
                    </Col>
                    <Col lg={11} md={10}>
                      <h4 className="titleinspire"> QUICK MARKET ACQUISITION </h4>
                      <p className="paragraphbig">
                      Since its birth in UAE 6 years ago, the brand has penetrated Oman, Qatar, Bahrain & Kuwait.
                      Every market is served by a localized app
                      </p>
                    </Col>
                  </Row>
                </SubColumn>
                <SubColumn className="sub-clm">
                  <Row>
                    <Col lg={1} md={1}>
                      <BiCircle style={{ fontSize:'1em', color:'white' }}/>
                    </Col>
                    <Col lg={11} md={10}>
                      <h4 className="titleinspire"> BNPL SUPPORT </h4>
                      <p className="paragraphbig">
                      BNPL is a tech-enabled payment system where "Buy Now Pay later" is the key and, that too
                      comes with zero interest or cost
                      </p>
                    </Col>
                  </Row>
                </SubColumn>
              </Col>

              <Col lg={6} md={12} as={NestedColumn}>
              <SubColumn className="sub-clm">
                  <Row>
                      <Col lg={1} md={1}>
                        <BiCircle style={{ fontSize:'1em', color:'white' }}/>
                      </Col>
                      <Col lg={11} md={10}>
                        <h4 className="titleinspire"> E-FULFILLMENT CENTERS </h4>
                        <p className="paragraphbig">
                        Ourshopee will directly control inventory & logistic management to ensure maximum efficiency
                        </p>
                      </Col>
                  </Row>
                </SubColumn>
                
                <SubColumn className="sub-clm">
                  <Row>
                      <Col lg={1} md={1}>
                        <BiCircle style={{ fontSize:'1em', color:'white' }}/>
                      </Col>
                      <Col lg={11} md={10}>
                        <h4 className="titleinspire"> TRUSTED ANCILLARY BUSINESSES </h4>
                        <p className="paragraphbig">
                        Branding out product centered ventures such as Elony Electronics
                        </p>
                      </Col>
                  </Row>
                </SubColumn>
              </Col>
          </Row>
        
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <img className="fullimg" src="Assets/Ourshopee-countries.jpg" alt="Ourshopee-countries" />
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <img className="fullimg" src="Assets/Ourshopee-group.jpg" alt="Ourshopee Family" />
        </Col>
      </Row>
      
      
      <Row className="integrity">
        <Col lg={12} md={12}>
          <SubColumn className="sub-clm">
              <Row>
                  <Col lg={2} md={3}>
                    <button className="btn-inter"> INTEGRITY </button>
                  </Col>
                  <Col lg={10} md={9}>
                    <p className="paragraphbig">
                      We strive to do what is right and do what we say we will do.
                    </p>
                  </Col>
              </Row>
          </SubColumn>
          <SubColumn className="sub-clm">
              <Row>
                  <Col lg={2} md={3}>
                    <button className="btn-Inclusion"> Inclusion </button>
                  </Col>
                  <Col lg={10} md={9}>
                    <p className="paragraphbig">
                      We value the uniqueness in everyone, respect differences, and foster a sense of belonging
                    </p>
                  </Col>
              </Row>
          </SubColumn>
          <SubColumn className="sub-clm">
              <Row>
                  <Col lg={2} md={3}>
                    <button className="btn-Audacity"> Audacity </button>
                  </Col>
                  <Col lg={10} md={9}>
                    <p className="paragraphbig">
                      We think big and take bold bets. We change the paradigm.
                    </p>
                  </Col>
              </Row>
          </SubColumn>
          <SubColumn className="sub-clm">
              <Row>
                  <Col lg={2} md={3}>
                    <button className="btn-bias"> Bias for Action </button>
                  </Col>
                  <Col lg={10} md={9}>
                    <p className="paragraphbig">
                       We have a strong sense of urgency to solve problems strategically
                    </p>
                  </Col>
              </Row>
          </SubColumn>
          <SubColumn className="sub-clm">
              <Row>
                  <Col lg={2} md={3}>
                    <button className="btn-customer"> Customer first </button>
                  </Col>
                  <Col lg={10} md={9}>
                    <p className="paragraphbig">
                       We look at the world from our customers point of view
                    </p>
                  </Col>
              </Row>
          </SubColumn>
        </Col>
    </Row>

      <Row className="ourshopee-profile">
          <Col lg={2} md={3}>
              <img className="fullimg" src="Assets/Ourshopee-chairman.png" alt="Ourshopee" />
          </Col>
          <Col lg={6} md={9} className="mt-4"> 
            <h3 className="titlechairman"> DR. SHANITH MANGALAT </h3>
            <h5> Founder & Chairman </h5>
            <p className="paragraphbig"> Dr. Shanith Mangalat is Chairman of DRS holding based in UAE, with Investments
              in more than 29 operating companies with aggregate annual revenues of more
              than USD 100 Million. He chairs the boards of several group operating
              companies, including ourshopee online store, hnc healthcare group, Ruky
              Perfumes, Medco pharmaceutical distributors. The DRS holding companies
              include 29 private listed corporates </p>
            <p className="paragraphbig"> Dr.Shanith Mangalat is an MBBS Graduate from Yenepoya University, Mangalore,
              and specialist studies in Family Medicine/ Doctorate of Medicine and Post
              Graduated in Diabetology from India’s prestigious Apollo hospitals, Hyderabad.
              His business leadership has been recognized by several corporate &
              community organizations and he has received numerous awards, including </p>
          </Col>
          <Col lg={4} md={12} className="mt-4">
              <img className="fullimg" src="Assets/global.png" alt="Ourshopee" />
          </Col>
      </Row>

      <br/> <br/>

    </div>
  );
};

export default AboutOurshopee;
