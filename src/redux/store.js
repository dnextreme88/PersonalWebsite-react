import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"
import users from './reducers/users'

const middlewares = compose(applyMiddleware(thunk, logger))

const reducers = combineReducers({
    users: users,
})

export default createStore(reducers, middlewares)

// Redux:
//     Store - puregold (data and states)
//     Actions - saleslady (inputs order or functions)
//     Reducers - POS Machine (logic on how computations work etc.)