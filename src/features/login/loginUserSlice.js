import { createSlice } from "@reduxjs/toolkit"
import { AuthentificateUser } from "./authenticateUserThunk"


const usersSlice = createSlice({
    name: "loginUser",
    initialState: {
        status: "idle",
        error: null,
        isAuthenticated: false,
        name: '',
        email: '',
    },
    reducers: {
        logout: (state) => {
            state.status = "idle";
            state.isAuthenticated = false;
            state.name = '';
            state.email = '';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(AuthentificateUser.pending, (state) => {
                state.status = "loading"
            })
            .addCase(AuthentificateUser.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.isAuthenticated = action.payload.isAuthenticated
                state.name = action.payload.name
                state.email = action.payload.email
                state.error = null
            })
            .addCase(AuthentificateUser.rejected, (state, action) => {
                state.status = "failed"
                state.isAuthenticated = false
                state.name = ''
                state.email = ''
                state.error = action.error.message
            })
    }
})

export const { logout } = usersSlice.actions;
export default usersSlice.reducer