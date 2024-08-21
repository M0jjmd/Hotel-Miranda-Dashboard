import { createAsyncThunk } from "@reduxjs/toolkit"

export const GetBookings = createAsyncThunk(
    "bookings/getBookings",
    async () => {
        try {
            const req = await fetch(`http://localhost:4001/data`)

            if (!req.ok) {
                throw new Error('Authentication failed.')
            }

            const json = await req.json()
            return json
        } catch (error) {
            console.error('Error fetching bookings:', error)
            throw Error('Failed to fetch bookings.')
        }
    }
)

export const EditBooking = createAsyncThunk(
    "bookings/editBooking",
    async (updatedBooking) => {
        try {
            const response = await fetch(`http://localhost:4001/data/${updatedBooking.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBooking),
            })

            if (!response.ok) {
                throw new Error('Failed to edit booking.')
            }

            const json = await response.json()
            return json
        } catch (error) {
            console.error('Error editing booking:', error)
            throw new Error('Failed to edit booking.')
        }
    }
)

export const DeleteBooking = createAsyncThunk(
    "bookings/deleteBooking",
    async (bookingId) => {
        try {
            console.log(bookingId)
            const response = await fetch(`http://localhost:4001/data/${bookingId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete booking.')
            }

            return bookingId
        } catch (error) {
            console.error('Error deleting booking:', error)
            throw new Error('Failed to delete booking.')
        }
    }
)