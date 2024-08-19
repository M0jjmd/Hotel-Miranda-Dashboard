import { createAsyncThunk } from "@reduxjs/toolkit"

export const AuthentificateUser = createAsyncThunk
    ("users/authentificateUser",
        async ({ name, password }) => {
            try {
                const req = await fetch(`http://localhost:4000`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, password }),
                })

                if (!req.ok) {
                    throw new Error('Authentication failed.');
                }

                const result = await req.json()

                if (result.succes) {
                    const user = result.data.find(user => user.user.username === username && user.user.password === password)

                    if (user) {
                        return {
                            isAuthenticated: true,
                            name: user.user.name,
                            email: user.user.email
                        };
                    } else {
                        return {
                            isAuthenticated: false,
                            name: '',
                            email: ''
                        }
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
                };
            }
        })