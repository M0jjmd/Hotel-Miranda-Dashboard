import { useEffect } from 'react'
// import { useAppSelector } from '../app/store'
import { GetBookings } from '../features/bookings/bookingsThunk'
import { useAppDispatch, useAppSelector } from '../app/store'
import * as S from '../styles/DashboardStatsStyles'

const DashboardStats = () => {
  const dispatch = useAppDispatch()
  const bookings = useAppSelector((state) => state.bookings.data)
  const bookingsStatus = useAppSelector((state) => state.bookings.status)

  useEffect(() => {
    if (bookingsStatus === 'idle') {
      dispatch(GetBookings())
      dispatch({ type: 'CLOSE_FORM' })
    }
    // if (bookingsStatus === 'failed') {

    //   localStorage.clear()
    //   Toast({ message: 'your session expired, log in again', success: false })
    //   navigate('/')
    // }
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
        <S.CardContent>{totalCheckIns}</S.CardContent>
      </S.StatsCard>
      <S.StatsCard>
        <S.CardHeader>Total Check-outs</S.CardHeader>
        <S.CardContent>{totalCheckOuts}</S.CardContent>
      </S.StatsCard>
      <S.StatsCard>
        <S.CardHeader>Total On Progress</S.CardHeader>
        <S.CardContent>{totalOnProgress}</S.CardContent>
      </S.StatsCard>
    </S.StatsContainer>
  )
}

export default DashboardStats