import { useAppSelector } from '../app/store'
import DashboardStats from './DashboardStats'

const DashboardStatsContainer = () => {
  const totalBookings = useAppSelector((state) => state.bookings.data.length)
  const reservedRooms = useAppSelector((state) => state.rooms.data.filter(room => room.Status === 'Reserved').length)
  const checkInsToday = useAppSelector((state) => state.checkIns.data.filter(checkIn => new Date(checkIn.date).toDateString() === new Date().toDateString()).length)
  const checkOutsToday = useAppSelector((state) => state.checkOuts.data.filter(checkOut => new Date(checkOut.date).toDateString() === new Date().toDateString()).length)

  return (
    <DashboardStats
      totalBookings={totalBookings}
      reservedRooms={reservedRooms}
      checkInsToday={checkInsToday}
      checkOutsToday={checkOutsToday}
    />
  )
}

export default DashboardStatsContainer
