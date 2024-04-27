import React from 'react'
import call_apis from '../services/Apis';



const UseOTPVarificationHook = () => {

	const varifyMobileNumber = async(input) => {
    const resp = await call_apis.checkMobileNumber(input);
      console.log("resp", resp)
      if(resp.status === 200){
        if(resp.data.status == 'success'){
          // setsuccessMpbile(true)
          // setshowmobileverifymsz(resp.data.message)
          // setPhoneVerify(true)
          // setMobileVarificationDone(true)
          // setValidMobilemsz(false)
        }else if(resp.data.status == "exits"){
          // setPhoneVerify(false)
          // setshowmobileverifymsz(resp.data.message)
        }
      }
  }

	const getResendOtp = async () => {
    //console.log("mobile", mobile)
    const input = {
      //mobile: mobile,
    };  
    //console.log("input",input)
    varifyMobileNumber(input)
   
  };

  return {
		varifyMobileNumber,
		getResendOtp
	}
}

export default UseOTPVarificationHook
