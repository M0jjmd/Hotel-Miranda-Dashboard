import { Link } from "react-router-dom"
import logo from '../assets/dashboardLogo.png'
import './sidebar.css'
import styled from "styled-components"

const SidebarContainer = styled.aside`
  flex: 1 0 15%;
  background-color: #f8f9fa;
  padding: 1rem;
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out;
  transform: ${props => (props.isVisible ? 'translateX(0)' : 'translateX(-100%)')};
  position: ${props => (props.isVisible ? 'relative' : 'absolute')};
  // opacity: ${props => (props.isVisible ? '1' : '0')};
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
`

const SidebarList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const SidebarItem = styled.li`
  margin-bottom: 1rem;
`

const SidebarLink = styled(Link)`
  text-decoration: none;
  color: #333;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`

const Logo = styled.img`
    width: 40%;
`

const Sidebar = ({ isVisible }) => {
  return (
    <>
      <SidebarContainer isVisible={isVisible}>
        <Logo src={logo} alt="logo" />
        <SidebarList>
          <SidebarItem><SidebarLink to="/">Dashboard</SidebarLink></SidebarItem>
          <SidebarItem><SidebarLink to="/bookings">Bookings</SidebarLink></SidebarItem>
          <SidebarItem><SidebarLink to="/contacts">Contact</SidebarLink></SidebarItem>
          <SidebarItem><SidebarLink to="/rooms">Rooms</SidebarLink></SidebarItem>
          <SidebarItem><SidebarLink to="/users">Users</SidebarLink></SidebarItem>
        </SidebarList>
      </SidebarContainer>
      {/* <aside className="sidebar">
        <img src={logo} alt="logo" className="logo" />
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/bookings">Bookings</Link></li>
          <li><Link to="/contacts">Rooms</Link></li>
          <li><Link to="/rooms">Contact</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
      </aside> */}
    </>
  )
}

export default Sidebar