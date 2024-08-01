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

const SortButton = styled(Button)`
  background-color: #28a745;
  color: white;
  border: 1px solid #28a745;
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

const RoomPhoto = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
`

const RoomList = ({ rooms }) => {
    const [filterStatus, setFilterStatus] = useState('ALL')
    const [isDescending, setIsDescending] = useState(false)

    const handleStatusFilterChange = (status) => {
        setFilterStatus(status)
    }

    const toggleSortOrder = () => {
        setIsDescending(!isDescending)
    }

    const filteredRooms = rooms
        .filter(room => {
            if (filterStatus !== 'ALL' && room.Status !== filterStatus) return false
            return true
        })
        .sort((a, b) => isDescending ? b.OfferPrice - a.OfferPrice : a.OfferPrice - b.OfferPrice)

    return (
        <Container>
            <FilterContainer>
                <Button active={filterStatus === 'ALL'} onClick={() => handleStatusFilterChange('ALL')}>All Rooms</Button>
                <Button active={filterStatus === 'Available'} onClick={() => handleStatusFilterChange('Available')}>Available</Button>
                <Button active={filterStatus === 'Booked'} onClick={() => handleStatusFilterChange('Booked')}>Booked</Button>
                <SortButton onClick={toggleSortOrder}>
                    Sort by Price (Desc)
                </SortButton>
            </FilterContainer>
            <Table>
                <TableHeader>
                    <tr>
                        <HeaderCell>Photo</HeaderCell>
                        <HeaderCell>Room Number</HeaderCell>
                        <HeaderCell>Bed Type</HeaderCell>
                        <HeaderCell>Facilities</HeaderCell>
                        <HeaderCell>Rate</HeaderCell>
                        <HeaderCell>Offer Price</HeaderCell>
                        <HeaderCell>Status</HeaderCell>
                    </tr>
                </TableHeader>
                <TableBody>
                    {filteredRooms.map(room => (
                        <TableRow key={room.RoomID}>
                            <TableCell><RoomPhoto src={room.Photo} alt={room.RoomNumber} /></TableCell>
                            <TableCell>{room.RoomNumber}</TableCell>
                            <TableCell>{room.BedType}</TableCell>
                            <TableCell>{room.Facilities.join(', ')}</TableCell>
                            <TableCell>${room.Rate}</TableCell>
                            <TableCell>${room.OfferPrice}</TableCell>
                            <TableCell>{room.Status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    )
}

export default RoomList
