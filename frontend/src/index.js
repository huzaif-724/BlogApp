import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "./slices/authSlice";
import { BrowserRouter } from "react-router-dom";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
   <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </Provider>
);  
