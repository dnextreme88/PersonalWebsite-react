import React from 'react'
// If using Redux with own reducers and actions
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { useSelector, useDispatch } from 'react-redux' // If using Redux with hooks
import { setUserInfo } from './redux/actions/users'

const App = (props) => {
    const users = useSelector(state => state.users) // props
    const dispatch = useDispatch()

    const handleOnClick = (type) => {
        if (type === 'name') {
            // props.setUserInfo({ name: 'bossROD new' }) // If using Redux with own reducers and actions
            dispatch(setUserInfo({ name: 'bossROD new' }))
        } else if (type === 'age') {
            // props.setUserInfo({ age: 23 }) // If using Redux with own reducers and actions
            dispatch(setUserInfo({ age: 23 }))
        } else if (type === 'gender') {
            // props.setUserInfo({ gender: 'male' }) // If using Redux with own reducers and actions
            dispatch(setUserInfo({ gender: 'male' }))
        }
    }

    // console.log('props: ', props) // If using Redux with own reducers and actions
    console.log('state.users: ', users)

    return (
        <div>
            <button onClick={() => handleOnClick('name')}>Add Name</button>
            <button onClick={() => handleOnClick('age')}>Add Age</button>
            <button onClick={() => handleOnClick('gender')}>Add Gender</button>
        </div>
    )
}

// If using Redux with own reducers and actions
// const mapStateToProps = state => {
//     return {
//         // Value based on const reducers = combineReducers({users: users}) of redux/store.js
//         users: state.users
//     }
// }
// // Updates data and uses the actions
// const mapDispatchToProps = dispatch => {
//     return bindActionCreators({
//         setUserInfo: setUserInfo,
//     }, dispatch)
// }
// export default connect(mapStateToProps, mapDispatchToProps)(App)

export default App
