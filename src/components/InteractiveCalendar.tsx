import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import styled from 'styled-components'

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;

  .react-calendar {
    width: 100%;
    border: none;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
  }

  .react-calendar__tile--active {
    background-color: #007bff !important;
    color: #fff !important;
    border-radius: 8px;
  }

  .react-calendar__tile {
    padding: 0.75rem;
    font-size: 1rem;
    text-align: center;
  }

  .react-calendar__navigation button {
    color: #007bff;
    font-weight: bold;
  }

  .selected-date {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: #333;
  }
`

const MyInteractiveCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | [Date, Date] | null>(null)

  const handleDateChange = (value: Date | [Date, Date]) => {
    setSelectedDate(value)
    console.log('Selected date:', value)
  }

  return (
    <CalendarContainer>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
      />
      {selectedDate && (
        <p className="selected-date">
          Fecha seleccionada:{' '}
          {Array.isArray(selectedDate)
            ? `${selectedDate[0]?.toLocaleDateString()} - ${selectedDate[1]?.toLocaleDateString()}`
            : selectedDate.toLocaleDateString()}
        </p>
      )}
    </CalendarContainer>
  )
}

export default MyInteractiveCalendar
