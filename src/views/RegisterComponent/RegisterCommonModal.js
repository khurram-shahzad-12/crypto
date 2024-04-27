import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import CommonRegisterCard from "./CommonRegisterCard";
import { useTranslation } from "react-i18next";

const RegisterCommonModal = () => {
  const { t } = useTranslation();

  const showModal = useSelector((state) => state.modalShow.openModal);

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch({ type: "open_modal", openModal: false });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <Modal show={showModal} id="signinModal" centered>
        <Modal.Header className="border-bottom-0">
          <img
            src="/Assets/signupLogo.svg"
            className=""
            alt=""
            style={{ position: "absolute", left: "34%" }}
          />
          <RxCross2 className="closeModal" onClick={closeModal} />
        </Modal.Header>
        <Modal.Body>
          <CommonRegisterCard />
        </Modal.Body>
        <Modal.Footer className="justify-content-center border-top-0 p-0">
          <div className="registerFooter">
            <p className="ourshop_com">Copyright {currentYear} {t("footer.copyright")} </p>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterCommonModal;
