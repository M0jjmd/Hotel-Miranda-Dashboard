import mysql, { RowDataPacket } from 'mysql2/promise'
import { RoomInterface } from '../interfaces/roomInterface'

export class RoomServices {
    private connection: mysql.Connection

    constructor(connection: mysql.Connection) {
        this.connection = connection
    }

    async getAll(): Promise<RoomInterface[]> {
        const [rows] = await this.connection.query<RowDataPacket[]>('SELECT * FROM rooms')
        return rows as RoomInterface[]
    }

    async getById(id: number): Promise<RoomInterface> {
        const [rows] = await this.connection.query<RowDataPacket[]>('SELECT * FROM rooms WHERE id = ?', [id])
        const room = rows[0]
        if (!room) {
            throw new Error(`Room with id: ${id} not found`)
        }
        return room as RoomInterface
    }

    async create(newRoom: RoomInterface): Promise<RoomInterface> {
        const [result] = await this.connection.execute<mysql.ResultSetHeader>('INSERT INTO rooms SET ?', newRoom)
        const roomId = result.insertId
        return { ...newRoom, id: roomId } as RoomInterface
    }

    async update(id: number, updatedRoom: Partial<RoomInterface>): Promise<RoomInterface> {
        const [result] = await this.connection.execute<mysql.ResultSetHeader>('UPDATE rooms SET ? WHERE id = ?', [updatedRoom, id])
        if (result.affectedRows === 0) {
            throw new Error(`Room with id: ${id} not found`)
        }
        return this.getById(id)
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await this.connection.execute<mysql.ResultSetHeader>('DELETE FROM rooms WHERE id = ?', [id])
        return result.affectedRows > 0
    }
}