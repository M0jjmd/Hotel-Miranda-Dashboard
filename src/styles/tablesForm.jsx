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
  color: ${props => (props.active ? '#f8f9fa' : '#007bff')};
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

export const SelectContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Option = styled.div`
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
`;

export const Dot = styled.span`
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.isSelected ? '#007bff' : '#ccc'};
    margin-right: 8px;
`;
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
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;
`

export const MenuItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`