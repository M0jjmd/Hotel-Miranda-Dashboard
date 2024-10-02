import React, { useState } from 'react'
import * as S from '../../styles/tablesForm'
import { Toast } from '../../components/ToastNotification'
import { EditBooking, DeleteBooking } from '../../features/bookings/bookingsThunk'
import { BookingInterface } from '../../interfaces/bookingInterface'
import { useAppDispatch } from '../../app/store'

interface EditableRowProps {
    filteredBookings: BookingInterface[]
}

const EditableRow: React.FC<EditableRowProps> = ({ filteredBookings }: EditableRowProps) => {
    const [editRowId, setEditRowId] = useState<number | null>(null)
    const [editedBooking, setEditedBooking] = useState<BookingInterface | null>(null)
    const [menuOpenId, setMenuOpenId] = useState<number | null>(null)

    const dispatch = useAppDispatch()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof BookingInterface) => {
        const { value } = e.target

        setEditedBooking(prev => prev ? {
            ...prev,
            [field]: field === 'room_id' ? Number(value) : value,
            ...(field === 'check_in' || field === 'check_out' || field === 'order_date' ? {
                [field]: new Date(value)
            } : {})
        } : null)
    }

    const handleSaveBooking = () => {
        if (editRowId && editedBooking) {
            const bookingToSave = {
                ...editedBooking,
                id: editRowId,
                check_in:
                    editedBooking.check_in instanceof Date
                        ? formatDateForMySQL(editedBooking.check_in)
                        : editedBooking.check_in,
                check_out:
                    editedBooking.check_out instanceof Date
                        ? formatDateForMySQL(editedBooking.check_out)
                        : editedBooking.check_out,
                order_date:
                    editedBooking.order_date instanceof Date
                        ? formatDateForMySQL(editedBooking.order_date)
                        : editedBooking.order_date,
            } as BookingInterface
            dispatch(EditBooking(bookingToSave))
                .then(() => {
                    setEditRowId(null)
                    Toast({ message: 'Booking successfully edited', success: true })
                })
                .catch((error) => {
                    console.error("Error editing booking:", error)
                })
        }
    }

    const handleEditBooking = (booking: BookingInterface) => {
        setEditRowId(booking.id || null)
        setEditedBooking({
            ...booking,
            check_in: booking.check_in instanceof Date ? booking.check_in : new Date(booking.check_in),
            check_out: booking.check_out instanceof Date ? booking.check_out : new Date(booking.check_out),
            order_date: booking.order_date instanceof Date ? booking.order_date : new Date(booking.order_date),
        })
        setMenuOpenId(null)
    }

    const handleDeleteBooking = (id: number) => {
        dispatch(DeleteBooking(id.toString()))
        Toast({ message: 'Booking successfully deleted', success: true })
        setMenuOpenId(null)
    }

    const handleMenuToggle = (id: number) => {
        setMenuOpenId(menuOpenId === id ? null : id)
    }

    const formatDate = (dateString: string | Date): string => {
        if (!dateString) return ""
        const date =
            dateString instanceof Date ? dateString : new Date(dateString)
        return date.toLocaleDateString()
    }

    const formatDateForMySQL = (date: Date): string => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')

        return `${year}-${month}-${day} ${hours}:${minutes}:00`
    }

    return (
        <>
            <S.TableBody>
                {filteredBookings.map(booking => (
                    <S.TableRow key={booking.id}>
                        <S.TableCell>
                            {editRowId === booking.id ? (
                                <S.Input
                                    type="number"
                                    value={editedBooking?.room_id || 0}
                                    onChange={(e) => handleInputChange(e, 'room_id')}
                                />
                            ) : (
                                booking.room_id
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === booking.id ? (
                                <S.Select
                                    value={editedBooking?.room_type}
                                    onChange={(e) => handleInputChange(e, 'room_type')}
                                >
                                    <option value="Single">Single</option>
                                    <option value="Double">Double</option>
                                    <option value="Suite">Suite</option>
                                </S.Select>
                            ) : (
                                booking.room_type
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            <S.TableCell>
                                {booking.order_date
                                    ? formatDate(
                                        booking.check_in instanceof Date ? booking.check_in.toISOString() : booking.check_in
                                    )
                                    : ''
                                }
                            </S.TableCell>
                        </S.TableCell>

                        <S.TableCell>
                            {editRowId === booking.id ? (
                                <S.Input
                                    type="date"
                                    value={
                                        editedBooking?.check_in
                                            ? new Date(editedBooking.check_in).toISOString().slice(0, 10)
                                            : ""
                                    }
                                    onChange={(e) => handleInputChange(e, "check_in")}
                                />
                            ) : (
                                formatDate(booking.check_in instanceof Date ? booking.check_in.toISOString() : booking.check_in)
                            )}
                        </S.TableCell>

                        <S.TableCell>
                            {editRowId === booking.id ? (
                                <S.Input
                                    type="date"
                                    value={
                                        editedBooking?.check_out
                                            ? new Date(editedBooking.check_out).toISOString().slice(0, 10)
                                            : ""
                                    }
                                    onChange={(e) => handleInputChange(e, "check_out")}
                                />
                            ) : (
                                formatDate(booking.check_out instanceof Date ? booking.check_out.toISOString() : booking.check_out)
                            )}
                        </S.TableCell>

                        <S.TableCell>
                            {editRowId === booking.id ? (
                                <S.Input
                                    type="text"
                                    value={editedBooking?.special_request || ''}
                                    onChange={(e) => handleInputChange(e, 'special_request')}
                                />
                            ) : (
                                booking.special_request || ''
                            )}
                        </S.TableCell>

                        <S.TableCell>
                            {editRowId === booking.id ? (
                                <S.Button onClick={handleSaveBooking}>Save</S.Button>
                            ) : (
                                <S.ActionMenu>
                                    <S.MoreButton onClick={() => {
                                        if (booking.id !== undefined) {
                                            handleMenuToggle(booking.id)
                                        }
                                    }}>
                                        &#x22EE;
                                    </S.MoreButton>
                                    {menuOpenId === booking.id && (
                                        <S.Menu>
                                            <S.MenuItem onClick={() => handleEditBooking(booking)}>Edit</S.MenuItem>
                                            <S.MenuItem onClick={() => {
                                                if (booking.id !== undefined) {
                                                    handleDeleteBooking(booking.id)
                                                }
                                            }}>Delete</S.MenuItem>
                                        </S.Menu>
                                    )}
                                </S.ActionMenu>
                            )}
                        </S.TableCell>
                    </S.TableRow>
                ))}
            </S.TableBody>
        </>
    )
}

export default EditableRow