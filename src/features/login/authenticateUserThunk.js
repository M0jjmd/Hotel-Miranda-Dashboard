import { createAsyncThunk } from "@reduxjs/toolkit"

export const AuthentificateUser = createAsyncThunk
    ("users/authentificateUser",
        async ({ username, password }) => {
            try {
                const req = await fetch(`http://localhost:4000/users`)

                if (!req.ok) {
                    throw new Error('Authentication failed.');
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
                    throw new Error(result.message || 'Authentication failed.');
                }

            } catch (error) {
                console.error('Error authenticating user:', error)
                return {
                    isAuthenticated: false,
                    name: '',
                    email: ''
                }
            }
        })