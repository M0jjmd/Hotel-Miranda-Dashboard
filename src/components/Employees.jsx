import React, { useState } from 'react'
import * as S from '../styles/tablesForm'

function Employees({ employees }) {
  const [filter, setFilter] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)

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

  const handleFormToggle = () => {
    setIsFormOpen(!isFormOpen)
  }

  const handleAddUser = () => {
    alert("Booking succesfully saved.")
    setIsFormOpen(false)
  }

  return (
    <S.Container>
      <S.FilterContainer>
        <S.SearchInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <S.Button active={filter === 'ALL'} onClick={() => handleFilterChange('ALL')}>All Employees</S.Button>
        <S.Button active={filter === 'ACTIVE'} onClick={() => handleFilterChange('ACTIVE')}>Active Employees</S.Button>
        <S.Button active={filter === 'INACTIVE'} onClick={() => handleFilterChange('INACTIVE')}>Inactive Employees</S.Button>
        <S.AddButton onClick={handleFormToggle}>Add Booking</S.AddButton>
      </S.FilterContainer>

      <S.FormContainer open={isFormOpen}>
        <label>Full Name</label>
        <S.Input type="text" placeholder="Enter full name" />

        <label>Position</label>
        <S.Select>
          <option value="Manager">Manager</option>
          <option value="Reception">Reception</option>
          <option value="Room Service">Room Service</option>
        </S.Select>

        <label>Email</label>
        <S.Input type="email" placeholder="Enter email" />

        <label>Phone Number</label>
        <S.Input type="tel" placeholder="Enter phone number" />

        <label>Start Date</label>
        <S.Input type="date" />

        <label>Job Description</label>
        <S.TextArea placeholder="Enter job description" />

        <label>Status</label>
        <S.ToggleButton active={true}>Active</S.ToggleButton>

        <label>Password</label>
        <S.Input type="password" placeholder="Enter password" />
        <S.Button onClick={handleAddUser}>Add Booking</S.Button>
      </S.FormContainer>

      {!isFormOpen && (
        <>
          {filteredEmployees.length > 0 ? (
            <S.Table>
              <S.TableHeader>
                <tr>
                  <S.HeaderCell>Name</S.HeaderCell>
                  <S.HeaderCell>Job Desk</S.HeaderCell>
                  <S.HeaderCell>Schedule</S.HeaderCell>
                  <S.HeaderCell>Contact</S.HeaderCell>
                  <S.HeaderCell>Status</S.HeaderCell>
                </tr>
              </S.TableHeader>
              <S.TableBody>
                {filteredEmployees.map(employee => (
                  <S.TableRow key={employee.IDdeEmpleado}>
                    <S.TableCell>
                      <S.TablePhoto src={employee.Foto} alt={employee.NombreCompleto} />
                      {employee.NombreCompleto}
                    </S.TableCell>
                    <S.TableCell>{employee.DescripciónDelPuesto}</S.TableCell>
                    <S.TableCell>{employee.FechaDeAlta}</S.TableCell>
                    <S.TableCell>{employee.Teléfono}</S.TableCell>
                    <S.TableCell>{employee.Estado}</S.TableCell>
                  </S.TableRow>
                ))}
              </S.TableBody>
            </S.Table>
          ) : (
            <S.NoResults>No search results found</S.NoResults>
          )
          }
        </>
      )}
    </S.Container>
  )
}

export default Employees