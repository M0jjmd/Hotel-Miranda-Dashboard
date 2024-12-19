import React from 'react'
import styled from 'styled-components'
import { FaBed, FaRegCheckCircle, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'

interface DashboardStatsProps {
  totalBookings: number
  reservedRooms: number
  checkInsToday: number
  checkOutsToday: number
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ totalBookings, reservedRooms, checkInsToday, checkOutsToday }) => {
  return (
    <StatsContainer>
      <StatBox>
        <Icon><FaBed /></Icon>
        <Number>{totalBookings}</Number>
        <Label>Bookings</Label>
      </StatBox>
      <StatBox>
        <Icon><FaRegCheckCircle /></Icon>
        <Number>{reservedRooms}</Number>
        <Label>Reserved Rooms</Label>
      </StatBox>
      <StatBox>
        <Icon><FaSignInAlt /></Icon>
        <Number>{checkInsToday}</Number>
        <Label>Check-ins</Label>
      </StatBox>
      <StatBox>
        <Icon><FaSignOutAlt /></Icon>
        <Number>{checkOutsToday}</Number>
        <Label>Check-outs</Label>
      </StatBox>
    </StatsContainer>
  )
}

export default DashboardStats

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;
`

const StatBox = styled.div`
  width: 23%;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 20px;
  text-align: center;  // Asegúrate de que este valor sea uno válido
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Icon = styled.div`
  font-size: 2rem;
  color: #007bff;
`

const Number = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`

const Label = styled.div`
  margin-top: 10px;
  font-size: 1rem;
  color: #555;
`