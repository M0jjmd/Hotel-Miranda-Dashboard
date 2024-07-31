// Employees.jsx
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

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  const filteredEmployees = employees.filter(employee => {
    if (filter === 'ACTIVE') return employee.Estado === 'ACTIVE'
    if (filter === 'INACTIVE') return employee.Estado === 'INACTIVE'
    return true
  })

  return (
    <Container>
      <FilterContainer>
        <Button active={filter === 'ALL'} onClick={() => handleFilterChange('ALL')}>All Employees</Button>
        <Button active={filter === 'ACTIVE'} onClick={() => handleFilterChange('ACTIVE')}>Active Employees</Button>
        <Button active={filter === 'INACTIVE'} onClick={() => handleFilterChange('INACTIVE')}>Inactive Employees</Button>
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

// import React, { useState } from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
//   width: 100%;
//   padding: 20px;
// `;

// const FilterContainer = styled.div`
//   margin-bottom: 20px;
// `;

// const Button = styled.button`
//   background-color: ${props => (props.active ? '#007bff' : '#f8f9fa')};
//   color: ${props => (props.active ? '#fff' : '#007bff')};
//   border: 1px solid #007bff;
//   border-radius: 4px;
//   padding: 10px 20px;
//   margin-right: 10px;
//   cursor: pointer;
  
//   &:hover {
//     background-color: ${props => (props.active ? '#0056b3' : '#e2e6ea')};
//   }
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin: 1rem 0;
// `;

// const TableHeader = styled.thead`
//   background-color: #f4f4f4;
// `;

// const HeaderCell = styled.th`
//   padding: 12px;
//   text-align: left;
//   border-bottom: 2px solid #ddd;
// `;

// const TableBody = styled.tbody``;

// const TableRow = styled.tr`
//   &:nth-child(even) {
//     background-color: #f9f9f9;
//   }
// `;

// const TableCell = styled.td`
//   padding: 12px;
//   border-bottom: 1px solid #ddd;
// `;

// const EmployeePhoto = styled.img`
//   border-radius: 50%;
//   width: 50px;
//   height: 50px;
//   object-fit: cover;
// `;

// function Employees({ employees }) {
//     const [filter, setFilter] = useState('ALL');

//     const handleFilterChange = (newFilter) => {
//         setFilter(newFilter);
//     };

//     const filteredEmployees = employees.filter(employee => {
//         if (filter === 'ACTIVE') return employee.Estado === 'ACTIVE';
//         if (filter === 'INACTIVE') return employee.Estado === 'INACTIVE';
//         return true; // ALL
//     });

//     return (
//         <Container>
//             <FilterContainer>
//                 <Button active={filter === 'ALL'} onClick={() => handleFilterChange('ALL')}>All Employees</Button>
//                 <Button active={filter === 'ACTIVE'} onClick={() => handleFilterChange('ACTIVE')}>Active Employees</Button>
//                 <Button active={filter === 'INACTIVE'} onClick={() => handleFilterChange('INACTIVE')}>Inactive Employees</Button>
//             </FilterContainer>
//             <Table>
//                 <TableHeader>
//                     <tr>
//                         <HeaderCell>Name</HeaderCell>
//                         <HeaderCell>Job Desk</HeaderCell>
//                         <HeaderCell>Schedule</HeaderCell>
//                         <HeaderCell>Contact</HeaderCell>
//                         <HeaderCell>Status</HeaderCell>
//                     </tr>
//                 </TableHeader>
//                 <TableBody>
//                     {employees.map(employee => (
//                         <TableRow key={employee.IDdeEmpleado}>
//                             <TableCell>
//                                 <EmployeePhoto src={employee.Foto} alt={employee.NombreCompleto} />
//                                 {employee.NombreCompleto}
//                             </TableCell>
//                             <TableCell>{employee.DescripciónDelPuesto}</TableCell>
//                             <TableCell>{employee.FechaDeAlta}</TableCell>
//                             <TableCell>{employee.Teléfono}</TableCell>
//                             <TableCell>{employee.Estado}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </Container>
//     );
// }

// export default Employees;