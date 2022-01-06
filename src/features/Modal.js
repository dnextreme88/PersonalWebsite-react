import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: 'modal',
    initialState: { value: false },
    reducers: {
        openModal: (state, action) => {
            state.value = true;
        },
        closeModal: (state, action) => {
            state.value = false;
        },
    }
});

// Access the actions we created
export const { openModal, closeModal } = modalSlice.actions;

// Get reducers from the slice and export it for use in other files
export default modalSlice.reducer;