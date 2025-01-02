import { useEffect } from 'react'
import { GetBookings } from '../features/bookings/bookingsThunk'
import { GetUsers } from '../features/users/usersThunk'
import { useAppDispatch, useAppSelector } from '../app/store'
import * as S from '../styles/DashboardStatsStyles'
import { GetRooms } from '../features/rooms/roomsThunk'

const DashboardStats = () => {
  const dispatch = useAppDispatch()
  const bookingsStatus = useAppSelector((state) => state.bookings.status)
  const usersStatus = useAppSelector((state) => state.users.status)
  const roomStatus = useAppSelector((state) => state.rooms.status)
  const bookings = useAppSelector((state) => state.bookings.data)
  const users = useAppSelector((state) => state.users.data)
  const rooms = useAppSelector((state) => state.rooms.data)

  useEffect(() => {
    if (bookingsStatus === 'idle') {
      dispatch(GetBookings())
      dispatch({ type: 'CLOSE_FORM' })
    }
    if (usersStatus === 'idle') {
      dispatch(GetUsers())
      dispatch({ type: 'CLOSE_FORM' })
    }
    if (roomStatus === 'idle') {
      dispatch(GetRooms())
      dispatch({ type: 'CLOSE_FORM' })
    }
  })

  const totalCheckIns = bookings.filter(
    (booking) => booking.Status === 'check-in'
  ).length

  const totalCheckOuts = bookings.filter(
    (booking) => booking.Status === 'check-out'
  ).length

  const totalOnProgress = bookings.filter(
    (booking) => booking.Status === 'on-progress'
  ).length

  return (
    <S.StatsContainer>
      <S.StatsCard>
        <S.CardHeader>Bookings</S.CardHeader>
        <S.CardContent>{bookings.length}</S.CardContent>
      </S.StatsCard>
      <S.StatsCard>
        <S.CardHeader>Total Check-ins</S.CardHeader>
        <S.CardContent>{users.length}</S.CardContent>
      </S.StatsCard>
      <S.StatsCard>
        <S.CardHeader>Total Check-outs</S.CardHeader>
        <S.CardContent>{rooms.length}</S.CardContent>
      </S.StatsCard>
      <S.StatsCard>
        <S.CardHeader>Total On Progress</S.CardHeader>
        <S.CardContent>{rooms.length}</S.CardContent>
      </S.StatsCard>
    </S.StatsContainer>
  )
}

export default DashboardStats