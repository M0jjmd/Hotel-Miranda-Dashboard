import React, { useState } from 'react'
import * as S from '../styles/tablesForm'
import styled from 'styled-components'

// const Container = styled.div`
//   width: 100%;
//   padding: 1.3rem;
// `

// const FilterContainer = styled.div`
//   margin-bottom: 1.3rem;
// `

// const Button = styled.button`
//   background-color: ${props => (props.active ? '#007bff' : '#f8f9fa')};
//   color: ${props => (props.active ? '#fff' : '#007bff')};
//   border: 1px solid #007bff;
//   border-radius: 4px;
//   padding: 0.8rem 1.3rem;
//   margin-right: 0.8rem;
//   cursor: pointer;
  
//   &:hover {
//     background-color: ${props => (props.active ? '#0056b3' : '#e2e6ea')};
//   }
// `

// const SearchInput = styled.input`
//   padding: 0.8rem;
//   font-size: 1rem;
//   border-radius: 4px;
//   border: 1px solid #ddd;
// `

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin: 1.3rem 0;
// `

// const TableHeader = styled.thead`
//   background-color: #f4f4f4;
// `

// const HeaderCell = styled.th`
//   padding: 0.9rem;
//   text-align: left;
//   border-bottom: 2px solid #ddd;
// `

// const TableBody = styled.tbody``;

// const TableRow = styled.tr`
//   &:nth-child(even) {
//     background-color: #f9f9f9;
//   }
// `

// const TableCell = styled.td`
//   padding: 0.9rem;
//   border-bottom: 1px solid #ddd;
// `

// const NoResults = styled.div`
//   margin-top: 1rem;
//   font-size: 1.2rem;
//   color: #666;
//   text-align: center;
// `

// const SortButton = styled(Button)`
//   background-color: #28a745;
//   color: white;
//   border: 1px solid #28a745;
// `

// const RoomPhoto = styled.img`
//   border-radius: 50%;
//   width: 50px;
//   height: 50px;
//   object-fit: cover;
// `

const RoomList = ({ rooms }) => {
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [isDescending, setIsDescending] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)

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

  const handleFormToggle = () => {
    setIsFormOpen(!isFormOpen)
  }

  const handleAddRoom = () => {
    alert("Booking succesfully saved.")
    setIsFormOpen(false)
  }
  return (
    <S.Container>
      <S.FilterContainer>
        <S.Button active={filterStatus === 'ALL'} onClick={() => handleStatusFilterChange('ALL')}>All Rooms</S.Button>
        <S.Button active={filterStatus === 'Available'} onClick={() => handleStatusFilterChange('Available')}>Available</S.Button>
        <S.Button active={filterStatus === 'Booked'} onClick={() => handleStatusFilterChange('Booked')}>Booked</S.Button>
        <S.SortButton onClick={toggleSortOrder}>
          Sort by Price (Desc)
        </S.SortButton>
        <S.SearchInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <S.AddButton onClick={handleFormToggle}>Add Booking</S.AddButton>
      </S.FilterContainer>

      <S.FormContainer open={isFormOpen}>
        <label>Photos (min 3, max 5)</label>
        <S.Input type="file" multiple accept="image/*" />

        <label>Room Type</label>
        <S.Select>
          <option value="Single Bed">Single Bed</option>
          <option value="Double Bed">Double Bed</option>
          <option value="Suite">Suite</option>
          <option value="Family Room">Family Room</option>
        </S.Select>

        <label>Room Number</label>
        <S.Input type="text" placeholder="Enter room number" />

        <label>Description</label>
        <S.TextArea placeholder="Enter room description" />

        <label>Offer</label>
        <S.ToggleButton active={true}>YES</S.ToggleButton>

        <label>Price (per night)</label>
        <S.Input type="number" placeholder="Enter price per night" />

        <label>Discount (%)</label>
        <S.Input type="number" placeholder="Enter discount percentage" />

        <label>Cancellation Policy</label>
        <S.TextArea placeholder="Enter cancellation policy" />

        <label>Amenities</label>
        <S.Select multiple>
          <option value="TV">TV</option>
          <option value="Bathtub">Bathtub</option>
          <option value="Sea View">Sea View</option>
          <option value="WiFi">WiFi</option>
          <option value="Air Conditioning">Air Conditioning</option>
        </S.Select>
        <S.Button onClick={handleAddRoom}>Add Booking</S.Button>
      </S.FormContainer>
      {!isFormOpen && (
        <>
          {filteredRooms.length > 0 ? (
            <S.Table>
              <S.TableHeader>
                <tr>
                  <S.HeaderCell>Photo</S.HeaderCell>
                  <S.HeaderCell>Room Number</S.HeaderCell>
                  <S.HeaderCell>Bed Type</S.HeaderCell>
                  <S.HeaderCell>Facilities</S.HeaderCell>
                  <S.HeaderCell>Rate</S.HeaderCell>
                  <S.HeaderCell>Offer Price</S.HeaderCell>
                  <S.HeaderCell>Status</S.HeaderCell>
                </tr>
              </S.TableHeader>
              <S.TableBody>
                {filteredRooms.map(room => (
                  <S.TableRow key={room.RoomID}>
                    <S.TableCell><S.TablePhoto src={room.Photo} alt={room.RoomNumber} /></S.TableCell>
                    <S.TableCell>{room.RoomNumber}</S.TableCell>
                    <S.TableCell>{room.BedType}</S.TableCell>
                    <S.TableCell>{room.Facilities.join(', ')}</S.TableCell>
                    <S.TableCell>${room.Rate}</S.TableCell>
                    <S.TableCell>${room.OfferPrice}</S.TableCell>
                    <S.TableCell>{room.Status}</S.TableCell>
                  </S.TableRow>
                ))}
              </S.TableBody>
            </S.Table>
          ) : (
            <S.NoResults>No search results found</S.NoResults>
          )}
        </>
      )}
    </S.Container>
  )
}

export default RoomList
