import { createSlice } from '@reduxjs/toolkit'
import { GetUsers, EditUser, DeleteUser } from './usersThunk'
import { UserInterface } from '../../interfaces/userInterface'

interface usersState {
    data: UserInterface[]
    status: 'idle' | 'loading' | 'fulfilled' | 'failed'
    error: string | null
}

const initialState: usersState = {
    data: [],
    status: "idle",
    error: null,
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetUsers.pending, (state) => {
                state.status = "loading"
            })
            .addCase(GetUsers.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.data = action.payload
            })
            .addCase(GetUsers.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || null
            })
            .addCase(EditUser.fulfilled, (state, action) => {
                state.data = state.data.map(user =>
                    user._id === action.payload._id ? action.payload : user
                )
            })
            .addCase(DeleteUser.fulfilled, (state, action) => {
                state.data = state.data.filter(user => user._id !== action.payload)
            })
    },
})

export default usersSlice.reducer
