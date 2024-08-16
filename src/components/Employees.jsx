import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  padding: 20px;
`

const FilterContainer = styled.div`
  margin-bottom: 20px;
`

const Button = styled.button`
  background-color: ${props => (props.active ? '#007bff' : '#f8f9fa')};
  color: ${props => (props.active ? '#fff' : '#007bff')};
  border: 1px solid #007bff;
  border-radius: 4px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => (props.active ? '#0056b3' : '#e2e6ea')};
  }
`

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 200px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`

const TableHeader = styled.thead`
  background-color: #f4f4f4;
`

const HeaderCell = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
`

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`

const EmployeePhoto = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
`

function Employees({ employees }) {
  const [filter, setFilter] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }

  const filteredEmployees = employees
    .filter(employee => {
      if (filter !== 'ALL' && employee.Estado !== filter) return false
      const searchFields = [
        employee.NombreCompleto.toLowerCase(),
        employee.IDdeEmpleado.toLowerCase(),
        employee.Email.toLowerCase(),
        employee.FechaDeAlta.toLowerCase(),
        employee.DescripciónDelPuesto.toLowerCase(),
        employee.Teléfono.toLowerCase(),
        employee.Estado.toLowerCase(),
      ]
      const searchMatch = searchFields.some(field => field.includes(searchTerm))
      if (searchTerm && !searchMatch) return false
      return true
    })

  return (
    <Container>
      <FilterContainer>
        <Button active={filter === 'ALL'} onClick={() => handleFilterChange('ALL')}>All Employees</Button>
        <Button active={filter === 'ACTIVE'} onClick={() => handleFilterChange('ACTIVE')}>Active Employees</Button>
        <Button active={filter === 'INACTIVE'} onClick={() => handleFilterChange('INACTIVE')}>Inactive Employees</Button>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </FilterContainer>
      <Table>
        <TableHeader>
          <tr>
            <HeaderCell>Name</HeaderCell>
            <HeaderCell>Job Desk</HeaderCell>
            <HeaderCell>Schedule</HeaderCell>
            <HeaderCell>Contact</HeaderCell>
            <HeaderCell>Status</HeaderCell>
          </tr>
        </TableHeader>
        <TableBody>
          {filteredEmployees.map(employee => (
            <TableRow key={employee.IDdeEmpleado}>
              <TableCell>
                <EmployeePhoto src={employee.Foto} alt={employee.NombreCompleto} />
                {employee.NombreCompleto}
              </TableCell>
              <TableCell>{employee.DescripciónDelPuesto}</TableCell>
              <TableCell>{employee.FechaDeAlta}</TableCell>
              <TableCell>{employee.Teléfono}</TableCell>
              <TableCell>{employee.Estado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  )
}

export default Employees