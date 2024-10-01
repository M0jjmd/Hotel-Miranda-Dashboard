export interface RoomInterface {
    id?: number
    photo: string
    room_number: number
    bed_type: 'Single' | 'Double' | 'Queen' | 'King'
    rate: number
    offer_price: number
    status: 'available' | 'booked'
}

export interface FacilityInterface {
    id: number
    facility_name: string
}

export interface RoomFacilityInterface {
    room_id: number
    facility_id: number
}

// export interface RoomInterface {
//     id?: number
//     photo: string
//     room_number: number
//     bed_type: string
//     Facilities?: FacilityInterface[]
//     Rate: number
//     OfferPrice: number
//     Status: 'available' | 'booked'
// }

// export interface FacilityInterface {
//     id: number
//     name: string
// }