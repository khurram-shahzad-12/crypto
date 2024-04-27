import React, {useState} from 'react'
import {Container, Row} from 'react-bootstrap'
import { CommonBreadCrumb } from '../CategoryPage'
import call_apis from '../../services/Apis'


const PlaceComplaint = () => {
    const data = [{ slug: "Place Your Complaint", link: "", url: "" }];
		const [formErrors, setFormErrors] = useState({});
		const [complaint, SetComplaint] = useState({
			invoice: "",
			mobile: "",
			email: "",
			comment: "",
		});

		const validate = () => {
			const errors = {};
			const regexName = /^[a-zA-Z ,.'-]+$/i;
			const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
			const regexmobile = /^(\+\d{1,3}[- ]?)?\d{9}$/;

			if (complaint.invoice === "") {
				errors.invoice = "Order no is required";
			} 

			if (complaint.mobile === "") {
				errors.mobile = "Mobile no is required";
			} else if (!regexmobile.test(complaint.mobile)) {
				errors.mobile = "This is not a valid mobile format";
			}else if(complaint.mobile.length != 9){
				errors.mobile = "Mobile no should be 9 digit";
			}

			if (complaint.email === "") {
				errors.email = "Email is required";
			} else if (!regexEmail.test(complaint.email)){
				errors.email = "This is not a valid email format";
			}

			if (complaint.comment === "") {
				errors.comment = "Comment is required";
			} 

			return errors;
		};

		const handleChange = (event, i) => {
			SetComplaint((complaint) => ({
				...complaint,
				[event.target.name]: event.target.value,
			}));
		};

		const handleSubmit = async () => {
			console.log("handleSubmit",complaint)
			setFormErrors(validate(complaint));
			const resp = await call_apis.saveComplaints(complaint);
			if (resp.status === 200) {
				
			}
		};

    return (
        <Container fluid className="maxWidthContainerFluid paddingContainerFluid placeComplaint">
            <CommonBreadCrumb  data={data} />
            <Row className='contact-wrapper'>
							<div className="col-sm-12">
								<p style={{fontWeight: '600' }}>Register Your Complaints here..Our Customer Care Executive will get back to you soon.. Thank you</p>
							</div>
							<div className="col-md-3 col-sm-12"> 
								<span style={{marginLeft: '230px'}}>
									<div className="helpline d-flex justify-content-center">
										<img src="Assets/blue_question_mark.png" alt="ourshopee.com" />
									</div> 
								</span> 
								<span style={{marginTop: '25px'}}> 
									<img src="Assets/register.webp" alt="ourshopee.com" /> 
								</span> 
							</div>
							<div className="col-sm-12 col-md-6 no-padding-right" style={{backgroundColor: '#FFFFFF'}}>
									<form className="contact-form" method="post" id="complaint_form" name="complaint_form">
									<span className="con-subject">
										<label>Order No.</label><br />
										<input type="text" name="invoice" id="invoice"  placeholder="Order No" style={{background: 'none', border: '1px solid #027af9'}} onChange={handleChange} />
										<p className="error">
                      {formErrors.hasOwnProperty("invoice")
                        ? formErrors.invoice
                        : ""}
                    </p>
									</span> 
									<span className="con-subject">
										<label>Contact No.</label><br />
										<input type="text" defaultValue={+971} disabled readOnly style={{width: '30%', background: '#dddddd', border: '1px solid #027af9', marginRight: '5px'}} /> 
										<input type="text" name="mobile" id="mobile" placeholder="Contact No" className="input1" maxLength={10} style={{width: '69%', background: 'none', border: '1px solid #027af9'}} onChange={handleChange} />
										<p className="error">
                      {formErrors.hasOwnProperty("mobile")
                        ? formErrors.mobile
                        : ""}
                    </p>
									</span>
									<div id="smsresult" style={{color: '#FF0000'}} />
									<span className="con-subject">
										<label>Email</label><br />
										<input type="email" name="email" id="email" placeholder="Email Address" style={{background: 'none', border: '1px solid #027af9'}} onChange={handleChange} />
										<p className="error">
                      {formErrors.hasOwnProperty("email")
                        ? formErrors.email
                        : ""}
                    </p>
									</span> 
									<span className="con-subject">
										<label>Comments</label><br />
										<textarea placeholder="Comment" name="comment" id="comment"  cols={12} rows={6} style={{background: 'none', border: '1px solid #027af9'}} defaultValue={""} onChange={handleChange} />
										<p className="error">
                      {formErrors.hasOwnProperty("comment")
                        ? formErrors.comment
                        : ""}
                    </p>
									</span>
									<input type="button" defaultValue="Submit" className="button-link pull-right submitButton"  id="btnsave" onClick={() => handleSubmit()} />
								</form>
								<div className="col-sm-12 col-sm-9"> <img src="Assets/loading1.gif" id="image1" style={{display: 'none', border: 'none'}} alt="ourshopee.com" />
									<div id="results1" /></div>
							</div>
            </Row>
        </Container>
    )
}

export default PlaceComplaint
