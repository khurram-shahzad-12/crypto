import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "../Home/Slider";
import styled from 'styled-components';


const WarrantyPage = () => {
  const banner = [
    {
      image_url: "/Assets/warranty_bnr.webp",
      mobile_image_url: "/Assets/warranty-mob.webp",
      id: "",
      url: "",
    },
  ];
  return (
    <Container className="maxWidthContainerFluid" fluid>
      <div className="WarrantyPage">
      <Row>
        <Col className="paddingContainerFluid">
          <Slider carouselList={banner} />
        </Col>
      </Row>
      
      <Row>
        <Col lg={12} sm={12} md={12}>
          <div className="warrantyterms-info">
              <h2> 1-Year Extended Warranty! </h2>
              <h4> Get complete Assistance for in warranty phone repairs with doorstep Pick- up & Drop for 1 year</h4>
              <p> <img src="Assets/stay-home.jpg" className="logoimg" alt="" /> </p>
              <h3 className="w-txt">  Stay at home get all your in warranty repairs done from the safety of your home. </h3> 
      
              <div className="termsofuse vip mt-5">
                  <h2>  Terms and Conditions  </h2>
                  <h4> EXCLUSIONS Of Extended Warranty </h4>
                  <p> Can Claim – Products/Appliance fails to operate, 
                    due to any sudden and unforeseen mechanical Or electrical breakdown after 
                    the expiry of manufacturer warranty or when Applicable.</p>
                  <h5>  The Company will not accept following on extended warranty program, </h5>
                  <ul style={{ listStyleType: "circle" }}>
                    <li>Any liability for damage caused by non-approved alterations or modifications to the manufacturer’s specification unless such alterations or modifications are approved by the Company in writing.</li>
                    <li>Any liability for any damage caused by war risks, sonic booms or nuclear radiation.</li>
                    <li>Any liability for losses which are covered under the appliance manufacturer’s warranty or similar guarantee.</li>
                    <li>Loss or damage caused by wear and tear or normal deterioration or any type of physical damage, fire & theft accidents which also deems the extended warranty program void.</li>
                    <li>Accessories used in or with the appliance unless covered under a separate extended warranty contract.</li>
                    <li>Routine maintenance, cleaning…etc.</li>
                    <li>Any defect caused as a result of improper usage, negligence, transit/transportation damage and willful misuse.</li>
                    <li>Loss or damage caused by extraneous perils such as explosion, flood, earthquake, sand or other natural calamities, voltage fluctuation and malicious damage.</li>
                    <li>Reception or transmission problems resulting from external causes/perils.</li>
                    <li>Data/hardware corruption arising due to computer virus infection.</li>
                    <li>The Serial Number/Model number of the appliance has been tampered with or removed. </li>
                    <li>Any defect caused by usage of wrong power supply, voltage, corrosion, rust or stains or any problem with supply of electricity.</li>
                    <li>Any appliance, which has been used for commercial or rental purposes.</li>
                    <li>Should necessary spare parts for repair be subject to import restrictions of a country resulting in delay in repairs, there will be no liability on the insurers arising out of such delay.</li>
                    <li>Appliances being recalled by the manufacturer.</li>
                    <li>Claims arising from the failure to follow manufacturer’s instructions.</li>
                    <li>Costs, if no fault is found in the appliance. i.e. In the event ourshopee does not determine any fault, or the fault is not within the scope of coverage thus the repair if any or logistics cost shall be borne by the Insured if Insured choses to repair.</li>
                    <li>Repairs carried out without prior approval from the insurer.</li>
                    <li>Unauthorized repairs performed by third parties.</li>
                    <li>Loss or damage to recording media, software or data, software defects or software generated problems.</li>
                    <li>Any loss or damage to a person or property, direct, consequential or incidental damages arising from the use of or inability to use the appliance.</li>
                    <li>Any appliance, which did not have manufacturer’s warranty at the time of purchase.</li>
                  </ul>
              </div>
              <div className="termsofuse vip">
                  <h4>  LIMITATION OF LIABILITY  </h4>
                  <ul style={{ listStyleType: "circle" }}>
                    <li>The total repair cost payable under this insurance shall not exceed the purchase price of the appliance, 
                      no limits on number of claims for extended warranty, however if there no issue found in the product then customer 
                      is bound to pay pickup and delivery charges.</li>
                    <li>If the costs of repairing the appliance including the spare parts and labor are more than or equal to the market 
                      price of the appliance covered by this insurance, then The Company is entitled to consider the appliance as total 
                      loss and compensate the Insured with a similar unit (new/used) after deducting the depreciation rate.</li>
                    <li>In the event of the appliance being transferred to someone else, this insurance can be assigned to the new owner, 
                      provided the insurers are advised in writing as to the details of the new owner, and subject to the terms and 
                      conditions of the Insurance.</li>
                    <li>If the Insured makes a claim, knowing it to be false and/or fraudulent as regards the value or the amount of 
                      work or otherwise, this Policy is deemed to be cancelled from inception without return of Contribution paid 
                      and the Insured must return all claim payments received till such cancellation.</li>
                  </ul>
              </div>
              <div className="termsofuse vip">
                  <h4>  HOW TO MAKE A CLAIM  </h4>
                  <ul style={{ listStyleType: "circle" }}>
                    <li>Insured to file a claim by sending an email to customerservice@ourshopee.com along with item purchase invoice and 
                      policy certificate. Also by registering a complaint on https://www.ourshopee.com/complaints/.</li>
                    <li>Ourshopee service center will initially validate the warranty date and send courier to collect the item or dispatch for onsite repair (for major appliances).</li>
                    <li>Ourshopee service center will inspect and confirm item eligibility for under warranty repair.</li>
                    <li>Ourshopee service center to return the item to customer after necessary repairs are done.</li>
                    <li>Insured to keep a copy of the original purchase receipt & policy certificate.</li>
                    <li>The cost of dismantling the appliance will be covered only in the event of a valid claim.</li>
                    <li>Claims will be paid based on the id proof of the insured.</li>
                    <li>Any labor/parts cost for repair beyond the scope of this policy have to be borne by the Insured.</li>
                  </ul>
              </div>
              <div className="termsofuse vip">
                  <h4>  Service Duration  </h4>
                  <p> All services will be completed within 10-15 days, if for any uncertain situation the service 
                    period is extended than customer will be informed accordingly by our warranty claim team.</p>
              </div>
          </div>
        </Col>
      </Row>

      <br/> <br/>

    </div>
    </Container>
  );
};

export default WarrantyPage;
