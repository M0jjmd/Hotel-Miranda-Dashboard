import logo from '../assets/dashboardLogo.png'
import profileImg from '../assets/profileImg.jpeg'
import * as S from '../styles/sidebarStyles'
import { LuLayoutDashboard, LuKeyRound, LuCalendarRange, LuUser2, LuPhoneCall } from "react-icons/lu"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"

interface sidebarProps {
  isSidebarVisible: boolean
}

const Sidebar: React.FC<sidebarProps> = ({ isSidebarVisible }) => {
  const { dispatch } = useAuth()
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
      <S.SidebarContainer isVisible={isSidebarVisible}>
        <S.Logo src={logo} alt="logo" />
        <S.SidebarList>
          <S.SidebarItem><S.SidebarLink to="/dashboard"><S.DashboardImgs as={LuLayoutDashboard} /> Dashboard</S.SidebarLink></S.SidebarItem>
          <S.SidebarItem><S.SidebarLink to="/bookings"><S.DashboardImgs as={LuCalendarRange} /> Bookings</S.SidebarLink></S.SidebarItem>
          <S.SidebarItem><S.SidebarLink to="/rooms"><S.DashboardImgs as={LuKeyRound} /> Rooms</S.SidebarLink></S.SidebarItem>
          <S.SidebarItem><S.SidebarLink to="/contact"><S.DashboardImgs as={LuPhoneCall} /> Contact</S.SidebarLink></S.SidebarItem>
          <S.SidebarItem><S.SidebarLink to="/users"><S.DashboardImgs as={LuUser2} /> Users</S.SidebarLink></S.SidebarItem>
        </S.SidebarList>
        <S.ProfileSection>
          <S.ProfilePic src={profileImg} alt="profile-pic" />
          <S.ProfileName>{name}</S.ProfileName>
          <S.ProfileEmail>{email}</S.ProfileEmail>
          <S.EditButton onClick={handleEditButtonClick}>Edit Profile</S.EditButton>
        </S.ProfileSection>
      </S.SidebarContainer>

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