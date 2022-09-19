import React from "react";
import { ToastContainer } from "react-toastify";
import ReactDOM from "react-dom/client";
import "./globalCss.css";
import App from "./App";
import { store } from "./redux/app/store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { GloblaStyle } from "./GlobalStyle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
      <GloblaStyle />
    </Provider>
  </React.StrictMode>
);
