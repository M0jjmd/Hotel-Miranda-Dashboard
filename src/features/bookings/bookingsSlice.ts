import { createSlice } from '@reduxjs/toolkit'
import { GetBookings, EditBooking, DeleteBooking } from './bookingsThunk'
import { BookingInterface } from "../../interfaces/bookingInterface"

interface bookingsState {
    data: BookingInterface[]
    status: 'idle' | 'loading' | 'fulfilled' | 'failed'
    error: string | null
}

const initialState: bookingsState = {
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
                state.error = action.payload as string
            })
            .addCase(EditBooking.fulfilled, (state, action) => {
                state.data = state.data.map(booking =>
                    booking._id === action.payload._id ? action.payload : booking
                )
            })
            .addCase(DeleteBooking.fulfilled, (state, action) => {
                state.data = state.data.filter(booking => booking._id !== action.payload)
            })
    },
})

export default bookingsSlice.reducer
