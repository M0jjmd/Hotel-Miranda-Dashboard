import * as S from '../styles/headerStyles'
import { AiOutlineMenuUnfold, AiOutlineMenuFold, AiOutlineMail, AiOutlineBell, AiOutlineLogout } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useDispatch } from 'react-redux'
import { logout } from '../features/login/loginUserSlice'

interface HeaderProps {
  toggleSidebar: () => void
  isVisible: boolean
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isVisible }) => {
  const { dispatch } = useAuth()
  const [title, setTitle] = useState<string>('Page Not Found')
  const logoutDispatch = useDispatch()

  const location = useLocation()
  const navigate = useNavigate()


  useEffect(() => {
    const titles: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/bookings': 'Bookings',
      '/rooms': 'Rooms',
      '/contact': 'Contact',
      '/users': 'Users',
    }

    setTitle(titles[location.pathname] || 'Page Not Found')
  }, [[location.pathname]])

  const logOutUser = () => {
    logoutDispatch(logout())
    localStorage.clear()
    dispatch({ type: 'LOGOUT' })
    navigate("/")
  }

  return (
    <>
      <S.HeaderContent>
        <S.HeaderTitle>
          <S.ToggleButton onClick={toggleSidebar}>
            {isVisible ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
          </S.ToggleButton>
          <h1>{title}</h1>
        </S.HeaderTitle>
        <S.HeaderMenu>
          <S.SearchContainer>
            <S.SearchInput type="text" placeholder="Buscar..." />
            <S.SearchIcon />
          </S.SearchContainer>
          <S.IconSection>
            <S.Icon as={AiOutlineMail} />
            <S.Icon as={AiOutlineBell} />
            <S.Icon as={AiOutlineLogout} onClick={logOutUser} />
          </S.IconSection>
        </S.HeaderMenu>
      </S.HeaderContent>
    </>
  )
}

export default Header