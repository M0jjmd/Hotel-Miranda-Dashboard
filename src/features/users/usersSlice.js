import { createSlice } from '@reduxjs/toolkit'
import { GetUsers, EditUser, DeleteUser } from './usersThunk'

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        status: "idle",
        error: null,
    },
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
                state.error = action.error.message
            })
            .addCase(EditUser.fulfilled, (state, action) => {
                state.data = state.data.map(user =>
                    user.id === action.payload.id ? action.payload : user
                )
            })
            .addCase(DeleteUser.fulfilled, (state, action) => {
                state.data = state.data.filter(user => user.id !== action.payload)
            })
    },
})

export default usersSlice.reducer
