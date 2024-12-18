import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import HorizontalStats from './HorizontalStats';
import { fetchBookings, fetchRoomsData, fetchCheckIns, fetchCheckOuts } from '../features/stats/statsThunk'; // Suponiendo que tienes estas acciones

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  // Obtenemos los datos del store
  const bookings = useAppSelector((state) => state.bookings.data)
  const reservedRooms = useAppSelector((state) => state.rooms.data)
  const checkIns = useAppSelector((state) => state.bookings.data)

  useEffect(() => {
    // Dispatch para obtener los datos
    dispatch(fetchBookings());
    dispatch(fetchRoomsData());
    dispatch(fetchCheckIns());
    dispatch(fetchCheckOuts());
  }, [dispatch]);

  // Pasamos los valores al componente HorizontalStats
  return (
    <div>
      <h1>Dashboard</h1>
      <HorizontalStats
        totalBookings={bookings.length}
        reservedRooms={reservedRooms.length}
        checkInsToday={bookings.Status}
        checkOutsToday={bookings.length}
      />
    </div>
  );
};

export default Dashboard;