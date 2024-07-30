import { Link } from "react-router-dom"
import logo from '../assets/dashboardLogo.png'
import { LuLayoutDashboard, LuKeyRound, LuCalendarRange, LuUser2, LuPhoneCall } from "react-icons/lu";
import styled from "styled-components"

const SidebarContainer = styled.aside`
  flex: 1 0 15%;
  background-color: #FFFFFF;
  padding: 1rem;
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out;
  transform: ${props => (props.isVisible ? 'translateX(0)' : 'translateX(-100%)')};
  position: ${props => (props.isVisible ? 'relative' : 'absolute')};
  opacity: ${props => (props.isVisible ? '1' : '0')};
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

const DashboardImgs = styled.div`
  font-size: 1rem;
`

const Sidebar = ({ isVisible }) => {
  return (
    <>
      <SidebarContainer isVisible={isVisible}>
        <Logo src={logo} alt="logo" />
        <SidebarList>
          <SidebarItem><SidebarLink to="/"><DashboardImgs as={LuLayoutDashboard} /> Dashboard</SidebarLink></SidebarItem>
          <SidebarItem><SidebarLink to="/bookings"><DashboardImgs as={LuCalendarRange} /> Bookings</SidebarLink></SidebarItem>
          <SidebarItem><SidebarLink to="/rooms"><DashboardImgs as={LuKeyRound} /> Rooms</SidebarLink></SidebarItem>
          <SidebarItem><SidebarLink to="/contact"><DashboardImgs as={LuPhoneCall} /> Contact</SidebarLink></SidebarItem>
          <SidebarItem><SidebarLink to="/users"><DashboardImgs as={LuUser2} /> Users</SidebarLink></SidebarItem>
        </SidebarList>
      </SidebarContainer>
    </>
  )
}

export default Sidebar