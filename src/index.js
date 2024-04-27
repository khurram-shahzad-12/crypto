import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import "./index.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store()}>
      <App />
    </Provider>
  </>
);


reportWebVitals();
