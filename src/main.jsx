import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import Bookings from './pages/Bookings.jsx'
import Contacts from './pages/Contacts.jsx'
import Rooms from './pages/Rooms.jsx'
import Users from './pages/Users.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
