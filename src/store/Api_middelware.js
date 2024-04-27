import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
  hasErrors: false,
  data: [],
  blogdata: {},

};

// creating slice with 2 actions
const apiSlice = createSlice({
  name: "call_Api",
  initialState,
  reducers: {
    api_success: (state, { payload }) => {
      if (payload.message === "Data fetched successfully.") {
        state.data = payload.data;
        state.hasErrors = false;
      }
      if (payload.message === "Blogs fetched Successfully") {
        state.blogdata = payload.data
        state.hasErrors = false
      }  
    },

    api_failure: (state) => {
      state.hasErrors = true;
    },
  },
});

export const { api_success, api_failure } = apiSlice.actions;

// A selectorr

export const apiSelector = (state) => state.apis;

// The reducer
export default apiSlice.reducer;

// Asynchronous thunk action with api
export function fetch_category_api() {
  return async (dispatch) => {
    axios
      .get("api/getcategorylist")
      .then((response) => {
        dispatch(api_success(response.data));
      })
      .catch((err) => {
        dispatch(api_failure());
      });
  };
}
export function fetch_blogs_api() {
  return async (dispatch) => {
    axios
      .get("api/blogs")
      .then((response) => {
        dispatch(api_success(response.data));
      })
      .catch((err) => {
        dispatch(api_failure());
      });
  };
}
