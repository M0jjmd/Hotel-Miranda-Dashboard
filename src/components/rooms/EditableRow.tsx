import React, { useState } from 'react'
import * as S from '../../styles/tablesForm'
import { useAppDispatch } from '../../app/store'
import { EditRoom, DeleteRoom } from '../../features/rooms/roomsThunk'
import { Room } from '../../interfaces/roomInterface'

interface EditableRowProps {
    filteredRooms: Room[]
}

const EditableRow: React.FC<EditableRowProps> = ({ filteredRooms }: EditableRowProps) => {
    const [editRowId, setEditRowId] = useState<string | null>(null)
    const [editedRoom, setEditedRoom] = useState<Partial<Room>>({})
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null)

    const dispatch = useAppDispatch()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'RoomNumber' | 'BedType' | 'Facilities') => {
        const value = e.target.value
        setEditedRoom(prevValues => ({
            ...prevValues,
            [field]: field === 'Facilities' ? value.split(',').map(item => item.trim()) : value,
        }))
    }

    const handleSaveRoom = () => {
        if (editRowId) {
            dispatch(EditRoom({ ...editedRoom, id: editRowId } as Room))
            setEditRowId(null)
        }
    }

    const handleEditRoom = (room: Room) => {
        setEditRowId(room.id)
        setEditedRoom(room)
        setMenuOpenId(null)
    }

    const handleDeleteRoom = (id: string) => {
        dispatch(DeleteRoom(id))
        setMenuOpenId(null)
    }

    const handleMenuToggle = (id: string) => {
        setMenuOpenId(menuOpenId === id ? null : id)
    }

    const calculateDiscountedPrice = (rateInCents: number, discountPercentage: number): number => {
        const rateInEuros = rateInCents / 100

        const discountedPriceInEuros = (rateInEuros * discountPercentage) / 100

        const FinalPriceInEuros = rateInEuros - discountedPriceInEuros
        console.log(discountPercentage)
        return FinalPriceInEuros
    }

    return (
        <>
            <S.TableBody>
                {filteredRooms.map(room => {
                    const rateInEuros: number = (room.Rate / 100)
                    const finalPriceInEuros: number = calculateDiscountedPrice(room.Rate, room.OfferPrice)
                    return (
                        <S.TableRow key={room.id}>
                            <S.TableCell><S.TablePhoto src={room.Photo} alt={room.RoomNumber} /></S.TableCell>
                            <S.TableCell>
                                {editRowId === room.id ? (
                                    <S.Input
                                        type="text"
                                        value={editedRoom.RoomNumber || ''}
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
                                        value={editedRoom.BedType || ''}
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
                                        value={editedRoom.Facilities ? editedRoom.Facilities.join(', ') : ''}
                                        onChange={(e) => handleInputChange(e, 'Facilities')}
                                    />
                                ) : (
                                    room.Facilities.join(', ')
                                )}
                            </S.TableCell>
                            <S.TableCell>${rateInEuros}</S.TableCell>
                            <S.TableCell>${finalPriceInEuros}</S.TableCell>
                            <S.TableCell>{room.Status}</S.TableCell>
                            <S.TableCell>
                                {editRowId === room.id ? (
                                    <S.Button onClick={handleSaveRoom}>Save</S.Button>
                                ) : (
                                    <S.ActionMenu>
                                        <S.MoreButton onClick={() => handleMenuToggle(room.id!)}>
                                            &#x22EE;
                                        </S.MoreButton>
                                        {menuOpenId === room.id && (
                                            <S.Menu>
                                                <S.MenuItem onClick={() => handleEditRoom(room)}>Edit</S.MenuItem>
                                                <S.MenuItem onClick={() => handleDeleteRoom(room.id!)}>Delete</S.MenuItem>
                                            </S.Menu>
                                        )}
                                    </S.ActionMenu>
                                )}
                            </S.TableCell>
                        </S.TableRow>
                    )
                })}
            </S.TableBody>
        </>
    )
}

export default EditableRow