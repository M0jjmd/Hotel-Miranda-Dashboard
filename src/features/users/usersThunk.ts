import { createAsyncThunk } from "@reduxjs/toolkit"
import { Users } from '../../interfaces/usersInterface'

export const GetUsers = createAsyncThunk<Users[]>(
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

export const EditUser = createAsyncThunk<Users, Users>(
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

export const DeleteUser = createAsyncThunk<string, string>(
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

export const CreateUser = createAsyncThunk<Users, Users>(
    "users/createUsers",
    async (newUser) => {
        try {
            const response = await fetch('http://localhost:4000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
