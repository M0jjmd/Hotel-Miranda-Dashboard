import { createAsyncThunk } from "@reduxjs/toolkit"
import { UserInterface } from '../../interfaces/userInterface'

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

export const GetUsers = createAsyncThunk<UserInterface[]>(
    "users/getUsers",
    async (_, { rejectWithValue }) => {
        try {
            const req = await fetch(`http://localhost:8080/api/users`, {
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
            console.error('Error fetching Users:', error)
            return rejectWithValue('Failed to fetch bookings.')
        }
    }
)

export const EditUser = createAsyncThunk<UserInterface, UserInterface>(
    "users/editUsers",
    async (updatedUser) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${updatedUser._id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(updatedUser),
            })

            if (!response.ok) {
                throw new Error('Failed to edit user.')
            }

            const json = await response.json()
            return json
        } catch (error) {
            console.error('Error editing user:', error)
            throw new Error('Failed to edit user.')
        }
    }
)

export const DeleteUser = createAsyncThunk<string, string>(
    "users/deleteUsers",
    async (UserId) => {
        const token = localStorage.getItem('token')
        if (!token) {
            throw new Error('No token found. Please log in.')
        }

        try {
            const response = await fetch(`http://localhost:8080/api/users/${UserId}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
            })

            if (!response.ok) {
                throw new Error('Failed to delete user.')
            }

            return UserId
        } catch (error) {
            console.error('Error deleting user:', error)
            throw new Error('Failed to delete user.')
        }
    }
)

export const CreateUser = createAsyncThunk<UserInterface, UserInterface>(
    "users/createUsers",
    async (newUser) => {
        try {
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(newUser)
            })

            if (!response.ok) {
                throw new Error('Failed to create user.')
            }

            const json = await response.json()
            return json
        } catch (error) {
            console.error('Error creating user:', error)
            throw new Error('Failed to add user.')
        }
    }
)