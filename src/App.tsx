import Dasboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Contacts from './pages/Contacts'
import Rooms from './pages/Rooms'
import Users from './pages/Users'
import { Provider } from 'react-redux'
import { AuthProvider } from './context/AuthContext'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import store from './app/store'

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
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
        </AuthProvider>
      </Provider>
    </>
  )
}

export default App