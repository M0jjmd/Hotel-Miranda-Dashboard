import styled from 'styled-components'
import { AiOutlineMenuUnfold, AiOutlineMenuFold, AiOutlineSearch, AiOutlineMail, AiOutlineBell, AiOutlineLogout } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const HeaderContent = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.2rem;
  background-color: #f0f0f0;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`
const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

const ToggleButton = styled.button`
  padding: 0rem 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
`

const HeaderMenu = styled.div`
  display: flex;
  gap: 1rem;
`

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const SearchIcon = styled(AiOutlineSearch)`
  position: absolute;
  left: 0.8rem;
  font-size: 1rem;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.6rem 0.6rem 0.6rem 2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #fff;
`

const IconSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const Icon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
`

const Header = ({ toggleSidebar, isSidebarVisible }) => {
  const { state, dispatch } = useAuth()
  const [title, setTitle] = useState()

  const location = useLocation()
  const navigate = useNavigate()


  useEffect(() => {
    const titles = {
      '/dashboard': 'Dashboard',
      '/bookings': 'Bookings',
      '/rooms': 'Rooms',
      '/contact': 'Contact',
      '/users': 'Users',
    }

    setTitle(titles[location.pathname] || 'Page Not Found');
  }, [[location.pathname]])

  const logOut = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('name')
    localStorage.removeItem('email')

    dispatch({ type: 'LOGOUT' });

    navigate("/")
  }

  return (
    <>
      <HeaderContent>
        <HeaderTitle>
          <ToggleButton onClick={toggleSidebar}>
            {isSidebarVisible ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
          </ToggleButton>
          <h1>{title}</h1>
        </HeaderTitle>
        <HeaderMenu>
          <SearchContainer>
            <SearchInput type="text" placeholder="Buscar..." />
            <SearchIcon />
          </SearchContainer>
          <IconSection>
            <Icon as={AiOutlineMail} />
            <Icon as={AiOutlineBell} />
            <Icon as={AiOutlineLogout} onClick={logOut} />
          </IconSection>
        </HeaderMenu>
      </HeaderContent>
    </>
  )
}

export default Header