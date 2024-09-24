import { Schema, Document, model } from 'mongoose'
import { RoomInterface } from '../interfaces/roomInterface'

export interface RoomDocument extends Document, RoomInterface {
    _id: string
}

const RoomSchema: Schema<RoomDocument> = new Schema({
    Photo: { type: String, required: true },
    RoomNumber: { type: Number, required: true },
    BedType: { type: String, required: true },
    Facilities: { type: [String], required: true },
    Rate: { type: Number, required: true },
    OfferPrice: { type: Number, required: true },
    Status: { type: String, required: true },
})

const Room = model<RoomDocument>('Room', RoomSchema)
export default Room