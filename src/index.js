import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './redux/store'

// Wrap the App component inside a Provider to be able to use the redux inside the component
// The Provider will be able to use redux functions and get its states so you must import store.js
// for it to work
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'))