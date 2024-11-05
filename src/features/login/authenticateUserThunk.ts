import { createAsyncThunk } from "@reduxjs/toolkit"

const apiUrl = import.meta.env.VITE_API_URL

export const AuthentificateUser = createAsyncThunk(
    "loginUser/authentificateUser",
    async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const req = await fetch(`${apiUrl}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            })

            if (!req.ok) {
                const errorData = await req.json()
                console.log('Error data:', errorData)
                return rejectWithValue(errorData.message)
            }

            const data = await req.json()
            return data
        } catch (error) {
            console.log('Catch error:', error)
            return rejectWithValue('An error occurred while trying to log in.')
        }
    }
)