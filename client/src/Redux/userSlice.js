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
        }
    }
});
export const { signInStart, signInSuccessfull, signInFailure } = userSlice.actions;
export default userSlice.reducer;
