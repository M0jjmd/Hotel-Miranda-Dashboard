import { createAsyncThunk } from "@reduxjs/toolkit"

export const AuthentificateUser = createAsyncThunk
    ("loginUser/authentificateUser",
        async ({ username, password }, { rejectWithValue }) => {
            try {
                const req = await fetch(`http://localhost:4000/loginUser`)

                if (!req.ok) {
                    throw new Error('Authentication failed.')
                }

                const result = await req.json()
                const user = result.find(
                    (user) => user.user.username === username && user.user.password === password)
                if (user) {
                    return {
                        isAuthenticated: true,
                        name: user.user.username,
                        email: user.user.email,
                    }
                } else {
                    throw new Error('Invalid username or password.')
                }

            } catch (error) {
                return rejectWithValue(error.message || 'An error occurred.')
            }
        })