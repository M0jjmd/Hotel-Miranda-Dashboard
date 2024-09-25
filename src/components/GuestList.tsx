import React, { useEffect, useState } from 'react'
import * as S from '../styles/tablesForm'
import { Toast } from '../components/ToastNotification'
import { useAuth } from '../context/AuthContext'
import { GetBookings } from '../features/bookings/bookingsThunk'
import { useAppDispatch, useAppSelector } from '../app/store'
import EditableRow from './bookings/EditableRow'
import AddBooking from './bookings/AddBooking'
import { useNavigate } from 'react-router-dom'

const GuestList = () => {
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const { state, dispatch } = useAuth()

  const dispatchBooking = useAppDispatch()
  const bookings = useAppSelector((state) => state.bookings.data)
  const bookingsStatus = useAppSelector((state) => state.bookings.status)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      localStorage.clear()
      navigate('/')
      return
    }

    if (bookingsStatus === 'idle') {
      dispatchBooking(GetBookings())
      dispatch({ type: 'CLOSE_FORM' })
    }
    if (bookingsStatus === 'failed') {
      localStorage.clear()
      Toast({ message: 'your session expired, log in again', success: false })
      navigate('/')
    }
  }, [dispatchBooking, bookingsStatus, bookings.length])

  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(a.OrderDate)
    const dateB = new Date(b.OrderDate)
    return dateB.getTime() - dateA.getTime()
  })

  const handleFilterChange = (newFilter: string) => {
    setFilterStatus(newFilter)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  const handleFormToggle = () => {
    if (state.isFormOpen) {
      dispatch({ type: 'CLOSE_FORM' })
    } else {
      dispatch({ type: 'OPEN_FORM' })
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
        <S.Button data-testid="all-button" active={filterStatus === 'ALL'} onClick={() => handleFilterChange('ALL')}>All Bookings</S.Button>
        <S.Button data-testid="check-in-button" active={filterStatus === 'CHECK-IN'} onClick={() => handleFilterChange('CHECK-IN')}>Checking In</S.Button>
        <S.Button data-testid="check-out-button" active={filterStatus === 'CHECK-OUT'} onClick={() => handleFilterChange('CHECK-OUT')}>Checking Out</S.Button>
        <S.Button data-testid="in-progress-button" active={filterStatus === 'IN-PROGRESS'} onClick={() => handleFilterChange('IN-PROGRESS')}>In Progress</S.Button>
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