import React, { useState } from 'react'
import * as S from '../../styles/tablesForm'
import { Toast } from '../../components/ToastNotification'
import { useAuth } from '../../context/AuthContext'
import { useAppDispatch } from '../../app/store'
import { CreateRoom, GetRooms } from '../../features/rooms/roomsThunk'
import { RoomInterface, Facility } from '../../interfaces/roomInterface'

const AddRooms = () => {
    const addDispatch = useAppDispatch()
    const { dispatch } = useAuth()
    const [formValues, setFormValues] = useState<RoomInterface>({
        photo: '',
        room_number: 0,
        bed_type: 'Single',
        facilities: [],
        rate: 0,
        offer_price: 0,
        status: 'available',
    })

    const facilitiesOptions: Facility[] = [
        { id: 1, facility_name: 'TV' },
        { id: 2, facility_name: 'Bathtub' },
        { id: 3, facility_name: 'Sea View' },
        { id: 4, facility_name: 'WiFi' },
        { id: 5, facility_name: 'Air Conditioning' },
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }))
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }))
    }

    const toggleFacility = (facility: Facility) => {
        setFormValues((prevValues) => {
            const updatedFacilities = (prevValues.facilities ?? []).some(f => f.id === facility.id)
                ? (prevValues.facilities ?? []).filter(f => f.id !== facility.id)
                : [...(prevValues.facilities ?? []), facility]

            return {
                ...prevValues,
                facilities: updatedFacilities,
            }
        })
    }

    const handleAddRoom = async (e: React.FormEvent) => {
        e.preventDefault()

        const roomWithFacilities: RoomInterface = {
            photo: formValues.photo,
            room_number: formValues.room_number,
            bed_type: formValues.bed_type,
            rate: parseFloat(formValues.rate.toString()),
            offer_price: parseFloat(formValues.offer_price.toString()),
            status: 'available',
            facilities: formValues.facilities ?? [],
        }
        console.log(roomWithFacilities)
        try {
            await addDispatch(CreateRoom(roomWithFacilities)).unwrap()

            await addDispatch(GetRooms())

            Toast({ message: 'Added room successfully', success: true })
            dispatch({ type: 'CLOSE_FORM' })

            setFormValues({
                photo: '',
                room_number: 0,
                bed_type: 'Single',
                facilities: [],
                rate: 0,
                offer_price: 0,
                status: 'available',
            })

        } catch (error) {
            console.error('Error creating room:', error)
            Toast({ message: 'Failed to add room', success: false })
        }
    }

    return (
        <S.FormContainer>
            <h3>Add New Room</h3>
            <label>Photos</label>
            <S.Input
                type="text"
                name="photo"
                placeholder="Enter photo URL"
                value={formValues.photo}
                onChange={handleInputChange}
            />

            <label>Room Type</label>
            <S.Select
                name="bed_type"
                value={formValues.bed_type}
                onChange={handleSelectChange}
            >
                <option value="Single">Single Bed</option>
                <option value="Double">Double Bed</option>
                <option value="Queen">Queen</option>
                <option value="King">King</option>
            </S.Select>

            <label>Room Number</label>
            <S.Input
                type="number"
                name="room_number"
                placeholder="Enter room number"
                value={formValues.room_number}
                onChange={handleInputChange}
            />

            <label>Price (per night)</label>
            <S.Input
                type="number"
                name="rate"
                placeholder="Enter price per night"
                value={formValues.rate}
                onChange={handleInputChange}
            />

            <label>Discount (%)</label>
            <S.Input
                type="number"
                name="offer_price"
                placeholder="Enter discount percentage"
                value={formValues.offer_price}
                onChange={handleInputChange}
            />

            <label>Facilities</label>
            <S.SelectContainer>
                {facilitiesOptions.map((facility) => (
                    <S.Option
                        key={facility.id}
                        isSelected={formValues.facilities?.some(f => f.id === facility.id) ?? false}
                        onClick={() => toggleFacility(facility)}
                    >
                        <S.Dot isSelected={formValues.facilities?.some(f => f.id === facility.id) ?? false} />
                        <span>{facility.facility_name}</span>
                    </S.Option>
                ))}
            </S.SelectContainer>

            <S.Button onClick={handleAddRoom}>Add Room</S.Button>
        </S.FormContainer>
    )
}

export default AddRooms