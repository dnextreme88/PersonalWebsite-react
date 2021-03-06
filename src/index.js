/* Core */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
/* Redux */
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/Auth'
import modalReducer from './features/Modal'
/* MISC */
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css' /* Required for Bootstrap functionality */

const store = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalReducer,
    },
})

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)