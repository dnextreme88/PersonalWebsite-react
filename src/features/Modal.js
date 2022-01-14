import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: { value: false },
    reducers: {
        openModal: (state) => {
            state.value = true
        },
        closeModal: (state) => {
            state.value = false
        },
    }
})

// Access the actions we created
export const { openModal, closeModal } = modalSlice.actions

// Get reducers from the slice and export it for use in other files
export default modalSlice.reducer