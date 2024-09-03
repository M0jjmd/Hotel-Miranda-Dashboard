import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import styled from 'styled-components'

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`

const MainContent = styled.div`
  flex: 4 1 85%;
  flex-direction: column;
  overflow: auto;
`

const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated')
};

const ProtectedRoute = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(true)

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible)
    }

    return (
        <>
            <AppContainer>
                <Sidebar isSidebarVisible={isSidebarVisible} />
                <MainContent>
                    <Header toggleSidebar={toggleSidebar} isVisible={isSidebarVisible} />
                    {isAuthenticated() ?
                        <Outlet /> :
                        <Navigate to="/" />}
                </MainContent>
            </AppContainer>
        </>
    )
}

export default ProtectedRoute