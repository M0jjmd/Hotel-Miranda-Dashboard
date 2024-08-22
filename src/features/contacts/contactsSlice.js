import { createSlice } from '@reduxjs/toolkit'
import { GetContacts, updateArchiveStatus, GetSingleContact } from './contactsThunk'

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        data: [],
        status: "idle",
        error: null,
        singleContact: [],
    },
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
                state.error = action.error.message
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