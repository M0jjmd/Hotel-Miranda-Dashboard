import styled from "styled-components"

export const colors = {
  primary: "#007bff",
  primaryHover: "#0056b3",
  secondary: "#f8f9fa",
  secondaryHover: "#e2e6ea",
  success: "#28a745",
  successHover: "#218838",
  danger: "#dc3545",
  dangerHover: "#c82333",
  text: "#333",
  light: "#f4f4f4",
}

export const fontSize = {
  small: "0.875rem",
  medium: "1rem",
  large: "1.25rem",
}

export const Container = styled.div`
  width: 100%;
  padding: 1.5rem;
  background-color: ${colors.secondary};
`

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

interface isActiveInterface {
  active?: boolean
}

export const Button = styled.button<{ active?: boolean }>`
  background-color: ${(props) => (props.active ? colors.primary : colors.secondary)};
  color: ${(props) => (props.active ? colors.secondary : colors.primary)};
  border: 1px solid ${colors.primary};
  border-radius: 0.5rem;
  padding: 0.8rem 1.2rem;
  font-size: ${fontSize.medium};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? colors.primaryHover : colors.secondaryHover)};
    color: ${(props) => (props.active ? colors.secondary : colors.primaryHover)};
  }
`

export const AddButton = styled(Button)`
  background-color: #28a745;
  color: white;
  margin-left: auto;
`

export const SearchInput = styled.input`
  flex-grow: 1;
  padding: 0.8rem 1rem;
  font-size: ${fontSize.medium};
  border: 1px solid #ddd;
  border-radius: 0.5rem;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 0.8rem;
  overflow: hidden;
`

export const TableHeader = styled.thead`
  background-color: ${colors.light};
`

export const HeaderCell = styled.th`
  padding: 1rem;
  font-size: ${fontSize.medium};
  text-align: left;
  color: ${colors.text};
  border-bottom: 2px solid #ddd;
`

export const NoResults = styled.div`
  text-align: center;
  font-size: ${fontSize.large};
  color: #666;
  margin-top: 2rem;
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 1.3rem;
  border-radius: 0.8rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.3rem;
`

export const Input = styled.input`
  margin-bottom: 0.8rem;
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 100%;
`

export const TextArea = styled.textarea`
  margin-bottom: 0.8rem;
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 100%;
  resize: vertical; 
  min-height: 100px;
`

export const SelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 0.8rem;
`

interface isSelectedInterface {
  isSelected: boolean
}

export const Option = styled.div<isSelectedInterface>`
    display: flex;
    align-items: center;
    padding: 8px;
    cursor: pointer;
    background: ${props => props.isSelected ? '#e0e0e0' : 'transparent'};
    border: 1px solid ${props => props.isSelected ? '#c0c0c0' : '#d0d0d0'};
    border-radius: 4px;
    margin: 2px 0;
    transition: background 0.3s, border-color 0.3s;
    
    &:hover {
        background: #f5f5f5;
    }
`

export const Dot = styled.span<isSelectedInterface>`
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.isSelected ? '#007bff' : '#ccc'};
    margin-right: 8px;
`
export const Select = styled.select`
  width: 100%;
  height: auto;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-size: 16px;
  appearance: none;
  outline: none;

  option {
    padding: 8px;
    background-color: #fff;
    color: #333;

    &:checked {
      background-color: #4caf50;
      color: #fff;
    }
  }

  &:focus {
    border-color: #4caf50;
  }
`

export const ToggleButton = styled.button<isActiveInterface>`
  padding: 0.8rem 1.2rem;
  margin-bottom: 0.8rem;
  font-size: 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  color: white;
  background-color: ${({ active }) => (active ? '#28a745' : '#dc3545')};
  
  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: none;
  }
`

export const SortButton = styled(Button)`
  background-color: #28a745;
  color: white;
  border: 1px solid #28a745;
`