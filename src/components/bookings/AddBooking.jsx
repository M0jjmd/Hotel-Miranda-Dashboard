import React, { useState } from 'react'
import * as S from '../../styles/tablesForm'
import { useAuth } from '../../context/AuthContext'
import { CreateBooking, GetBookings } from '../../features/bookings/bookingsThunk'
import { useDispatch } from 'react-redux'

const AddBooking = () => {
    const [formValues, setFormValues] = useState({
        Guest: {
            Name: '',
            ReservationID: '',
        },
        OrderDate: '',
        CheckIn: '',
        CheckOut: '',
        RoomType: {
            Type: '',
            RoomNumber: '',
        },
        Status: 'CHECK-IN',
    })

    const addDispatch = useDispatch()

    const generateRandomId = () => {
        return Math.floor(1000 + Math.random() * 9000)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        const keys = name.split('.')

        if (keys.length === 1) {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }))
        } else if (keys.length === 2) {
            setFormValues((prevValues) => ({
                ...prevValues,
                [keys[0]]: {
                    ...prevValues[keys[0]],
                    [keys[1]]: value,
                },
            }))
        }
    }

    const { dispatch } = useAuth()

    const handleAddBooking = (e) => {
        e.preventDefault()

        const bookingWithId = {
            ...formValues,
            id: generateRandomId().toString(),
        }

        addDispatch(CreateBooking(bookingWithId))
            .then(() => {
                alert('Booking successfully created!');
                addDispatch(GetBookings())
                dispatch({ type: 'CLOSE_FORM' })
                alert("Booking succesfully saved.")
            })
            .catch((error) => {
                console.error('Error creating booking:', error);
                alert('Failed to create booking.');
            })
    }

    return (
        <>
            <h1>TEST</h1>
            <S.FormContainer>
                <h3>Add New Booking</h3>
                <label>Guest Name</label>
                <S.Input
                    type="text"
                    name="Guest.Name"
                    placeholder="Guest Name"
                    value={formValues.Guest.Name}
                    onChange={handleChange}
                />
                <label>Reservation ID</label>
                <S.Input
                    type="text"
                    name="Guest.ReservationID"
                    placeholder="Reservation ID"
                    value={formValues.Guest.ReservationID}
                    onChange={handleChange}
                />
                <label>Order Date</label>
                <S.Input
                    type="date"
                    name="OrderDate"
                    value={formValues.OrderDate}
                    onChange={handleChange}
                />
                <label>Check-In Date</label>
                <S.Input
                    type="date"
                    name="CheckIn"
                    value={formValues.CheckIn}
                    onChange={handleChange}
                />
                <label>Check-Out Date</label>
                <S.Input
                    type="date"
                    name="CheckOut"
                    value={formValues.CheckOut}
                    onChange={handleChange}
                />
                <label>Room Type</label>
                <S.Input
                    type="text"
                    name="RoomType.Type"
                    placeholder="Room Type"
                    value={formValues.RoomType.Type}
                    onChange={handleChange}
                />
                <label>Room Number</label>
                <S.Input
                    type="text"
                    name="RoomType.RoomNumber"
                    placeholder="Room Number"
                    value={formValues.RoomType.RoomNumber}
                    onChange={handleChange}
                />
                <S.Button onClick={handleAddBooking}>Add Booking</S.Button>
            </S.FormContainer>
        </>
    )
}

export default AddBooking