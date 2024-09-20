import styled from 'styled-components'
import { AiOutlineSearch } from 'react-icons/ai'

export const HeaderContent = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.2rem;
  background-color: #f0f0f0;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`
export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

export const ToggleButton = styled.button`
  padding: 0rem 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
`

export const HeaderMenu = styled.div`
  display: flex;
  gap: 1rem;
`

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const SearchIcon = styled(AiOutlineSearch)`
  position: absolute;
  left: 0.8rem;
  font-size: 1rem;
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.6rem 0.6rem 0.6rem 2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #fff;
`

export const IconSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const Icon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
`