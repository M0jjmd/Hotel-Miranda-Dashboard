import { createAsyncThunk } from "@reduxjs/toolkit"
import { Users } from "../../interfaces/usersInterface"

interface UserData {
    isAuthenticated: boolean
    name: string
    email: string
}

interface AuthUser {
    username: string
    password: string
}

export const AuthentificateUser = createAsyncThunk<UserData, AuthUser, { rejectValue: string }>(
    "loginUser/authentificateUser",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const req = await fetch(`http://localhost:4000/users`)

            if (!req.ok) {
                throw new Error('Authentication failed.')
            }

            const result: Users[] = await req.json()
            const user = result.find(
                (user: Users) => user.username === username && user.password === password
            )

            if (user) {
                return {
                    isAuthenticated: true,
                    name: user.FullName,
                    email: user.Email,
                }
            } else {
                throw new Error('Invalid username or password.')
            }

        } catch (error) {
            return rejectWithValue((error as Error).message || 'An error occurred.')
        }
    }
)