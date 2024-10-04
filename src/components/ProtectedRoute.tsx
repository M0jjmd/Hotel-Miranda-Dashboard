import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import * as S from '../styles/appContainer'

const isAuthenticated = () => {
    return localStorage.getItem('isAuthentificated') === "true"
}

const ProtectedRoute = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(true)

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible)
    }

    return (
        <>
            <S.AppContainer>
                <Sidebar isSidebarVisible={isSidebarVisible} />
                <S.MainContent>
                    <Header toggleSidebar={toggleSidebar} isVisible={isSidebarVisible} />
                    {isAuthenticated() ? (
                        <Outlet />
                    ) : (
                        <Navigate to="/" />
                    )}
                </S.MainContent>
            </S.AppContainer>
        </>
    )
}

export default ProtectedRoute