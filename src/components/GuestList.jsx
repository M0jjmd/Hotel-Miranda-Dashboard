import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  padding: 1rem;
`

const FilterContainer = styled.div`
  margin-bottom: 1.1rem;
`

const Button = styled.button`
  background-color: ${props => (props.active ? '#007bff' : '#f8f9fa')};
  color: ${props => (props.active ? '#fff' : '#007bff')};
  border: 1px solid #007bff;
  border-radius: 4px;
  padding: 0.8rem 1.2rem;
  margin-right: 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => (props.active ? '#0056b3' : '#e2e6ea')};
  }
`

const SearchInput = styled.input`
  padding: 0.8rem;
  font-size: 0.9rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1.1rem 0;
`

const TableHeader = styled.thead`
  background-color: #f4f4f4;
`

const HeaderCell = styled.th`
  padding: 0.8rem;
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
  padding: 0.8rem;
  border-bottom: 1px solid #ddd;
`

const NoResults = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #666;
  text-align: center;
`

const GuestList = ({ bookings }) => {
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')

  const handleFilterChange = (newFilter) => {
    setFilterStatus(newFilter);
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }

  const sortedRooms = bookings.sort((a, b) => {
    const dateA = new Date(a.OrderDate)
    const dateB = new Date(b.OrderDate)
    return dateB - dateA
  })

  const filteredBookings = sortedRooms
    .filter(bookings => {
      if (filterStatus !== 'ALL' && bookings.Status !== filterStatus) return false
      const combinedString = JSON.stringify(bookings).toLowerCase()
      return combinedString.includes(searchTerm)
    })

  return (
    <Container>
      <FilterContainer>
        <Button active={filterStatus === 'ALL'} onClick={() => handleFilterChange('ALL')}>All Bookings</Button>
        <Button active={filterStatus === 'CHECK-IN'} onClick={() => handleFilterChange('CHECK-IN')}>Checking In</Button>
        <Button active={filterStatus === 'CHECK-OUT'} onClick={() => handleFilterChange('CHECK-OUT')}>Checking Out</Button>
        <Button active={filterStatus === 'IN-PROGRESS'} onClick={() => handleFilterChange('IN-PROGRESS')}>In Progress</Button>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </FilterContainer>
      {filteredBookings.length > 0 ? (
        <Table>
          <TableHeader>
            <tr>
              <HeaderCell>Guest</HeaderCell>
              <HeaderCell>Order Date</HeaderCell>
              <HeaderCell>Check-In</HeaderCell>
              <HeaderCell>Check-Out</HeaderCell>
              <HeaderCell>Room</HeaderCell>
              <HeaderCell>Status</HeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {filteredBookings.map(booking => (
              <TableRow key={booking.Guest.ReservationID}>
                <TableCell>{booking.Guest.Name}</TableCell>
                <TableCell>{booking.OrderDate}</TableCell>
                <TableCell>{booking.CheckIn}</TableCell>
                <TableCell>{booking.CheckOut}</TableCell>
                <TableCell>{`${booking.RoomType.Type} (${booking.RoomType.RoomNumber})`}</TableCell>
                <TableCell>{booking.Status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <NoResults>No search results found</NoResults>
      )}

    </Container>
  )
}

export default GuestList