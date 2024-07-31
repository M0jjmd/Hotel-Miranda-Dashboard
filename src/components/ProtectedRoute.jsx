import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const isAuthenticated = () => {
    return !!localStorage.getItem('authToken')
};

const ProtectedRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />
};

export default ProtectedRoute