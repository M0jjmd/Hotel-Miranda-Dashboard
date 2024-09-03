import { Link } from "react-router-dom"
import logo from '../assets/dashboardLogo.png'
import profileImg from '../assets/profileImg.jpeg'
import { LuLayoutDashboard, LuKeyRound, LuCalendarRange, LuUser2, LuPhoneCall } from "react-icons/lu"
import styled from "styled-components"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"

interface isVisibleInterface {
  isVisible: boolean
}

const SidebarContainer = styled.aside<isVisibleInterface>`
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

const ProfileSection = styled.div`
  margin-top: 2rem;
  border-top: 1px solid #ddd;
  padding-top: 1rem;
  text-align: center;
  background-color: #d3c6c6;
`

const ProfilePic = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
`

const ProfileName = styled.h4`
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #333;
`

const ProfileEmail = styled.p`
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: #666;
`

const EditButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  outline: none;
  
  &:hover {
    background-color: #0056b3;
  }
`

interface sidebarProps {
  isSidebarVisible: boolean
}

const Sidebar: React.FC<sidebarProps> = ({ isSidebarVisible }) => {
  const { state, dispatch } = useAuth()
  const localName = localStorage.getItem('name') ?? ''
  const localEmail = localStorage.getItem('email') ?? ''

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [name, setName] = useState<string>(localName)
  const [email, setEmail] = useState<string>(localEmail)

  const handleEditButtonClick = () => {
    setIsEditing(true)
  }

  const handleClosePopup = () => {
    setIsEditing(false)
  }

  const handleSaveChanges = () => {
    dispatch({
      type: 'EDIT',
      payload: { name, email }
    })

    localStorage.setItem('name', name)
    localStorage.setItem('email', email)
    setIsEditing(false)
  }

  return (
    <>
      <SidebarContainer isVisible={isSidebarVisible}>
        <Logo src={logo} alt="logo" />
        <SidebarList>
          <SidebarItem><SidebarLink to="/dashboard"><DashboardImgs as={LuLayoutDashboard} /> Dashboard</SidebarLink></SidebarItem>
          <SidebarItem><SidebarLink to="/bookings"><DashboardImgs as={LuCalendarRange} /> Bookings</SidebarLink></SidebarItem>
          <SidebarItem><SidebarLink to="/rooms"><DashboardImgs as={LuKeyRound} /> Rooms</SidebarLink></SidebarItem>
          <SidebarItem><SidebarLink to="/contact"><DashboardImgs as={LuPhoneCall} /> Contact</SidebarLink></SidebarItem>
          <SidebarItem><SidebarLink to="/users"><DashboardImgs as={LuUser2} /> Users</SidebarLink></SidebarItem>
        </SidebarList>
        <ProfileSection>
          <ProfilePic src={profileImg} alt="profile-pic" />
          <ProfileName>{name}</ProfileName>
          <ProfileEmail>{email}</ProfileEmail>
          <EditButton onClick={handleEditButtonClick}>Edit Profile</EditButton>
        </ProfileSection>
      </SidebarContainer>

      {isEditing && (
        <div className="popup">
          <h2>Edit Profile</h2>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button onClick={handleSaveChanges}>Save</button>
          <button onClick={handleClosePopup}>Cancel</button>
        </div>
      )}
    </>
  )
}

export default Sidebar