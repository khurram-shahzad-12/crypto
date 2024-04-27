import React,{useState} from 'react'
import {Button, Form, Row} from 'react-bootstrap'
import call_apis from '../../services/Apis'


const ForgetPassword = () => {
	
	const [email, SetEmail] = useState("");
	console.log(email)
	
	const ForgotSubmit = async() =>{
		
		console.log("email", email)

		const forgetEamil = await call_apis.forgetPassword(email);
		console.log(forgetEamil)

		

	}

  
  return (
		<>
			<Row>
				<div className="title">Reset Password</div>
				<div className="subHeading">
					Please fill the form to get your password
				</div>
				<Form className="forgotForm" >
					<Form.Group className="mb-3"  >
						<input style={{ width: '100%', height: '32px' }} placeholder="Email" type='email' required value={email} onChange={(e)=>SetEmail(e.target.value)}/>
					</Form.Group>
					<Button className="logInBtn w-100" onClick={() => ForgotSubmit(email)}>
						Send Reset Email
					</Button>
				</Form>
			</Row>
			
		</>
  )
}

export default ForgetPassword
