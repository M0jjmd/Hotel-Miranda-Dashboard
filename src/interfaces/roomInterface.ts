export interface RoomInterface {
    id?: number
    Photo: string
    RoomNumber: number
    BedType: string
    Facilities?: FacilityInterface[]
    Rate: number
    OfferPrice: number
    Status: 'available' | 'booked'
}

export interface FacilityInterface {
    id: number
    name: string
}

// export interface RoomInterface {
//     _id?: string
//     Photo: string
//     RoomNumber: number
//     BedType: string
//     Facilities: string[]
//     Rate: number
//     OfferPrice: number
//     Status: string
// }