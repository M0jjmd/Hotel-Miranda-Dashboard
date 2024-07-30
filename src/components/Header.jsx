import styled from 'styled-components';
import { AiOutlineMenuUnfold, AiOutlineMenuFold, AiOutlineSearch, AiOutlineMail, AiOutlineBell, AiOutlineLogout } from "react-icons/ai"

const HeaderContent = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #f0f0f0;
  height: 60px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`
const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
  return (
    <>
      <HeaderContent>
        <HeaderTitle>
          <ToggleButton onClick={toggleSidebar}>
            {isSidebarVisible ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
          </ToggleButton>
          <h1>Dashboard</h1>
        </HeaderTitle>
        <HeaderMenu>
          <SearchContainer>
            <SearchInput type="text" placeholder="Buscar..." />
            <SearchIcon />
          </SearchContainer>
          <IconSection>
            <Icon as={AiOutlineMail} />
            <Icon as={AiOutlineBell} />
            <Icon as={AiOutlineLogout} />
          </IconSection>
        </HeaderMenu>
      </HeaderContent>
    </>
  )
}

export default Header