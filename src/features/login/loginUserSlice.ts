import { createSlice } from "@reduxjs/toolkit"
import { AuthentificateUser } from "./authenticateUserThunk"

interface UserState {
    status: 'idle' | 'loading' | 'fulfilled' | 'rejected'
    error: string | null
    isAuthentificated: boolean
    name: string
    email: string
}

const initialState: UserState = {
    status: "idle",
    error: null,
    isAuthentificated: false,
    name: '',
    email: '',
}

const usersSlice = createSlice({
    name: "loginUser",
    initialState,
    reducers: {
        logout: (state) => {
            state.status = "idle";
            state.isAuthentificated = false;
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
                state.isAuthentificated = true
                state.name = action.payload.name
                state.email = action.payload.email
                state.error = null
            })
            .addCase(AuthentificateUser.rejected, (state, action) => {
                state.status = "rejected"
                state.isAuthentificated = false
                state.name = ''
                state.email = ''
                state.error = action.payload as string || 'An error occurred'
            })
    }
})

export const { logout } = usersSlice.actions;
export default usersSlice.reducer