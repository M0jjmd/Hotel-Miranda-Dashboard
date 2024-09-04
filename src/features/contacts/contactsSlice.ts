import { createSlice } from '@reduxjs/toolkit'
import { GetContacts, updateArchiveStatus, GetSingleContact } from './contactsThunk'
import { Contact } from '../../interfaces/contactInterface'

interface ContactsState {
    data: Contact[]
    status: 'idle' | 'loading' | 'fulfilled' | 'failed'
    error: string | null
    singleContact: Contact | null
}

const initialState: ContactsState = {
    data: [],
    status: 'idle',
    error: null,
    singleContact: null,
}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetContacts.pending, (state) => {
                state.status = "loading"
            })
            .addCase(GetContacts.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.data = action.payload
            })
            .addCase(GetContacts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || null
            })
            .addCase(updateArchiveStatus.fulfilled, (state, action) => {
                state.data = state.data.map(contact =>
                    contact.id === action.payload.id ? action.payload : contact
                )
            })
            .addCase(GetSingleContact.fulfilled, (state, action) => {
                state.singleContact = action.payload
            })
    },
})

export default contactsSlice.reducer