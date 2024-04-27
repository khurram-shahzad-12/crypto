import React, { Fragment,useEffect } from "react";
import { Modal} from "react-bootstrap";

const CryptoModal = ({ showCryptoModal, setShowCryptoModal, cryptoUrl, setCryptoUrl, Setdisabled }) => {
  const handleClose = () => {
    setShowCryptoModal(false);
    setCryptoUrl("");
    Setdisabled(false);
  };

  useEffect(() => {
    const handleMessage = (e) => {
      const iframe = document.getElementById('triplea-payment-form');
      if (typeof e.data === 'string' && e.data.indexOf('|') > 0) {
        const res = e.data.split('|');
        console.log(res[1])
        if (iframe && res[0] === 'triplea.frameResized') {
          iframe.style.height = `${res[1]}`;
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (

    <Fragment>
      <Modal show={showCryptoModal} onHide={handleClose} className="cripto-modal">

        <Modal.Header closeButton
        style={{
          width: "350px",
          margin:"auto"
          

        }}
        >
          <Modal.Title>
            <h4> Triple-A Payment Form </h4>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body >
        <iframe
        id="triplea-payment-form"
        src={cryptoUrl}
        style={{ 
          width: 350, 
          height: 600, 
          border: "0",
          scrolling : "no"
         }}
        title="Triple-A Payment Form"
      >
      </iframe>
        </Modal.Body>

      </Modal>
    
      </Fragment>

  )

}
export default CryptoModal;

