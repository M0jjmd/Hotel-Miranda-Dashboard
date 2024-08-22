import React, { useEffect, useState } from 'react'
import * as S from '../styles/tablesForm'
import { useDispatch, useSelector } from 'react-redux'
import { GetRooms } from '../features/rooms/roomsThunk'
import { useAuth } from '../context/AuthContext'
import AddRooms from './rooms/AddRooms'
import EditableRow from './rooms/EditableRow'

const RoomList = () => {
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [isDescending, setIsDescending] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { state, dispatch } = useAuth()

  const roomDispatch = useDispatch()
  const rooms = useSelector((state) => state.rooms.data)
  const roomsStatus = useSelector((state) => state.rooms.status)
  useEffect(() => {
    if (roomsStatus === 'idle') {
      roomDispatch(GetRooms())
      dispatch({ type: 'CLOSE_FORM' })
    }
  }, [roomDispatch, roomsStatus])

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
    if (state.isFormOpen) {
      dispatch({ type: 'CLOSE_FORM' })
    } else {
      dispatch({ type: 'OPEN_FORM' })
    }
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
        <S.Button active={filterStatus === 'ALL'} onClick={() => handleStatusFilterChange('ALL')}>All Rooms</S.Button>
        <S.Button active={filterStatus === 'Available'} onClick={() => handleStatusFilterChange('Available')}>Available</S.Button>
        <S.Button active={filterStatus === 'Booked'} onClick={() => handleStatusFilterChange('Booked')}>Booked</S.Button>
        <S.SortButton onClick={toggleSortOrder}>
          Sort by Price (Desc)
        </S.SortButton>
        <S.AddButton onClick={handleFormToggle}>Add Room</S.AddButton>
      </S.FilterContainer>

      {state.isFormOpen ? (
        <>
          <AddRooms />
        </>
      ) : (
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
                  <S.HeaderCell>Actions</S.HeaderCell>
                </tr>
              </S.TableHeader>
              <EditableRow filteredRooms={filteredRooms} />
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
