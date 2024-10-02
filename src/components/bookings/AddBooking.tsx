import React, { useState } from 'react'
import * as S from '../../styles/tablesForm'
import { Toast } from '../../components/ToastNotification'
import { CreateBooking, GetBookings } from '../../features/bookings/bookingsThunk'
import { BookingInterface } from '../../interfaces/bookingInterface'
import { useAppDispatch } from '../../app/store'
import { useAuth } from '../../context/AuthContext'

const AddBooking: React.FC = () => {
    const [newBooking, setNewBooking] = useState<BookingInterface>({
        room_id: 0,
        order_date: new Date(),
        check_in: new Date(),
        check_out: new Date(),
        special_request: '',
        room_type: 'Single',
        status: 'checked-in',
    })

    const bookingDispatch = useAppDispatch()

    const formatDateForMySQL = (date: Date): string => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')

        return `${year}-${month}-${day} ${hours}:${minutes}:00`
    }

    const handleNewBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target

        if (name === 'room_type') {
            setNewBooking((prevValues) => ({
                ...prevValues,
                room_type: value as 'Single' | 'Double' | 'Suite',
            }))
        } else if (name === 'status') {
            setNewBooking((prevValues) => ({
                ...prevValues,
                status: value as 'checked-in' | 'checked-out',
            }))
        } else if (name === 'room_id') {
            setNewBooking((prevValues) => ({
                ...prevValues,
                [name]: Number(value),
            }))
        } else if (name === 'order_date' || name === 'check_in' || name === 'check_out') {
            setNewBooking((prevValues) => ({
                ...prevValues,
                [name]: new Date(value),
            }))
        } else {
            setNewBooking((prevValues) => ({
                ...prevValues,
                [name]: value,
            }))
        }
    }

    const { dispatch } = useAuth()
    const handleAddBooking = (e: React.FormEvent) => {
        e.preventDefault()
        const finalBooking = {
            ...newBooking,
            order_date: newBooking.order_date instanceof Date
                ? formatDateForMySQL(newBooking.order_date)
                : (typeof newBooking.order_date === 'string' ? newBooking.order_date : new Date()),
            check_in: newBooking.check_in instanceof Date
                ? formatDateForMySQL(newBooking.check_in)
                : (typeof newBooking.check_in === 'string' ? newBooking.check_in : new Date()),

            check_out: newBooking.check_out instanceof Date
                ? formatDateForMySQL(newBooking.check_out)
                : (typeof newBooking.check_out === 'string' ? newBooking.check_out : new Date()),
        }

        console.log(finalBooking)
        bookingDispatch(CreateBooking(finalBooking))
            .then(() => {
                bookingDispatch(GetBookings())
                setNewBooking({
                    room_id: 0,
                    order_date: new Date(),
                    check_in: new Date(),
                    check_out: new Date(),
                    special_request: '',
                    room_type: 'Single',
                    status: 'checked-in',
                })
                Toast({ message: 'Added user successfully', success: true })
                dispatch({ type: 'CLOSE_FORM' })
            })
            .catch((error) => {
                console.error('Error creating booking:', error)
            })
    }

    return (
        <S.FormContainer>
            <h3>Add New Booking</h3>
            <label>Room ID</label>
            <S.Input
                type="text"
                name="room_id"
                value={newBooking.room_id}
                onChange={handleNewBookingChange}
            />
            <label>Check-In Date</label>
            <S.Input
                type="date"
                name="check_in"
                // value={newBooking.check_in ? new Date(newBooking.check_in).toISOString().slice(0, 10) : ''}
                value={newBooking.check_in ? new Date(newBooking.check_in).toISOString().slice(0, 10) : ''}
                onChange={handleNewBookingChange}
            />
            <label>Check-Out Date</label>
            <S.Input
                type="date"
                name="check_out"
                value={newBooking.check_out ? new Date(newBooking.check_out).toISOString().slice(0, 10) : ''}
                onChange={handleNewBookingChange}
            />
            <label>Room Type</label>
            <S.Select
                name="room_type"
                value={newBooking.room_type}
                onChange={handleNewBookingChange}
            >
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
            </S.Select>
            <label>Special Request</label>
            <S.Input
                type="text"
                name="special_request"
                value={newBooking.special_request}
                onChange={handleNewBookingChange}
            />
            <label>Status</label>
            <S.Select
                name="status"
                value={newBooking.status}
                onChange={handleNewBookingChange}
            >
                <option value="checked-in">Checked In</option>
                <option value="checked-out">Checked Out</option>
            </S.Select>
            <S.Button onClick={handleAddBooking}>Add Booking</S.Button>
        </S.FormContainer>
    )
}

export default AddBooking