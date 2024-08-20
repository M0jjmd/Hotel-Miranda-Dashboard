import { createSlice } from '@reduxjs/toolkit'
import { GetBookings } from './bookingsThunk'

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        data: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetBookings.pending, (state) => {
                state.status = "loading"
            })
            .addCase(GetBookings.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.data = action.payload
                console.log(action.payload)
            })
            .addCase(GetBookings.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
    },
})

export default bookingsSlice.reducer
