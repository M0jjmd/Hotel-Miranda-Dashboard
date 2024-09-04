import styled from "styled-components"
import { Link } from "react-router-dom"

export interface isVisibleInterface {
    isVisible: boolean
}

export const SidebarContainer = styled.aside<isVisibleInterface>`
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

export const SidebarList = styled.ul`
    list-style-type: none;
    padding: 0;
  `

export const SidebarItem = styled.li`
    margin-bottom: 1rem;
  `

export const SidebarLink = styled(Link)`
    text-decoration: none;
    color: #333;
    display: block;
  
    &:hover {
      text-decoration: underline;
    }
  `

export const Logo = styled.img`
      width: 40%;
  `

export const DashboardImgs = styled.div`
    font-size: 1rem;
  `

export const ProfileSection = styled.div`
    margin-top: 2rem;
    border-top: 1px solid #ddd;
    padding-top: 1rem;
    text-align: center;
    background-color: #d3c6c6;
  `

export const ProfilePic = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 0.5rem;
  `

export const ProfileName = styled.h4`
    margin: 0.5rem 0;
    font-size: 1rem;
    color: #333;
  `

export const ProfileEmail = styled.p`
    margin: 0.5rem 0;
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
    
    &:hover {
      background-color: #0056b3;
    }
  `