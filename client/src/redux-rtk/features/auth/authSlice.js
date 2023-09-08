import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const initialState = {
    accessToken: undefined,
    user: undefined,
    isAuthenticated: undefined,
    _id: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        profileLog: (state, action) => {
            state.user = action.payload;
        },
        userLoggedIn: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
            state._id = action.payload._id;
            state.user = action.payload.user;
        },
        userLoggedOut: (state) => {
            state.accessToken = undefined;
            state.user = undefined;
            state.isAuthenticated = undefined;
            state._id = undefined;

            Cookies.remove('accessToken');
            Cookies.remove('_id');
        }
    }
})

export const { userLoggedIn, userLoggedOut, profileLog } = authSlice.actions;
export default authSlice.reducer;