import { useDispatch } from "react-redux";

const ModalCommonHook = () => {
  const dispatch = useDispatch();

  const showModal = (type) => {
    if (type === "login" || type === "signup") {
      dispatch({ type: "open_modal", openModal: true });
    } else if (type === "address") {
      dispatch({ type: "address_modal", addressModal: true });
    }
    if (type === "login") {
      dispatch({ type: "login", renderComponent: "login" });
    }
    if (type === "signup") {
      dispatch({ type: "signup", renderComponent: "signup" });
    }
    if (type === "address") {
      dispatch({ type: "address", renderComponent: "address" });
    }
    if (type === "forgotPassword") {
      dispatch({ type: "forgotPassword", renderComponent: "forgotPassword" });
    }
  };

  return {
    showModal,
  };
};

export default ModalCommonHook;
