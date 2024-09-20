import React, { useState } from 'react'
import * as S from '../../styles/tablesForm'
import { useAuth } from '../../context/AuthContext'
import { useAppDispatch } from '../../app/store'
import { CreateRoom, GetRooms } from '../../features/rooms/roomsThunk'
import { Room } from '../../interfaces/roomInterface'

const AddRooms = () => {
    const addDispatch = useAppDispatch()
    const { dispatch } = useAuth()
    const [offerStatus, setOfferStatus] = useState(false)
    const [formValues, setFormValues] = useState<Room>({
        Photo: '',
        RoomNumber: '',
        RoomID: '',
        BedType: 'Single Bed',
        Facilities: [],
        Rate: 0,
        OfferPrice: 0,
        Status: 'Booked',
        id: ''
    })

    const facilitiesOptions = ['TV', 'Bathtub', 'Sea View', 'WiFi', 'Air Conditioning']

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, files } = e.target

        if (type === 'file') {
            if (files && files[0]) {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setFormValues((prevValues) => ({
                        ...prevValues,
                        Photo: reader.result as string,
                    }))
                }
                reader.readAsDataURL(files[0])
            }
        } else {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }))
        }
    }



    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }))
    }

    const toggleFacility = (facility: string) => {
        setFormValues(prevValues => {
            const updatedFacilities = prevValues.Facilities.includes(facility)
                ? prevValues.Facilities.filter((item) => item !== facility)
                : [...prevValues.Facilities, facility]

            return {
                ...prevValues,
                Facilities: updatedFacilities,
            }
        })
    }

    const toggleOfferStatus = () => {
        setOfferStatus((prevStatus: boolean) => !prevStatus)
        setFormValues((prevValues: Room) => ({
            ...prevValues,
            Status: !offerStatus ? 'Available' : 'Booked',
        }))
    }

    const generateRandomId = () => {
        return Math.floor(1000 + Math.random() * 9000).toString()
    }

    const handleAddRoom = (e: React.FormEvent) => {
        e.preventDefault()

        const roomWithId = {
            Photo: formValues.Photo,
            RoomNumber: formValues.RoomNumber,
            RoomID: `R${generateRandomId()}`,
            BedType: formValues.BedType,
            Facilities: formValues.Facilities,
            Rate: parseFloat(formValues.Rate.toString()),
            OfferPrice: parseFloat(formValues.OfferPrice.toString()),
            Status: offerStatus ? 'Available' : 'Booked',
            id: generateRandomId(),
        }

        addDispatch(CreateRoom(roomWithId))
            .then(() => {
                addDispatch(GetRooms())
                dispatch({ type: 'CLOSE_FORM' })
            })
            .catch((error) => {
                console.error('Error creating room:', error)
            })
    }

    return (
        <S.FormContainer>
            <h3>Add New Room</h3>
            <label>Photos</label>
            <S.Input
                type="file"
                name="Photo"
                accept="image/*"
                onChange={handleInputChange}
            />

            <label>Room Type</label>
            <S.Select
                name="BedType"
                value={formValues.BedType}
                onChange={handleSelectChange}
            >
                <option value="Single Bed">Single Bed</option>
                <option value="Double Bed">Double Bed</option>
                <option value="Suite">Suite</option>
                <option value="Family Room">Family Room</option>
            </S.Select>

            <label>Room Number</label>
            <S.Input
                type="text"
                name="RoomNumber"
                placeholder="Enter room number"
                value={formValues.RoomNumber}
                onChange={handleInputChange}
            />

            <label>Offer</label>
            <S.ToggleButton
                active={offerStatus}
                onClick={toggleOfferStatus}
            >
                {offerStatus ? 'YES' : 'NO'}
            </S.ToggleButton>

            <label>Price (per night)</label>
            <S.Input
                type="number"
                name="Rate"
                placeholder="Enter price per night"
                value={formValues.Rate}
                onChange={handleInputChange}
            />

            <label>Discount (%)</label>
            <S.Input
                type="number"
                name="OfferPrice"
                placeholder="Enter discount percentage"
                value={formValues.OfferPrice}
                onChange={handleInputChange}
            />

            <label>Cancellation Policy</label>

            <label>Facilities</label>
            <S.SelectContainer>
                {facilitiesOptions.map((facility) => (
                    <S.Option
                        key={facility}
                        isSelected={formValues.Facilities.includes(facility)}
                        onClick={() => toggleFacility(facility)}
                    >
                        <S.Dot isSelected={formValues.Facilities.includes(facility)} />
                        <span>{facility}</span>
                    </S.Option>
                ))}
            </S.SelectContainer>

            <S.Button onClick={handleAddRoom}>Add Room</S.Button>
        </S.FormContainer>
    )
}

export default AddRooms