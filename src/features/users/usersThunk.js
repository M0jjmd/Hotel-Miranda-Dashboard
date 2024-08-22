import { createAsyncThunk } from "@reduxjs/toolkit"

export const GetUsers = createAsyncThunk(
    "users/getUsers",
    async () => {
        try {
            const req = await fetch(`http://localhost:4000/users`)

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

export const GetSingleUser = createAsyncThunk(
    "users/getSingleUsers",
    async (userId) => {
        try {
            const req = await fetch(`http://localhost:4000/users/${userId}`)

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

export const EditUser = createAsyncThunk(
    "users/editUsers",
    async (updatedUser) => {
        console.log(updatedUser)
        try {
            const response = await fetch(`http://localhost:4000/users/${updatedUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
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

export const DeleteUser = createAsyncThunk(
    "users/deleteUsers",
    async (UserId) => {
        try {
            const response = await fetch(`http://localhost:4000/users/${UserId}`, {
                method: 'DELETE',
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

export const CreateUser = createAsyncThunk(
    "users/createUsers",
    async (newUser) => {
        try {
            const response = await fetch('http://localhost:4000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

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
