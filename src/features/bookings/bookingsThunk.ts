import { createAsyncThunk } from "@reduxjs/toolkit"
import { BookingInterface } from "../../interfaces/bookingInterface"

const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    if (!token) {
        localStorage.clear()
        throw new Error('No token found. Please log in.')
    }
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
}

export const GetBookings = createAsyncThunk<BookingInterface[]>(
    "bookings/getBookings",
    async (_, { rejectWithValue }) => {
        try {
            const req = await fetch(`http://localhost:8080/api/bookings`, {
                method: 'GET',
                headers: getAuthHeaders(),
            })

            if (!req.ok) {
                if (req.status === 401) {
                    return rejectWithValue('Token is invalid')
                } else if (req.status === 403) {
                    return rejectWithValue('Access forbidden')
                }
                throw new Error('Authentication failed.')
            }

            const json = await req.json()
            return json
        } catch (error) {
            console.error('Error fetching bookings:', error)
            return rejectWithValue('Failed to fetch bookings.')
        }
    }
)

export const EditBooking = createAsyncThunk<BookingInterface, BookingInterface>(
    "bookings/editBooking",
    async (updatedBooking) => {
        try {
            const response = await fetch(`http://localhost:8080/api/bookings/${updatedBooking.id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
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

export const DeleteBooking = createAsyncThunk<string, string>(
    "bookings/deleteBooking",
    async (bookingId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
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

export const CreateBooking = createAsyncThunk<BookingInterface, BookingInterface>(
    "bookings/createBooking",
    async (newBooking) => {
        try {
            const response = await fetch('http://localhost:8080/api/bookings', {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(newBooking)
            })

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