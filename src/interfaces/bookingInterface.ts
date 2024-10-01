export interface BookingInterface {
    id?: number
    room_id: number
    order_date: Date
    check_in: Date
    check_out: Date
    special_request?: string
    room_type: 'Single' | 'Double' | 'Suite'
    room_number: number
    status: 'checked-in' | 'checked-out'
}

// export interface BookingInterface {
//     id?: number
//     UserId: number
//     RoomId: number
//     OrderDate: Date
//     CheckIn: Date
//     CheckOut: Date
//     SpecialRequest: string
//     RoomType: string
//     RoomNumber: number
//     Status: 'checked-in' | 'checked-out'
// }