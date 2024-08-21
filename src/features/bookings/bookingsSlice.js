import { createSlice } from '@reduxjs/toolkit'
import { GetBookings, EditBooking, DeleteBooking } from './bookingsThunk'

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
            })
            .addCase(GetBookings.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(EditBooking.fulfilled, (state, action) => {
                state.data = state.data.map(booking =>
                    booking.id === action.payload.id ? action.payload : booking
                )
            })
            // Handle delete booking (DELETE)
            .addCase(DeleteBooking.fulfilled, (state, action) => {
                state.data = state.data.filter(booking => booking.id !== action.payload)
            })
    },
})

export default bookingsSlice.reducer
