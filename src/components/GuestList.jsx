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
  cursor: pointer;
  
  &:hover {
    background-color: ${props => (props.active ? '#0056b3' : '#e2e6ea')};
  }
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

const GuestList = ({ bookings }) => {
    const [filter, setFilter] = useState('ALL')

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    }

    const filteredBookings = bookings.filter(bookings => {
        if (filter === 'CHECK-IN') return bookings.Status === 'CHECK-IN'
        if (filter === 'CHECK-OUT') return bookings.Status === 'CHECK-OUT'
        if (filter === 'IN-PROGRESS') return bookings.Status === 'IN-PROGRESS'
        return true
    })

    return (
        <Container>
            <FilterContainer>
                <Button active={filter === 'ALL'} onClick={() => handleFilterChange('ALL')}>All Bookings</Button>
                <Button active={filter === 'CHECK-IN'} onClick={() => handleFilterChange('CHECK-IN')}>Checking In</Button>
                <Button active={filter === 'CHECK-OUT'} onClick={() => handleFilterChange('CHECK-OUT')}>Checking Out</Button>
                <Button active={filter === 'IN-PROGRESS'} onClick={() => handleFilterChange('IN-PROGRESS')}>In Progress</Button>
            </FilterContainer>
            <Table>
                <TableHeader>
                    <tr>
                        <HeaderCell>Guest</HeaderCell>
                        <HeaderCell>Reservation ID</HeaderCell>
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
                            <TableCell>{booking.Guest.ReservationID}</TableCell>
                            <TableCell>{booking.CheckIn}</TableCell>
                            <TableCell>{booking.CheckOut}</TableCell>
                            <TableCell>{`${booking.RoomType.Type} (${booking.RoomType.RoomNumber})`}</TableCell>
                            <TableCell>{booking.Status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    )
}

export default GuestList