import { createSlice } from '@reduxjs/toolkit'

const initialState = { bearerToken: '', userId: '', username: '', email: '' }

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
        },
        logout: (state) => {
            state.value = initialState
        },
    },
})

// Access the actions we created
export const { login, logout } = authSlice.actions

// Get reducers from the slice and export it so that our store.js can use it
export default authSlice.reducer