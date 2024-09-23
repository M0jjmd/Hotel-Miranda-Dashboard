import { ObjectId } from 'mongoose';

export interface UserInterface {
    _id: ObjectId
    username: string
    FullName: string
    password?: string
    Email: string
    Photo: string
    EntryDate: Date
    PositionDescription: string
    Phone: string
    State: string
    position: string
}

export interface JwtPayload {
    username: string
}

export interface LoginInterface {
    username: string
    password: string
}

// export interface UserInterface extends Document {
//     // _id?: ObjectId
//     username: string
//     FullName: string
//     password?: string
//     Email: string
//     Photo: string
//     EntryDate: Date
//     PositionDescription: string
//     Phone: string
//     State: string
//     position: string
// }

// export interface JwtPayload {
//     username: string
// }