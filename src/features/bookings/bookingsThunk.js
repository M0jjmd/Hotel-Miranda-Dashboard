import { createAsyncThunk } from "@reduxjs/toolkit"

export const GetBookings = createAsyncThunk(
    "bookings/getBookings",
    async () => {
        try {
            const req = await fetch(`http://localhost:4000/guests`)

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
        console.log(updatedBooking)
        try {
            const response = await fetch(`http://localhost:4000/guests/${updatedBooking.id}`, {
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
            const response = await fetch(`http://localhost:4000/guests/${bookingId}`, {
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

export const CreateBooking = createAsyncThunk(
    "bookings/createBooking",
    async (newBooking) => {
        try {
            const response = await fetch('http://localhost:4000/guests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBooking)
            });

            if (!response.ok) {
                throw new Error('Failed to create booking.')
            }

            const json = await response.json()
            return json
        } catch (error) {
            console.error('Error creating booking:', error)
            throw new Error('Failed to add booking.')
        }
    }
)
