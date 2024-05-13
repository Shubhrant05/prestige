import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        loading: false,
        error: null,
    },
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccessfull: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccessfull: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccessfull: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOutStart: (state) => {
            state.loading = true;
        },
        signOutSuccessfull: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});
export const {
    signInStart,
    signInSuccessfull,
    signInFailure,
    updateUserStart,
    updateUserSuccessfull,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccessfull,
    deleteUserFailure,
    signOutStart,
    signOutSuccessfull,
    signOutFailure 
} = userSlice.actions;
export default userSlice.reducer;
