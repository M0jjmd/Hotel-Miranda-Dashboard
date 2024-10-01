import mysql, { RowDataPacket } from 'mysql2/promise'
import { BookingInterface } from '../interfaces/bookingInterface'

export class BookingServices {
    private connection: mysql.Connection

    constructor(connection: mysql.Connection) {
        this.connection = connection
    }

    async getAll(): Promise<BookingInterface[]> {
        const [rows] = await this.connection.query<RowDataPacket[]>('SELECT * FROM bookings')
        return rows as BookingInterface[]
    }

    async getById(id: number): Promise<BookingInterface> {
        const [rows] = await this.connection.query<RowDataPacket[]>('SELECT * FROM bookings WHERE id = ?', [id])
        const booking = rows[0]
        if (!booking) {
            throw new Error(`Booking with id: ${id} not found`)
        }
        return booking as BookingInterface
    }

    async create(newBooking: BookingInterface): Promise<BookingInterface> {
        const [result] = await this.connection.execute<mysql.ResultSetHeader>('INSERT INTO bookings SET ?', newBooking)
        const bookingId = result.insertId
        return { ...newBooking, id: bookingId } as BookingInterface
    }

    async update(id: number, updatedBooking: Partial<BookingInterface>): Promise<BookingInterface> {
        const [result] = await this.connection.execute<mysql.ResultSetHeader>('UPDATE bookings SET ? WHERE id = ?', [updatedBooking, id])
        if (result.affectedRows === 0) {
            throw new Error(`Booking with id: ${id} not found`)
        }
        return this.getById(id)
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await this.connection.execute<mysql.ResultSetHeader>('DELETE FROM bookings WHERE id = ?', [id])
        return result.affectedRows > 0
    }
}