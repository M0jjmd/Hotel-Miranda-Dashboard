import React, { useState } from 'react'
import * as S from '../../styles/tablesForm'
import * as E from '../../styles/editViewStyles'
import { Toast } from '../../components/ToastNotification'
import { useAppDispatch } from '../../app/store'
import { EditRoom, DeleteRoom } from '../../features/rooms/roomsThunk'
import { RoomInterface } from '../../interfaces/roomInterface'

interface EditableRowProps {
    filteredRooms: RoomInterface[]
}

const EditableRow: React.FC<EditableRowProps> = ({ filteredRooms }: EditableRowProps) => {
    const [editRowId, setEditRowId] = useState<string | null>(null)
    const [editedRoom, setEditedRoom] = useState<Partial<RoomInterface>>({})
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null)

    const dispatch = useAppDispatch()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof RoomInterface) => {
        const value = e.target.value
        setEditedRoom(prevValues => ({
            ...prevValues,
            [field]: value,
        }))
    }
    

    const handleSaveRoom = () => {
        if (editRowId) {
            console.log(editedRoom)
            dispatch(EditRoom({ ...editedRoom, id: editRowId } as RoomInterface))
            Toast({ message: 'Room successfully edited', success: true })
            setEditRowId(null)
        }
    }

    const handleEditRoom = (room: RoomInterface) => {
        setEditRowId(room._id || '')
        setEditedRoom({
            RoomNumber: room.RoomNumber,
            BedType: room.BedType,
            Facilities: room.Facilities,
            _id: room._id
        })
        setMenuOpenId(null)
    }

    const handleDeleteRoom = (id: string) => {
        dispatch(DeleteRoom(id))
        Toast({ message: 'Room successfully deleted', success: true })
        setMenuOpenId(null)
    }

    const handleMenuToggle = (id: string) => {
        setMenuOpenId(menuOpenId === id ? null : id)
    }

    const calculateDiscountedPrice = (rateInCents: number, discountPercentage: number): number => {
        const rateInEuros = rateInCents / 100
        const discountedPriceInEuros = (rateInEuros * discountPercentage) / 100
        const FinalPriceInEuros = rateInEuros - discountedPriceInEuros
        return FinalPriceInEuros
    }

    return (
        <>
            <E.TableBody>
                {filteredRooms.map(room => {
                    const rateInEuros: number = (room.Rate / 100)
                    const finalPriceInEuros: number = calculateDiscountedPrice(room.Rate, room.OfferPrice)
                    return (
                        <E.TableRow key={room._id}>
                            <E.TableCell><E.TablePhoto src={room.Photo} alt={room.RoomNumber.toString()} /></E.TableCell>
                            <E.TableCell>
                                {editRowId === room._id ? (
                                    <S.Input
                                        type="text"
                                        value={editedRoom.RoomNumber || ''}
                                        onChange={(e) => handleInputChange(e, 'RoomNumber')}
                                    />
                                ) : (
                                    room.RoomNumber
                                )}
                            </E.TableCell>
                            <E.TableCell>
                                {editRowId === room._id ? (
                                    <S.Input
                                        type="text"
                                        value={editedRoom.BedType || ''}
                                        onChange={(e) => handleInputChange(e, 'BedType')}
                                    />
                                ) : (
                                    room.BedType
                                )}
                            </E.TableCell>
                            <E.TableCell>
                                {editRowId === room._id ? (
                                    <S.Input
                                        type="text"
                                        value={editedRoom.Facilities ? editedRoom.Facilities.join(', ') : ''}
                                        onChange={(e) => handleInputChange(e, 'Facilities')}
                                    />
                                ) : (
                                    room.Facilities.join(', ')
                                )}
                            </E.TableCell>
                            <E.TableCell>${rateInEuros}</E.TableCell>
                            <E.TableCell>${finalPriceInEuros}</E.TableCell>
                            <E.TableCell>
                                {editRowId === room._id ? (
                                    <S.Select
                                        value={editedRoom.Status || ''}
                                        onChange={(e) => handleInputChange(e, 'Status')}
                                    >
                                        <option value="Booked">Booked</option>
                                        <option value="Available">Available</option>
                                        <option value="Reserved">Reserved</option>
                                    </S.Select>
                                ) : (
                                    room.Status
                                )}
                            </E.TableCell>
                            <E.TableCell>
                                {editRowId === room._id ? (
                                    <S.Button onClick={handleSaveRoom}>Save</S.Button>
                                ) : (
                                    <E.ActionMenu>
                                        <E.MoreButton onClick={() => handleMenuToggle(room._id!)}>
                                            &#x22EE;
                                        </E.MoreButton>
                                        {menuOpenId === room._id && (
                                            <E.Menu>
                                                <E.MenuItem onClick={() => handleEditRoom(room)}>Edit</E.MenuItem>
                                                <E.MenuItem onClick={() => handleDeleteRoom(room._id!)}>Delete</E.MenuItem>
                                            </E.Menu>
                                        )}
                                    </E.ActionMenu>
                                )}
                            </E.TableCell>
                        </E.TableRow>
                    )
                })}
            </E.TableBody>
        </>
    )
}

export default EditableRow