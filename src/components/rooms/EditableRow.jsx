import React, { useState } from 'react'
import * as S from '../../styles/tablesForm'
import { useDispatch } from 'react-redux'
import { EditRoom, DeleteRoom } from '../../features/rooms/roomsThunk'

function EditableRow({ filteredRooms }) {
    const [editRowId, setEditRowId] = useState(null)
    const [editedRoom, setEditedRoom] = useState({})
    const [menuOpenId, setMenuOpenId] = useState(null)

    const dispatch = useDispatch()

    const handleInputChange = (e, field, subField) => {
        if (subField) {
            setEditedRoom({
                ...editedRoom,
                [field]: {
                    ...editedRoom[field],
                    [subField]: e.target.value
                }
            })
        } else {
            setEditedRoom({
                ...editedRoom,
                [field]: e.target.value
            })
        }
    }

    const handleSaveRoom = () => {
        dispatch(EditRoom(editedRoom))
        setEditRowId(null)
    }

    const handleEditRoom = (room) => {
        setEditRowId(room.id)
        setEditedRoom(room)
        setMenuOpenId(null)
    }

    const handleDeleteRoom = (id) => {
        dispatch(DeleteRoom(id))
        setMenuOpenId(null)
    }

    const handleMenuToggle = (id) => {
        setMenuOpenId(menuOpenId === id ? null : id)
    }

    return (
        <>
            <S.TableBody>
                {filteredRooms.map(room => (
                    <S.TableRow key={room.id}>
                        <S.TableCell><S.TablePhoto src={room.Photo} alt={room.RoomNumber} /></S.TableCell>
                        <S.TableCell>
                            {editRowId === room.id ? (
                                <S.Input
                                    type="text"
                                    value={editedRoom.RoomNumber}
                                    onChange={(e) => handleInputChange(e, 'RoomNumber')}
                                />
                            ) : (
                                room.RoomNumber
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === room.id ? (
                                <S.Input
                                    type="text"
                                    value={editedRoom.BedType}
                                    onChange={(e) => handleInputChange(e, 'BedType')}
                                />
                            ) : (
                                room.BedType
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === room.id ? (
                                <S.Input
                                    type="text"
                                    value={editedRoom.Facilities.join(', ')}
                                    onChange={(e) => handleInputChange(e, 'Facilities')}
                                />
                            ) : (
                                room.Facilities.join(', ')
                            )}
                        </S.TableCell>
                        <S.TableCell>${room.Rate}</S.TableCell>
                        <S.TableCell>${room.OfferPrice}</S.TableCell>
                        <S.TableCell>{room.Status}</S.TableCell>
                        <S.TableCell>
                            {editRowId === room.id ? (
                                <S.Button onClick={handleSaveRoom}>Save</S.Button>
                            ) : (
                                <S.ActionMenu>
                                    <S.MoreButton onClick={() => handleMenuToggle(room.id)}>
                                        &#x22EE;
                                    </S.MoreButton>
                                    {menuOpenId === room.id && (
                                        <S.Menu>
                                            <S.MenuItem onClick={() => handleEditRoom(room)}>Edit</S.MenuItem>
                                            <S.MenuItem onClick={() => handleDeleteRoom(room.id)}>Delete</S.MenuItem>
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