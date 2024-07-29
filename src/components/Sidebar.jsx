import { Link } from "react-router-dom"
import './sidebar.css'

const Sidebar = () => {
  return (
    <>
      <aside className="sidebar">
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/bookings">Bookings</Link></li>
          <li><Link to="/contacts">Rooms</Link></li>
          <li><Link to="/rooms">Contact</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
      </aside>
    </>
  )
}

export default Sidebar