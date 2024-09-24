import { createSlice } from "@reduxjs/toolkit"
import { AuthentificateUser } from "./authenticateUserThunk"

interface UserState {
    status: 'idle' | 'loading' | 'fulfilled' | 'rejected'
    error: string | null
    isAuthentificated: boolean
    token: string
    name: string
    email: string
    id: string
}

const initialState: UserState = {
    status: "idle",
    error: null,
    isAuthentificated: false,
    token: '',
    name: '',
    email: '',
    id: '',
}

const usersSlice = createSlice({
    name: "loginUser",
    initialState,
    reducers: {
        logout: (state) => {
            state.status = "idle"
            state.isAuthentificated = false
            state.token = ''
            state.name = ''
            state.email = ''
            state.id = ''
            state.error = null
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
                state.token = action.payload.token
                state.name = action.payload.name
                state.email = action.payload.email
                state.id = action.payload.id
                state.error = null
            })
            .addCase(AuthentificateUser.rejected, (state, action) => {
                state.status = "rejected"
                state.isAuthentificated = false
                state.token = ''
                state.name = ''
                state.email = ''
                state.id = ''
                state.error = action.payload as string || 'An error occurred'
            })
    }
})

export const { logout } = usersSlice.actions
export default usersSlice.reducer