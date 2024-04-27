import React, {useState, useEffect} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import { CommonBreadCrumb } from '../CategoryPage'
import call_apis from '../../services/Apis'
import Moment from 'moment';


const Complaints = ({type}) => {
    var data = "";
    if(type == 'complaints'){
      data = [{ slug: "Manage Complaint", link: "", url: "" }];
    }else if(type == 'track'){
      data = [{ slug: "Track Your Complaint", link: "", url: "" }];
    }

    const [captchaCode, setCaptchaCode] = useState('');
    const [captchaImageSrc, setCaptchaImageSrc] = useState('');
    const [complaintno, setcomplaintno] = useState('');
    const [resultMsz, SetresultMsz] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [complaintData, setComplaintData] = useState({
      complaintno: "",
      captchadata: "",
    });
    const format = "DD-MM-YYYY"

    const generateCaptchaCode = () => {
      const characters = '0123456789';
      const codeLength = 5;
      let code = '';
  
      for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
      }

      setCaptchaCode(code);
      generateCaptchaImageSrc(code)
    };

    console.log("captchaCode", captchaCode)

    // Function to generate the CAPTCHA image source
    const generateCaptchaImageSrc = (code) => {
      console.log("captchaCode", captchaCode)
      // You can customize the image generation logic based on your requirements
      // For simplicity, we'll just use the CAPTCHA code as text
      const imageSrc = `https://place-hold.it/80x40/ebebeb/3a6b9e&text=${code}&bold&italic&fontsize=14`;
      setCaptchaImageSrc(imageSrc);
    };

    const handleChange = (event) => {
      setComplaintData((complaintData) => ({
        ...complaintData,
        [event.target.name]: event.target.value,
      }));
    }

    const getComplaintData = async() => {

      console.log("getComplaintData", complaintData)
      const errors = {};
      if (complaintData.complaintno === "") {
        errors.complaintno = "Complain Id is required";
      } 
      if (complaintData.captchadata === "") {
        errors.captchadata = "captcha is required";
      } else if(captchaCode !== complaintData.captchadata){
        errors.captchadata = "captcha doesn't match";
        generateCaptchaCode()
      }

      setFormErrors(errors)

      // console.log("errors", errors)
      // console.log("length", Object.keys(errors).length)
      // console.log("complaintData", complaintData)


      if(Object.keys(errors).length == 0 && captchaCode == complaintData.captchadata){
        const input_data = {
          cno: complaintData.complaintno
        }
        const resp = await call_apis.getComplaint(input_data);
        console.log("resp", resp)
        SetresultMsz(resp.data.data)

      }


      
    }

    console.log("complaintData", complaintData)

    useEffect(()=>{
      generateCaptchaCode()
    },[])

  return (
    <Container
      fluid
      className="maxWidthContainerFluid paddingContainerFluid ThanksOrder"
    >
    	<CommonBreadCrumb  data={data} />
      <Row>
        <Col xxl={8} xl={8} lg={8} md={8} sm={7} xs={12}>
          
					<div className="track-order cmplt">
						<h1 className="sin-page-title">{type == 'complaints' && 'Manage Complaint'} {type == 'track' && 'Track Your Complaint'} </h1>
            <div className='row'>
              <div className="col-md-6">
                {type == 'complaints' && 
                  <>
                    <h3><a href="/place-a-complaint" className="btn btn-danger myclass" style={{width: '100%'}}><strong>Place A Complaint</strong></a></h3>
                    <h3><a href="/track-your-complaints" className="btn btn-danger myclass" style={{width: '100%'}}><strong>Track A Complaint</strong></a></h3>
                  </>
                }
                {type == 'track' && 
                
                  <form className='track-complaint'>
                    <div className="mb-3">
                      <span className="con-subject">
                        <label>Complaint Reference Id </label>
                        <input type="text" name="complaintno" defaultValue=""
                        onChange={handleChange} placeholder="Complaint Reference No" id="complaintno"  title="Enter your Complain reference number to check current status" />
                      </span>
                      <p className="error px-3">
                      {formErrors.hasOwnProperty("complaintno")
                        ? formErrors.complaintno
                        : ""}
                      </p>
                    </div>
                    <div className="mb-3">
                      <span className="con-subject">
                        <img src={captchaImageSrc} className='mb-2' alt="CAPTCHA" /> 
                        {/* <button type="button" onClick={generateCaptchaCode}>Generate CAPTCHA</button> */}
                        
                        <input type="text" onChange={handleChange} name="captchadata" placeholder="Enter Captcha" id="" />
                      </span>
                      <p className="error px-3">
                      {formErrors.hasOwnProperty("captchadata")
                        ? formErrors.captchadata
                        : ""}
                      </p>
                    </div>
                    <h3><button type="button" className="btn btn-danger myclass trackComplaint" onClick={getComplaintData}><strong>Track A Complaint</strong></button></h3>

                  </form>
                }
                
              </div>
              <div className="col-md-6">
                {Object.keys(resultMsz).length > 0 && 
                <div id="results1">
                  <div style={{background: '#00a65a', padding: '2%', color: '#fff', fontFamily: '"Trebuchet MS", Arial, Helvetica, sans-serif', borderRadius: 5, fontSize: 13, width: '93%'}}>
                    <span>Hi, {resultMsz.name}</span><br/>
                    <span>Thank you for contacting OurShopee Support</span><br/>
                    
                    {resultMsz.msgType == 1 &&
                      <><span>Your complaint created on {Moment(resultMsz.date).format("DD, MMMM YYYY")}</span><br/></>
                    }
                    {resultMsz.msgType == 2 &&
                    <span>Your complaint reference number <b>{resultMsz.complaintId}</b> is in Progress.</span>
                    }
                    {resultMsz.msgType == 9 &&
                      <>
                        <span>Your complaint created on {Moment(resultMsz.date).format("DD, MMMM YYYY")}</span><br/>
                        <span>Your complain < b >{resultMsz.complaintId}</b > has been fixed on {Moment(resultMsz.done_date).format("YYYY-MM-DD, h:mm:ss")}.</span>
                      </>
                    }
                    {resultMsz.msgType == 8 &&
                      <>
                        <span>Your complaint created on {Moment(resultMsz.date).format("DD, MMMM YYYY")}</span><br/>
                        <span>Our Technical team is working on your reported issue.</span>
                      </>
                    }
                  </div>

                </div>
                }
              </div>
            </div>
						
          </div>
				</Col>
        <Col xxl={4} xl={4} lg={4} md={4} sm={5} xs={12}>
					<div className='flt-rit'><img src="Assets/refer.jpg" alt="ourshopee.com" /> </div>

				</Col>
      </Row>
    </Container>
  )
}

export default Complaints
