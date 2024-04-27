import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./index";

export default function store() {
  return configureStore({
    reducer: rootReducer,
  });
}
