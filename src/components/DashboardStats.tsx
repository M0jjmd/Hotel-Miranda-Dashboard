import * as S from '../styles/DashboardStatsStyles'

interface DashboardStatsProps {
  totalBookings: number
  reservedRooms: number
  checkInsToday: number
  checkOutsToday: number
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ totalBookings, reservedRooms, checkInsToday, checkOutsToday }) => {
  const stats = [
    { label: "Bookings", value: totalBookings, icon: "📖" },
    { label: "Reserved Rooms", value: reservedRooms, icon: "🏨" },
    { label: "Check-Ins Today", value: checkInsToday, icon: "✅" },
    { label: "Check-Outs Today", value: checkOutsToday, icon: "🚪" },
  ];

  return (
    <S.Container>
      {stats.map((stat, index) => (
        <S.StatCard key={index}>
          <S.Icon>{stat.icon}</S.Icon>
          <S.Label>{stat.label}</S.Label>
          <S.Value>{stat.value}</S.Value>
        </S.StatCard>
      ))}
    </S.Container>
  )
}

export default DashboardStats