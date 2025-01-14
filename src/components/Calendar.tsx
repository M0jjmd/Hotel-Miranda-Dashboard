import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import styled from 'styled-components'

const CalendarContainer = styled.div`
    margin: 2rem auto;
    display: flex;
    justify-content: center;
    align-items: center;

    .react-calendar {
        border: 0.1rem solid #ccc;
        border-radius: 0.5rem;
        padding: 1rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        pointer-events: none; 
    }

    .react-calendar__tile--active {
        background: #007bff;
        color: white;
        border-radius: 0.5rem;
    }

    .react-calendar__tile--now {
        background: #f0f8ff;
        color: #333;
        border-radius: 0.5rem;
    }
`

const StaticCalendar = () => {
    return (
        <CalendarContainer>
            <Calendar />
        </CalendarContainer>
    )
}

export default StaticCalendar