import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css'; /* Required for Bootstrap functionality */
import authReducer from "./features/Auth";
import modalReducer from "./features/Modal";

const store = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalReducer,
    },
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
