import React, { useState } from 'react'
import * as S from '../../styles/tablesForm'
import { Toast } from '../../components/ToastNotification'
import { useAppDispatch } from '../../app/store'
import { EditRoom, DeleteRoom, GetRooms } from '../../features/rooms/roomsThunk'
import { RoomInterface } from '../../interfaces/roomInterface'

interface EditableRowProps {
    filteredRooms: RoomInterface[]
}

const EditableRow: React.FC<EditableRowProps> = ({ filteredRooms }) => {
    const [editRowId, setEditRowId] = useState<number | null>(null)
    const [editedRoom, setEditedRoom] = useState<Partial<RoomInterface>>({})
    const [menuOpenId, setMenuOpenId] = useState<number | null>(null)

    const dispatch = useAppDispatch()

    const uniqueRooms = filteredRooms.filter((room, index, self) =>
        index === self.findIndex((r) => r.room_number === room.room_number)
    )

    const handleInputChangeForText = (e: React.ChangeEvent<HTMLInputElement>, field: keyof RoomInterface) => {
        const value = e.target.value
        setEditedRoom(prevValues => ({
            ...prevValues,
            [field]: value,
        }))
    }

    const handleInputChangeForSelect = (e: React.ChangeEvent<HTMLSelectElement>, field: keyof RoomInterface) => {
        const value = e.target.value
        setEditedRoom(prevValues => ({
            ...prevValues,
            [field]: value,
        }))
    }

    const handleSaveRoom = () => {
        if (editRowId) {
            const roomToSave = { ...editedRoom }

            if ('facilities' in roomToSave) {
                delete roomToSave.facilities
            }

            dispatch(EditRoom({ ...roomToSave, id: editRowId } as RoomInterface))
                .then(() => {
                    return dispatch(GetRooms())
                })
                .then(() => {
                    Toast({ message: 'Room successfully edited', success: true })
                    setEditRowId(null)
                })
                .catch((error) => {
                    console.error("Error editing room:", error)
                })
        }
    }

    const handleEditRoom = (room: RoomInterface) => {
        setEditRowId(room.id ?? null)
        setEditedRoom({
            room_number: room.room_number,
            bed_type: room.bed_type,
            facilities: room.facilities,
            id: room.id
        })
        setMenuOpenId(null)
    }

    const handleDeleteUser = (id: string) => {
        dispatch(DeleteRoom(id))
            .then(() => {
                return dispatch(GetRooms())
            })
            .then(() => {
                Toast({ message: 'Room successfully deleted', success: true })
            })
            .catch((error) => {
                console.error("Error deleting room:", error)
            })
        setMenuOpenId(null)
    }

    const handleMenuToggle = (id: number) => {
        setMenuOpenId(menuOpenId === id ? null : id)
    }

    const calculateDiscountedPrice = (rateInCents: number, discountPercentage: number): number => {
        const rateInEuros = rateInCents / 100
        const discountedPriceInEuros = (rateInEuros * discountPercentage) / 100
        const FinalPriceInEuros = rateInEuros - discountedPriceInEuros
        return FinalPriceInEuros
    }

    return (
        <S.TableBody>
            {uniqueRooms.map(room => {
                const rateInEuros: number = (room.rate / 100)
                const finalPriceInEuros: number = calculateDiscountedPrice(room.rate, room.offer_price)
                return (
                    <S.TableRow key={room.id}>
                        <S.TableCell><S.TablePhoto src={room.photo} alt={room.room_number.toString()} /></S.TableCell>
                        <S.TableCell>
                            {editRowId === room.id ? (
                                <S.Input
                                    type="text"
                                    value={editedRoom.room_number || ''}
                                    onChange={(e) => handleInputChangeForText(e, 'room_number')}
                                />
                            ) : (
                                room.room_number
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === room.id ? (
                                <S.Select
                                    value={editedRoom.bed_type || ''}
                                    onChange={(e) => handleInputChangeForSelect(e, 'bed_type')}
                                >
                                    <option value="Single">Single</option>
                                    <option value="Double">Double</option>
                                    <option value="Queen">Queen</option>
                                    <option value="King">King</option>
                                </S.Select>
                            ) : (
                                room.bed_type
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {(room.facilities ?? []).map(facility => facility.facility_name).join(', ')}
                        </S.TableCell>
                        <S.TableCell>${rateInEuros}</S.TableCell>
                        <S.TableCell>${finalPriceInEuros}</S.TableCell>
                        <S.TableCell>
                            {editRowId === room.id ? (
                                <S.Select
                                    value={editedRoom.status || ''}
                                    onChange={(e) => handleInputChangeForSelect(e, 'status')}
                                >
                                    <option value="available">Available</option>
                                    <option value="booked">Booked</option>
                                </S.Select>
                            ) : (
                                room.status
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === room.id ? (
                                <S.Button onClick={handleSaveRoom}>Save</S.Button>
                            ) : (
                                <S.ActionMenu>
                                    <S.MoreButton onClick={() => handleMenuToggle(room.id!)}>&#x22EE;</S.MoreButton>
                                    {menuOpenId === room.id && (
                                        <S.Menu>
                                            <S.MenuItem onClick={() => handleEditRoom(room)}>Edit</S.MenuItem>
                                            <S.MenuItem onClick={() => handleDeleteUser(room.id?.toString() || '')}>Delete</S.MenuItem>
                                        </S.Menu>
                                    )}
                                </S.ActionMenu>
                            )}
                        </S.TableCell>
                    </S.TableRow>
                )
            })}
        </S.TableBody>
    )
}

export default EditableRow