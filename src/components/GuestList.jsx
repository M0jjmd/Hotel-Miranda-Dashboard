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

const GuestList = ({ bookings }) => {
    const [filter, setFilter] = useState('ALL')

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    }

    const getFilteredBookings = () => {
        const now = new Date()
        return bookings.filter(booking => {
            if (filter === 'CHECKING_IN') {
                return new Date(booking.CheckIn) >= now
            } else if (filter === 'CHECKING_OUT') {
                return new Date(booking.CheckOut) >= now
            } else if (filter === 'IN_PROGRESS') {
                const checkIn = new Date(booking.CheckIn)
                const checkOut = new Date(booking.CheckOut)
                return checkIn <= now && checkOut >= now
            }
            return true
        }).sort((a, b) => {
            const dateA = new Date(filter === 'CHECKING_OUT' ? a.CheckOut : a.CheckIn)
            const dateB = new Date(filter === 'CHECKING_OUT' ? b.CheckOut : b.CheckIn)
            return dateB - dateA
        })
    }

    const filteredBookings = getFilteredBookings()

    return (
        <Container>
            <FilterContainer>
                <Button active={filter === 'ALL'} onClick={() => handleFilterChange('ALL')}>All Bookings</Button>
                <Button active={filter === 'CHECKING_IN'} onClick={() => handleFilterChange('CHECKING_IN')}>Checking In</Button>
                <Button active={filter === 'CHECKING_OUT'} onClick={() => handleFilterChange('CHECKING_OUT')}>Checking Out</Button>
                <Button active={filter === 'IN_PROGRESS'} onClick={() => handleFilterChange('IN_PROGRESS')}>In Progress</Button>
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

// import React from 'react'

// function GuestList() {
//   return (
//     <div>GuestList</div>
//   )
// }

// export default GuestList