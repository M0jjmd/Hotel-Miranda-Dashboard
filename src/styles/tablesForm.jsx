import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  padding: 1rem;
`

export const FilterContainer = styled.div`
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

export const Button = styled.button`
  background-color: ${props => (props.active ? '#007bff' : '#f8f9fa')};
  color: ${props => (props.active ? '#fff' : '#007bff')};
  border: 1px solid #007bff;
  border-radius: 4px;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => (props.active ? '#0056b3' : '#e2e6ea')};
  }
`

export const AddButton = styled(Button)`
  background-color: #28a745;
  color: white;
  margin-left: auto;
`

export const SearchInput = styled.input`
  padding: 0.8rem;
  font-size: 0.9rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1.1rem 0;
`

export const TableHeader = styled.thead`
  background-color: #f4f4f4;
`

export const HeaderCell = styled.th`
  padding: 0.8rem;
  text-align: left;
  border-bottom: 2px solid #ddd;
`

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`

export const TableCell = styled.td`
  padding: 0.8rem;
  border-bottom: 1px solid #ddd;
`

export const NoResults = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #666;
  text-align: center;
`

export const FormContainer = styled.div`
  flex-direction: column;
  background: white;
  padding: 1.3rem;
  border-radius: 0.8rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.3rem;
  display: ${({ open }) => (open ? 'flex' : 'none')};
`

export const Input = styled.input`
  margin-bottom: 0.8rem;
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 100%;
`

export const TablePhoto = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
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

export const Select = styled.select`
  margin-bottom: 0.8rem;
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 100%;
  appearance: none; 
  background-color: #fff;
`

export const ToggleButton = styled.button`
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  color: white;
  background-color: ${({ active }) => (active ? '#28a745' : '#dc3545')}; /* Green for active, red for inactive */
  
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

