import React from 'react'
import {Container, Row, Col, Card, Form} from 'react-bootstrap'

const TrackMyOrder = () => {
  return (
    <Container className="maxWidthContainerFluid excitingSection paddingContainerFluid" fluid>
      <Row className='trackMyorderSection'>
				<Col md={2} lg={2}></Col>
        <Col md={8} lg={8}>
					<div className='track-order-section'>
						<div className='my-orders'>
							<div className='track-title'> Track Your Order </div>
							<Card className='mb-4 track-order-card'>
								<Card.Body>
									<Form>
										<div className="row mb-4">
											<div className="form-group col-md-12">
												<input type="text"
													placeholder="Order Id*"
													name="order_id" className='trackinput '
												/>
											</div>
										</div>
										<div className='row mb-4'>
											<div className='col-md-12'>
												<div className='form-row-first'>
													<span className='w-25'>
														<input type="text" placeholder="+971" id="code" name="code" disabled="" className='trackinput' />
													</span>
													<span className="w-25">
														<select name="pre" id="pre" className='trackinput'>
															<option value="50">50</option>
															<option value="52">52 </option>
															<option value="52">54 </option>
															<option value="55">55 </option>
															<option value="56">56 </option>
															<option value="58">58</option>
														</select>
													</span>
													<span className="w-50">
														<input type="text" placeholder="Phone" name="mobile" maxlength="7" pattern="[0-9]*" className='trackinput' />
													</span>
												</div>
											</div>

										</div>
										<center><b>OR</b></center>
										<div className='row mb-4'>
											<div className="col-md-12">
												<input type="text"
													placeholder="Reference Id*"
													name="Referencid" className='trackinput '
												/>
											</div>
										</div>
										<div className='row mb-4'>
											<div className="col-md-12">
												<input type="submit" id="sbt_button" value="Search Status"
													 className=' button-link'
												/>
											</div>
										</div>
										<div className='row'>
											<div className="col-md-12">
												<img src="/Assets/delivery-track.gif" alt="track" className='delivery-track'/>
											</div>
										</div>
										
									</Form>
								</Card.Body>
							</Card>
						</div>
					</div>
        </Col>
				<Col md={2} lg={2}></Col>
      </Row>
    </Container>
  )
}

export default TrackMyOrder
