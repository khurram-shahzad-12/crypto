import React from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import AboutOurshopee from "./AboutOurshopee";
import SiteMap from "./SiteMap";
import PrivacyPloicy from "./PrivacyPloicy";
import WarrantyReturnPolicy from "./WarrantyReturnPolicy";
import TermsandConditions from "./TermsandConditions";
import SubmitaReview from "./SubmitaReview ";
import ContactUs from "./ContactUs";
import SellWithUs from "./SellWithUs";
import FAQs from "./FAQs";
import OurBlog from "./OurBlog";
import CommonBreadCrumb from "../../componets/CommonBreadCrumb";

const StaticPage = () => {
  const { slug, slug2 } = useParams();
  
  const path  = window.location.pathname;
  const patharray = path.split("/");
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

  var title = "";
  if (slug === "about-ourshopee") {
    title = "About Us";
  } else if (slug === "sitemap") {
    title = "sitemap";
  } else if (slug === "customer-reviews") {
    title = "Submit a Review";
  } else if (slug === "privacy-policy") {
    title = "Privacy Ploicy";
  } else if (slug === "terms-and-conditions") {
    title = "Terms and Conditions";
  } else if (slug === "return-policy") {
    title = "Warranty & Return Policy";
  } else if (slug === "blogs") {
    title = "Blog";
  } else if (slug === "contact-us") {
    title = "Contact Us";
  } else if (slug === "faqs") {
    title = "FREQUENTLY ASKED QUESTIONS (FAQ)";
  } else if (slug === "sell-with-us") {
    title = "Sell With Us";
  }

  const totalbread = [
    {
      slug: patharray[1],
      url: "",
      link: ""
    },
    {
      slug: patharray[2],
      url: "",
      link: ""
    },
  ];

  const breadData = [{ slug: title, link: "", url: "" }];
  return (
    <>
      <Container className=" AboutOurshopee maxWidthContainerFluid" fluid>
        {title && (
          <>
            <Row className="breadCrumbRow">
              <Col>
                <CommonBreadCrumb  data={patharray[2] != "" ? totalbread : breadData} />
              </Col>
            </Row>
            <Row>
              <Col>
              {title !== "Blog" && 
                <h1 className="aboutuscenter">{title}</h1>
              }
              </Col>
            </Row>
          </>
        )}

        <div
          style={{
            paddingBottom: `${isMobile ? "67px" : "8px"}`,
          }}
        >
          {slug === "about-ourshopee" && <AboutOurshopee />}
          {slug === "sitemap" && <SiteMap />}
          {slug === "privacy-policy" && <PrivacyPloicy />}
          {slug === "return-policy" && <WarrantyReturnPolicy />}
          {slug === "terms-and-conditions" && <TermsandConditions />}
          {slug === "customer-reviews" && <SubmitaReview />}
          {slug === "blogs" && <OurBlog />}
          {path == "/blogs/:slug" && <OurBlog />}
          {slug === "contact-us" && <ContactUs />}
          {slug === "sell-with-us" && <SellWithUs />}
          {slug === "faqs" && <FAQs />}
        </div>
      </Container>
    </>
  );
};

export default StaticPage;
