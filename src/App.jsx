import Dasboard from './pages/Dashboard.jsx'
import Bookings from './pages/Bookings.jsx'
import Contacts from './pages/Contacts.jsx'
import Rooms from './pages/Rooms.jsx'
import Users from './pages/Users.jsx'
import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import store from './app/store.js'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dasboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="contact" element={<Contacts />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </Provider>
    </>
  )
}

export default App