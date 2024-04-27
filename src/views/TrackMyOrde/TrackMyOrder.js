import React from "react"
import {Container, Card, Row, Col} from 'react-bootstrap'

const TrackMyOrder = () => {
  return(

    <Container className=" MyAccount maxWidthContainerFluid" fluid>
      <Row>
        <Col>
        <Card>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            
          </Card.Body>
        </Card>
        </Col>
      </Row>
      
    </Container>
  );
}

export default TrackMyOrder;