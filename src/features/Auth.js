import { createSlice } from '@reduxjs/toolkit'

const initialState = { bearerToken: '', tokenValidity: '', userId: '', username: '', email: '' }

export const authSlice = createSlice({
    name: 'auth',
    initialState: { value: initialState },
    reducers: {
        login: (state, action) => {
            // Change the value of the state to whatever we get from the payload, meaning anything
            // we pass to this login() action when dispatch(login({ payload })) is called. It's
            // always best practice to name the keys of the payload object to those contained in
            // the initialState
            state.value = action.payload

            // Persist login
            localStorage.setItem('user', action.payload.username)
            localStorage.setItem('userId', action.payload.userId)
            localStorage.setItem('token', action.payload.bearerToken)
            localStorage.setItem('tokenValidity', action.payload.tokenValidity)
        },
        logout: (state) => {
            state.value = initialState

            // Remove local storage data
            localStorage.removeItem('user')
            localStorage.removeItem('userId')
            localStorage.removeItem('token')
            localStorage.removeItem('tokenValidity')
        },
    },
})

// Access the actions we created
export const { login, logout } = authSlice.actions

// Get reducers from the slice and export it so that our store.js can use it
export default authSlice.reducer