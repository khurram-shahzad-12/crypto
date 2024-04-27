import { combineReducers } from "redux";

import apiReducer from "./Api_middelware";

const initialState = {
  api_status: true,
};

const api_state = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const initialState1 = {
  menuShow: false,
};

const menu_state = (state = initialState1, { type, ...rest }) => {
  switch (type) {
    case "Open":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const initialState2 = {
  show_list: false,
};

const search_result_list = (state = initialState2, { type, ...rest }) => {
  switch (type) {
    case "show_list":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const initialState3 = {
  openModal: false,
};

const modal_state = (state = initialState3, { type, ...rest }) => {
  switch (type) {
    case "open_modal":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const initialStat5 = {
  addressModal: false,
};

const address_model = (state = initialStat5, { type, ...rest }) => {
  switch (type) {
    case "address_modal":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const initialState4 = {
  renderComponent: "",
};

const login_state = (state = initialState4, { type, ...rest }) => {
  switch (type) {
    case "login":
      return { ...state, ...rest };
    case "signup":
      return { ...state, ...rest };
    case "address":
      return { ...state, ...rest };
    case "forgotPassword":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  apis: apiReducer,
  call_api: api_state,
  hamburger: menu_state,
  search_result_list: search_result_list,
  modalShow: modal_state,
  addressShow: address_model,
  component: login_state,
});

export default rootReducer;
