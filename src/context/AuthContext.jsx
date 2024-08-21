import React, { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext()

const initialState = {
    isAuthenticated: false,
    name: '',
    email: '',
    isFormOpen: false,
}

const authReducer = (state, action) => {
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
        case 'OPEN_FORM':
            return {
                ...state,
                isFormOpen: true,
            }
        case 'CLOSE_FORM':
            return {
                ...state,
                isFormOpen: false,
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