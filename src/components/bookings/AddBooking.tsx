import React, { useState } from 'react'
import * as S from '../../styles/tablesForm'
import { useAuth } from '../../context/AuthContext'
import { CreateBooking, GetBookings } from '../../features/bookings/bookingsThunk'
import { useAppDispatch } from '../../app/store'
import { Booking } from '../../interfaces/bookingInterface'

const AddBooking = () => {
    const [formValues, setFormValues] = useState<Booking>({
        Guest: {
            Name: '',
            ReservationID: '',
        },
        OrderDate: '',
        CheckIn: '',
        CheckOut: '',
        SpecialRequest: '',
        RoomType: {
            Type: '',
            RoomNumber: '',
        },
        Status: 'CHECK-IN',
        id: '',
    })

    const addDispatch = useAppDispatch()
    const { dispatch } = useAuth()

    const generateRandomId = () => {
        return Math.floor(1000 + Math.random() * 9000).toString()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        const keys = name.split('.')

        setFormValues(prevValues => {
            if (!prevValues) return prevValues

            if (keys.length === 1) {
                return {
                    ...prevValues,
                    [keys[0] as keyof Booking]: value,
                }
            } else if (keys.length === 2) {
                const [mainKey, subKey] = keys
                return {
                    ...prevValues,
                    [mainKey as keyof Booking]: {
                        ...(prevValues[mainKey as keyof Booking] as any),
                        [subKey]: value,
                    },
                }
            }
            return prevValues
        })
    }

    const handleAddBooking = (e: React.FormEvent) => {
        e.preventDefault()

        const bookingWithId = {
            ...formValues,
            id: generateRandomId(),
        }

        addDispatch(CreateBooking(bookingWithId))
            .then(() => {
                addDispatch(GetBookings())
                setFormValues({
                    Guest: {
                        Name: '',
                        ReservationID: '',
                    },
                    OrderDate: '',
                    CheckIn: '',
                    CheckOut: '',
                    SpecialRequest: '',
                    RoomType: {
                        Type: '',
                        RoomNumber: '',
                    },
                    Status: 'CHECK-IN',
                    id: '',
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