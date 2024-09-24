import { createAsyncThunk } from "@reduxjs/toolkit"
import { ContactInterface, UpdateArchiveStatusPayload } from "../../interfaces/contactInterface"

const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error('No token found. Please log in.')
    }
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
}

export const GetContacts = createAsyncThunk<ContactInterface[]>(
    "contacts/getContacts",
    async () => {
        try {
            const req = await fetch(`http://localhost:8080/api/contacts`, {
                method: 'GET',
                headers: getAuthHeaders(),
            })

            if (!req.ok) {
                throw new Error('Authentication failed.')
            }

            const json = await req.json()
            console.log(json)
            return json
        } catch (error) {
            console.error('Error fetching Contacts:', error)
            throw Error('Failed to fetch Contacts.')
        }
    }
)

export const GetSingleContact = createAsyncThunk<ContactInterface, string>(
    "contacts/getSingleContacts",
    async (contactId: string) => {
        try {
            const req = await fetch(`http://localhost:8080/api/contacts/${contactId}`, {
                method: 'GET',
                headers: getAuthHeaders(),
            })

            if (!req.ok) {
                throw new Error('Authentication failed.')
            }

            const json = await req.json()
            return json
        } catch (error) {
            console.error('Error fetching Contacts:', error)
            throw Error('Failed to fetch Contacts.')
        }
    }
)

export const updateArchiveStatus = createAsyncThunk<ContactInterface, UpdateArchiveStatusPayload>(
    'contacts/updateArchiveStatus',
    async ({ id, archiveStatus }: UpdateArchiveStatusPayload) => {
        try {
            const response = await fetch(`http://localhost:8080/api/contacts/${id}`, {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify({ actions: { archive: archiveStatus } }),
            })

            if (!response.ok) {
                throw new Error('Failed to update archive status.')
            }

            const json = await response.json()
            return json
        } catch (error) {
            console.error('Error updating archive status:', error)
            throw new Error('Failed to update archive status.')
        }
    }
)