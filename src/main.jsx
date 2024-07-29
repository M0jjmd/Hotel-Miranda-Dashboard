import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Bookings from './components/Bookings.jsx'
import Contacts from './components/Contacts.jsx'
import Rooms from './components/Rooms.jsx'
import Users from './components/Users.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<App />} />
        <Route path='bookings' element={<Bookings />} />
        <Route path='contacts' element={<Contacts />} />
        <Route path='rooms' element={<Rooms />} />
        <Route path='users' element={<Users />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
