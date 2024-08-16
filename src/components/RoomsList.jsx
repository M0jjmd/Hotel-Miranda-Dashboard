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

const NoResults = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #666;
  text-align: center;
`

const SortButton = styled(Button)`
  background-color: #28a745;
  color: white;
  border: 1px solid #28a745;
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
  const [searchTerm, setSearchTerm] = useState('')

  const handleStatusFilterChange = (status) => {
    setFilterStatus(status)
  }

  const toggleSortOrder = () => {
    setIsDescending(!isDescending)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }

  const filteredRooms = rooms
    .filter(room => {
      if (filterStatus !== 'ALL' && room.Status !== filterStatus) return false
      const combinedString = JSON.stringify(room).toLowerCase()
      return combinedString.includes(searchTerm)
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
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </FilterContainer>
      {filteredRooms.length > 0 ? (
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
      ) : (
        <NoResults>No search results found</NoResults>
      )}

    </Container>
  )
}

export default RoomList
