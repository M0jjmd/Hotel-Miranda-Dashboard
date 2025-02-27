import logo from '../assets/dashboardLogo.png'
import profileImg from '../assets/profileImg.jpeg'
import * as S from '../styles/sidebarStyles'
import { LuLayoutDashboard, LuKeyRound, LuCalendarRange, LuUser, LuPhoneCall } from "react-icons/lu"
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

  const [tempName, setTempName] = useState<string>(name)
  const [tempEmail, setTempEmail] = useState<string>(email)

  const handleEditButtonClick = () => {
    setTempName(name)
    setTempEmail(email)
    setIsEditing(true)
  }

  const handleClosePopup = () => {
    setIsEditing(false)
  }

  const handleSaveChanges = () => {
    setName(tempName)
    setEmail(tempEmail)

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
        <S.LogoContainer>
          <S.Logo src={logo} alt="logo" />
          <S.Title>Hotel Miranda Dashboard</S.Title>
        </S.LogoContainer>
        <S.SidebarList>
          <S.SidebarItem><S.SidebarLink to="/dashboard"><S.DashboardImgs as={LuLayoutDashboard} /> Dashboard</S.SidebarLink></S.SidebarItem>
          <S.SidebarItem><S.SidebarLink to="/bookings"><S.DashboardImgs as={LuCalendarRange} /> Bookings</S.SidebarLink></S.SidebarItem>
          <S.SidebarItem><S.SidebarLink to="/rooms"><S.DashboardImgs as={LuKeyRound} /> Rooms</S.SidebarLink></S.SidebarItem>
          <S.SidebarItem><S.SidebarLink to="/contacts"><S.DashboardImgs as={LuPhoneCall} /> Contact</S.SidebarLink></S.SidebarItem>
          <S.SidebarItem><S.SidebarLink to="/users"><S.DashboardImgs as={LuUser} /> Users</S.SidebarLink></S.SidebarItem>
        </S.SidebarList>
        <S.ProfileSection>
          <S.ProfilePic src={profileImg} alt="profile-pic" />
          <S.ProfileInfo>
            <S.ProfileName>{name}</S.ProfileName>
            <S.ProfileEmail>{email}</S.ProfileEmail>
          </S.ProfileInfo>
          <S.EditButton onClick={handleEditButtonClick}>Edit Profile</S.EditButton>
        </S.ProfileSection>
      </S.SidebarContainer>
      {isEditing && (
        <S.PopupContainer>
          <S.PopupTitle>Edit Profile</S.PopupTitle>
          <S.InputLabel>
            Name:
            <S.InputField
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
            />
          </S.InputLabel>
          <S.InputLabel>
            Email:
            <S.InputField
              type="email"
              value={tempEmail}
              onChange={(e) => setTempEmail(e.target.value)}
            />
          </S.InputLabel>
          <S.PopupButtonContainer>
            <S.SaveButton onClick={handleSaveChanges}>Save</S.SaveButton>
            <S.CancelButton onClick={handleClosePopup}>Cancel</S.CancelButton>
          </S.PopupButtonContainer>
        </S.PopupContainer>
      )}
    </>
  )
}

export default Sidebar