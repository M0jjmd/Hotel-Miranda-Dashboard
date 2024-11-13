import styled from "styled-components"
import { Link } from "react-router-dom"

export interface isVisibleInterface {
  isVisible: boolean
}

export const SidebarContainer = styled.aside<isVisibleInterface>`
  flex: 1 0 15%;
  background-color: #F8F9FA;
  padding: 1rem;
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out;
  transform: ${props => (props.isVisible ? 'translateX(0)' : 'translateX(-100%)')};
  position: ${props => (props.isVisible ? 'relative' : 'absolute')};
  opacity: ${props => (props.isVisible ? '1' : '0')};
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 3rem;
`

export const Logo = styled.img`
  width: 4rem;
  margin-right: 0.75rem;
`

export const Title = styled.h1`
  font-size: 1.25rem;
  color: #333;
  margin: 0;
  text-align: center;
`

export const SidebarList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 4rem;
`

export const SidebarItem = styled.li`
  margin-bottom: 1rem;
`

export const SidebarLink = styled(Link)`
  font-size: 1.2rem;
  margin: 2rem 0rem;
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
    color: #0056b3;
  }
`

export const DashboardImgs = styled.div`
  font-size: 1.2rem;
  margin-right: 0.5rem;
`

export const ProfileSection = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  background-color: #E9ECEF;
`

export const ProfilePic = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
`

export const ProfileInfo = styled.div`
  margin-bottom: 0.5rem;
`

export const ProfileName = styled.h4`
  margin: 0.25rem 0;
  font-size: 1rem;
  color: #333;
`

export const ProfileEmail = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #666;
`

export const EditButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  outline: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`

export const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`

export const PopupTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin: 0;
  text-align: center;
`

export const InputLabel = styled.label`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
  display: block;
  text-align: left;
  width: 100%;
`

export const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
  }
`

export const PopupButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  width: 100%;
`

export const SaveButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`

export const CancelButton = styled.button`
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e2e6ea;
  }
`