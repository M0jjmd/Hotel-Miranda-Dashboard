import React, { useState } from 'react'
import * as S from '../styles/tablesForm'

const GuestList = ({ bookings }) => {
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleFilterChange = (newFilter) => {
    setFilterStatus(newFilter)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  const handleFormToggle = () => {
    setIsFormOpen(!isFormOpen)
  }

  const handleAddBooking = () => {
    alert("Booking succesfully saved.")
    setIsFormOpen(false)
  }

  const sortedBookings = bookings.sort((a, b) => {
    const dateA = new Date(a.OrderDate)
    const dateB = new Date(b.OrderDate)
    return dateB - dateA
  })

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

      <S.FormContainer open={isFormOpen}>
        <h3>Add New Booking</h3>
        <label>Guest Name</label>
        <S.Input
          type="text"
          name="Guest.Name"
          placeholder="Guest Name"
          value={""}
        />
        <label>Reservation ID</label>
        <S.Input
          type="text"
          name="Guest.ReservationID"
          placeholder="Reservation ID"
          value={""}
        />
        <label>Order Date</label>
        <S.Input
          type="date"
          name="OrderDate"
          placeholder="Order Date"
          value={""}
        />
        <label>Check-In Date</label>
        <S.Input
          type="date"
          name="CheckIn"
          placeholder="Check-In Date"
          value={""}
        />
        <label>Check-Out Date</label>
        <S.Input
          type="date"
          name="CheckOut"
          placeholder="Check-Out Date"
          value={""}
        />
        <label>Room Type</label>
        <S.Input
          type="text"
          name="RoomType.Type"
          placeholder="Room Type"
          value={""}
        />
        <label>Room Number</label>
        <S.Input
          type="text"
          name="RoomType.RoomNumber"
          placeholder="Room Number"
          value={""}
        />
        <S.Button onClick={handleAddBooking}>Add Booking</S.Button>
      </S.FormContainer>
      {!isFormOpen && (
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
                </tr>
              </S.TableHeader>
              <S.TableBody>
                {filteredBookings.map(booking => (
                  <S.TableRow key={booking.Guest.ReservationID}>
                    <S.TableCell>{booking.Guest.Name}</S.TableCell>
                    <S.TableCell>{booking.OrderDate}</S.TableCell>
                    <S.TableCell>{booking.CheckIn}</S.TableCell>
                    <S.TableCell>{booking.CheckOut}</S.TableCell>
                    <S.TableCell>{`${booking.RoomType.Type} (${booking.RoomType.RoomNumber})`}</S.TableCell>
                    <S.TableCell>{booking.Status}</S.TableCell>
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

export default GuestList