import { createAsyncThunk } from "@reduxjs/toolkit"

export const AuthentificateUser = createAsyncThunk(
    "loginUser/authentificateUser",
    async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const req = await fetch(`http://localhost:8080/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            })

            if (!req.ok) {
                const errorData = await req.json()
                return rejectWithValue(errorData.message)
            }

            const data = await req.json()
            return data
        } catch (error) {
            return rejectWithValue('An error occurred while trying to log in.')
        }
    }
)