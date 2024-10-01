import { createAsyncThunk } from "@reduxjs/toolkit"
import { RoomInterface } from '../../interfaces/roomInterface'

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

export const GetRooms = createAsyncThunk<RoomInterface[]>(
    "rooms/getRooms",
    async (_, { rejectWithValue }) => {
        try {
            const req = await fetch(`http://localhost:8080/api/rooms`, {
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
            console.error('Error fetching Rooms:', error)
            return rejectWithValue('Failed to fetch Rooms.')
        }
    }
)

export const GetSingleRoom = createAsyncThunk<RoomInterface, string>(
    "rooms/getSingleRooms",
    async (roomId) => {
        try {
            const req = await fetch(`http://localhost:8080/api/rooms/${roomId}`, {
                method: 'GET',
                headers: getAuthHeaders(),
            })

            if (!req.ok) {
                throw new Error('Authentication failed.')
            }

            const json = await req.json()
            return json
        } catch (error) {
            console.error('Error fetching Rooms:', error)
            throw Error('Failed to fetch Rooms.')
        }
    }
)

export const EditRoom = createAsyncThunk<RoomInterface, RoomInterface>(
    "rooms/editRooms",
    async (updatedRoom) => {
        try {
            const response = await fetch(`http://localhost:8080/api/rooms/${updatedRoom.id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(updatedRoom),
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

export const DeleteRoom = createAsyncThunk<string, string>(
    "rooms/deleteRooms",
    async (RoomId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/rooms/${RoomId}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
            })

            if (!response.ok) {
                throw new Error('Failed to delete booking.')
            }

            return RoomId
        } catch (error) {
            console.error('Error deleting booking:', error)
            throw new Error('Failed to delete booking.')
        }
    }
)

export const CreateRoom = createAsyncThunk<RoomInterface, RoomInterface>(
    "rooms/createRooms",
    async (newRoom) => {
        try {
            const response = await fetch('http://localhost:8080/api/rooms', {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(newRoom)
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