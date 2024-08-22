import { createSlice } from '@reduxjs/toolkit'
import { GetRooms, EditRoom, DeleteRoom } from './roomsThunk'

const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        data: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetRooms.pending, (state) => {
                state.status = "loading"
            })
            .addCase(GetRooms.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.data = action.payload
            })
            .addCase(GetRooms.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(EditRoom.fulfilled, (state, action) => {
                state.data = state.data.map(room =>
                    room.id === action.payload.id ? action.payload : room
                )
            })
            .addCase(DeleteRoom.fulfilled, (state, action) => {
                state.data = state.data.filter(room => room.id !== action.payload)
            })
    },
})

export default roomsSlice.reducer
