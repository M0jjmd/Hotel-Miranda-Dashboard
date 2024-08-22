import { createAsyncThunk } from "@reduxjs/toolkit"

export const GetRooms = createAsyncThunk(
    "rooms/getRooms",
    async () => {
        try {
            const req = await fetch(`http://localhost:4000/rooms`)

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

export const GetSingleRoom = createAsyncThunk(
    "rooms/getSingleRooms",
    async (roomId) => {
        try {
            const req = await fetch(`http://localhost:4000/rooms/${roomId}`)

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

export const EditRoom = createAsyncThunk(
    "rooms/editRooms",
    async (updatedRoom) => {
        console.log(updatedRoom)
        try {
            const response = await fetch(`http://localhost:4000/rooms/${updatedRoom.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
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

export const DeleteRoom = createAsyncThunk(
    "rooms/deleteRooms",
    async (RoomId) => {
        try {
            const response = await fetch(`http://localhost:4000/rooms/${RoomId}`, {
                method: 'DELETE',
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

export const CreateRoom = createAsyncThunk(
    "rooms/createRooms",
    async (newRoom) => {
        try {
            const response = await fetch('http://localhost:4000/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRoom)
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
