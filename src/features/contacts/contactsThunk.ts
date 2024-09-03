import { createAsyncThunk } from "@reduxjs/toolkit"
import { Contact, UpdateArchiveStatusPayload } from "./types"

export const GetContacts = createAsyncThunk<Contact[]>(
    "contacts/getContacts",
    async () => {
        try {
            const req = await fetch(`http://localhost:4000/messages`)

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

export const GetSingleContact = createAsyncThunk<Contact, string>(
    "contacts/getSingleContacts",
    async (contactId: string) => {
        try {
            const req = await fetch(`http://localhost:4000/messages/${contactId}`)

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

export const updateArchiveStatus = createAsyncThunk<Contact, UpdateArchiveStatusPayload>(
    'contacts/updateArchiveStatus',
    async ({ id, archiveStatus }: UpdateArchiveStatusPayload) => {
        try {
            const response = await fetch(`http://localhost:4000/messages/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
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