import styled from 'styled-components';
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineMenuFold } from "react-icons/ai";

const HeaderContent = styled.header`
  background-color: #333;
  color: #fff;
  padding: 1rem;
  display: flex;

  // text-align: center;
`

const ToggleButton = styled.button`
  padding: 0rem 0.5rem;
  // background-color: #007bff;
  // color: white;
  // width: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

const MenuFold = styled(AiOutlineMenuFold)`
    font-size: 1.2rem;
`

const MenuUnfold = styled(AiOutlineMenuUnfold)`
    font-size: 1.2rem;
`

const Header = ({ toggleSidebar, isSidebarVisible }) => {
  return (
    <>
      <HeaderContent>
        <ToggleButton onClick={toggleSidebar}>
          {isSidebarVisible ? < MenuFold /> : <MenuUnfold />}
        </ToggleButton>
        <h1>header</h1>
      </HeaderContent>
    </>
  )
}

export default Header