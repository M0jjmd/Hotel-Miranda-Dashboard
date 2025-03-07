import React, { useState } from 'react'
import * as S from '../../styles/tablesForm'
import * as E from '../../styles/editViewStyles'
import { Toast } from '../../components/ToastNotification'
import { EditBooking, DeleteBooking } from '../../features/bookings/bookingsThunk'
import { BookingInterface } from '../../interfaces/bookingInterface'
import { useAppDispatch } from '../../app/store'
interface EditableRowProps {
    filteredBookings: BookingInterface[]
}

const EditableRow: React.FC<EditableRowProps> = ({ filteredBookings }: EditableRowProps) => {
    const [editRowId, setEditRowId] = useState<string | null>(null)
    const [editedBooking, setEditedBooking] = useState<BookingInterface | null>(null)
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null)

    const dispatch = useAppDispatch()

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof BookingInterface,
        subField?: keyof BookingInterface['RoomType'] | keyof BookingInterface['Guest']
    ) => {
        const { value } = e.target

        if (field === 'Guest' && subField) {
            setEditedBooking(prev => prev ? {
                ...prev,
                Guest: {
                    ...prev.Guest,
                    [subField]: value
                }
            } : null)
        } else if (field === 'RoomType' && subField) {
            setEditedBooking(prev => prev ? {
                ...prev,
                RoomType: {
                    ...prev.RoomType,
                    [subField]: value
                }
            } : null)
        } else {
            setEditedBooking(prev => prev ? {
                ...prev,
                [field]: value
            } : null)
        }
    }

    const handleEditBooking = (booking: BookingInterface) => {
        setEditRowId(booking._id || '')
        setEditedBooking(booking)
        setMenuOpenId(null)
    }

    const handleSaveBooking = () => {
        if (editedBooking) {
            const originalBooking = filteredBookings.find(booking => booking._id === editRowId)
            if (JSON.stringify(originalBooking) !== JSON.stringify(editedBooking)) {
                dispatch(EditBooking(editedBooking))
                Toast({ message: 'Booking successfully edited', success: true })
                setEditRowId(null)
            }
        }
    }

    const handleCloseEdit = () => {
        setEditRowId('')
        setEditRowId(null)
    }

    const handleDeleteBooking = (id: string) => {
        dispatch(DeleteBooking(id))
        Toast({ message: 'Booking successfully deleted', success: true })
        setMenuOpenId(null)
    }

    const handleMenuToggle = (id: string) => {
        setMenuOpenId(menuOpenId === id ? null : id)
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStatus = e.target.value
        setEditedBooking(prev => prev ? { ...prev, Status: selectedStatus } : null)
    }

    return (
        <>
            <E.TableBody>
                {filteredBookings.map(booking => (
                    <E.TableRow key={booking._id}>
                        <E.TableCell>
                            {booking.Guest.UserId}
                        </E.TableCell>
                        <E.TableCell>
                            {editRowId === booking._id ? (
                                <S.Input
                                    type="date"
                                    value={editedBooking?.OrderDate ? new Date(editedBooking.OrderDate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => handleInputChange(e, 'OrderDate')}
                                />
                            ) : (
                                booking.OrderDate ? new Date(booking.OrderDate).toLocaleDateString() : ''
                            )}
                        </E.TableCell>

                        <E.TableCell>
                            {editRowId === booking._id ? (
                                <S.Input
                                    type="date"
                                    value={editedBooking?.CheckIn ? new Date(editedBooking.CheckIn).toISOString().split('T')[0] : ''}
                                    onChange={(e) => handleInputChange(e, 'CheckIn')}
                                />
                            ) : (
                                booking.CheckIn ? new Date(booking.CheckIn).toLocaleDateString() : ''
                            )}
                        </E.TableCell>

                        <E.TableCell>
                            {editRowId === booking._id ? (
                                <S.Input
                                    type="date"
                                    value={editedBooking?.CheckOut ? new Date(editedBooking.CheckOut).toISOString().split('T')[0] : ''}
                                    onChange={(e) => handleInputChange(e, 'CheckOut')}
                                />
                            ) : (
                                booking.CheckOut ? new Date(booking.CheckOut).toLocaleDateString() : ''
                            )}
                        </E.TableCell>
                        <E.TableCell>
                            {`${booking.RoomType.Type} (${booking.RoomType.RoomNumber})`}
                        </E.TableCell>

                        <E.TableCell>
                            {editRowId === booking._id ? (
                                <S.Select
                                    value={editedBooking?.Status}
                                    onChange={handleStatusChange}
                                >
                                    <option value="Checked-in">Checked-in</option>
                                    <option value="Checked-out">Checked-out</option>
                                    <option value="in-progress">In-progress</option>
                                </S.Select>
                            ) : (
                                booking.Status
                            )}
                        </E.TableCell>


                        <E.TableCell>
                            {editRowId === booking._id ? (
                                <>
                                    <S.Button onClick={handleSaveBooking}>Save</S.Button>
                                    <S.Button onClick={handleCloseEdit}>Close</S.Button>
                                </>
                            ) : (
                                <E.ActionMenu>
                                    <E.MoreButton onClick={() => handleMenuToggle(booking._id || '')}>
                                        &#x22EE;
                                    </E.MoreButton>
                                    {menuOpenId === booking._id && (
                                        <E.Menu>
                                            <E.MenuItem onClick={() => handleEditBooking(booking)}>Edit</E.MenuItem>
                                            <E.MenuItem onClick={() => handleDeleteBooking(booking._id || '')}>Delete</E.MenuItem>
                                        </E.Menu>
                                    )}
                                </E.ActionMenu>
                            )}
                        </E.TableCell>
                    </E.TableRow>
                ))}
            </E.TableBody>
        </>
    )
}

export default EditableRow