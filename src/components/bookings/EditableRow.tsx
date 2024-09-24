import React, { useState } from 'react'
import * as S from '../../styles/tablesForm'
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
            dispatch(EditBooking(editedBooking))
            setEditRowId(null)
        }
    }

    const handleDeleteBooking = (id: string) => {
        dispatch(DeleteBooking(id))
        setMenuOpenId(null)
    }

    const handleMenuToggle = (id: string) => {
        setMenuOpenId(menuOpenId === id ? null : id)
    }

    return (
        <>
            <S.TableBody>
                {filteredBookings.map(booking => (
                    <S.TableRow key={booking._id}>
                        <S.TableCell>
                            {editRowId === booking._id ? (
                                <S.Input
                                    type="text"
                                    value={editedBooking?.Guest?.UserId || ''}
                                    onChange={(e) => handleInputChange(e, 'Guest', 'UserId')}
                                />
                            ) : (
                                booking.Guest.UserId
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === booking._id ? (
                                <S.Input
                                    type="date"
                                    value={editedBooking?.OrderDate ? new Date(editedBooking.OrderDate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => handleInputChange(e, 'OrderDate')}
                                />
                            ) : (
                                booking.OrderDate ? new Date(booking.OrderDate).toLocaleDateString() : ''
                            )}
                        </S.TableCell>

                        <S.TableCell>
                            {editRowId === booking._id ? (
                                <S.Input
                                    type="date"
                                    value={editedBooking?.CheckIn ? new Date(editedBooking.CheckIn).toISOString().split('T')[0] : ''}
                                    onChange={(e) => handleInputChange(e, 'CheckIn')}
                                />
                            ) : (
                                booking.CheckIn ? new Date(booking.CheckIn).toLocaleDateString() : ''
                            )}
                        </S.TableCell>

                        <S.TableCell>
                            {editRowId === booking._id ? (
                                <S.Input
                                    type="date"
                                    value={editedBooking?.CheckOut ? new Date(editedBooking.CheckOut).toISOString().split('T')[0] : ''}
                                    onChange={(e) => handleInputChange(e, 'CheckOut')}
                                />
                            ) : (
                                booking.CheckOut ? new Date(booking.CheckOut).toLocaleDateString() : ''
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === booking._id ? (
                                <>
                                    <S.Input
                                        type="text"
                                        value={editedBooking?.RoomType.Type || ''}
                                        onChange={(e) => handleInputChange(e, 'RoomType', 'Type')}
                                    />
                                    <S.Input
                                        type="text"
                                        value={editedBooking?.RoomType.RoomNumber || ''}
                                        onChange={(e) => handleInputChange(e, 'RoomType', 'RoomNumber')}
                                    />
                                </>
                            ) : (
                                `${booking.RoomType.Type} (${booking.RoomType.RoomNumber})`
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === booking._id ? (
                                <S.Input
                                    type="text"
                                    value={editedBooking?.Status || ''}
                                    onChange={(e) => handleInputChange(e, 'Status')}
                                />
                            ) : (
                                booking.Status
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === booking._id ? (
                                <S.Button onClick={handleSaveBooking}>Save</S.Button>
                            ) : (
                                <S.ActionMenu>
                                    <S.MoreButton onClick={() => handleMenuToggle(booking._id || '')}>
                                        &#x22EE;
                                    </S.MoreButton>
                                    {menuOpenId === booking._id && (
                                        <S.Menu>
                                            <S.MenuItem onClick={() => handleEditBooking(booking)}>Edit</S.MenuItem>
                                            <S.MenuItem onClick={() => handleDeleteBooking(booking._id || '')}>Delete</S.MenuItem>
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