import { createAsyncThunk } from "@reduxjs/toolkit"

export const GetBookings = createAsyncThunk(
    "bookings/getBookings",
    async () => {
        try {
            const req = await fetch(`http://localhost:4000/data`)

            if (!req.ok) {
                throw new Error('Authentication failed.');
            }

            const json = await req.json()
            return json
        } catch (error) {
            console.error('Error fetching bookings:', error)
            throw Error('Failed to fetch bookings.')
        }
    })