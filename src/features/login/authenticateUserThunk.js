import { createAsyncThunk } from "@reduxjs/toolkit"

export const AuthentificateUser = createAsyncThunk
    ("users/authentificateUser",
        async ({ username, password }) => {
            console.log("hola" + username)
            try {
                const req = await fetch(`http://localhost:4000/data`)

                if (!req.ok) {
                    console.log("testeanto eta bain")
                    throw new Error('Authentication failed.');
                }

                const result = await req.json()
                console.log(result)
                const user = result.find(
                    (user) => user.user.username === username && user.user.password === password)
                if (user) {
                    console.log("nombre Final: user.user.username" + user.user.username)
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