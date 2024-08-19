import { createSlice } from "@reduxjs/toolkit"
import { AuthentificateUser } from "./authenticateUserThunk"


const usersSlice = createSlice({
    name: "users",
    initialState: {
        status: "idle",
        error: null,
        isAuthentificated: false,
        name: '',
        email: '',
    },
    extraReducers: (builder) => {
        builder
            .addCase(AuthentificateUser.prending, (state) => {
                state.status("loading")
            })
            .addCase(AuthentificateUser.fulfilled, (state, action) => {
                state.status("fulfilled")
                state.isAuthenticated = action.payload.isAuthenticated
                state.name = action.payload.name
                state.email = action.payload.email
                state.error = null
            })
            .addCase(AuthentificateUser.rejected, (state, action) => {
                state.status("failed")
                state.isAuthenticated = false;
                state.name = '';
                state.email = '';
                state.error = action.error.message
            })
    }
})

export default usersSlice.reducer