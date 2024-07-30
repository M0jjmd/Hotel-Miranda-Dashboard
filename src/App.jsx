import Dasboard from './pages/Dashboard.jsx'
import Bookings from './pages/Bookings.jsx'
import Contacts from './pages/Contacts.jsx'
import Rooms from './pages/Rooms.jsx'
import Users from './pages/Users.jsx'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import { Routes, Route } from 'react-router-dom'

import { useState } from 'react'
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

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(true)

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible)
  }

  return (
    <>
      <AppContainer>
        <Sidebar isVisible={isSidebarVisible} />
        <MainContent>
          <Header toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
          <Routes>
            <Route path='' element={<Dasboard />} />
            <Route path='/bookings' element={<Bookings />} />
            <Route path='/contacts' element={<Contacts />} />
            <Route path='/rooms' element={<Rooms />} />
            <Route path='/users' element={<Users />} />
          </Routes>
        </MainContent>
      </AppContainer>
      {/* <div className='app-container'>
        <Sidebar />
        <div className='main-content'>
          <Header toggleSidebar={toggleSidebar} isVisible={isVisible} />
          <Routes>
            <Route path='' element={<Dasboard />} />
            <Route path='bookings' element={<Bookings />} />
            <Route path='contacts' element={<Contacts />} />
            <Route path='rooms' element={<Rooms />} />
            <Route path='users' element={<Users />} />
          </Routes>
        </div>


      </div> */}
    </>
  )
}

export default App