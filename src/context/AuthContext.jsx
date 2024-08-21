import React, { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext()

const initialState = {
    isAuthenticated: false,
    name: '',
    email: '',
}

const authReducer = (state, action) => {
    console.log(action.type)
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                name: action.payload.name,
                email: action.payload.email,
            }
        case 'LOGOUT':
            localStorage.removeItem('isAuthenticated')
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            return initialState
        case 'EDIT':
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
            }
        default:
            return state
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
