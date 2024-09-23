import { createAsyncThunk } from "@reduxjs/toolkit"
import { UserInterface } from '../../interfaces/userInterface'

export const GetUsers = createAsyncThunk<UserInterface[]>(
    "users/getUsers",
    async () => {
        const token = localStorage.getItem('token')
        if (!token) {
            throw new Error('No token found. Please log in.');
        }
        try {
            const req = await fetch(`http://localhost:8001/users`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (!req.ok) {
                throw new Error('Authentication failed.')
            }

            const json = await req.json()
            return json
        } catch (error) {
            console.error('Error fetching Users:', error)
            throw Error('Failed to fetch Users.')
        }
    }
)

export const EditUser = createAsyncThunk<UserInterface, UserInterface>(
    "users/editUsers",
    async (updatedUser) => {
        const token = localStorage.getItem('token')
        if (!token) {
            throw new Error('No token found. Please log in.');
        }

        try {
            const response = await fetch(`http://localhost:8001/users/${updatedUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
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
            throw new Error('No token found. Please log in.');
        }

        try {
            const response = await fetch(`http://localhost:8001/users/${UserId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
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
        const token = localStorage.getItem('token')
        if (!token) {
            throw new Error('No token found. Please log in.');
        }
        try {
            const response = await fetch('http://localhost:8001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
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