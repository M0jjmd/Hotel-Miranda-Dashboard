import React, { useEffect, useState } from 'react'
import * as S from '../styles/tablesForm'
import { useDispatch, useSelector } from 'react-redux'
import { GetBookings } from '../features/bookings/bookingsThunk'
import EditableRow from './bookings/EditableRow'
import { useAuth } from '../context/AuthContext'
import AddBooking from './bookings/AddBooking'

const GuestList = () => {
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const { state, dispatch } = useAuth()

  const dispatchBooking = useDispatch()
  const bookings = useSelector((state) => state.bookings.data)
  const bookingsStatus = useSelector((state) => state.bookings.status)

  useEffect(() => {
    if (bookingsStatus === 'idle') {
      dispatchBooking(GetBookings())
    }
  }, [dispatchBooking, bookingsStatus])

  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(a.OrderDate)
    const dateB = new Date(b.OrderDate)
    return dateB - dateA
  })

  const handleFilterChange = (newFilter) => {
    setFilterStatus(newFilter)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  const handleFormToggle = () => {
    if (state.isFormOpen) {
      dispatch({ type: 'CLOSE_FORM' });
    } else {
      dispatch({ type: 'OPEN_FORM' });
    }
  }

  const filteredBookings = sortedBookings
    .filter(booking => {
      if (filterStatus !== 'ALL' && booking.Status !== filterStatus) return false
      const combinedString = JSON.stringify(booking).toLowerCase()
      return combinedString.includes(searchTerm)
    })

  return (
    <S.Container>
      <S.FilterContainer>
        <S.SearchInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <S.Button active={filterStatus === 'ALL'} onClick={() => handleFilterChange('ALL')}>All Bookings</S.Button>
        <S.Button active={filterStatus === 'CHECK-IN'} onClick={() => handleFilterChange('CHECK-IN')}>Checking In</S.Button>
        <S.Button active={filterStatus === 'CHECK-OUT'} onClick={() => handleFilterChange('CHECK-OUT')}>Checking Out</S.Button>
        <S.Button active={filterStatus === 'IN-PROGRESS'} onClick={() => handleFilterChange('IN-PROGRESS')}>In Progress</S.Button>
        <S.AddButton onClick={handleFormToggle}>Add Booking</S.AddButton>
      </S.FilterContainer>
      {state.isFormOpen ? (
        <>
          <AddBooking />
        </>
      ) : (
        <>
          {filteredBookings.length > 0 ? (
            <S.Table>
              <S.TableHeader>
                <tr>
                  <S.HeaderCell>Guest</S.HeaderCell>
                  <S.HeaderCell>Order Date</S.HeaderCell>
                  <S.HeaderCell>Check-In</S.HeaderCell>
                  <S.HeaderCell>Check-Out</S.HeaderCell>
                  <S.HeaderCell>Room</S.HeaderCell>
                  <S.HeaderCell>Status</S.HeaderCell>
                  <S.HeaderCell>Actions</S.HeaderCell>
                </tr>
              </S.TableHeader>
              <EditableRow filteredBookings={filteredBookings} />
            </S.Table>
          ) : (
            <S.NoResults>No search results found</S.NoResults>
          )}
        </>
      )}
    </S.Container>
  )
}

export default GuestList