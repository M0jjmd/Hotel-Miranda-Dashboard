import { createAsyncThunk } from "@reduxjs/toolkit"

interface userData {
    isAuthenticated: boolean
    name: string
    email: string
}

interface authUser {
    username: string
    password: string
}

export const AuthentificateUser = createAsyncThunk<userData, authUser, { rejectValue: string }>(
    "loginUser/authentificateUser",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const req = await fetch(`http://localhost:4000/loginUser`)

            if (!req.ok) {
                throw new Error('Authentication failed.')
            }

            const result = await req.json()
            console.log(result)
            const user = result.find(
                (user: { username: string, password: string }) => user.username === username && user.password === password)
            console.log(user)
            if (user) {
                return {
                    isAuthenticated: true,
                    name: user.username,
                    email: user.email,
                }
            } else {
                throw new Error('Invalid username or password.')
            }

        } catch (error) {
            return rejectWithValue((error as Error).message || 'An error occurred.')
        }
    }
)