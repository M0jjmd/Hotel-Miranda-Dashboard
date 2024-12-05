import styled from "styled-components"
import { colors, fontSize } from "./tablesForm"

export const TableBody = styled.tbody``

export const MenuItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: ${colors.light};
  }
`

export const TableCell = styled.td`
  padding: 1rem;
  font-size: ${fontSize.small};
  border-bottom: 1px solid #ddd;
 `

export const TableCellUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center; 
  gap: 0.5rem; 
  width: 100%; 
`

export const TablePhoto = styled.img`
  display: block; 
  margin: 0 auto;
  border-radius: 50%;
  width: 65px;
  height: 65px;
  object-fit: cover;
`

export const StatusButton = styled.button<{ active: boolean }>`
  padding: 8px 12px;
  font-size: 14px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#28a745' : '#dc3545')};
  &:hover {
    opacity: 0.9;
  }
`

export const StatusSpan = styled.span<{ active: boolean }>`
  font-weight: bold;
  color: ${({ active }) => (active ? '#28a745' : '#dc3545')};
`

export const ActionMenu = styled.div`
  position: relative;
`

export const MoreButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`

export const Menu = styled.div`
  position: absolute;
  left: 1rem;
  top: 0;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;
`