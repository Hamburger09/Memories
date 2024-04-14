import ReactDOM from "react-dom/client";

import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import reducers from "./reducers";

// router
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import "./index.scss";

import {GoogleOAuthProvider} from '@react-oauth/google'

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="733987035812-e94fc6me1u9mteucjblmung78a1g0na0.apps.googleusercontent.com" >
      <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
  </Provider>
);
