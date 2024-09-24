import React, { useState } from 'react'
import * as S from '../../styles/tablesForm'
import { useAuth } from '../../context/AuthContext'
import { CreateBooking, GetBookings } from '../../features/bookings/bookingsThunk'
import { useAppDispatch } from '../../app/store'
import { BookingInterface } from '../../interfaces/bookingInterface'

const AddBooking = () => {
    const [formValues, setFormValues] = useState<BookingInterface>({
        Guest: {
            UserId: '',
            RoomId: 'test',
        },
        OrderDate: new Date(),
        CheckIn: new Date(),
        CheckOut: new Date(),
        SpecialRequest: '',
        RoomType: {
            Type: '',
            RoomNumber: '',
        },
        Status: 'CHECK-IN',
    })

    const addDispatch = useAppDispatch()
    const { dispatch } = useAuth()


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target

        if (name === 'CheckIn' || name === 'CheckOut') {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: new Date(value),
            }))
        } else if (name.startsWith('RoomType.')) {
            const key = name.split('.')[1]
            setFormValues((prevValues) => ({
                ...prevValues,
                RoomType: {
                    ...prevValues.RoomType,
                    [key]: value,
                },
            }))
        } else {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }))
        }
    }

    const handleAddBooking = (e: React.FormEvent) => {
        e.preventDefault()

        const storedUserId = localStorage.getItem('id') || ''

        const bookingWithUserId = {
            ...formValues,
            Guest: {
                ...formValues.Guest,
                UserId: storedUserId,
            },
            OrderDate: new Date(),
        }

        console.log(bookingWithUserId)

        addDispatch(CreateBooking(bookingWithUserId))
            .then(() => {
                addDispatch(GetBookings())
                setFormValues({
                    Guest: {
                        UserId: '',
                        RoomId: 'test',
                    },
                    OrderDate: new Date(),
                    CheckIn: new Date(),
                    CheckOut: new Date(),
                    SpecialRequest: '',
                    RoomType: {
                        Type: '',
                        RoomNumber: '',
                    },
                    Status: 'CHECK-IN',
                })
                dispatch({ type: 'CLOSE_FORM' })
            })
            .catch((error) => {
                console.error('Error creating booking:', error)
            })
    }

    return (
        <S.FormContainer>
            <h3>Add New Booking</h3>
            {/* <label>Guest Name</label>
            <S.Input
                type="text"
                name="Guest.Name"
                placeholder="Guest Name"
                value={formValues.Guest.Name}
                onChange={handleChange}
            /> */}
            {/* <label>Reservation ID</label>
            <S.Input
                type="text"
                name="Guest.ReservationID"
                placeholder="Reservation ID"
                value={formValues.Guest.ReservationID}
                onChange={handleChange}
            /> */}
            {/* <label>Order Date</label>
            <S.Input
                type="date"
                name="OrderDate"
                value={formValues.OrderDate}
                onChange={handleChange}
            /> */}
            <label>Check-In Date</label>
            <S.Input
                type="date"
                name="CheckIn"
                // value={formValues.CheckIn}
                value={formValues.CheckIn.toISOString().split('T')[0]}
                onChange={handleChange}
            />
            <label>Check-Out Date</label>
            <S.Input
                type="date"
                name="CheckOut"
                // value={formValues.CheckOut}
                value={formValues.CheckOut.toISOString().split('T')[0]}
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
            <label>Special Request</label>
            <S.Input
                type="text"
                name="SpecialRequest"
                placeholder="Special Request"
                value={formValues.SpecialRequest}
                onChange={handleChange}
            />
            <S.Button onClick={handleAddBooking}>Add Booking</S.Button>
        </S.FormContainer>
    )
}

export default AddBooking