import React, { useState } from 'react'
import * as S from '../../styles/tablesForm'
import { useDispatch } from 'react-redux'
import { EditBooking, DeleteBooking } from '../../features/bookings/bookingsThunk'

const EditableRow = ({ filteredBookings }) => {
    const [editRowId, setEditRowId] = useState(null)
    const [editedBooking, setEditedBooking] = useState({})
    const [menuOpenId, setMenuOpenId] = useState(null)

    const dispatch = useDispatch()

    const handleInputChange = (e, field, subField) => {
        if (subField) {
            setEditedBooking({
                ...editedBooking,
                [field]: {
                    ...editedBooking[field],
                    [subField]: e.target.value
                }
            })
        } else {
            setEditedBooking({
                ...editedBooking,
                [field]: e.target.value
            })
        }
    }

    const handleEditBooking = (booking) => {
        setEditRowId(booking.id)
        setEditedBooking(booking)
        setMenuOpenId(null)
    }

    const handleSaveBooking = () => {
        dispatch(EditBooking(editedBooking))
        setEditRowId(null)
    }

    const handleDeleteBooking = (id) => {
        dispatch(DeleteBooking(id))
        setMenuOpenId(null)
    }

    const handleMenuToggle = (id) => {
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
                                    value={editedBooking.Guest.Name}
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
                                    value={editedBooking.OrderDate}
                                    onChange={(e) => handleInputChange(e, 'OrderDate')}
                                />
                            ) : (
                                booking.OrderDate
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === booking.id ? (
                                <S.Input
                                    type="date"
                                    value={editedBooking.CheckIn}
                                    onChange={(e) => handleInputChange(e, 'CheckIn')}
                                />
                            ) : (
                                booking.CheckIn
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === booking.id ? (
                                <S.Input
                                    type="date"
                                    value={editedBooking.CheckOut}
                                    onChange={(e) => handleInputChange(e, 'CheckOut')}
                                />
                            ) : (
                                booking.CheckOut
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === booking.id ? (
                                <>
                                    <S.Input
                                        type="text"
                                        value={editedBooking.RoomType.Type}
                                        onChange={(e) => handleInputChange(e, 'RoomType', 'Type')}
                                    />
                                    <S.Input
                                        type="text"
                                        value={editedBooking.RoomType.RoomNumber}
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
                                    value={editedBooking.Status}
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
                                        &#x22EE
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