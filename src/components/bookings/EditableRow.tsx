import React, { useState } from 'react'
import * as S from '../../styles/tablesForm'
import { EditBooking, DeleteBooking } from '../../features/bookings/bookingsThunk'
import { Booking } from '../../interfaces/bookingInterface'
import { useAppDispatch } from '../../app/store'

interface EditableRowProps {
    filteredBookings: Booking[]
}

const EditableRow: React.FC<EditableRowProps> = ({ filteredBookings }: EditableRowProps) => {
    const [editRowId, setEditRowId] = useState<string | null>(null)
    const [editedBooking, setEditedBooking] = useState<Booking | null>(null)
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null)

    const dispatch = useAppDispatch()

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof Booking,
        subField?: keyof Booking['RoomType'] | keyof Booking['Guest']
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

    const handleEditBooking = (booking: Booking) => {
        setEditRowId(booking.id)
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
                    <S.TableRow key={booking.id}>
                        <S.TableCell>
                            {editRowId === booking.id ? (
                                <S.Input
                                    type="text"
                                    value={editedBooking?.Guest?.Name || ''}
                                    onChange={(e) => handleInputChange(e, 'Guest', 'Name')}
                                />
                            ) : (
                                booking.Guest.Name
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === booking.id ? (
                                <S.Input
                                    type="date"
                                    value={editedBooking?.OrderDate || ''}
                                    onChange={(e) => handleInputChange(e, 'OrderDate')}
                                />
                            ) : (
                                new Date(booking.OrderDate).toLocaleDateString()
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === booking.id ? (
                                <S.Input
                                    type="date"
                                    value={editedBooking?.CheckIn || ''}
                                    onChange={(e) => handleInputChange(e, 'CheckIn')}
                                />
                            ) : (
                                new Date(booking.CheckIn).toLocaleDateString()
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === booking.id ? (
                                <S.Input
                                    type="date"
                                    value={editedBooking?.CheckOut || ''}
                                    onChange={(e) => handleInputChange(e, 'CheckOut')}
                                />
                            ) : (
                                new Date(booking.CheckOut).toLocaleDateString()
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === booking.id ? (
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
                            {editRowId === booking.id ? (
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
                            {editRowId === booking.id ? (
                                <S.Button onClick={handleSaveBooking}>Save</S.Button>
                            ) : (
                                <S.ActionMenu>
                                    <S.MoreButton onClick={() => handleMenuToggle(booking.id)}>
                                        &#x22EE;
                                    </S.MoreButton>
                                    {menuOpenId === booking.id && (
                                        <S.Menu>
                                            <S.MenuItem onClick={() => handleEditBooking(booking)}>Edit</S.MenuItem>
                                            <S.MenuItem onClick={() => handleDeleteBooking(booking.id)}>Delete</S.MenuItem>
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