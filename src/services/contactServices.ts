import mysql, { RowDataPacket } from 'mysql2/promise'
import { ContactInterface } from '../interfaces/contactInterface'
import { UpdateArchiveStatusPayload } from '../interfaces/contactInterface'

export class ContactServices {
    private connection: mysql.Connection

    constructor(connection: mysql.Connection) {
        this.connection = connection
    }

    async getAll(): Promise<ContactInterface[]> {
        const [rows] = await this.connection.query<RowDataPacket[]>('SELECT * FROM contacts')
        return rows as ContactInterface[]
    }

    async getById(id: number): Promise<ContactInterface> {
        const [rows] = await this.connection.query<RowDataPacket[]>('SELECT * FROM contacts WHERE id = ?', [id])
        const contact = rows[0]
        if (!contact) {
            throw new Error(`Contact with id: ${id} not found`)
        }
        return contact as ContactInterface
    }

    async create(newContact: ContactInterface): Promise<ContactInterface> {
        const [result] = await this.connection.execute<mysql.ResultSetHeader>('INSERT INTO contacts SET ?', newContact)
        const contactId = result.insertId
        return { ...newContact, id: contactId } as ContactInterface
    }

    async updateArchiveStatus(payload: UpdateArchiveStatusPayload): Promise<ContactInterface> {
        const { id, archiveStatus } = payload;

        const [rows] = await this.connection.query<RowDataPacket[]>('SELECT * FROM contacts WHERE id = ?', [id]);
        const contact = rows[0]

        if (!contact) {
            throw new Error(`Contact with id: ${id} not found`);
        }

        await this.connection.execute<mysql.ResultSetHeader>('UPDATE contacts SET archive = ? WHERE id = ?', [archiveStatus, id]);

        const [updatedRows] = await this.connection.query<RowDataPacket[]>('SELECT * FROM contacts WHERE id = ?', [id]);
        const updatedContact = updatedRows[0] as ContactInterface

        return updatedContact;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await this.connection.execute<mysql.ResultSetHeader>('DELETE FROM contacts WHERE id = ?', [id])
        return result.affectedRows > 0
    }
}