import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

const Big_bnrs = ({renderMobImg,renderImg}) => {
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });

  return (
    <Container className='maxWidthContainerFluid paddingContainerFluid' fluid>
        <Row className='Big_bnrs'>
          {isMobile ?
            <img  className='bnr_img' src={`/Assets/${renderMobImg}`} /> 
          :
            <img  className='bnr_img' src={`/Assets/${renderImg}`} />
          }
          
        </Row>
      </Container>
    
  )
}

export default Big_bnrs;
