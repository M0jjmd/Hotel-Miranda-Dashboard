import React, { createContext, ReactNode, useContext, useReducer } from 'react'

interface userAuthentification {
    isAuthenticated: boolean
    name: string
    email: string
    isFormOpen: boolean
}

type Action =
    | { type: 'LOGIN'; payload: { name: string; email: string } }
    | { type: 'LOGOUT' }
    | { type: 'EDIT'; payload: { name: string; email: string } }
    | { type: 'OPEN_FORM' }
    | { type: 'CLOSE_FORM' }

const initialState: userAuthentification = {
    isAuthenticated: false,
    name: '',
    email: '',
    isFormOpen: false,
}

const authReducer = (state: userAuthentification, action: Action): userAuthentification => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                name: action.payload.name,
                email: action.payload.email,
            }
        case 'LOGOUT':
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

export interface AuthContextType {
    state: userAuthentification
    dispatch: React.Dispatch<Action>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}