import Bookings from './pages/Bookings.jsx'
import Contacts from './pages/Contacts.jsx'
import Rooms from './pages/Rooms.jsx'
import Users from './pages/Users.jsx'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import { Routes, Route } from 'react-router-dom'

import './App.css'

function App() {

  return (
    <>
      <div className='app-container'>
        <Sidebar />
        <div className='main-content'>
          <Header />
          <Routes>
            <Route path='bookings' element={<Bookings />} />
            <Route path='contacts' element={<Contacts />} />
            <Route path='rooms' element={<Rooms />} />
            <Route path='users' element={<Users />} />
          </Routes>
        </div>


      </div>
    </>
  )
}

export default App