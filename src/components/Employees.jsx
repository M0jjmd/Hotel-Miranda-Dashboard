import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  padding: 1.3rem;
`

const FilterContainer = styled.div`
  margin-bottom: 1.3rem;
`

const Button = styled.button`
  background-color: ${props => (props.active ? '#007bff' : '#f8f9fa')};
  color: ${props => (props.active ? '#fff' : '#007bff')};
  border: 1px solid #007bff;
  border-radius: 4px;
  padding: 0.8rem 1.3rem;
  margin-right: 0.8rem;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => (props.active ? '#0056b3' : '#e2e6ea')};
  }
`

const SearchInput = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1.3rem 0;
`

const TableHeader = styled.thead`
  background-color: #f4f4f4;
`

const HeaderCell = styled.th`
  padding: 0.9rem;
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
  padding: 0.9rem;
  border-bottom: 1px solid #ddd;
`

const EmployeePhoto = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
`

const NoResults = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #666;
  text-align: center;
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
      const combinedString = JSON.stringify(employee).toLowerCase()
      return combinedString.includes(searchTerm)
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

      {filteredEmployees.length > 0 ? (
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
      ) : (
        <NoResults>No search results found</NoResults>
      )
      }
    </Container >
  )
}

export default Employees