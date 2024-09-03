import { createSlice } from '@reduxjs/toolkit'
import { GetBookings, EditBooking, DeleteBooking } from './bookingsThunk'
import { Booking } from "./types"

interface nookingsState {
    data: Booking[]
    status: 'idle' | 'loading' | 'fulfilled' | 'failed'
    error: string | null
}

const initialState: nookingsState = {
    data: [],
    status: "idle",
    error: null,
}

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
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
                state.error = action.error.message || null
            })
            .addCase(EditBooking.fulfilled, (state, action) => {
                state.data = state.data.map(booking =>
                    booking.id === action.payload.id ? action.payload : booking
                )
            })
            .addCase(DeleteBooking.fulfilled, (state, action) => {
                state.data = state.data.filter(booking => booking.id !== action.payload)
            })
    },
})

export default bookingsSlice.reducer
