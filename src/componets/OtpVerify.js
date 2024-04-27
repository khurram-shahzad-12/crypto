import React,{useState, useEffect} from 'react'
import { Modal, Row, Col } from "react-bootstrap";
import OtpInput from "react18-input-otp";
import axios from "axios";
import Cookies from "universal-cookie";
import call_apis from "../services/Apis";
import { FcTouchscreenSmartphone } from 'react-icons/fc';
import { RiWhatsappFill } from 'react-icons/ri';


const OtpVerify = ({phoneVerify, setPhoneVerify,setSuccessMpbile, handleClose, prephone, phone, getResendOtp,getResendOtpWhatsapp, type, setOtpVarify, otpVarify,otpcheck}) => {

    const [otp, setOtp] = useState("");
    const cookies = new Cookies();
    const token = cookies.get("jwt_token");
    const [msz, setMsz] = useState("");
    const [resendotp, SetResendotp] = useState(true);

    //otp timer';
    const [timer, setTimer] = useState(20);
    const [timerActive, setTimerActive] = useState(true);

    useEffect(() => {
      let interval;
  
      if (timerActive && timer > 0) {
        interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      }

      if (timer === 0) {
        setTimerActive(false);
      }

      return () => clearInterval(interval);
  
    }, [timerActive, timer]);

    const handleStartTimer = () => {
      getResendOtp();
      setTimer(20); // Reset the timer to the initial value
      setTimerActive(true); 
    };

    const handleStartTimerWtsap = () => {
      getResendOtpWhatsapp();
      
      setTimer(20); // Reset the timer to the initial value
      setTimerActive(true); 
    };

    //end otp timer;

    //Tool tip;
    const CustomTooltip = ({ children, tooltipText }) => {
      return (
        <div className="custom-tooltip">
          <span className="tooltip-text">{tooltipText}</span>
          {children}
        </div>
      );
    };
    //End Tool tip;

    const handleOtp = (enteredOtp) => {
      setOtp(enteredOtp);
    };


    const validateOTP = async () => {

      

      const input = {
        otp: otp,
      };

      const inputdata = {
        "mobile": prephone+phone,
        "otp":  otp
      }
      console.log(inputdata)

      if(type != ''){
        axios
        .post("/api/verifyMobileOtp", 
        inputdata, 
        {
          headers: {
            Authorization: "Barear " + token,
          },
        })
        .then((response) => {
          if(response.status === 200){
            console.log(response)
            if(response.data.status == 'invalid'){
              const responsemsg=response.data.message;
              setMsz(responsemsg);
              setOtpVarify(false);
            }else if(response.data.status == 'success'){
              setMsz(response.data.message);
              handleClose();
              setPhoneVerify(false)
              setSuccessMpbile(true);

              setOtpVarify(true)
            }
          }else{throw new Error('Failed to fetch')}
          
        })
        .catch((err) => {
          console.log(err)
          if (err.response && err.response.data && err.response.data.message) {
            setMsz(err.response.data.message);
          } else {
            // If no response received, handle generic error
            setMsz("Network error, try again please");
          }
        
        });

      }else{
        axios
        .post("/api/verifyMobileOtp", 
        inputdata)
        .then((response) => {
          console.log("otp",response)
          if(response.status === 200){
            if(response.data.status == 'invalid'){
              setMsz(response.data.message);
              setOtpVarify(false)
            }else if(response.data.status == 'success'){
              console.log("setotpVarify", otpVarify)
              setMsz(response.data.message);
              handleClose();
              setPhoneVerify(false)
              setOtpVarify(true)
            }
            
          }
        })
        .catch((err) => {
          setMsz(err.response.data.data || "network error, try again please");
        });
      }

      
    };
    
    


    useEffect(()=>{
      const interval = setInterval(function () {
        SetResendotp(true)
      }, 20000)
      
      return function ()  {
          clearTimeout(interval)
      }
    },[])

    
  return (
    <div>
       <Modal show={phoneVerify} onHide={handleClose} className="model-b">
          <Modal.Header closeButton>
            <Modal.Title>Verify Phone Number</Modal.Title>
          </Modal.Header>
          <Modal.Body className="">
            <div className="text">
              Please verify your mobile number to continue
            </div>
            <div className="des">
              To proceed to checkout, use the OTP & verify your mobile number.
              <br />
              We`ve sent the OTP to +971- {prephone}{phone}
              <br />
              {otpcheck === "continue" ? "" : "Change Number?"}
              <button type='button' className="clickHere" onClick={handleClose} >{otpcheck === "continue"?"":"Click here"}</button> 
            </div>
            <div className="otpbox mt-2">
              <OtpInput
                value={otp}
                shouldAutoFocus
                onChange={handleOtp}
                numInputs={4}
                separator={<span>&nbsp;&nbsp;&nbsp;</span>}
                className="otpinputBox"
                isInputNum={true}
              />
            </div>
            <p className="text-danger mt-2 text-center">{msz}</p>

            
            {timerActive ? (
              <p className='otp_timer'> Resend OTP in <span> {timer} </span> Seconds</p>
            ) : (
              <p className='otp_timer' style={{display: 'none'}}> </p>
            )}

          </Modal.Body>
          <Modal.Footer style={{display: 'block', textAlign: 'center'}}>
            <button className="greenbox" id="submit" onClick={validateOTP} >
            Submit & Verify Phone
            </button>
            
            <br/>

            {resendotp && (
              timerActive ? (
                <CustomTooltip tooltipText="Please wait until the timer finishes.">
                  <button
                    className="resendLink ph-txt"
                    id="submit"
                    onClick={handleStartTimer} 
                    disabled={timerActive}
                    style={{ opacity: timerActive ? 0.6 : 1, cursor: timerActive ? 'not-allowed' : 'pointer' }} 
                  >
                    <FcTouchscreenSmartphone /> Resend OTP via SMS 
                  </button>
                  </CustomTooltip>
                ) : (
         
                <button
                      className="resendLink ph-txt"
                      id="submit"
                      onClick={handleStartTimer}
                      disabled={timerActive}
                    >
                      <FcTouchscreenSmartphone /> Resend OTP via SMS
                    </button>
                  )
                )}

              {resendotp && (
                  timerActive ? (
                    <CustomTooltip tooltipText="Please wait until the timer finishes.">
                      <button
                        className="resendLink ph-whts"
                        id="submit"
                        onClick={handleStartTimerWtsap} 
                        disabled={timerActive}
                        style={{ opacity: timerActive ? 0.6 : 1, cursor: timerActive ? 'not-allowed' : 'pointer' }}
                        title={timerActive ? "Please wait until the timer finishes." : ""}
                      >
                        <RiWhatsappFill /> Resend OTP via WhatsApp
                      </button>
                      </CustomTooltip>
                    ) : (
            
                      <button
                          className="resendLink ph-whts"
                          id="submit"
                          onClick={handleStartTimerWtsap} 
                          disabled={timerActive}
                          style={{ opacity: timerActive ? 0.6 : 1, cursor: timerActive ? 'not-allowed' : 'pointer' }}
                          title={timerActive ? "Please wait until the timer finishes." : ""}
                        >
                          <RiWhatsappFill /> Resend OTP via WhatsApp
                        </button>
                      )
                    )}      
            
          </Modal.Footer> 
        </Modal>
    </div>
  )
}

export default OtpVerify
