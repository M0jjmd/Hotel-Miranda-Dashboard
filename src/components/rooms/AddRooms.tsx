import React, { useState } from 'react'
import * as S from '../../styles/tablesForm'
import { useAuth } from '../../context/AuthContext'
import { useAppDispatch } from '../../app/store'
import { CreateRoom, GetRooms } from '../../features/rooms/roomsThunk'

const AddRooms = () => {
    const addDispatch = useAppDispatch()
    const { dispatch } = useAuth()
    const [formValues, setFormValues] = useState({
        photos: [] as File[],
        roomType: 'Single Bed',
        roomNumber: '',
        description: '',
        offer: true,
        price: '',
        discount: '',
        cancellationPolicy: '',
        facilities: [] as string[]
    })

    const amenitiesOptions = ['TV', 'Bathtub', 'Sea View', 'WiFi', 'Air Conditioning']

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
            const files = e.target.files
            if (files) {
                setFormValues((prevValues) => ({
                    ...prevValues,
                    [name]: Array.from(files),
                }))
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
            const updatedFacilities = prevValues.facilities.includes(facility)
                ? prevValues.facilities.filter((item) => item !== facility)
                : [...prevValues.facilities, facility]

            return {
                ...prevValues,
                facilities: updatedFacilities,
            }
        })
    }

    const generateRandomId = () => {
        return Math.floor(1000 + Math.random() * 9000).toString()
    }

    const handleAddRoom = (e: React.FormEvent) => {
        e.preventDefault()

        const roomWithId = {
            Photo: formValues.photos.length > 0 ? URL.createObjectURL(formValues.photos[0]) : '',
            RoomNumber: formValues.roomNumber,
            RoomID: `R${generateRandomId()}`,
            BedType: formValues.roomType,
            Facilities: formValues.facilities,
            Rate: parseFloat(formValues.price),
            OfferPrice: parseFloat(formValues.price) - parseFloat(formValues.discount),
            Status: formValues.offer ? 'Available' : 'Not Available',
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
            <label>Photos (min 3, max 5)</label>
            <S.Input
                type="file"
                name="photos"
                multiple
                accept="image/*"
                onChange={handleInputChange}
            />

            <label>Room Type</label>
            <S.Select
                name="roomType"
                value={formValues.roomType}
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
                name="roomNumber"
                placeholder="Enter room number"
                value={formValues.roomNumber}
                onChange={handleInputChange}
            />

            <label>Description</label>
            <S.TextArea
                name="description"
                placeholder="Enter room description"
                value={formValues.description}
                onChange={handleInputChange}
            />

            <label>Offer</label>
            <S.ToggleButton
                active={formValues.offer}
                onClick={() => setFormValues(prevValues => ({
                    ...prevValues,
                    offer: !prevValues.offer
                }))}
            >
                {formValues.offer ? 'YES' : 'NO'}
            </S.ToggleButton>

            <label>Price (per night)</label>
            <S.Input
                type="number"
                name="price"
                placeholder="Enter price per night"
                value={formValues.price}
                onChange={handleInputChange}
            />

            <label>Discount (%)</label>
            <S.Input
                type="number"
                name="discount"
                placeholder="Enter discount percentage"
                value={formValues.discount}
                onChange={handleInputChange}
            />

            <label>Cancellation Policy</label>
            <S.TextArea
                name="cancellationPolicy"
                placeholder="Enter cancellation policy"
                value={formValues.cancellationPolicy}
                onChange={handleInputChange}
            />

            <label>Facilities</label>
            <S.SelectContainer>
                {amenitiesOptions.map((facility) => (
                    <S.Option
                        key={facility}
                        isSelected={formValues.facilities.includes(facility)}
                        onClick={() => toggleFacility(facility)}
                    >
                        <S.Dot isSelected={formValues.facilities.includes(facility)} />
                        <span>{facility}</span>
                    </S.Option>
                ))}
            </S.SelectContainer>

            <S.Button onClick={handleAddRoom}>Add Room</S.Button>
        </S.FormContainer>
    )
}

export default AddRooms